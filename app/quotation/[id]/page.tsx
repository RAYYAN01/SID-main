'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Download, Share2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useWeddingBuilder } from '@/lib/store/wedding-builder-context';
import { GoldButton } from '@/components/ui/gold-button';
import { GlassCard } from '@/components/ui/glass-card';
import { TraditionalBorder } from '@/components/ui/traditional-border';
import { BrandMark } from '@/components/ui/brand-mark';
import { downloadQuotationPDF } from '@/lib/pdf-generator';
import { getWhatsAppShareUrl } from '@/lib/whatsapp';

export default function QuotationViewPage() {
  const params = useParams();
  const quoteId = (params?.id as string) || 'SID-2026-992';
  const { state } = useWeddingBuilder();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <Link href="/custom-builder" className="inline-flex items-center gap-2 text-xs font-bold text-maroon-700 hover:text-gold-600">
          <ArrowLeft className="w-4 h-4" /> Back to Custom Builder
        </Link>

        <div className="flex items-center gap-3">
          <GoldButton
            variant="copper"
            size="sm"
            onClick={() => downloadQuotationPDF(quoteId, state)}
            icon={<Download className="w-4 h-4" />}
          >
            Download PDF
          </GoldButton>

          <a href={getWhatsAppShareUrl(quoteId, state)} target="_blank" rel="noopener noreferrer">
            <GoldButton variant="dark" size="sm" icon={<Share2 className="w-4 h-4" />}>
              WhatsApp Share
            </GoldButton>
          </a>
        </div>
      </div>

      {/* Main Summary Sheet Card */}
      <GlassCard variant="warm" className="p-8 md:p-12 space-y-8 border-2 border-gold-400 shadow-2xl">

        {/* Header Branding */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-gold-400 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <BrandMark className="w-14 h-14" />
              <h1 className="font-playfair text-3xl font-bold text-maroon-900 tracking-wider">
                SID EVENTS
              </h1>
            </div>
            <p className="text-xs text-maroon-700 font-semibold mt-1">
              South Indian Wedding Package Summary
            </p>
          </div>

          <div className="text-left sm:text-right text-xs text-maroon-800 space-y-1">
            <div className="font-bold text-sm text-maroon-900">Reference #: {quoteId}</div>
            <div>Date: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
          </div>
        </div>

        {/* Selected Services Breakdown Table */}
        <div className="space-y-4">
          <h3 className="font-playfair text-xl font-bold text-maroon-900 border-b border-gold-300 pb-2">
            Selected Wedding Services & Inclusions
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-maroon-800 text-gold-300 font-bold border-b border-gold-400">
                  <th className="p-3">Category</th>
                  <th className="p-3">Service Inclusions & Specifications</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-200">
                <tr>
                  <td className="p-3 font-bold text-maroon-900">Mandapam & Decor</td>
                  <td className="p-3 text-maroon-800">{Object.keys(state.selectedServices || {}).length} item(s) selected</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-maroon-900">Catering</td>
                  <td className="p-3 text-maroon-800">{state.catering?.guestCount || 500} Guests - {(state.catering?.packageTier || 'standard').toUpperCase()} Sadhya ({(state.catering?.meals || []).join(', ')})</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-maroon-900">Photography & Film</td>
                  <td className="p-3 text-maroon-800">{(state.photography?.packageTier || 'standard').toUpperCase()} Tier ({(state.photography?.albumType || 'karizma')} Album)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-maroon-900">Bridal Makeup</td>
                  <td className="p-3 text-maroon-800">{(state.makeup?.packageTier || 'standard').toUpperCase()} Airbrush HD ({(state.makeup?.familyCount || 0)} Family)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-maroon-900">Purohit</td>
                  <td className="p-3 text-maroon-800">{(state.purohit?.language || 'kannada').toUpperCase()} Scholars {state.purohit?.homaRequired ? '+ Full Homa Samagri' : ''}</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-maroon-900">Security & Hostesses</td>
                  <td className="p-3 text-maroon-800">{(state.security?.maleBouncers || 0) + (state.security?.femaleBouncers || 0)} Bouncers + {state.welcomeGirls?.count || 0} Hostesses</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-maroon-900">Dancers & Music</td>
                  <td className="p-3 text-maroon-800">{(state.dancers?.style || 'dollu_kunitha').replace('_', ' ').toUpperCase()} Troupe ({state.dancers?.durationHours || 2} hrs)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* No Pricing Note */}
        <div className="bg-maroon-900 text-ivory p-6 rounded-2xl border-2 border-gold-400 text-center space-y-1">
          <p className="text-sm font-bold text-gold-300">No Fixed Pricing Shown</p>
          <p className="text-xs text-gold-100/80">
            Request a quote and our team will follow up with pricing based on your selections.
          </p>
        </div>

        <TraditionalBorder />

        {/* Bottom CTA */}
        <div className="text-center space-y-4">
          <p className="text-xs text-maroon-700">Ready to move forward? Send us your details and we&apos;ll get back with a custom quote.</p>
          <Link href="/booking">
            <GoldButton variant="copper" size="lg" icon={<CheckCircle2 className="w-5 h-5" />}>
              Request A Quote
            </GoldButton>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
