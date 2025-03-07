import "@/app/globals.css" 
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import Banner from "@/components/banner"
import StructuredData from "@/components/structured-data"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://your-site.com'),
  title: {
    default: 'Biggest Alpha - Tech Repair & Accessories',
    template: '%s | Biggest Alpha'
  },
  description: 'Professional device repair and premium tech accessories in Lagos, Nigeria.',
  keywords: ['phone repair', 'laptop repair', 'tech accessories', 'Lagos'],
  authors: [{ name: "Biggest Alpha" }],
  creator: "Biggest Alpha",
  publisher: "Biggest Alpha",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "BIGGEST ALPHA",
    description: "WE'LL TAKE CARE OF YOU AND YOUR GADGETS",
    url: "https://techfixpro.com",
    siteName: "BIGGEST ALPHA",
    images: [
      {
        url: "https://techfixpro.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BIGGEST ALPHA",
    description: "WE'LL TAKE CARE OF YOU AND YOUR GADGETS",
    images: ["https://techfixpro.com/twitter-image.jpg"],
    creator: "@techfixpro",
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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png' },
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export const dynamic = 'force-static'
export const revalidate = 3600

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Biggest Alpha",
            description: "Professional gadget repair services",
            url: "https://BiggestAlpha.com",
            telephone: "+1-555-123-4567",
            address: {
              "@type": "PostalAddress",
              streetAddress: "3,9 Olu Koleosho Street, Off Simbiat Abiola Way, Ikeja",
              addressLocality: "Lagos",
              addressRegion: "NIGERIA",
              postalCode: "101233",
              addressCountry: "NG",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 37.7749,
              longitude: -122.4194,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "10:00",
                closes: "16:00",
              },
            ],
            sameAs: [
              "https://www.facebook.com/techfixpro",
              "https://twitter.com/techfixpro",
              "https://www.instagram.com/techfixpro",
            ],
          }}
        />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <Banner />
        {children}
      </body>
    </html>
  )
}



import './globals.css'