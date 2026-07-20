import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    const res = await fetch(url, { cache: 'no-store' });
    
    if (!res.ok) {
      console.error("Proxy fetch failed:", res.statusText, "for URL:", url);
      return new NextResponse("Failed to fetch image", { status: res.status });
    }

    const contentType = res.headers.get('content-type') || 'image/jpeg';
    const arrayBuffer = await res.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400'
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
