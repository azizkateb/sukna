import type { Metadata, Viewport } from "next";
import CharacterTextReveal from "./CharacterTextReveal";
import "./globals.css";

const siteUrl = "https://www.sukna.shop";
const siteName = "سُكنى";
const homeDescription =
  "اكتشف إقامات مختارة للإيجار اليومي في الرياض وجدة ومكة والطائف، وتواصل مباشرة لحجز الشقق والاستديوهات والشاليهات والأكواخ.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "سُكنى | إقامات مختارة في السعودية",
    template: "%s | سُكنى",
  },
  description: homeDescription,
  applicationName: siteName,
  keywords: [
    "سكنى",
    "إيجار يومي السعودية",
    "شقق للإيجار اليومي",
    "شقق الرياض",
    "شاليهات جدة",
    "استديوهات مكة",
    "أكواخ الطائف",
    "إقامات قصيرة",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: siteUrl,
    siteName,
    title: "سُكنى | إقامات مختارة في السعودية",
    description: homeDescription,
    images: [
      {
        url: "/images/riyadh-hero-4k.jpg",
        width: 3840,
        height: 2160,
        alt: "إقامات سُكنى المختارة في السعودية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "سُكنى | إقامات مختارة في السعودية",
    description: homeDescription,
    images: ["/images/riyadh-hero-4k.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo.png",
  },
  category: "travel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f2035",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: siteName,
  alternateName: "Sukna",
  description: homeDescription,
  inLanguage: "ar-SA",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <CharacterTextReveal />
        {children}
      </body>
    </html>
  );
}
