import type { Metadata } from "next";
import CharacterTextReveal from "./CharacterTextReveal";
import "./globals.css";

export const metadata: Metadata = {
  title: "سُكنى — إقامتك المثالية",
  description: "منصة عربية لاكتشاف وحجز الإقامات المميزة",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <CharacterTextReveal />
        {children}
      </body>
    </html>
  );
}
