import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google"
import "./globals.css"

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument-sans",
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
})

const siteDescription =
  "Founding engineer focused on the operational layer of AI products."

export const metadata: Metadata = {
  title: {
    default: "Shubham Mazumder - Personal Archive",
    template: "%s | Shubham Mazumder",
  },
  description: siteDescription,
  keywords: [
    "Shubham Mazumder",
    "Founding Engineer",
    "Production AI Systems",
    "Agentic Systems",
    "AI Infrastructure",
    "Product Engineering",
  ],
  authors: [{ name: "Shubham Mazumder" }],
  creator: "Shubham Mazumder",
  publisher: "Shubham Mazumder",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://shubh.ink"),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Shubham Mazumder",
    description: siteDescription,
    siteName: "Shubham Mazumder",
    images: [
      {
        url: "/icon.svg",
        width: 1200,
        height: 630,
        alt: "Shubham Mazumder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubham Mazumder",
    description: siteDescription,
    images: ["/icon.svg"],
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
