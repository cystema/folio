import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Shubham Mazumder - Founding Product Engineer at Sameday AI",
    template: "%s | Shubham Mazumder"
  },
  description: "Founding Product Engineer building AI CSRs and agentic workflows. Specialized in conversational AI, full-stack development, and research.",
  keywords: [
    "Shubham Mazumder",
    "Founding Product Engineer",
    "AI Engineer",
    "Full Stack Developer",
    "Conversational AI",
    "LangChain",
    "Python",
    "React",
    "Next.js",
    "Sameday AI",
    "Portfolio"
  ],
  authors: [{ name: "Shubham Mazumder" }],
  creator: "Shubham Mazumder",
  publisher: "Shubham Mazumder",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://shubh.ink'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Shubham Mazumder - Founding Product Engineer at Sameday AI',
    description: 'Founding Product Engineer building AI CSRs and agentic workflows. Specialized in conversational AI, full-stack development, and research.',
    siteName: 'Shubham Mazumder Portfolio',
    images: [
      {
        url: '/icon.svg',
        width: 1200,
        height: 630,
        alt: 'Shubham Mazumder - Founding Product Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shubham Mazumder - Founding Product Engineer at Sameday AI',
    description: 'Founding Product Engineer building AI CSRs and agentic workflows. Specialized in conversational AI, full-stack development, and research.',
    images: ['/icon.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
