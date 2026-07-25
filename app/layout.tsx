import type { Metadata } from 'next';
import { Playfair_Display, Outfit, Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/navigation/footer';
import { WhatsAppFloatingButton } from '@/components/navigation/whatsapp-floating-button';
import { IntroSplash } from '@/components/ui/intro-splash';
import { WeddingBuilderProvider } from '@/lib/store/wedding-builder-context';
import { SITE } from '@/lib/site-config';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: {
    default: 'SID Events | Premium Event Management Company in Davanagere, Karnataka',
    template: '%s | SID Events',
  },
  description: "Davanagere's #1 event company. Weddings, corporate events, birthdays and more, plus a live custom wedding package builder to plan every detail.",
  keywords: ['Event Management Davanagere', 'Wedding Planner Davanagere', 'Corporate Events Karnataka', 'South Indian Wedding', 'Custom Wedding Builder', 'Maternity Photoshoot Davanagere', 'Naming Ceremony Decoration'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SID Events | Premium Event Management Company in Davanagere, Karnataka',
    description: "Davanagere's #1 event company — weddings, corporate events, birthdays and more.",
    siteName: 'SID Events',
    url: SITE.siteUrl,
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 1200,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SID Events | Premium Event Management Company in Davanagere, Karnataka',
    description: "Davanagere's #1 event company — weddings, corporate events, birthdays and more.",
    images: ['/logo.png'],
  },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EventPlanningBusiness',
  name: SITE.name,
  description: "Davanagere's #1 event management company - weddings, corporate events, birthdays, naming ceremonies, housewarming and maternity photoshoots.",
  url: SITE.siteUrl,
  logo: `${SITE.siteUrl}/logo.png`,
  image: `${SITE.siteUrl}/logo.png`,
  telephone: SITE.phoneDisplay,
  email: SITE.email,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3434/1B1, 1st Main, 6th Cross Road, MCC B Block',
    addressLocality: SITE.city,
    addressRegion: SITE.state,
    postalCode: '577004',
    addressCountry: 'IN',
  },
  areaServed: ['Davanagere', 'Karnataka'],
  foundingDate: String(SITE.foundedYear),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-silk-100 text-maroon-950 min-h-screen flex flex-col selection:bg-gold-400 selection:text-maroon-950">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <WeddingBuilderProvider>
          <IntroSplash />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <WhatsAppFloatingButton />
          <Footer />
        </WeddingBuilderProvider>
      </body>
    </html>
  );
}
