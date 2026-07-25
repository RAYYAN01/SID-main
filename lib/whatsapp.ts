import { CustomBuilderState } from './types/wedding';

export function getWhatsAppShareUrl(
  quoteId: string,
  state: CustomBuilderState,
  phone: string = '918095408404'
): string {
  const message = `
 Namaste! I just built a Custom South Indian Wedding Package on *SID Events*.

 *Reference:* #${quoteId}
 *Guest Count:* ${state.catering.guestCount} Guests
 *Catering Package:* ${state.catering.packageTier.toUpperCase()} Sadhya
 *Photography:* ${state.photography.packageTier.toUpperCase()} Tier
 *Purohit:* ${state.purohit.language.toUpperCase()} Vedic Scholar

I would like to get a detailed quote for this package and check wedding date availability. Please guide me with the next steps!
  `.trim();

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
