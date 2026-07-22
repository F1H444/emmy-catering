"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import content from "../data/content.json";
import styles from "./page.module.css";
import KineticText from "./components/KineticText";
import MagneticButton from "./components/MagneticButton";

const getImageUrl = (driveId: string | undefined, placeholderUrl: string) => {
  if (driveId && driveId.length > 5) {
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w1920`;
  }
  return placeholderUrl;
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [testiPage, setTestiPage] = useState(0);
  const [docPage, setDocPage] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const [dynamicMenu, setDynamicMenu] = useState(content.menu.categories);
  const [dynamicTestis, setDynamicTestis] = useState(content.testimonials.items);
  const [dynamicPhotos, setDynamicPhotos] = useState(content.documentation.photos);
  const [dynamicVideos, setDynamicVideos] = useState(content.documentation.videos);

  useEffect(() => {
    const fetchDriveData = async () => {
      try {
        const res = await fetch('/api/drive');
        if (res.ok) {
          const data = await res.json();
          
          // Update Paket
          if (data.paket && data.paket.length > 0) {
            const newMenu = content.menu.categories.map(cat => {
              const file = data.paket.find((f: any) => 
                f.name.toLowerCase().replace(/[-_ ]/g, '').startsWith(cat.id.toLowerCase().replace(/[-_ ]/g, ''))
              );
              return file ? { ...cat, drive_id: file.id } : cat;
            });
            setDynamicMenu(newMenu);
          }
          
          // Update Testimonials
          if (data.testimoni && data.testimoni.length > 0) {
            const newTestis = data.testimoni.map((f: any, i: number) => ({
                 id: i + 1,
                 name: "Klien Kami",
                 event: "Resepsi Pernikahan",
                 text: "Pelayanan sangat memuaskan dan makanannya enak-enak!",
                 image_placeholder_url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80",
                 drive_id: f.id
             }));
             setDynamicTestis(newTestis);
          }
          
          // Update Documentation Photos
          if (data.dokumentasi && data.dokumentasi.photos && data.dokumentasi.photos.length > 0) {
             const newPhotos = data.dokumentasi.photos.map((f: any, i: number) => ({
                 id: `p${i+1}`,
                 drive_id: f.id,
                 placeholder_url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80"
             }));
             setDynamicPhotos([...newPhotos].sort(() => Math.random() - 0.5));
          }
          
          // Update Documentation Videos
          if (data.dokumentasi && data.dokumentasi.videos && data.dokumentasi.videos.length > 0) {
             const newVideos = data.dokumentasi.videos.map((f: any, i: number) => ({
                 id: `v${i+1}`,
                 drive_id: f.id,
                 thumbnail_url: f.thumbnailLink || null,
                 placeholder_url: "https://www.w3schools.com/html/mov_bbb.mp4"
             }));
             setDynamicVideos(newVideos);
          }
        }
      } catch (e) {
        console.error("Failed to fetch Google Drive data:", e);
      }
    };
    fetchDriveData();

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-up, .reveal-scale').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: '32px', right: '40px', color: '#fff', fontSize: '2rem' }}>✕</button>
        <Link href="#home" onClick={() => setMenuOpen(false)} className="font-heading">Beranda</Link>
        <Link href="#about" onClick={() => setMenuOpen(false)} className="font-heading">Tentang Kami</Link>
        <Link href="#visi-misi" onClick={() => setMenuOpen(false)} className="font-heading">Visi & Misi</Link>
        <Link href="#features" onClick={() => setMenuOpen(false)} className="font-heading">Keunggulan</Link>
        <Link href="#menu" onClick={() => setMenuOpen(false)} className="font-heading" style={{ color: 'var(--color-gold)' }}>Brosur Menu</Link>
        <Link href="#testimonials" onClick={() => setMenuOpen(false)} className="font-heading">Kata Mereka</Link>
        <Link href="#location" onClick={() => setMenuOpen(false)} className="font-heading">Kontak</Link>
      </div>

      {/* Sticky Navbar */}
      <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
        <div className={styles.navContainer}>
          <div className={styles.logoContainer} style={{ gap: '12px' }}>
            <div style={{ position: 'relative', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
               <Image 
                 src="/logo_emmy.jpg"
                 alt="Emmy Catering Logo"
                 fill
                 style={{ objectFit: 'cover' }}
                 sizes="40px"
                 priority
               />
            </div>
            <div className={`${styles.logo} font-heading`} style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Emmy Catering</div>
          </div>
          
          <div className={`${styles.navLinks} font-body`}>
            <Link href="#home">Beranda</Link>
            <Link href="#about">Tentang Kami</Link>
            <Link href="#visi-misi">Visi & Misi</Link>
            <Link href="#features">Keunggulan</Link>
            <Link href="#menu">Brosur Menu</Link>
            <Link href="#testimonials">Kata Mereka</Link>
            <Link href="#location">Kontak</Link>
          </div>

          <button className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className={styles.hero}>
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className={styles.heroContent}>
              <span className={`${styles.heroSubtitle} font-body reveal-up`}>{content.hero.subtitle}</span>
              
              <div style={{ position: 'relative' }}>
                <div className="text-giant font-heading text-outline" style={{ position: 'absolute', top: '-10px', left: '-5px', opacity: 0.3 }}>
                  EMMY
                </div>
                <KineticText text={content.hero.title} as="h1" className="text-giant font-heading" delayOffset={0.2} />
              </div>
              
              <p className={`${styles.heroDesc} font-body reveal-up delay-2`}>
                {content.hero.description}
              </p>
              
              <div className={`${styles.heroButtons} reveal-up delay-3`}>
                <MagneticButton as="a" href="#menu" className="btn-primary font-body">Lihat Pilihan Menu</MagneticButton>
                <MagneticButton as="a" href="/contact" className="btn-secondary font-body">Tanya-Tanya Dulu via WA</MagneticButton>
              </div>
            </div>
          </div>
        </section>

        {/* About Section - Kenalan Yuk! */}
        <section id="about" className="section" style={{ backgroundColor: 'var(--color-black)' }}>
          <div className="container">
            <h2 className="section-subtitle font-body reveal-up" style={{ textAlign: 'center' }}>{content.about.title}</h2>
            <h3 className="section-title font-heading reveal-up" style={{ textAlign: 'center', marginBottom: '60px' }}>{content.about.subtitle}</h3>
            
            <div className={`${styles.aboutGrid} reveal-scale delay-1`}>
              <div className={styles.aboutImageWrapper} style={{ flex: '1', borderRadius: '24px', overflow: 'hidden', minHeight: '500px', position: 'relative' }}>
                <Image
                  src="/tentang_kami.png"
                  alt="Tim Emmy Catering"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  priority
                />
              </div>
              
              <div style={{ flex: '1' }}>
                <p className="font-body" style={{ fontSize: '1.2rem', lineHeight: '2', color: 'var(--color-text)' }}>Di Emmy Catering, kami percaya bahwa makanan enak bisa bikin suasana acara jadi lebih hangat dan bahagia. Itulah kenapa kami selalu totalitas meracik bumbu andalan kami sejak tahun 2000.</p>
                <br/>
                <p className="font-body" style={{ fontSize: '1.2rem', lineHeight: '2', color: 'var(--color-text)' }}>Dari dapur kami di Kota Sukabumi, kami siap nemenin momen pentingmu—mulai dari kumpul keluarga, resepsi pernikahan impian, hingga acara korporat.</p>
                <br/>
                <p className="font-body" style={{ fontSize: '1.1rem', lineHeight: '2', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>&ldquo;Food for us comes from our relatives, whether they have wings or fins or roots. That is how we consider food. Food has a culture. It has a history. It has a story. It has relationships.&rdquo;</p>
                <br/>
                <MagneticButton as="a" href="#menu" className="btn-outline font-body" style={{ border: '2px solid var(--color-gold)', padding: '12px 24px', color: 'var(--color-gold)', borderRadius: '30px' }}>
                   Intip Menu Kami
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>

        {/* Visi & Misi Section */}
        <section id="visi-misi" className="section" style={{ backgroundColor: 'var(--color-black-light)', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative background element */}
          <div style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(226, 192, 68, 0.04) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-150px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(226, 192, 68, 0.03) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div className="container">
            <h2 className="section-subtitle font-body reveal-up" style={{ textAlign: 'center' }}>{content.visiMisi.title}</h2>
            <h3 className="section-title font-heading reveal-up" style={{ textAlign: 'center', marginBottom: '80px' }}>{content.visiMisi.subtitle}</h3>

            {/* Visi Card - Full Width Premium */}
            <div className={`${styles.visiCard} glass reveal-scale delay-1`}>
              <div className={styles.visiCardInner}>
                <div className={styles.visiIconWrapper}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                    <line x1="12" y1="2" x2="12" y2="6" />
                    <line x1="12" y1="18" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="6" y2="12" />
                    <line x1="18" y1="12" x2="22" y2="12" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--color-gold)', marginBottom: '24px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    {content.visiMisi.visi.title}
                  </h3>
                  <p className="font-body" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--color-text)', lineHeight: '2', maxWidth: '800px' }}>
                    {content.visiMisi.visi.description}
                  </p>
                </div>
              </div>
              {/* Decorative gold line */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
                borderRadius: '2px'
              }} />
            </div>

            {/* Misi Grid */}
            <div style={{ marginTop: '60px' }}>
              <h3 className="font-heading reveal-up" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--color-gold)', textAlign: 'center', marginBottom: '48px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                {content.visiMisi.misi.title}
              </h3>
              <div className={`${styles.misiGrid} reveal-scale delay-2`}>
                {content.visiMisi.misi.items.map((item, idx) => (
                  <div key={idx} className={`${styles.misiItem} glass`}>
                    {/* Number Badge */}
                    <div className={styles.misiBadge}>
                      <span className="font-heading">0{idx + 1}</span>
                    </div>
                    {/* Icon */}
                    <div className={styles.misiIcon}>
                      {item.icon === 'quality' && (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      )}
                      {item.icon === 'service' && (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      )}
                      {item.icon === 'innovation' && (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="2" x2="12" y2="6" />
                          <line x1="12" y1="18" x2="12" y2="22" />
                          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                          <line x1="2" y1="12" x2="6" y2="12" />
                          <line x1="18" y1="12" x2="22" y2="12" />
                          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                        </svg>
                      )}
                      {item.icon === 'community' && (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      )}
                    </div>
                    <h4 className="font-heading" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '12px' }}>
                      {item.title}
                    </h4>
                    <p className="font-body" style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '1.05rem' }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features - Kenapa Pilih Kami */}
        <section id="features" className="section" style={{ backgroundColor: 'var(--color-black-light)' }}>
          <div className="container">
            <h2 className="section-subtitle font-body reveal-up" style={{ textAlign: 'center' }}>{content.features.title}</h2>
            <h3 className="section-title font-heading reveal-up" style={{ textAlign: 'center' }}>{content.features.subtitle}</h3>
            <p className="font-body reveal-up" style={{ textAlign: 'center', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto 60px auto', fontSize: '1.2rem' }}>
              {content.features.description}
            </p>

            <div className="bento-grid reveal-scale delay-1" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {content.features.items.map((feat, idx) => (
                <div key={idx} className="bento-item">
                  <div style={{ backgroundColor: 'rgba(226, 192, 68, 0.1)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--color-gold)' }}>
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h3 className="font-heading" style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '12px' }}>{feat.title}</h3>
                  <p className="font-body" style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{feat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Menu - Intip Menu */}
        <section id="menu" className="section" style={{ backgroundColor: 'var(--color-black)' }}>
          <div className="container">
            <h2 className="section-subtitle font-body reveal-up" style={{ textAlign: 'center' }}>{content.menu.title}</h2>
            <h3 className="section-title font-heading reveal-up" style={{ textAlign: 'center' }}>{content.menu.subtitle}</h3>
            <p className="font-body reveal-up" style={{ textAlign: 'center', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto 60px auto', fontSize: '1.2rem' }}>
              {content.menu.description}
            </p>

            <div className="bento-grid reveal-scale delay-1" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', alignItems: 'start' }}>
               {dynamicMenu.map((cat, idx) => (
                  <div key={idx} className="bento-item" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', textAlign: 'center' }}>
                     <div style={{ position: 'relative', width: '100%' }}>
                        {cat.drive_id && cat.drive_id.length > 5 ? (
                          <Image src={getImageUrl(cat.drive_id, cat.image_url)} alt={cat.name} width={500} height={700} style={{ width: '100%', height: 'auto', borderRadius: '16px' }} loading="lazy" sizes="(max-width: 768px) 100vw, 350px" />
                        ) : (
                          <div style={{ width: '100%', aspectRatio: '5/7', backgroundColor: '#1a1a1a', borderRadius: '16px' }} />
                        )}
                     </div>
                     <h3 className="font-heading" style={{ fontSize: '1.8rem', color: 'var(--color-gold)', marginBottom: '8px' }}>{cat.name}</h3>
                     <Link href={`/paket?paket=${cat.id}`} className="font-body" style={{ color: 'var(--color-gold)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Lihat Paket <span>&rarr;</span>
                     </Link>
                  </div>
               ))}
            </div>
          </div>
        </section>

        {/* Testimonials - Kata Mereka */}
        <section id="testimonials" className="section" style={{ backgroundColor: 'var(--color-black-light)' }}>
           <div className="container">
              <h2 className="section-subtitle font-body reveal-up" style={{ textAlign: 'center' }}>{content.testimonials.title}</h2>
              <h3 className="section-title font-heading reveal-up" style={{ textAlign: 'center' }}>{content.testimonials.subtitle}</h3>
              <p className="font-body reveal-up" style={{ textAlign: 'center', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto 60px auto', fontSize: '1.2rem' }}>
                {content.testimonials.description}
              </p>
              
              <div className="reveal-up delay-1" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
                 <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                      rotate: 30,
                      stretch: 0,
                      depth: 100,
                      modifier: 1,
                      slideShadows: true,
                    }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    className="testimoni-swiper"
                    style={{ paddingBottom: '40px' }}
                 >
                    {dynamicTestis.map(testi => (
                       <SwiperSlide key={testi.id} style={{ width: '300px', borderRadius: '24px', overflow: 'hidden', backgroundColor: 'var(--color-black)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                          <Image src={getImageUrl(testi.drive_id, (testi as any).image_placeholder_url || (testi as any).image_url || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80')} alt="Testimoni" width={400} height={600} style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" sizes="(max-width: 768px) 100vw, 400px" />
                       </SwiperSlide>
                    ))}
                 </Swiper>
              </div>
           </div>
        </section>

        {/* CTA Before Footer */}
        <section className="section" style={{ backgroundColor: 'var(--color-gold)', padding: '100px 0', textAlign: 'center' }}>
           <div className="container">
              <h2 className="font-heading" style={{ color: '#000', fontSize: '3rem', marginBottom: '24px' }}>Siap Buat Acara Anda Tak Terlupakan?</h2>
              <p className="font-body" style={{ color: '#333', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px auto' }}>
                 Hubungi kami sekarang untuk konsultasi gratis. Admin kami siap membantu merencanakan menu terbaik untuk acara Anda.
              </p>
              <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
                 <MagneticButton as="a" href="/contact" className="btn-secondary font-body" style={{ backgroundColor: '#000', color: 'var(--color-gold)' }}>Pesan via WhatsApp</MagneticButton>
                 <MagneticButton as="a" href="#menu" className="btn-outline font-body" style={{ border: '2px solid #000', color: '#000', borderRadius: '30px', padding: '16px 32px' }}>Lihat Menu Dulu</MagneticButton>
              </div>
           </div>
        </section>

        {/* Documentation Section (5 Photos, 5 Videos) */}
        <section id="gallery" className="section" style={{ backgroundColor: 'var(--color-black)' }}>
          <div className="container">
            <h2 className="section-subtitle font-body reveal-up" style={{ textAlign: 'center' }}>{content.documentation.title}</h2>
            <h3 className="section-title font-heading reveal-up" style={{ textAlign: 'center', marginBottom: '60px' }}>{content.documentation.subtitle}</h3>
            
            <h3 className="font-heading reveal-up" style={{ color: 'var(--color-gold)', marginBottom: '24px', fontSize: '2rem' }}>Foto</h3>
            <div className="reveal-scale delay-1" style={{ columnWidth: '250px', columnGap: '16px' }}>
                 {dynamicPhotos.slice(docPage * 5, (docPage + 1) * 5).map((photo, index) => (
                    <div 
                      key={photo.id} 
                      className="bento-item"
                      style={{ 
                        position: 'relative', 
                        width: '100%', 
                        breakInside: 'avoid',
                        marginBottom: '16px',
                        padding: 0,
                        overflow: 'hidden',
                        borderRadius: '24px'
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%', paddingTop: index % 3 === 0 ? '100%' : index % 2 === 0 ? '75%' : '125%' }}>
                        <Image
                          src={getImageUrl(photo.drive_id, photo.placeholder_url)}
                          alt="Foto Dokumentasi"
                          fill
                          style={{ objectFit: 'cover' }}
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                    </div>
                  ))}
            </div>
               
               {Math.ceil(dynamicPhotos.length / 5) > 1 && (
                 <div className={styles.pagination} style={{ width: '100%', marginTop: '24px' }}>
                   <button 
                     className={styles.pageButton} 
                     onClick={() => setDocPage(p => Math.max(0, p - 1))}
                     disabled={docPage === 0}
                   >
                     &larr; Prev
                   </button>
                   <span className={styles.pageInfo}>Halaman {docPage + 1} dari {Math.ceil(dynamicPhotos.length / 5)}</span>
                   <button 
                     className={styles.pageButton} 
                     onClick={() => setDocPage(p => Math.min(Math.ceil(dynamicPhotos.length / 5) - 1, p + 1))}
                     disabled={docPage >= Math.ceil(dynamicPhotos.length / 5) - 1}
                   >
                     Next &rarr;
                   </button>
                 </div>
               )}

            <h3 className="font-heading reveal-up" style={{ color: 'var(--color-gold)', marginBottom: '24px', fontSize: '2rem', marginTop: '60px' }}>Video</h3>
              <div className="bento-grid reveal-scale delay-1">
               {dynamicVideos.slice(docPage * 5, (docPage + 1) * 5).map((video, index) => (
                <div key={video.id} className="bento-item" style={{ padding: 0, height: 'auto', position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '12px' }}>
                   {video.drive_id && video.drive_id.length > 5 ? (
                     <div style={{ position: 'relative', width: '100%' }}>
                       <img 
                         src={
                            (video as any).thumbnail_url 
                               ? `/api/thumbnail-proxy?url=${encodeURIComponent((video as any).thumbnail_url.replace('=s220', '=s3840'))}` 
                               : [
                                  "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1920&q=100",
                                  "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=1920&q=100",
                                  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1920&q=100",
                                  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1920&q=100",
                                  "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&w=1920&q=100"
                                 ][index % 5]
                         } 
                         alt="Video Aspect Holder" 
                         style={{ width: '100%', height: 'auto', display: 'block', opacity: activeVideo === video.id ? 0 : 0.7 }} 
                       />
                       
                       {activeVideo !== video.id && (
                         <div 
                           onClick={() => setActiveVideo(video.id)} 
                           style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                         >
                           <div style={{ width: '60px', height: '60px', backgroundColor: 'rgba(226, 192, 68, 0.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="#000" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                           </div>
                         </div>
                       )}

                       {activeVideo === video.id && (
                         <iframe 
                           src={`https://drive.google.com/file/d/${video.drive_id}/preview?autoplay=1`} 
                           width="100%" 
                           height="100%" 
                           style={{ border: 'none', position: 'absolute', top: 0, left: 0, borderRadius: '12px' }} 
                           allowFullScreen 
                           allow="autoplay"
                           loading="lazy"
                         />
                       )}
                     </div>
                   ) : (
                      <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '12px', backgroundColor: '#1a1a1a' }} />
                   )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="section" style={{ backgroundColor: 'var(--color-black-light)' }}>
          <div className="container">
            <div className={`${styles.aboutGrid} reveal-up`}>
              
              {/* Left Side: Contact Info */}
              <div>
                <span className="section-subtitle font-body">KUNJUNGI KAMI</span>
                <h2 className="section-title font-heading" style={{ marginBottom: '40px' }}>Lokasi & <span style={{ color: 'var(--color-gold)' }}>Kontak</span></h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {/* Address */}
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{ backgroundColor: 'rgba(226, 192, 68, 0.1)', padding: '12px', borderRadius: '50%', color: 'var(--color-gold)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div>
                      <h4 className="font-heading" style={{ color: 'var(--color-gold-light)', marginBottom: '8px', letterSpacing: '2px', textTransform: 'uppercase' }}>Alamat</h4>
                      <p className="font-body" style={{ color: 'var(--color-text)', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{content.contact.address}</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{ backgroundColor: 'rgba(226, 192, 68, 0.1)', padding: '12px', borderRadius: '50%', color: 'var(--color-gold)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <div>
                      <h4 className="font-heading" style={{ color: 'var(--color-gold-light)', marginBottom: '8px', letterSpacing: '2px', textTransform: 'uppercase' }}>Jam Operasional</h4>
                      <p className="font-body" style={{ color: 'var(--color-text)', lineHeight: '1.6' }}>{content.contact.hours}</p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{ backgroundColor: 'rgba(226, 192, 68, 0.1)', padding: '12px', borderRadius: '50%', color: 'var(--color-gold)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-heading" style={{ color: 'var(--color-gold-light)', marginBottom: '8px', letterSpacing: '2px', textTransform: 'uppercase' }}>WhatsApp</h4>
                      {content.contact.whatsapp.map((wa, idx) => (
                        <p key={idx} className="font-body" style={{ color: 'var(--color-text)', lineHeight: '1.6' }}>+{wa} (Admin {idx+1})</p>
                      ))}
                    </div>
                  </div>
                  
                  {/* Instagram */}
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{ backgroundColor: 'rgba(226, 192, 68, 0.1)', padding: '12px', borderRadius: '50%', color: 'var(--color-gold)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </div>
                    <div>
                      <h4 className="font-heading" style={{ color: 'var(--color-gold-light)', marginBottom: '8px', letterSpacing: '2px', textTransform: 'uppercase' }}>Instagram</h4>
                      <a href={content.contact.instagram} target="_blank" rel="noopener noreferrer" className="font-body" style={{ color: 'var(--color-text)', lineHeight: '1.6', textDecoration: 'none' }}>@emmycatering</a>
                    </div>
                  </div>

                  {/* TikTok */}
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{ backgroundColor: 'rgba(226, 192, 68, 0.1)', padding: '12px', borderRadius: '50%', color: 'var(--color-gold)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-heading" style={{ color: 'var(--color-gold-light)', marginBottom: '8px', letterSpacing: '2px', textTransform: 'uppercase' }}>TikTok</h4>
                      <a href={content.contact.tiktok} target="_blank" rel="noopener noreferrer" className="font-body" style={{ color: 'var(--color-text)', lineHeight: '1.6', textDecoration: 'none' }}>@emmy.catering3</a>
                    </div>
                  </div>

                  {/* Facebook */}
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{ backgroundColor: 'rgba(226, 192, 68, 0.1)', padding: '12px', borderRadius: '50%', color: 'var(--color-gold)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-heading" style={{ color: 'var(--color-gold-light)', marginBottom: '8px', letterSpacing: '2px', textTransform: 'uppercase' }}>Facebook</h4>
                      <a href={content.contact.facebook} target="_blank" rel="noopener noreferrer" className="font-body" style={{ color: 'var(--color-text)', lineHeight: '1.6', textDecoration: 'none' }}>Emmy Rachmawaty</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Maps */}
              <div style={{ width: '100%', height: '500px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(226, 192, 68, 0.3)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
                {/* Emmy Catering Sukabumi Location */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1013964.558734134!2d106.91618988074764!3d-6.914612390873575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6849004dc1f979%3A0xb08a77a1bfdd89e7!2sEmmy%20Catering%20Sukabumi!5e0!3m2!1sid!2sid!4v1784514613277!5m2!1sid!2sid" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Peraturan Pemesanan */}
            <div className="reveal-up" style={{ marginTop: '60px', marginBottom: '40px', background: 'linear-gradient(135deg, rgba(226, 192, 68, 0.15) 0%, rgba(226, 192, 68, 0.05) 100%)', border: '1px solid rgba(226, 192, 68, 0.5)', borderRadius: '32px', padding: '40px', position: 'relative', overflow: 'hidden', backdropFilter: 'blur(10px)', boxShadow: '0 15px 40px rgba(226, 192, 68, 0.2)' }}>
              
              <h3 className="font-heading" style={{ color: '#FFD700', textShadow: '0 0 15px rgba(255, 215, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.3)', fontSize: 'clamp(2rem, 5vw, 2.5rem)', textAlign: 'center', marginBottom: '40px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                Peraturan Pemesanan
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', alignItems: 'start' }}>
                <ul className="font-body" style={{ listStyleType: 'none', color: '#fff', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '1.15rem', margin: 0 }}>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--color-gold)', fontSize: '1.5rem', lineHeight: '1' }}>•</span>
                    <span>Pemesanan dilakukan sedini mungkin dan harus di sertai DP (Down Payment)</span>
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--color-gold)', fontSize: '1.5rem', lineHeight: '1' }}>•</span>
                    <span>Harga mengikat apabila sudah terjadi kontrak DP</span>
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--color-gold)', fontSize: '1.5rem', lineHeight: '1' }}>•</span>
                    <span>DP pertama 20% satu bulan sebelum DP ke 2, 50%</span>
                  </li>
                </ul>
                <ul className="font-body" style={{ listStyleType: 'none', color: '#fff', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '1.15rem', margin: 0 }}>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--color-gold)', fontSize: '1.5rem', lineHeight: '1' }}>•</span>
                    <span>Kurang dari 1000 di kenakan biaya dekorasi catering dan setting meja harga di sesuaikan dengan venue</span>
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--color-gold)', fontSize: '1.5rem', lineHeight: '1' }}>•</span>
                    <span>Menu bisa berubah dan di sesuaikan dengan keinginan client</span>
                  </li>
                </ul>
              </div>
              <p className="font-body" style={{ textAlign: 'right', marginTop: '30px', color: 'var(--color-gold)', fontStyle: 'italic', fontSize: '1rem', fontWeight: 'bold' }}>
                *Syarat dan Ketentuan Berlaku
              </p>
            </div>

            <div className="reveal-up delay-1" style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
              <div style={{ padding: '24px 60px', background: 'linear-gradient(135deg, rgba(226, 192, 68, 0.15) 0%, rgba(226, 192, 68, 0.05) 100%)', borderRadius: '50px', border: '1px solid rgba(226, 192, 68, 0.3)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)', textAlign: 'center' }}>
                <p className="font-heading" style={{ color: '#FFD700', textShadow: '0 0 15px rgba(255, 215, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.3)', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontStyle: 'italic', margin: 0, letterSpacing: '2px', fontWeight: 'bold' }}>
                  "Kepuasan Anda Adalah Prioritas Kami"
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Complex Premium Footer */}
      <footer className="section" style={{ backgroundColor: '#000', padding: '100px 0 40px 0', borderTop: '1px solid rgba(226, 192, 68, 0.2)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '60px', marginBottom: '80px', textAlign: 'left' }}>
            
            {/* Column 1: Brand */}
            <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden' }}>
                   <Image 
                     src="/logo_emmy.jpg"
                     alt="Emmy Catering Logo"
                     fill
                     style={{ objectFit: 'cover' }}
                     sizes="60px"
                   />
                </div>
                <h2 className="font-heading text-giant" style={{ color: 'var(--color-gold)', fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>Emmy Catering</h2>
              </div>
              <p className="font-body" style={{ color: 'var(--color-text-muted)', marginBottom: '24px', lineHeight: '1.8' }}>
                Bikin acaramu makin berkesan dengan sajian lezat dan pelayanan hangat dari kami. Spesialis catering Sukabumi sejak 2000.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-start' }}>
                <a href={content.contact.instagram} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', height: '45px', border: '1px solid rgba(226,192,68,0.3)', borderRadius: '50%', transition: 'all 0.3s ease' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href={content.contact.facebook} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', height: '45px', border: '1px solid rgba(226,192,68,0.3)', borderRadius: '50%', transition: 'all 0.3s ease' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href={content.contact.tiktok} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', height: '45px', border: '1px solid rgba(226,192,68,0.3)', borderRadius: '50%', transition: 'all 0.3s ease' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                </a>
                <a href="/contact" style={{ color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', height: '45px', border: '1px solid rgba(226,192,68,0.3)', borderRadius: '50%', transition: 'all 0.3s ease' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </a>
              </div>
            </div>

            {/* Column 2: Navigasi */}
            <div style={{ flex: '1 1 200px' }}>
              <h4 className="font-heading" style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '24px', letterSpacing: '1px' }}>Navigasi</h4>
              <ul className="font-body" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                <li><Link href="#home" style={{ color: 'var(--color-text)' }}>Beranda</Link></li>
                <li><Link href="#menu" style={{ color: 'var(--color-text)' }}>Brosur Menu</Link></li>
                <li><Link href="#about" style={{ color: 'var(--color-text)' }}>Tentang Kami</Link></li>
                <li><Link href="#features" style={{ color: 'var(--color-text)' }}>Kenapa Pilih Kami?</Link></li>
                <li><Link href="#testimonials" style={{ color: 'var(--color-text)' }}>Kata Mereka</Link></li>
                <li><Link href="/contact" style={{ color: 'var(--color-text)' }}>Hubungi Kami</Link></li>
              </ul>
            </div>

            {/* Column 3: Contact Summary */}
            <div style={{ flex: '1 1 200px' }}>
              <h4 className="font-heading" style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '24px', letterSpacing: '1px' }}>Info Kontak</h4>
              <ul className="font-body" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                <li style={{ color: 'var(--color-text)', whiteSpace: 'pre-line' }}><strong>Alamat:</strong><br/>{content.contact.address}</li>
                <li style={{ color: 'var(--color-text)' }}>
                  <strong>Telepon:</strong><br/>
                  {content.contact.whatsapp.map((wa, idx) => (
                    <span key={idx} style={{ display: 'block' }}>+{wa} (Admin {idx + 1})</span>
                  ))}
                </li>
                <li style={{ color: 'var(--color-text)' }}><strong>Jam Buka:</strong><br/>{content.contact.hours}</li>
              </ul>
            </div>

          </div>

          <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '32px' }}>
             <p className="font-body">&copy; {new Date().getFullYear()} Emmy Catering. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <MagneticButton as="a" href="/contact" className="whatsapp-float" aria-label="Hubungi via WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.146.559 4.225 1.624 6.072L.03 23.957l6.02-1.579A11.968 11.968 0 0 0 12.03 24.06c6.645 0 12.031-5.385 12.031-12.031S18.676 0 12.031 0Zm6.643 17.222c-.276.777-1.611 1.488-2.222 1.578-.58.087-1.336.14-3.876-.902-3.053-1.254-5.012-4.38-5.163-4.582-.152-.202-1.233-1.642-1.233-3.13 0-1.488.777-2.222 1.053-2.525.276-.303.601-.379.803-.379.201 0 .402 0 .579.009.186.009.435-.069.664.484.234.555.777 1.894.846 2.037.069.143.115.311.014.512-.102.202-.152.327-.302.492-.152.164-.316.368-.453.493-.153.14-.312.29-.133.593.179.303.797 1.31 1.706 2.12.164.146 1.053.864 1.396.993.303.113.484.145.666-.051.183-.195.777-.905.986-1.215.209-.311.418-.26.694-.158.276.102 1.751.826 2.051.977.301.15.502.227.578.354.075.127.075.736-.201 1.513Z"/>
        </svg>
      </MagneticButton>
    </>
  );
}
