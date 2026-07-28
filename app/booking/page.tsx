'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWeddingBuilder } from '@/lib/store/wedding-builder-context';
import { GlassCard } from '@/components/ui/glass-card';
import { GoldButton } from '@/components/ui/gold-button';
import { ShieldCheck } from 'lucide-react';

export default function BookingPage() {
  const router = useRouter();
  const { state } = useWeddingBuilder();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    weddingDate: '',
    venueCity: 'Davanagere',
    venueAddress: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push(`/request-received?ref=BK-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="text-gold-600 font-semibold text-xs uppercase tracking-widest bg-gold-100 px-3 py-1 rounded-full border border-gold-300">
          Request A Quote
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-maroon-900">
          Send Us Your Event Details
        </h1>
        <p className="text-maroon-700/80 text-sm max-w-xl mx-auto">
          No payment or fixed price here &mdash; share your details and our team will follow up with a custom quote.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Customer Details Form (7 cols) */}
        <div className="lg:col-span-7">
          <GlassCard className="space-y-6">
            <h3 className="font-playfair text-xl font-bold text-maroon-900 border-b border-gold-300 pb-3">
              Event & Customer Contact Information
            </h3>

            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-maroon-900 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aditya Hegde"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-white border border-gold-300 rounded-xl px-4 py-2.5 text-sm text-maroon-900 transition-all duration-200 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-maroon-900 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-gold-300 rounded-xl px-4 py-2.5 text-sm text-maroon-900 transition-all duration-200 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-maroon-900 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="aditya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-gold-300 rounded-xl px-4 py-2.5 text-sm text-maroon-900 transition-all duration-200 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-maroon-900 mb-1">Wedding Date</label>
                  <input
                    type="date"
                    required
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    className="w-full bg-white border border-gold-300 rounded-xl px-4 py-2.5 text-sm text-maroon-900 transition-all duration-200 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-maroon-900 mb-1">Venue City</label>
                  <select
                    value={formData.venueCity}
                    onChange={(e) => setFormData({ ...formData, venueCity: e.target.value })}
                    className="w-full bg-white border border-gold-300 rounded-xl px-4 py-2.5 text-sm text-maroon-900 transition-all duration-200 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30"
                  >
                    <option value="Davanagere">Davanagere</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Mysuru">Mysuru</option>
                    <option value="Hubballi">Hubballi</option>
                    <option value="Chitradurga">Chitradurga</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-maroon-900 mb-1">Venue Address / Hall Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kamana Bhavana, PJ Extension"
                  value={formData.venueAddress}
                  onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                  className="w-full bg-white border border-gold-300 rounded-xl px-4 py-2.5 text-sm text-maroon-900 transition-all duration-200 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-maroon-900 mb-1">Anything Else We Should Know?</label>
                <textarea
                  rows={4}
                  placeholder="Special requests, themes, or questions about your package..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white border border-gold-300 rounded-xl px-4 py-2.5 text-sm text-maroon-900 transition-all duration-200 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30"
                />
              </div>

              <div className="pt-2">
                <GoldButton fullWidth variant="copper" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending Request...' : 'Send Quote Request'}
                </GoldButton>
              </div>
            </form>
          </GlassCard>
        </div>

        {/* Selections Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard variant="dark" className="border-2 border-gold-400 space-y-6">
            <h3 className="font-playfair text-lg font-bold text-gold-300 border-b border-gold-400/40 pb-3">
              Your Custom Package Selections
            </h3>

            <div className="space-y-2 text-xs text-gold-100/90">
              <div className="flex justify-between">
                <span>Decoration Items:</span>
                <span className="font-bold">{Object.keys(state.selectedServices).length} selected</span>
              </div>
              <div className="flex justify-between">
                <span>Catering:</span>
                <span className="font-bold capitalize">{state.catering.packageTier} &middot; {state.catering.guestCount} guests</span>
              </div>
              <div className="flex justify-between">
                <span>Photography:</span>
                <span className="font-bold capitalize">{state.photography.packageTier}</span>
              </div>
              <div className="flex justify-between">
                <span>Bridal Makeup:</span>
                <span className="font-bold capitalize">{state.makeup.packageTier}</span>
              </div>
              <div className="flex justify-between">
                <span>Purohit:</span>
                <span className="font-bold capitalize">{state.purohit.packageTier}</span>
              </div>
              <div className="flex justify-between">
                <span>Dancers & Music:</span>
                <span className="font-bold capitalize">{state.dancers.style.replace('_', ' ')}</span>
              </div>
            </div>

            <div className="bg-maroon-950 p-4 rounded-xl border border-gold-400/30 space-y-2 text-[11px] text-gold-200">
              <div className="flex items-center gap-2 font-bold text-gold-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> No Payment Required
              </div>
              <p>This is a quote request, not a checkout. Our team will reach out with pricing based on what you&apos;ve selected.</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
