import { CustomBuilderState } from './types/wedding';

export function getWhatsAppShareUrl(
  quoteId: string,
  state: CustomBuilderState,
  phone: string = '918095408404'
): string {
  const selectedDecorCount = Object.keys(state.selectedServices || {}).length;
  const message = `
 Namaste! I built a Custom Wedding Package on *SID Events*.

 *Quote Reference:* #${quoteId}
 *Guest Count:* ${state.catering?.guestCount || 500} Guests
 *Catering:* ${(state.catering?.packageTier || 'standard').toUpperCase()} Sadhya
 *Photography:* ${(state.photography?.packageTier || 'standard').toUpperCase()} Tier
 *Bridal Makeup:* ${(state.makeup?.packageTier || 'standard').toUpperCase()} Tier
 *Vedic Purohit:* ${(state.purohit?.language || 'kannada').toUpperCase()} Scholar
 *Dancers/Music:* ${(state.dancers?.style || 'chenda_melam').replace('_', ' ').toUpperCase()}
 *Selected Decor Items:* ${selectedDecorCount} Services

I would like to receive a detailed quote for this package and check date availability. Please guide me with the next steps!
  `.trim();

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppBookingRequestUrl(
  formData: {
    fullName: string;
    phone: string;
    email: string;
    weddingDate: string;
    venueCity: string;
    venueAddress: string;
    notes?: string;
  },
  state: CustomBuilderState,
  refCode: string,
  phone: string = '918095408404'
): string {
  const selectedDecorCount = Object.keys(state.selectedServices || {}).length;
  const message = `
 Namaste! New Custom Quote Request for *SID Events*.

 *Reference Code:* #${refCode}
 *Customer Name:* ${formData.fullName}
 *Contact Phone:* ${formData.phone}
 *Email Address:* ${formData.email}
 *Event Date:* ${formData.weddingDate}
 *Venue City:* ${formData.venueCity}
 *Venue Address:* ${formData.venueAddress}
 ${formData.notes ? `*Special Notes:* ${formData.notes}\n` : ''}
 --- *Package Selections Breakdown* ---
 *Guest Capacity:* ${state.catering?.guestCount || 500} Guests
 *Catering Feast:* ${(state.catering?.packageTier || 'standard').toUpperCase()} Sadhya
 *Photography Coverage:* ${(state.photography?.packageTier || 'standard').toUpperCase()} Tier
 *Bridal Styling & Makeup:* ${(state.makeup?.packageTier || 'standard').toUpperCase()} Tier
 *Purohit & Samagri:* ${(state.purohit?.packageTier || 'standard').toUpperCase()} (${(state.purohit?.language || 'kannada').toUpperCase()})
 *Cultural Performance:* ${(state.dancers?.style || 'chenda_melam').replace('_', ' ').toUpperCase()}
 *Custom Decor Selections:* ${selectedDecorCount} items chosen

Please send me the customized price quotation and confirm date availability!
  `.trim();

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
