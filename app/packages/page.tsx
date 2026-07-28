'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Layers, ChevronUp, ChevronDown } from 'lucide-react';
import { GoldButton } from '@/components/ui/gold-button';
import { GlassCard } from '@/components/ui/glass-card';
import { TraditionalBorder } from '@/components/ui/traditional-border';
import { MOCK_STANDARD_PACKAGES } from '@/lib/mock-data';

export default function PackagesPage() {
  const [showComparison, setShowComparison] = useState(false);

  const comparisonMatrix = [
    { feature: 'Guest Capacity', silver: 'Up to 300', gold: 'Up to 600', diamond: 'Up to 1000', royal: '1500+ Guests' },
    { feature: 'Mandapam & Stage Decor', silver: 'Chepparam Fresh Floral', gold: 'Brass Saptapadi Setup', diamond: 'Temple Architectural Stage', royal: 'Bespoke Palace Transformation' },
    { feature: 'Banana Leaf / Sadhya Feast', silver: '28-Item Sadhya', gold: '35-Item Fusion Buffet', diamond: '45-Item Royal Buffet', royal: 'Unlimited Gourmet Live Counters' },
    { feature: 'Photography & Film Crew', silver: '2 Photographers + 1 Album', gold: 'Drone + 2 Karizma Albums', diamond: '6-Member Crew + LED Wall', royal: 'Celebrity Crew + Same-Day Reel' },
    { feature: 'Vedic Purohit Rites', silver: 'Senior Purohit', gold: 'Team + Full Samagri', diamond: 'Senior Scholars + Homa', royal: 'Celebrity Vedic Scholars' },
    { feature: 'Welcome Girls & Staff', silver: '2 Hostesses', gold: '4 Hostesses', diamond: '6 Hostesses + 6 Bouncers', royal: '8 Hostesses + 12 VIP Bouncers' },
    { feature: 'Cultural Entertainment', silver: 'Nadaswaram (2 Hours)', gold: 'Live Chenda Melam', diamond: 'Nadaswaram + Bharatanatyam', royal: 'Fireworks + Royal Doli Entry' },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-gold-600 font-semibold text-xs uppercase tracking-widest bg-gold-100 px-3 py-1 rounded-full border border-gold-300">
          Royal Tier Collections
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-bold text-maroon-900">
          Standard South Indian Packages
        </h1>
        <p className="text-maroon-700/80 text-sm sm:text-base leading-relaxed">
          Select an all-inclusive standard wedding package crafted for traditional elegance, or seamlessly load it into our custom builder to tailor every line item.
        </p>
        <TraditionalBorder />

        <div className="pt-2">
          <GoldButton
            variant="outline"
            size="sm"
            onClick={() => setShowComparison(!showComparison)}
            icon={showComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          >
            {showComparison ? 'Hide Feature Matrix' : 'Compare Package Features'}
          </GoldButton>
        </div>
      </div>

      {/* Feature Comparison Matrix */}
      {showComparison && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.4 }}
          className="bg-ivory border-2 border-gold-400 rounded-3xl p-6 shadow-xl overflow-x-auto"
        >
          <h3 className="font-playfair text-2xl font-bold text-maroon-900 mb-6 text-center">
            Detailed Feature Comparison Matrix
          </h3>
          <table className="w-full text-left text-sm border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b-2 border-gold-400 bg-maroon-800 text-gold-300">
                <th className="p-4 font-bold">Feature Category</th>
                <th className="p-4 font-bold">Silver</th>
                <th className="p-4 font-bold text-gold-400">Gold (Popular)</th>
                <th className="p-4 font-bold">Diamond</th>
                <th className="p-4 font-bold">Royal Samrat</th>
              </tr>
            </thead>
            <tbody>
              {comparisonMatrix.map((row, idx) => (
                <tr key={idx} className="border-b border-gold-200/60 hover:bg-gold-50/60 transition-colors">
                  <td className="p-4 font-bold text-maroon-900">{row.feature}</td>
                  <td className="p-4 text-maroon-800">{row.silver}</td>
                  <td className="p-4 text-maroon-900 font-semibold bg-gold-100/40">{row.gold}</td>
                  <td className="p-4 text-maroon-800">{row.diamond}</td>
                  <td className="p-4 text-maroon-900 font-semibold">{row.royal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Packages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-6 sm:gap-8">
        {MOCK_STANDARD_PACKAGES.map((pkg) => (
          <GlassCard
            key={pkg.id}
            variant={pkg.isPopular ? 'warm' : 'light'}
            className="flex flex-col justify-between space-y-6 relative"
          >
            {pkg.isPopular && (
              <div className="absolute -top-3.5 right-6 bg-maroon-700 text-gold-300 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gold-400">
                Most Popular
              </div>
            )}

            <div>
              <span className="text-xs uppercase font-bold text-gold-600 tracking-wider block mb-1">
                Tier {pkg.tier}
              </span>
              <h3 className="font-playfair text-2xl font-bold text-maroon-900">{pkg.name}</h3>
              <p className="text-xs text-maroon-700/80 mb-4">{pkg.description}</p>

              <div className="bg-maroon-900 text-ivory p-4 rounded-xl mb-6 border border-gold-400/40">
                <span className="text-[11px] text-gold-300 uppercase block font-semibold">Capacity</span>
                <span className="text-2xl font-bold font-outfit text-gold-400">{pkg.guestCapacity} Guests</span>
                <span className="text-[11px] text-gold-200/70 block mt-0.5">Contact us for a custom quote</span>
              </div>

              {pkg.breakdown && (
                <div className="space-y-2 mb-6 text-xs text-maroon-900 bg-gold-50/70 p-4 rounded-xl border border-gold-200">
                  <div className="border-b border-gold-200/60 pb-1 font-bold text-maroon-950 uppercase text-[10px] tracking-wider">
                    Service Breakdown:
                  </div>
                  <div><strong className="text-gold-800 font-semibold">Decoration:</strong> {pkg.breakdown.decoration}</div>
                  <div><strong className="text-gold-800 font-semibold">Catering:</strong> {pkg.breakdown.catering}</div>
                  <div><strong className="text-gold-800 font-semibold">Photography:</strong> {pkg.breakdown.photography}</div>
                  <div><strong className="text-gold-800 font-semibold">Makeup:</strong> {pkg.breakdown.makeup}</div>
                  <div><strong className="text-gold-800 font-semibold">Purohit:</strong> {pkg.breakdown.purohit}</div>
                  <div><strong className="text-gold-800 font-semibold">Entertainment:</strong> {pkg.breakdown.entertainment}</div>
                </div>
              )}

              <h4 className="text-xs font-bold text-maroon-900 uppercase tracking-wider mb-3">
                Key Features Included:
              </h4>
              <ul className="space-y-2.5 text-xs text-maroon-800">
                {pkg.featuredInclusions.map((inc: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-gold-300/40">
              <Link href={`/booking?package=${pkg.id}`}>
                <GoldButton fullWidth variant={pkg.isPopular ? 'copper' : 'dark'} size="sm">
                  Request This Package
                </GoldButton>
              </Link>
              <Link href="/custom-builder">
                <button className="w-full text-center text-xs font-bold text-gold-700 hover:text-maroon-900 py-1 transition-colors">
                  Customize This Package →
                </button>
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
