import Link from "next/link";
import content from "../../data/content.json";
import styles from "./page.module.css";

export default function Contact() {
  return (
    <main className={styles.contactPage}>
      <div className={`${styles.contactCard} animate-fade-in`}>
        <h1 className={`${styles.contactTitle} font-heading`}>Hubungi Kami</h1>
        <p className={`${styles.contactSubtitle} font-body`}>
          Silakan pilih salah satu admin kami untuk informasi lebih lanjut atau pemesanan.
        </p>
        
        <div className={styles.adminList}>
          {content.admins.map((admin) => (
            <a
              key={admin.id}
              href={`https://wa.me/${admin.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.adminButton} font-body`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.146.559 4.225 1.624 6.072L.03 23.957l6.02-1.579A11.968 11.968 0 0 0 12.03 24.06c6.645 0 12.031-5.385 12.031-12.031S18.676 0 12.031 0Zm6.643 17.222c-.276.777-1.611 1.488-2.222 1.578-.58.087-1.336.14-3.876-.902-3.053-1.254-5.012-4.38-5.163-4.582-.152-.202-1.233-1.642-1.233-3.13 0-1.488.777-2.222 1.053-2.525.276-.303.601-.379.803-.379.201 0 .402 0 .579.009.186.009.435-.069.664.484.234.555.777 1.894.846 2.037.069.143.115.311.014.512-.102.202-.152.327-.302.492-.152.164-.316.368-.453.493-.153.14-.312.29-.133.593.179.303.797 1.31 1.706 2.12.164.146 1.053.864 1.396.993.303.113.484.145.666-.051.183-.195.777-.905.986-1.215.209-.311.418-.26.694-.158.276.102 1.751.826 2.051.977.301.15.502.227.578.354.075.127.075.736-.201 1.513Z"/>
              </svg>
              {admin.name}
            </a>
          ))}
        </div>

        <Link href="/" className={`${styles.backLink} font-body`}>
          &larr; Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
