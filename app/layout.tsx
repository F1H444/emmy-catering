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
    default: "GREENLeaf Catering & Dekor | Spesialis Catering Salatiga",
    template: "%s | GREENLeaf Catering & Dekor",
  },
  description:
    "GREENLeaf Catering & Dekor ★ Menyediakan berbagai kebutuhan konsumsi acara Anda: Aneka Paket Nasi, Snack Dus, Prasmanan, Tumpeng, dan Hantaran. Menu menyesuaikan permintaan dan budget. ☎ +6281575757048",
  keywords: [
    "catering salatiga",
    "greenleaf catering",
    "greenleaf catering salatiga",
    "jasa catering salatiga",
    "catering terbaik salatiga",
    "nasi box santap salatiga",
    "paket nasi salatiga",
    "snack dus salatiga",
    "prasmanan salatiga",
    "tumpeng salatiga",
    "hantaran pernikahan salatiga"
  ],
  authors: [{ name: "GREENLeaf Catering & Dekor", url: "https://desty.page/greenleaf_catering_salatiga" }],
  creator: "GREENLeaf Catering & Dekor",
  publisher: "GREENLeaf Catering & Dekor",
  metadataBase: new URL("https://desty.page/greenleaf_catering_salatiga"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.jpg",
    shortcut: "/icon.jpg",
    apple: "/icon.jpg",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://desty.page/greenleaf_catering_salatiga",
    siteName: "GREENLeaf Catering & Dekor",
    title: "GREENLeaf Catering & Dekor | Spesialis Catering Salatiga",
    description:
      "Menyediakan berbagai kebutuhan konsumsi acara Anda di Salatiga. Menu menyesuaikan permintaan dan budget.",
    images: [
      {
        url: "/logo_emmy.jpg",
        width: 1200,
        height: 630,
        alt: "GREENLeaf Catering & Dekor",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GREENLeaf Catering & Dekor | Spesialis Catering Salatiga",
    description:
      "Menyediakan berbagai kebutuhan konsumsi acara Anda di Salatiga. Menu menyesuaikan permintaan dan budget.",
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
        "@id": "https://desty.page/greenleaf_catering_salatiga#business",
        "name": "GREENLeaf Catering & Dekor",
        "alternateName": ["Greenleaf Catering", "Nasi Box Santap"],
        "description": "GREENLeaf Catering & Dekor menyediakan berbagai kebutuhan konsumsi acara anda di Salatiga. Menu bisa menyesuaikan permintaan dan budget.",
        "url": "https://desty.page/greenleaf_catering_salatiga",
        "logo": {
          "@type": "ImageObject",
          "url": "https://desty.page/greenleaf_catering_salatiga/logo.jpg",
          "width": 1080,
          "height": 1080
        },
        "image": [
          "https://desty.page/greenleaf_catering_salatiga/logo.jpg"
        ],
        "telephone": "+6281575757048",
        "priceRange": "$$",
        "currenciesAccepted": "IDR",
        "paymentAccepted": "Cash, Transfer Bank",
        "servesCuisine": ["Indonesian", "Masakan Indonesia"],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Jln.Amarta RT04/01 Randuares Kumpulrejo",
          "addressLocality": "Salatiga",
          "addressRegion": "Jawa Tengah",
          "postalCode": "50734",
          "addressCountry": "ID"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -7.3305,
          "longitude": 110.5084
        },
        "areaServed": [
          { "@type": "City", "name": "Salatiga" },
          { "@type": "AdministrativeArea", "name": "Jawa Tengah" }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
            "opens": "08:00",
            "closes": "21:00"
          }
        ],
        "sameAs": [
          "https://wa.me/c/6281575757048",
          "https://www.tiktok.com/@nasiboxsantap?_t=8pKQfhnfIjn&_r=1",
          "https://desty.page/greenleaf_catering_salatiga"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://desty.page/greenleaf_catering_salatiga#website",
        "url": "https://desty.page/greenleaf_catering_salatiga",
        "name": "GREENLeaf Catering & Dekor",
        "description": "Spesialis Catering Salatiga & Sekitarnya",
        "publisher": { "@id": "https://desty.page/greenleaf_catering_salatiga#business" },
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
