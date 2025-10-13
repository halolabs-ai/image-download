import type React from "react"
import type { Metadata } from "next"
import Script from "next/script" // <-- import Script here
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Hola Lab Art | Free Stock Images & High-Quality Image Downloads",
  description:
    "Discover thousands of free, high-quality stock images at Hola Lab Art. Download stunning photos, illustrations, and digital art for personal or commercial use.",
  keywords: [
    "free images",
    "free stock photos",
    "free image download",
    "royalty-free photos",
    "HD pictures",
    "creative images",
    "Hola Lab Art",
    "stock images",
    "free art downloads",
    "digital art",
    "commercial use images",
  ],
  generator: "v0.app",
  icons: {
    icon: "/hola-labs-logo.png",
    shortcut: "/hola-labs-logo.png",
    apple: "/hola-labs-logo.png",
  },
  openGraph: {
    title: "Hola Lab Art | Free Stock Images & High-Quality Image Downloads",
    description:
      "Discover thousands of free, high-quality stock images at Hola Lab Art. Download stunning photos, illustrations, and digital art for personal or commercial use.",
    url: "https://holalabs.art/",
    siteName: "Hola Lab Art",
    images: [
      {
        url: "/hola-labs-logo.png",
        width: 1200,
        height: 630,
        alt: "Hola Lab Art - Free Stock Images",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hola Lab Art | Free Stock Images & High-Quality Image Downloads",
    description:
      "Discover thousands of free, high-quality stock images at Hola Lab Art. Download stunning photos, illustrations, and digital art for personal or commercial use.",
    images: ["/hola-labs-logo.png"],
    creator: "@hola_lab_art",
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
        {/* ✅ Adsterra Popunder */}
        <Script
          strategy="beforeInteractive"
          src="//convictiontrialpromptly.com/e6/20/d0/e620d01a5d7b30b6156b3ec43f32e78d.js"
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
        {/* ✅ Adsterra Social Bar */}
        <Script
          strategy="afterInteractive"
          src="//pl27434727.effectivegatecpm.com/9b/38/bd/9b38bdf9225a49931dc88949465134fe.js"
        />

        {/* ✅ Adsterra Native Banner */}
        <div id="container-1ece01a69a59eef2233403d85001ab28"></div>
        <Script
          async
          data-cfasync="false"
          src="//pl27434699.effectivegatecpm.com/1ece01a69a59eef2233403d85001ab28/invoke.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
