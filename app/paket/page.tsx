import Image from "next/image";
import Link from "next/link";
import content from "../../data/content.json";
import PaketClient from "./PaketClient";

// Component is Server Component by default, which is great for SEO and performance
export const metadata = {
  title: "Paket Menu - Emmy Catering",
  description: "Brosur pilihan paket menu Emmy Catering.",
};

const getImageUrl = (driveId: string | undefined, placeholderUrl: string) => {
  if (driveId && driveId.length > 5) {
    return `https://drive.google.com/uc?export=view&id=${driveId}`;
  }
  return placeholderUrl;
};

export default async function PaketPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const paketRaw = searchParams.paket;
  const paketQuery: string | undefined = Array.isArray(paketRaw) ? paketRaw[0] : paketRaw;
  
  let title = "Brosur Paket";
  let description = "Pilih paket yang sesuai dengan kebutuhan acara Anda.";
  
  if (typeof paketQuery === "string") {
    const matchedCategory = content.menu.categories.find(c => c.id === paketQuery);
    if (matchedCategory) {
      title = matchedCategory.name;
      description = matchedCategory.description;
    } else {
      const formatted = paketQuery.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      title = `Paket ${formatted}`;
    }
  }

  return (
    <main style={{ minHeight: '100vh', padding: '120px 24px 60px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
           <h1 className="font-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--color-gold)', marginBottom: '16px' }}>
             {title}
           </h1>
           <p className="font-body" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
             {description}
           </p>
           <Link href="/#menu" className="font-body" style={{ color: 'var(--color-gold)', display: 'inline-block', marginTop: '24px', borderBottom: '1px solid var(--color-gold)' }}>
             &larr; Kembali ke Beranda
           </Link>
        </div>

        <PaketClient paketQuery={paketQuery} />

      </div>
    </main>
  );
}
