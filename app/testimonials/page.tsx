'use client';

import React from 'react';
import { MOCK_TESTIMONIALS } from '@/lib/mock-data';
import { GlassCard } from '@/components/ui/glass-card';
import { TraditionalBorder } from '@/components/ui/traditional-border';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

function getInitials(name: string): string {
  if (!name) return 'S';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function TestimonialsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-gold-600 font-semibold text-xs uppercase tracking-widest bg-gold-100 px-3 py-1 rounded-full border border-gold-300">
          Verified Google Reviews
        </span>
        <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-maroon-900">
          What Families Told Us Afterward
        </h1>
        <p className="text-maroon-700/80 text-base">
          Authentic client feedback and reviews from Google for SID Events.
        </p>
        <TraditionalBorder />
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_TESTIMONIALS.map((t) => (
          <GlassCard key={t.id} variant="warm" className="flex flex-col justify-between space-y-6 relative p-8">
            <Quote className="absolute top-4 right-4 w-10 h-10 text-gold-400/30" />
            
            <div className="space-y-4">
              <div className="flex gap-1 text-gold-500">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-maroon-900 italic leading-relaxed font-sans">
                &ldquo;{t.comment}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3.5 pt-4 border-t border-gold-300">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-maroon-800 to-maroon-950 text-gold-300 font-bold font-playfair flex items-center justify-center border-2 border-gold-400/60 shadow-md text-sm shrink-0 uppercase">
                {getInitials(t.coupleNames)}
              </div>
              <div>
                <h4 className="font-playfair text-base font-bold text-maroon-900">{t.coupleNames}</h4>
                <p className="text-xs text-maroon-700">{t.location}</p>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold mt-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Verified Google Review
                </span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
