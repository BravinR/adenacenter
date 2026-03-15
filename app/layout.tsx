import type { Metadata } from "next";
import "./globals.css";

const APP_URL = process.env.APP_URL ?? "https://adenaoshcenter.com";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Adena OSH Center — Leading The Way To Safer Workplaces",
    template: "%s | Adena OSH Center",
  },
  description:
    "DOSHS recognized medical specialist center providing occupational health and safety services in Mombasa, Kenya. Pre-employment screening, wellness programs, and more.",
  keywords: [
    "occupational health",
    "safety center",
    "DOSHS",
    "Mombasa",
    "Kenya",
    "pre-employment screening",
    "workplace wellness",
    "health surveillance",
  ],
  authors: [{ name: "Adena Occupational Health and Safety Center" }],
  icons: {
    icon: "/icon",
  },
  openGraph: {
    type: "website",
    siteName: "Adena OSH Center",
    title: "Adena OSH Center — Leading The Way To Safer Workplaces",
    description:
      "DOSHS recognized medical specialist center providing occupational health and safety services in Mombasa, Kenya.",
    url: APP_URL,
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    site: "@adenaohscenter",
    creator: "@adenaohscenter",
    title: "Adena OSH Center — Leading The Way To Safer Workplaces",
    description:
      "DOSHS recognized medical specialist center providing occupational health and safety services in Mombasa, Kenya.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
