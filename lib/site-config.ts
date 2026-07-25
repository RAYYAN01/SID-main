export const SITE = {
  name: 'SID Events',
  legalName: 'SID Events',
  tagline: "Davanagere's #1 Event Company",
  foundedYear: 2014,
  city: 'Davanagere',
  state: 'Karnataka',
  address: '3434/1B1, 1st Main, 6th Cross Road, MCC B Block, Davanagere, Karnataka 577004',
  phoneDisplay: '+91 80954 08404',
  phoneHref: 'tel:+918095408404',
  whatsappNumber: '918095408404',
  email: 'sideventsdvg@gmail.com',
  googleRating: '4.9/5',
  // IMPORTANT: replace with the real production domain before/at deploy time.
  // Used for the sitemap, robots.txt, canonical/OG metadata and JSON-LD.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
} as const;

export const SITE_STATS = [
  { label: 'EVENTS MANAGED', value: '500+' },
  { label: 'YEARS EXPERIENCE', value: '10+' },
  { label: 'HAPPY CLIENTS', value: '100+' },
  { label: 'GOOGLE RATING', value: '4.9/5' },
] as const;

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
