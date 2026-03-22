import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { CategoryNav } from "@/components/CategoryNav";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { PageTracker } from "@/components/PageTracker";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Baixar Fontes Grátis | BaixarFontes.com",
    template: "%s | BaixarFontes",
  },
  description:
    "Baixe mais de 98.000 fontes tipográficas grátis. Fontes para design, logos, web e muito mais. Script, fantasia, gótico, tecno e muitas outras categorias.",
  metadataBase: new URL("https://baixarfontes.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "BaixarFontes",
    title: "Baixar Fontes Grátis | BaixarFontes.com",
    description:
      "Baixe mais de 98.000 fontes tipográficas grátis. Fontes para design, logos, web e muito mais.",
    url: "https://baixarfontes.com",
  },
  verification: {
    google: "eQWtHUYn1U2c5h7TXZBmddh9d2q8PnCNeMO62KKbC68",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <Header />
        <CategoryNav />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CookieConsent />
        <PageTracker />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
