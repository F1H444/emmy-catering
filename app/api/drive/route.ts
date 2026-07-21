import { NextResponse } from 'next/server';
import content from '../../../data/content.json';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const API_KEY = process.env.GOOGLE_DRIVE_API_KEY;

async function getFilesInFolder(folderId: string) {
  if (!folderId || folderId.trim() === "") return [];
  if (!API_KEY) {
     console.error("Missing GOOGLE_DRIVE_API_KEY");
     return [];
  }
  
  // Fetch files from the specific folder.
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&fields=files(id,name,mimeType,thumbnailLink,hasThumbnail)&key=${API_KEY}`;
  
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`Google Drive API error: ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    return data.files || [];
  } catch (error) {
    console.error(`Error fetching folder ${folderId}:`, error);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const photoFolderId = content.documentation.photo_folder_id;
    const videoFolderId = content.documentation.video_folder_id;
    const testiFolderId = content.testimonials.testimoni_folder_id;
    const paketFolderId = content.menu.paket_folder_id;
    const foodstallFolderId = (content.menu as any).foodstall_folder_id;

    // Fetch data from all configured folders concurrently
    const [photos, videos, testis, paket, foodstall] = await Promise.all([
      getFilesInFolder(photoFolderId),
      getFilesInFolder(videoFolderId),
      getFilesInFolder(testiFolderId),
      getFilesInFolder(paketFolderId),
      getFilesInFolder(foodstallFolderId)
    ]);
    
    const responseData = {
      dokumentasi: {
        photos: photos.filter((f: any) => f.mimeType.startsWith('image/')),
        videos: videos.filter((f: any) => f.mimeType.startsWith('video/'))
      },
      testimoni: testis.filter((f: any) => f.mimeType.startsWith('image/')),
      paket: paket.filter((f: any) => f.mimeType.startsWith('image/')),
      foodstall: foodstall
        .filter((f: any) => f.mimeType.startsWith('image/'))
        .sort((a: any, b: any) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching drive data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
