'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Plane, Briefcase, Cake, Gem, Baby, Home, Palette, Camera, ArrowRight } from 'lucide-react';
import { TraditionalBorder } from '@/components/ui/traditional-border';
import { GoldButton } from '@/components/ui/gold-button';
import { BUSINESS_OFFERINGS, BusinessOffering } from '@/lib/mock-data';
import { getWhatsAppUrl } from '@/lib/site-config';

const ICONS: Record<BusinessOffering['iconKey'], React.ReactNode> = {
  heart: <Heart className="w-6 h-6" />,
  plane: <Plane className="w-6 h-6" />,
  briefcase: <Briefcase className="w-6 h-6" />,
  cake: <Cake className="w-6 h-6" />,
  gem: <Gem className="w-6 h-6" />,
  baby: <Baby className="w-6 h-6" />,
  home: <Home className="w-6 h-6" />,
  palette: <Palette className="w-6 h-6" />,
  camera: <Camera className="w-6 h-6" />,
};

export default function ServicesPage() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-gold-600 font-semibold text-xs uppercase tracking-widest bg-gold-100 px-3 py-1 rounded-full border border-gold-300">
          What We Do
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-bold text-maroon-900">
          Our Services
        </h1>
        <p className="text-maroon-700/80 text-sm sm:text-base">
          From weddings to corporate events, we plan and run every occasion end to end.
        </p>
        <TraditionalBorder />
      </div>

      <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-gold-400">
        <Image src="/Sid1.png" alt="Dream. Plan. Create. Celebrate. - the SID Events planning desk" fill className="object-cover" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8">
        {BUSINESS_OFFERINGS.map((offering) => (
          <div
            key={offering.id}
            className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative h-48 w-full">
              <Image src={offering.imageUrl} alt={offering.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/20 via-transparent to-transparent" />
            </div>
            <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-playfair text-lg font-bold text-maroon-900">{offering.title}</h3>
                <p className="text-xs text-maroon-700/80 leading-relaxed mt-1">{offering.description}</p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-700 hover:text-maroon-900 mt-4">
                Enquire About This <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-maroon-950 rounded-3xl p-10 text-center space-y-5 border border-gold-400/30">
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-silk-50">
          Planning a wedding specifically? Try our live package builder.
        </h2>
        <p className="text-sm text-gold-100/80 max-w-xl mx-auto">
          Build a custom South Indian wedding package step by step and request a detailed quote from our team.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link href="/custom-builder">
            <GoldButton variant="gold" size="md">Build Your Wedding Package</GoldButton>
          </Link>
          <a href={getWhatsAppUrl('Hi! I would like to enquire about your services.')} target="_blank" rel="noopener noreferrer">
            <GoldButton variant="dark" size="md">Chat on WhatsApp</GoldButton>
          </a>
        </div>
      </div>
    </div>
  );
}
