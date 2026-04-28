import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://plastitrackbes.vercel.app'),
  title: "PlastiTrackBES - Clean Plastic Recovery & Upcycling",
  description: "A community plastic recovery system built in Abuja. We run women led collection hubs, track plastic recovery with public data, and convert waste into durable products.",
  openGraph: {
    type: "website",
    url: "https://plastitrack.vercel.app",
    title: "PlastiTrackBES - Clean Plastic Recovery & Upcycling",
    description: "A community plastic recovery system built in Abuja. We run women led collection hubs, track plastic recovery with public data, and convert waste into durable products.",
    siteName: "PlastiTrackBES",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "PlastiTrackBES Logo"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PlastiTrackBES - Clean Plastic Recovery & Upcycling",
    description: "A community plastic recovery system built in Abuja. We run women led collection hubs, track plastic recovery with public data, and convert waste into durable products.",
    images: ["/og-image.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 bg-gray-50">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
