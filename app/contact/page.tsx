'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { GoldButton } from '@/components/ui/gold-button';
import { TraditionalBorder } from '@/components/ui/traditional-border';
import Image from 'next/image';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import { SITE, getWhatsAppUrl } from '@/lib/site-config';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    fullName: '',
    phone: '',
    weddingDate: '',
    notes: '',
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = `
 Namaste! New Inquiry for *SID Events*.

 *Name:* ${contactData.fullName}
 *Phone:* ${contactData.phone}
 *Event Date:* ${contactData.weddingDate}
 ${contactData.notes ? `*Requirements:* ${contactData.notes}` : ''}
    `.trim();

    const waUrl = `https://wa.me/918858362367?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-gold-600 font-semibold text-xs uppercase tracking-widest bg-gold-100 px-3 py-1 rounded-full border border-gold-300">
          Get In Touch
        </span>
        <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-maroon-900">
          Connect with Our Wedding Consultants
        </h1>
        <p className="text-maroon-700/80 text-base">
          Schedule an in-person consultation at our Davanagere office or send us your event inquiry online.
        </p>
        <TraditionalBorder />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <GlassCard className="space-y-6">
            <h3 className="font-playfair text-xl font-bold text-maroon-900 border-b border-gold-300 pb-3">
              Send an Online Inquiry
            </h3>

            {submitted ? (
              <div className="p-6 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-900 text-center space-y-2">
                <h4 className="font-bold text-lg">Thank You! Inquiry Received.</h4>
                <p className="text-xs">Our wedding concierge will call you within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-maroon-900 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Soundarya & Aditya"
                    value={contactData.fullName}
                    onChange={(e) => setContactData({ ...contactData, fullName: e.target.value })}
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
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      className="w-full bg-white border border-gold-300 rounded-xl px-4 py-2.5 text-sm text-maroon-900 transition-all duration-200 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-maroon-900 mb-1">Expected Wedding Date</label>
                    <input
                      type="date"
                      required
                      value={contactData.weddingDate}
                      onChange={(e) => setContactData({ ...contactData, weddingDate: e.target.value })}
                      className="w-full bg-white border border-gold-300 rounded-xl px-4 py-2.5 text-sm text-maroon-900 transition-all duration-200 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-maroon-900 mb-1">Custom Notes / Requirements</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your venue, guest count, or specific mandapam decor ideas..."
                    value={contactData.notes}
                    onChange={(e) => setContactData({ ...contactData, notes: e.target.value })}
                    className="w-full bg-white border border-gold-300 rounded-xl px-4 py-2.5 text-sm text-maroon-900 transition-all duration-200 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30"
                  ></textarea>
                </div>

                <GoldButton fullWidth variant="copper" icon={<Send className="w-4 h-4" />}>
                  Submit Wedding Inquiry
                </GoldButton>
              </form>
            )}
          </GlassCard>
        </div>

        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative h-56 rounded-3xl overflow-hidden shadow-xl border-4 border-gold-400">
            <Image src="/Sid3.png" alt="SID Events studio storefront in Davanagere" fill className="object-cover" />
          </div>

          <GlassCard variant="dark" className="border-2 border-gold-400 space-y-6">
            <h3 className="font-playfair text-xl font-bold text-gold-300 border-b border-gold-400/40 pb-3">
              Studio Location & Helpline
            </h3>

            <div className="space-y-4 text-xs text-gold-100">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gold-300 block">Davanagere Office</span>
                  <span>{SITE.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-400 shrink-0" />
                <div>
                  <span className="font-bold text-gold-300 block">Event Hotline</span>
                  <a href={SITE.phoneHref} className="hover:underline">{SITE.phoneDisplay}</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-400 shrink-0" />
                <div>
                  <span className="font-bold text-gold-300 block">Email Us</span>
                  <a href={`mailto:${SITE.email}`} className="hover:underline">{SITE.email}</a>
                </div>
              </div>
            </div>

            <TraditionalBorder />

            <a
              href={getWhatsAppUrl('Hi! I would like to book a consultation.')}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <GoldButton fullWidth variant="copper" icon={<MessageCircle className="w-4 h-4" />}>
                Instant WhatsApp Chat
              </GoldButton>
            </a>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
