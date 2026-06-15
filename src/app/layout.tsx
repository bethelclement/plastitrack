import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
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
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
            if (localStorage.ecoMode === 'true') {
              document.documentElement.classList.add('eco-mode');
            }
          } catch (_) {}
        ` }} />
      </head>
      <body
        className={`${outfit.variable} antialiased font-sans min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200`}
      >
        <Navbar />
        <main className="flex-1 bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
