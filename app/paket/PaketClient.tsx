"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function PaketClient({ paketQuery }: { paketQuery: string | undefined }) {
  const [paketImages, setPaketImages] = useState<any[]>([]);
  const [foodstalls, setFoodstalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/drive');
        if (res.ok) {
          const data = await res.json();
          
          if (data.paket) {
            let filteredPaket = data.paket;
            // If a specific package is selected, filter to show only that one
            if (paketQuery) {
              const exactMatch = data.paket.find((p: any) => 
                p.name.toLowerCase().replace(/[-_ ]/g, '').startsWith(paketQuery.toLowerCase().replace(/[-_ ]/g, ''))
              );
              if (exactMatch) {
                filteredPaket = [exactMatch];
              }
            }
            setPaketImages(filteredPaket);
          }

          if (data.foodstall) {
            setFoodstalls(data.foodstall);
          }
        }
      } catch(e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [paketQuery]);

  const getImageUrl = (driveId: string) => {
    const rawUrl = `https://drive.google.com/thumbnail?id=${driveId}&sz=w1920`;
    return `/api/thumbnail-proxy?url=${encodeURIComponent(rawUrl)}`;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
         <div style={{ width: '50px', height: '50px', border: '3px solid rgba(226, 192, 68, 0.3)', borderTopColor: 'var(--color-gold)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div>
      {/* SECTION: Paket Brosur */}
      {paketImages.length > 0 && (
        <div style={{ marginBottom: '80px' }}>
          <h2 className="font-heading" style={{ fontSize: '2.5rem', color: 'var(--color-white)', textAlign: 'center', marginBottom: '40px' }}>
            {paketImages.length === 1 ? "Detail Paket" : "Semua Pilihan Paket"}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: paketImages.length === 1 ? 'minmax(min(100%, 300px), 600px)' : 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', justifyContent: 'center', gap: '40px', margin: '0 auto' }}>
            {paketImages.map((pkg) => {
               // Extract clean name, e.g. "super diamond package.png" -> "Super Diamond"
               const cleanName = pkg.name.replace(/package|paket|\.png|\.jpg|\.jpeg/gi, '').trim().split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
               return (
                 <div key={pkg.id} style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: paketImages.length === 1 ? '0 auto' : '0' }}>
                    {paketImages.length > 1 && (
                      <h3 className="font-heading" style={{ fontSize: '1.8rem', color: 'var(--color-gold)', textAlign: 'center' }}>
                        Paket {cleanName}
                      </h3>
                    )}
                    <div style={{ position: 'relative', width: '100%', height: 'auto', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(226, 192, 68, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                      {/* Using standard img tag because next/image requires width/height for non-fill, and we want native aspect ratio if possible. But we can use next/image with layout responsive */}
                      <img
                        src={getImageUrl(pkg.id)}
                        alt={pkg.name}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                        loading="lazy"
                      />
                    </div>
                 </div>
               )
            })}
          </div>
        </div>
      )}

      {/* SECTION: Foodstall */}
      {foodstalls.length > 0 && (
        <div>
          <h2 className="font-heading" style={{ fontSize: '2.5rem', color: 'var(--color-white)', textAlign: 'center', marginBottom: '16px' }}>
            Pilihan Menu Foodstall
          </h2>
          <p className="font-body" style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '60px', maxWidth: '600px', margin: '0 auto 60px auto' }}>
            Berbagai macam pilihan stall lezat untuk melengkapi kemeriahan acara Anda.
          </p>
          <div style={{ columnWidth: '300px', columnGap: '24px' }}>
            {foodstalls.map((stall, index) => {
               const cleanName = stall.name.replace(/\.png|\.jpg|\.jpeg/gi, '').replace(/[-_]/g, ' ').trim().split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
               return (
                 <div key={stall.id} style={{ breakInside: 'avoid', marginBottom: '24px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <img
                      src={getImageUrl(stall.id)}
                      alt={stall.name}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                      loading="lazy"
                    />
                 </div>
               )
            })}
          </div>
        </div>
      )}
    </div>
  );
}
