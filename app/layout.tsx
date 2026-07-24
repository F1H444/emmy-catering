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
    default: "Emmy Catering Sukabumi | Catering Pernikahan Terbaik & Terpercaya Sejak 2000",
    template: "%s | Emmy Catering Sukabumi",
  },
  description:
    "Emmy Catering Sukabumi ★ Catering pernikahan, ulang tahun, arisan & korporat. Berpengalaman sejak 2000, 1000+ acara sukses. Harga mulai Rp 40.000/pax. Menu lezat, higienis, tepat waktu. ☎ +6281548884171",
  keywords: [
    // Primary keywords
    "catering sukabumi",
    "emmy catering sukabumi",
    "emmy catering",
    "jasa catering sukabumi",
    "catering terbaik sukabumi",
    // Event-based keywords
    "catering pernikahan sukabumi",
    "catering resepsi pernikahan sukabumi",
    "catering pernikahan murah sukabumi",
    "catering ulang tahun sukabumi",
    "catering arisan sukabumi",
    "catering korporat sukabumi",
    "catering seminar sukabumi",
    "catering acara sukabumi",
    // Price-based keywords
    "catering murah sukabumi",
    "catering murah meriah sukabumi",
    "paket catering sukabumi",
    "harga catering sukabumi",
    "catering 40 ribu sukabumi",
    // Location keywords
    "catering sukabumi kota",
    "catering sukabumi kabupaten",
    "catering jawa barat",
    "catering profesional sukabumi",
    // Long-tail keywords
    "rekomendasi catering sukabumi",
    "catering enak sukabumi",
    "catering higienis sukabumi",
    "catering halal sukabumi",
    "catering 500 orang sukabumi",
    "catering 1000 orang sukabumi",
    "vendor catering sukabumi",
    "catering berpengalaman sukabumi",
  ],
  authors: [{ name: "Emmy Catering Sukabumi", url: "https://emmy-catering.vercel.app" }],
  creator: "Emmy Catering Sukabumi",
  publisher: "Emmy Catering Sukabumi",
  metadataBase: new URL("https://emmy-catering.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://emmy-catering.vercel.app",
    siteName: "Emmy Catering Sukabumi",
    title: "Emmy Catering Sukabumi | Catering Pernikahan Terbaik Sejak 2000",
    description:
      "Catering pernikahan, ulang tahun, arisan & korporat di Sukabumi. Berpengalaman sejak 2000, 1000+ acara sukses. Harga mulai Rp 40.000/pax. Hubungi kami sekarang!",
    images: [
      {
        url: "/logo_emmy.jpg",
        width: 1200,
        height: 630,
        alt: "Emmy Catering Sukabumi - Jasa Catering Pernikahan Terbaik",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmy Catering Sukabumi | Catering Terbaik & Terpercaya",
    description:
      "Catering pernikahan, ulang tahun & korporat di Sukabumi. Sejak 2000, 1000+ acara sukses. Harga mulai Rp 40.000/pax.",
    images: ["/logo_emmy.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "google9b13fbf594574a4f",
  },
  category: "food",
  classification: "Catering & Food Service",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
        "@type": ["FoodEstablishment", "LocalBusiness", "CateringService"],
        "@id": "https://emmy-catering.vercel.app/#business",
        "name": "Emmy Catering Sukabumi",
        "alternateName": ["Emmy Catering", "Emmy Catering", "Catering Emmy Sukabumi"],
        "description": "Emmy Catering Sukabumi adalah jasa catering profesional terpercaya untuk pernikahan, resepsi, ulang tahun, arisan, dan acara korporat di Sukabumi sejak tahun 2000. Lebih dari 1000 acara sukses dilayani dengan menu lezat dan higienis.",
        "url": "https://emmy-catering.vercel.app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://emmy-catering.vercel.app/logo_emmy.jpg",
          "width": 1080,
          "height": 1080
        },
        "image": [
          "https://emmy-catering.vercel.app/logo_emmy.jpg",
          "https://emmy-catering.vercel.app/emmy_team.jpg"
        ],
        "telephone": "+6281548884171",
        "priceRange": "Rp 40.000 - Rp 60.000",
        "currenciesAccepted": "IDR",
        "paymentAccepted": "Cash, Transfer Bank",
        "servesCuisine": ["Indonesian", "Masakan Indonesia", "Masakan Sunda"],
        "foundingDate": "2000",
        "numberOfEmployees": { "@type": "QuantitativeValue", "value": 20 },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Sukabumi",
          "addressLocality": "Sukabumi",
          "addressRegion": "Jawa Barat",
          "postalCode": "43100",
          "addressCountry": "ID"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -6.9147,
          "longitude": 106.9305
        },
        "areaServed": [
          { "@type": "City", "name": "Sukabumi" },
          { "@type": "AdministrativeArea", "name": "Jawa Barat" }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
            "opens": "08:00",
            "closes": "21:00"
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Paket Catering Emmy",
          "itemListElement": [
            {
              "@type": "Offer",
              "name": "Paket Silver",
              "description": "Paket catering hemat untuk acara kecil",
              "price": "40000",
              "priceCurrency": "IDR",
              "unitText": "per orang"
            },
            {
              "@type": "Offer",
              "name": "Paket Gold",
              "description": "Paket catering menengah dengan variasi menu lebih banyak",
              "price": "45000",
              "priceCurrency": "IDR",
              "unitText": "per orang"
            },
            {
              "@type": "Offer",
              "name": "Paket Super Diamond",
              "description": "Paket catering premium dengan menu lengkap",
              "price": "60000",
              "priceCurrency": "IDR",
              "unitText": "per orang"
            }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "127",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
            "author": { "@type": "Person", "name": "Siti Rahayu" },
            "reviewBody": "Emmy Catering Sukabumi sangat profesional! Makanannya enak, tepat waktu, dan pelayanannya ramah. Sangat rekomen untuk pernikahan di Sukabumi!"
          },
          {
            "@type": "Review",
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
            "author": { "@type": "Person", "name": "Budi Santoso" },
            "reviewBody": "Harga terjangkau, rasa makanan lezat. Sudah dua kali pakai Emmy Catering dan selalu puas!"
          }
        ],
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
        "description": "Emmy Catering Sukabumi — catering pernikahan terbaik dan terpercaya sejak 2000",
        "publisher": { "@id": "https://emmy-catering.vercel.app/#business" },
        "inLanguage": "id-ID",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://emmy-catering.vercel.app/paket?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://emmy-catering.vercel.app" },
          { "@type": "ListItem", "position": 2, "name": "Paket Catering", "item": "https://emmy-catering.vercel.app/paket" },
          { "@type": "ListItem", "position": 3, "name": "Kontak", "item": "https://emmy-catering.vercel.app/contact" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Berapa harga paket catering Emmy Catering Sukabumi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Harga paket catering Emmy Catering mulai dari Rp 40.000 per orang untuk paket Silver hingga Rp 60.000 untuk paket Super Diamond. Semua paket sudah termasuk nasi, lauk pauk, sayur, dan minuman. Hubungi kami via WhatsApp +6281548884171 untuk penawaran terbaik."
            }
          },
          {
            "@type": "Question",
            "name": "Apakah Emmy Catering melayani catering pernikahan di Sukabumi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ya! Emmy Catering Sukabumi melayani berbagai acara termasuk pernikahan, resepsi, ulang tahun, arisan, syukuran, hingga acara korporat dan seminar. Kami juga melayani pengiriman ke seluruh wilayah Sukabumi Kota dan Kabupaten."
            }
          },
          {
            "@type": "Question",
            "name": "Sudah berapa lama Emmy Catering beroperasi di Sukabumi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Emmy Catering telah berpengalaman lebih dari 24 tahun sejak tahun 2000, melayani lebih dari 1000 acara sukses di Sukabumi dan sekitarnya dengan kepuasan pelanggan tertinggi."
            }
          },
          {
            "@type": "Question",
            "name": "Apakah Emmy Catering menyediakan catering dengan kapasitas besar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ya, Emmy Catering Sukabumi mampu melayani acara dari 50 hingga 2000+ tamu. Kami berpengalaman menangani acara besar seperti resepsi pernikahan, gathering perusahaan, dan acara pemerintahan."
            }
          },
          {
            "@type": "Question",
            "name": "Bagaimana cara memesan catering Emmy Catering Sukabumi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pemesanan catering Emmy Catering Sukabumi bisa dilakukan via WhatsApp di +6281548884171, jam 08.00-21.00 WIB setiap hari. Kami akan memberikan konsultasi gratis dan penawaran harga terbaik sesuai kebutuhan acara Anda."
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
