import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Emmy Catering Sukabumi | Catering Terbaik & Terpercaya",
    template: "%s | Emmy Catering Sukabumi",
  },
  description:
    "Emmy Catering Sukabumi — layanan catering profesional untuk pernikahan, ulang tahun, arisan, dan acara korporat. Menu lengkap, harga terjangkau, pelayanan sepenuh hati sejak tahun 2000. Hubungi kami sekarang!",
  keywords: [
    "catering sukabumi",
    "catering pernikahan sukabumi",
    "catering terbaik sukabumi",
    "catering murah sukabumi",
    "catering profesional sukabumi",
    "jasa catering sukabumi",
    "catering ulang tahun sukabumi",
    "catering arisan sukabumi",
    "catering korporat sukabumi",
    "emmy catering",
    "emmy catering sukabumi",
    "paket catering sukabumi",
  ],
  authors: [{ name: "Emmy Catering Sukabumi" }],
  creator: "Emmy Catering",
  publisher: "Emmy Catering",
  metadataBase: new URL("https://emmy-catering.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://emmy-catering.vercel.app",
    siteName: "Emmy Catering Sukabumi",
    title: "Emmy Catering Sukabumi | Catering Terbaik & Terpercaya",
    description:
      "Layanan catering profesional untuk pernikahan, ulang tahun, arisan, dan acara korporat di Sukabumi. Harga terjangkau, menu lezat, sejak 2000.",
    images: [
      {
        url: "/logo_emmy.jpg",
        width: 1200,
        height: 630,
        alt: "Emmy Catering Sukabumi - Catering Terbaik",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmy Catering Sukabumi | Catering Terbaik & Terpercaya",
    description:
      "Layanan catering profesional untuk pernikahan, ulang tahun, arisan, dan acara korporat di Sukabumi.",
    images: ["/logo_emmy.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo_emmy.jpg",
    shortcut: "/logo_emmy.jpg",
    apple: "/logo_emmy.jpg",
  },
  verification: {
    google: "",
  },
  category: "food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FoodEstablishment",
        "@id": "https://emmy-catering.vercel.app/#business",
        "name": "Emmy Catering Sukabumi",
        "alternateName": ["Emmy Catering", "Emmy Catering Sukabumi"],
        "description": "Layanan catering profesional untuk pernikahan, ulang tahun, arisan, dan acara korporat di Sukabumi sejak tahun 2000.",
        "url": "https://emmy-catering.vercel.app",
        "logo": "https://emmy-catering.vercel.app/logo_emmy.jpg",
        "image": "https://emmy-catering.vercel.app/logo_emmy.jpg",
        "telephone": "+62",
        "priceRange": "Rp 40.000 - Rp 60.000",
        "servesCuisine": ["Indonesian", "Western", "Asian"],
        "foundingDate": "2000",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Sukabumi",
          "addressRegion": "Jawa Barat",
          "addressCountry": "ID"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -6.9147,
          "longitude": 106.9305
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          "opens": "08:00",
          "closes": "21:00"
        },
        "sameAs": [
          "https://www.instagram.com/emmycatering",
          "https://www.tiktok.com/@emmy.catering3"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://emmy-catering.vercel.app/#website",
        "url": "https://emmy-catering.vercel.app",
        "name": "Emmy Catering Sukabumi",
        "description": "Emmy Catering Sukabumi — catering terbaik dan terpercaya sejak 2000",
        "publisher": { "@id": "https://emmy-catering.vercel.app/#business" },
        "inLanguage": "id-ID"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Berapa harga paket catering Emmy Catering Sukabumi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Harga paket catering Emmy Catering mulai dari Rp 40.000 per orang untuk paket Silver hingga Rp 60.000 untuk paket Super Diamond. Tersedia berbagai pilihan menu lezat."
            }
          },
          {
            "@type": "Question",
            "name": "Apakah Emmy Catering melayani catering pernikahan di Sukabumi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ya! Emmy Catering Sukabumi melayani berbagai acara termasuk pernikahan, resepsi, ulang tahun, arisan, hingga acara korporat. Hubungi kami via WhatsApp untuk info lebih lanjut."
            }
          },
          {
            "@type": "Question",
            "name": "Sudah berapa lama Emmy Catering beroperasi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Emmy Catering telah berpengalaman lebih dari 24 tahun sejak tahun 2000, melayani lebih dari 1000 acara sukses di Sukabumi dan sekitarnya."
            }
          }
        ]
      }
    ]
  };

  return (
    <html
      lang="id"
      className={`${inter.variable} ${jakarta.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body">
        {children}
      </body>
    </html>
  );
}
