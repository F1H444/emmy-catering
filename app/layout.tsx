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
    "Emmy Catering Sukabumi ★ Catering pernikahan, ulang tahun, arisan & korporat. Berpengalaman sejak 2000, 1000+ acara sukses. Harga mulai Rp 40.000/pax. Menu lezat, higienis, tepat waktu. ☎ +6281546884171",
  keywords: [
    "catering sukabumi",
    "emmy catering",
    "emmy catering sukabumi",
    "jasa catering sukabumi",
    "catering pernikahan sukabumi",
    "catering terbaik sukabumi",
    "catering ulang tahun sukabumi",
    "catering arisan sukabumi",
    "catering korporat sukabumi",
    "paket catering sukabumi",
    "prasmanan sukabumi",
    "tumpeng sukabumi",
    "catering hajatan sukabumi",
    "catering murah sukabumi",
    "catering jawa barat"
  ],
  authors: [{ name: "Emmy Catering", url: "https://emmy-catering.vercel.app" }],
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
    siteName: "Emmy Catering",
    title: "Emmy Catering Sukabumi | Catering Pernikahan Terbaik Sejak 2000",
    description:
      "Emmy Catering Sukabumi ★ Catering pernikahan, ulang tahun, arisan & korporat. Berpengalaman sejak 2000, 1000+ acara sukses. Menu lezat, higienis, tepat waktu.",
    images: [
      {
        url: "/og-emmy.jpg",
        width: 1200,
        height: 630,
        alt: "Emmy Catering",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmy Catering Sukabumi | Catering Terbaik & Terpercaya",
    description:
      "Emmy Catering Sukabumi ★ Catering pernikahan, ulang tahun, arisan & korporat. Menu lezat, higienis, tepat waktu.",
    images: ["/og-emmy.jpg"],
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
        "@id": "https://emmy-catering.vercel.app#business",
        "name": "Emmy Catering",
        "alternateName": ["Emmy Catering Sukabumi", "Emmy Catering"],
        "description": "Emmy Catering Sukabumi menyediakan berbagai kebutuhan konsumsi acara anda: catering pernikahan, ulang tahun, arisan & korporat. Menu bisa menyesuaikan permintaan dan budget.",
        "url": "https://emmy-catering.vercel.app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://emmy-catering.vercel.app/logo_emmy.jpg",
          "width": 1254,
          "height": 1254
        },
        "image": [
          "https://emmy-catering.vercel.app/logo_emmy.jpg"
        ],
        "telephone": "+6281546884171",
        "priceRange": "$$",
        "currenciesAccepted": "IDR",
        "paymentAccepted": "Cash, Transfer Bank",
        "servesCuisine": ["Indonesian", "Masakan Indonesia", "Catering"],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Jl. Ar. Hakim - Benteng Gg. Cemara No. 17 (belakang Benglap)",
          "addressLocality": "Sukabumi",
          "addressRegion": "Jawa Barat",
          "postalCode": "43111",
          "addressCountry": "ID"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -6.9183,
          "longitude": 106.9273
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
            "closes": "16:00"
          }
        ],
        "sameAs": [
          "https://wa.me/6281546884171",
          "https://www.instagram.com/emmycatering",
          "https://www.tiktok.com/@emmy.catering3",
          "https://www.facebook.com/emmy.rachmawaty.14"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://emmy-catering.vercel.app#website",
        "url": "https://emmy-catering.vercel.app",
        "name": "Emmy Catering",
        "description": "Spesialis Catering Sukabumi & Sekitarnya",
        "publisher": { "@id": "https://emmy-catering.vercel.app#business" },
        "inLanguage": "id-ID"
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
