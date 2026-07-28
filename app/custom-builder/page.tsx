'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  Plus,
  Minus,
  Save,
  Download,
  Share2,
  Users,
  Shield,
  Utensils,
  Camera,
  HeartHandshake,
  Music,
  UserCheck,
  CheckCircle,
} from 'lucide-react';
import { useWeddingBuilder } from '@/lib/store/wedding-builder-context';
import { MOCK_SERVICES } from '@/lib/mock-data';
import { GoldButton } from '@/components/ui/gold-button';
import { GlassCard } from '@/components/ui/glass-card';
import { TraditionalBorder } from '@/components/ui/traditional-border';
import { downloadQuotationPDF } from '@/lib/pdf-generator';
import { getWhatsAppShareUrl } from '@/lib/whatsapp';

export default function CustomBuilderPage() {
  const {
    state,
    setStep,
    nextStep,
    prevStep,
    toggleService,
    updateServiceQuantity,
    updateCatering,
    updatePhotography,
    updateMakeup,
    updatePurohit,
    updateSecurity,
    updateWelcomeGirls,
    updateDancers,
    saveDraft,
  } = useWeddingBuilder();

  const [activeDecorSubCat, setActiveDecorSubCat] = useState<string>('all');
  const [customDecorNotes, setCustomDecorNotes] = useState<string>('');

  const stepsList = [
    { num: 1, title: 'Decoration', icon: <Sparkles className="w-4 h-4" /> },
    { num: 2, title: 'Food & Catering', icon: <Utensils className="w-4 h-4" /> },
    { num: 3, title: 'Photography', icon: <Camera className="w-4 h-4" /> },
    { num: 4, title: 'Bridal Makeup', icon: <HeartHandshake className="w-4 h-4" /> },
    { num: 5, title: 'Purohit & Rites', icon: <UserCheck className="w-4 h-4" /> },
    { num: 6, title: 'Security Staff', icon: <Shield className="w-4 h-4" /> },
    { num: 7, title: 'Welcome Hostesses', icon: <Users className="w-4 h-4" /> },
    { num: 8, title: 'Dancers & Music', icon: <Music className="w-4 h-4" /> },
    { num: 9, title: 'Review & Quote', icon: <CheckCircle className="w-4 h-4" /> },
  ];

  const decorationServices = MOCK_SERVICES.filter((s) => {
    if (s.category !== 'decoration') return false;
    if (activeDecorSubCat === 'all') return true;
    return s.subCategory === activeDecorSubCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Wizard Header */}
      <div className="text-center space-y-3">
        <span className="text-gold-600 font-semibold text-xs uppercase tracking-widest bg-gold-100 px-3 py-1 rounded-full border border-gold-300">
          Interactive Custom Wedding Builder
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-maroon-900">
          Craft Your Bespoke Wedding Package
        </h1>
        <p className="text-maroon-700/80 text-sm max-w-2xl mx-auto">
          Customize every traditional element step-by-step, then request a detailed quote from our team &mdash; no fixed prices, just what fits your wedding.
        </p>
      </div>

      {/* Stepper Tabs Bar */}
      <div className="overflow-x-auto pb-4 scrollbar-thin">
        <div className="flex items-center gap-2 min-w-[880px] justify-between border-b border-gold-300/40 pb-4 px-1">
          {stepsList.map((st) => {
            const isActive = state.currentStep === st.num;
            const isCompleted = state.currentStep > st.num;
            return (
              <button
                key={st.num}
                onClick={() => setStep(st.num)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-maroon-800 text-gold-300 shadow-md border border-gold-400'
                    : isCompleted
                    ? 'bg-gold-100 text-maroon-900 border border-gold-300'
                    : 'bg-ivory text-maroon-700 hover:bg-gold-50'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                    isActive
                      ? 'bg-gold-400 text-maroon-950 font-bold'
                      : isCompleted
                      ? 'bg-maroon-700 text-ivory'
                      : 'bg-gold-200 text-maroon-800'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : st.num}
                </div>
                <span>{st.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Wizard Layout with Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Wizard Step Body (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: DECORATION */}
            {state.currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="border-b border-gold-300/40 pb-4">
                  <h2 className="font-playfair text-2xl font-bold text-maroon-900">
                    Step 1: Mandapam & Stage Decoration
                  </h2>
                  <p className="text-xs text-maroon-700/80">
                    Select authentic South Indian floral, home functions, hall decor, garlands, traditional & entertainment services.
                  </p>
                </div>

                {/* Subcategory Pills */}
                <div className="flex flex-wrap gap-2 pb-2">
                  {[
                    { id: 'all', label: 'All Items' },
                    { id: 'home_functions', label: 'Home Functions' },
                    { id: 'wedding_hall', label: 'Wedding Hall' },
                    { id: 'floral_items', label: 'Floral Items' },
                    { id: 'traditional_services', label: 'Traditional Services' },
                    { id: 'entertainment', label: 'Entertainment' },
                    { id: 'other_reqs', label: 'Other Requirements' },
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setActiveDecorSubCat(sub.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                        activeDecorSubCat === sub.id
                          ? 'bg-maroon-800 text-gold-300 border-gold-400 shadow-sm'
                          : 'bg-white text-maroon-900 border-gold-300 hover:bg-gold-50'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>

                {activeDecorSubCat === 'other_reqs' ? (
                  <GlassCard className="space-y-4">
                    <h3 className="font-playfair text-lg font-bold text-maroon-900">
                      Other Special Decoration Requirements
                    </h3>
                    <p className="text-xs text-maroon-700">
                      Specify any custom floral themes, specific flower preferences (e.g. Jasmine, Marigold, Lotus), custom entrance themes, or venue dimensions.
                    </p>
                    <textarea
                      rows={5}
                      value={customDecorNotes}
                      onChange={(e) => setCustomDecorNotes(e.target.value)}
                      placeholder="e.g. Requesting 50 ft marigold canopy for home entrance and fresh white lotus urli setup at venue entrance..."
                      className="w-full bg-white text-maroon-950 text-xs p-4 rounded-xl border border-gold-300 transition-all duration-200 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30"
                    />
                    <div className="flex justify-end">
                      <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                        Saved to your custom quotation package
                      </span>
                    </div>
                  </GlassCard>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {decorationServices.map((svc) => {
                      const selected = state.selectedServices[svc.id];
                      const qty = selected?.quantity || 0;
                      return (
                        <GlassCard
                          key={svc.id}
                          variant={qty > 0 ? 'warm' : 'light'}
                          className="flex flex-col justify-between space-y-4"
                        >
                          <div className="relative h-44 rounded-xl overflow-hidden mb-2">
                            <Image src={svc.imageUrl} alt={svc.name} fill className="object-cover" />
                            {svc.popular && (
                              <span className="absolute top-2 right-2 bg-maroon-800 text-gold-300 text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-gold-400">
                                Popular
                              </span>
                            )}
                          </div>

                          <div>
                            <h3 className="font-playfair text-lg font-bold text-maroon-900">{svc.name}</h3>
                            <p className="text-xs text-maroon-700/80 mb-3">{svc.description}</p>
                          </div>

                          <div className="pt-2 flex items-center justify-between border-t border-gold-200">
                            {qty > 0 ? (
                              <div className="flex items-center gap-3 bg-maroon-800 text-gold-300 px-3 py-1.5 rounded-xl border border-gold-400">
                                <button
                                  onClick={() => updateServiceQuantity(svc.id, qty - 1)}
                                  className="p-1 hover:text-gold-100"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-bold text-sm">{qty}</span>
                                <button
                                  onClick={() => updateServiceQuantity(svc.id, qty + 1)}
                                  className="p-1 hover:text-gold-100"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <GoldButton size="sm" variant="dark" onClick={() => toggleService(svc.id, 1)}>
                                Add to Package
                              </GoldButton>
                            )}
                          </div>
                        </GlassCard>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 2: FOOD PLANNING */}
            {state.currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="border-b border-gold-300/40 pb-4">
                  <h2 className="font-playfair text-2xl font-bold text-maroon-900">
                    Step 2: Royal Catering & Food Planning
                  </h2>
                  <p className="text-xs text-maroon-700/80">
                    Configure guest capacity, meal menus, Sadhya tier & live counters.
                  </p>
                </div>

                <GlassCard className="space-y-6">
                  {/* Guest Count Slider */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="font-bold text-maroon-900 text-sm">Guest Capacity Count</label>
                      <span className="text-2xl font-bold text-maroon-900 font-outfit bg-gold-100 px-4 py-1 rounded-xl border border-gold-300">
                        {state.catering.guestCount} Guests
                      </span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="2500"
                      step="50"
                      value={state.catering.guestCount}
                      onChange={(e) => updateCatering({ guestCount: parseInt(e.target.value) })}
                      className="w-full accent-gold-500 cursor-pointer h-2 bg-gold-200 rounded-lg"
                    />
                    <div className="flex justify-between text-[11px] text-maroon-700 font-medium">
                      <span>100 Intimate</span>
                      <span>500 Standard</span>
                      <span>1000 Grand</span>
                      <span>2500 Royal Palace</span>
                    </div>
                  </div>

                  <TraditionalBorder />

                  {/* Cuisine Type */}
                  <div className="space-y-3">
                    <label className="font-bold text-maroon-900 text-sm block">Cuisine Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'veg', label: 'Pure Veg' },
                        { id: 'non_veg', label: 'Non-Veg' },
                        { id: 'multi_cuisine', label: 'Multi-Cuisine' },
                      ].map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => updateCatering({ cuisine: c.id as 'veg' | 'non_veg' | 'multi_cuisine' })}
                          className={`py-2.5 rounded-xl font-bold text-xs border transition-all ${
                            state.catering.cuisine === c.id
                              ? 'bg-maroon-800 text-gold-300 border-gold-400'
                              : 'bg-white text-maroon-900 border-gold-300'
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Feast Tier */}
                  <div className="space-y-3">
                    <label className="font-bold text-maroon-900 text-sm block">Select Catering Tier</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { id: 'standard', name: 'Banana Leaf Sadhya', desc: '28 Traditional Items' },
                        { id: 'silver', name: 'Silver Grand Sadhya', desc: '35 Items + Live Dosa Counter' },
                        { id: 'gold', name: 'Gold Royal Fusion Buffet', desc: '45 Items + Tandoor & Dessert Bar' },
                        { id: 'premium', name: 'Premium Samrat Feast', desc: '55 Items + Live Chat & Pizza Counters' },
                      ].map((t) => (
                        <div
                          key={t.id}
                          onClick={() => updateCatering({ packageTier: t.id as 'standard' | 'silver' | 'gold' | 'premium' })}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            state.catering.packageTier === t.id
                              ? 'bg-maroon-800 text-ivory border-gold-400 shadow-md'
                              : 'bg-white text-maroon-900 border-gold-200 hover:border-gold-400'
                          }`}
                        >
                          <h4 className="font-bold text-sm">{t.name}</h4>
                          <p className="text-xs text-gold-300 mt-1">{t.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Meals Included */}
                  <div className="space-y-3">
                    <label className="font-bold text-maroon-900 text-sm block">Meals Included in Package</label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { id: 'breakfast', label: 'Breakfast (Idli, Vada, Kesari Bath)' },
                        { id: 'lunch', label: 'Grand Muhurtham Lunch Sadhya' },
                        { id: 'dinner', label: 'Reception Buffet Dinner' },
                        { id: 'snacks', label: 'High Tea & Evening Snacks' },
                      ].map((m) => {
                        const isChecked = state.catering.meals.includes(m.id as 'breakfast' | 'lunch' | 'dinner' | 'snacks');
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => {
                              const meals = isChecked
                                ? state.catering.meals.filter((item) => item !== m.id)
                                : [...state.catering.meals, m.id as 'breakfast' | 'lunch' | 'dinner' | 'snacks'];
                              updateCatering({ meals });
                            }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                              isChecked
                                ? 'bg-gold-400 text-maroon-950 border-gold-500 shadow-sm'
                                : 'bg-white text-maroon-800 border-gold-300'
                            }`}
                          >
                            {isChecked ? '✓ ' : '+ '} {m.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* STEP 3: PHOTOGRAPHY */}
            {state.currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="border-b border-gold-300/40 pb-4">
                  <h2 className="font-playfair text-2xl font-bold text-maroon-900">
                    Step 3: Cinematic Photography & Videography
                  </h2>
                  <p className="text-xs text-maroon-700/80">
                    Select photo tiers, 4K drone shoots, LED screens & Karizma album upgrades.
                  </p>
                </div>

                <GlassCard className="space-y-6">
                  {/* Photo Tiers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { id: 'standard', name: 'Standard Photo & Video', desc: '2 Photographers + HD Video' },
                      { id: 'silver', name: 'Silver Candid Coverage', desc: '2 Candid + 1 Traditional + Album' },
                      { id: 'gold', name: 'Gold Candid & 4K Film', desc: '2 Candid + 2 Traditional + Teaser Reel' },
                      { id: 'diamond', name: 'Diamond Sovereign Cinema', desc: '6-Member Crew + Same-day Trailer' },
                    ].map((pt) => (
                      <div
                        key={pt.id}
                        onClick={() => updatePhotography({ packageTier: pt.id as 'standard' | 'silver' | 'gold' | 'diamond' })}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          state.photography.packageTier === pt.id
                            ? 'bg-maroon-800 text-ivory border-gold-400 shadow-md'
                            : 'bg-white text-maroon-900 border-gold-200 hover:border-gold-400'
                        }`}
                      >
                        <h4 className="font-bold text-sm">{pt.name}</h4>
                        <p className="text-xs text-gold-300 mt-1">{pt.desc}</p>
                      </div>
                    ))}
                  </div>

                  <TraditionalBorder />

                  {/* Add-ons */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-maroon-900 text-sm">Coverage Add-ons & Albums</h4>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <label className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gold-300 cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={state.photography.includeDrone}
                          onChange={(e) => updatePhotography({ includeDrone: e.target.checked })}
                          className="accent-gold-500 w-5 h-5"
                        />
                        <div>
                          <span className="font-bold text-xs text-maroon-900 block">4K Drone Aerial Coverage</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gold-300 cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={state.photography.includeLedWall}
                          onChange={(e) => updatePhotography({ includeLedWall: e.target.checked })}
                          className="accent-gold-500 w-5 h-5"
                        />
                        <div>
                          <span className="font-bold text-xs text-maroon-900 block">Live LED Screen Stage Backdrop</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* STEP 4: BRIDAL MAKEUP */}
            {state.currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="border-b border-gold-300/40 pb-4">
                  <h2 className="font-playfair text-2xl font-bold text-maroon-900">
                    Step 4: Bridal Makeup & Hair Styling
                  </h2>
                  <p className="text-xs text-maroon-700/80">
                    Airbrush HD makeup, Kanchipuram saree draping & groom styling.
                  </p>
                </div>

                <GlassCard className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { id: 'standard', name: 'HD Bridal Makeup', desc: 'HD Makeup + Hair + Saree Drape' },
                      { id: 'silver', name: 'Silver HD Makeup', desc: 'HD Makeup + Hair + Pre-Bride Facial' },
                      { id: 'gold', name: 'Royal Airbrush Makeup', desc: 'Airbrush HD + Temple Jewelry Styling' },
                      { id: 'premium', name: 'Premium Artist Package', desc: 'Senior Artist + Pre-Bride Facial' },
                    ].map((mt) => (
                      <div
                        key={mt.id}
                        onClick={() => updateMakeup({ packageTier: mt.id as 'standard' | 'silver' | 'gold' | 'premium' })}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          state.makeup.packageTier === mt.id
                            ? 'bg-maroon-800 text-ivory border-gold-400 shadow-md'
                            : 'bg-white text-maroon-900 border-gold-200 hover:border-gold-400'
                        }`}
                      >
                        <h4 className="font-bold text-sm">{mt.name}</h4>
                        <p className="text-xs text-gold-300 mt-1">{mt.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gold-300">
                    <div>
                      <span className="font-bold text-sm text-maroon-900 block">Family Members Makeup Count</span>
                    </div>
                    <div className="flex items-center gap-3 bg-maroon-800 text-gold-300 px-3 py-1.5 rounded-xl">
                      <button
                        onClick={() => updateMakeup({ familyCount: Math.max(0, state.makeup.familyCount - 1) })}
                        className="p-1 hover:text-gold-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-sm">{state.makeup.familyCount}</span>
                      <button
                        onClick={() => updateMakeup({ familyCount: state.makeup.familyCount + 1 })}
                        className="p-1 hover:text-gold-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* STEP 5: PUROHIT */}
            {state.currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="border-b border-gold-300/40 pb-4">
                  <h2 className="font-playfair text-2xl font-bold text-maroon-900">
                    Step 5: Vedic Purohit & Ritual Samagri
                  </h2>
                  <p className="text-xs text-maroon-700/80">
                    Experienced Vedic scholars fluent in Kannada, Tamil, Telugu & Sanskrit.
                  </p>
                </div>

                <GlassCard className="space-y-6">
                  <div className="space-y-3">
                    <label className="font-bold text-maroon-900 text-sm block">Purohit Package</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { id: 'standard', name: 'Standard Purohit', desc: 'Single Purohit for Core Muhurtham Rites' },
                        { id: 'premium', name: 'Premium Purohit Team', desc: 'Senior Purohit + Assistant + Samagri Setup' },
                        { id: 'traditional', name: 'Traditional Complete Package', desc: 'Full Pre & Post-Wedding Rituals + Team' },
                      ].map((pt) => (
                        <div
                          key={pt.id}
                          onClick={() => updatePurohit({ packageTier: pt.id as 'standard' | 'premium' | 'traditional' })}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            state.purohit.packageTier === pt.id
                              ? 'bg-maroon-800 text-ivory border-gold-400 shadow-md'
                              : 'bg-white text-maroon-900 border-gold-200 hover:border-gold-400'
                          }`}
                        >
                          <h4 className="font-bold text-sm">{pt.name}</h4>
                          <p className="text-xs text-gold-300 mt-1">{pt.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <TraditionalBorder />

                  <div className="space-y-3">
                    <label className="font-bold text-maroon-900 text-sm block">Ritual Language</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['kannada', 'tamil', 'telugu', 'sanskrit'].map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => updatePurohit({ language: lang as 'kannada' | 'tamil' | 'telugu' | 'sanskrit' })}
                          className={`py-3 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all ${
                            state.purohit.language === lang
                              ? 'bg-maroon-800 text-gold-300 border-gold-400'
                              : 'bg-white text-maroon-900 border-gold-300'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gold-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={state.purohit.homaRequired}
                      onChange={(e) => updatePurohit({ homaRequired: e.target.checked })}
                      className="accent-gold-500 w-5 h-5"
                    />
                    <div>
                      <span className="font-bold text-xs text-maroon-900 block">Include Ganapathi & Navagraha Homa Samagri</span>
                      <span className="text-[11px] text-maroon-700">Complete authentic samagri kit included</span>
                    </div>
                  </label>
                </GlassCard>
              </motion.div>
            )}

            {/* STEP 6: SECURITY */}
            {state.currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="border-b border-gold-300/40 pb-4">
                  <h2 className="font-playfair text-2xl font-bold text-maroon-900">
                    Step 6: Event Security & Parking Staff
                  </h2>
                  <p className="text-xs text-maroon-700/80">
                    Uniformed bouncers, crowd controllers & valet parking personnel.
                  </p>
                </div>

                <GlassCard className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gold-300">
                    <div>
                      <span className="font-bold text-sm text-maroon-900 block">Male Security Bouncers</span>
                    </div>
                    <div className="flex items-center gap-3 bg-maroon-800 text-gold-300 px-3 py-1.5 rounded-xl">
                      <button
                        onClick={() => updateSecurity({ maleBouncers: Math.max(0, state.security.maleBouncers - 1) })}
                        className="p-1 hover:text-gold-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-sm">{state.security.maleBouncers}</span>
                      <button
                        onClick={() => updateSecurity({ maleBouncers: state.security.maleBouncers + 1 })}
                        className="p-1 hover:text-gold-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gold-300">
                    <div>
                      <span className="font-bold text-sm text-maroon-900 block">Female Security Bouncers</span>
                    </div>
                    <div className="flex items-center gap-3 bg-maroon-800 text-gold-300 px-3 py-1.5 rounded-xl">
                      <button
                        onClick={() => updateSecurity({ femaleBouncers: Math.max(0, state.security.femaleBouncers - 1) })}
                        className="p-1 hover:text-gold-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-sm">{state.security.femaleBouncers}</span>
                      <button
                        onClick={() => updateSecurity({ femaleBouncers: state.security.femaleBouncers + 1 })}
                        className="p-1 hover:text-gold-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gold-300">
                    <div>
                      <span className="font-bold text-sm text-maroon-900 block">Valet & Parking Staff</span>
                    </div>
                    <div className="flex items-center gap-3 bg-maroon-800 text-gold-300 px-3 py-1.5 rounded-xl">
                      <button
                        onClick={() => updateSecurity({ parkingStaffCount: Math.max(0, state.security.parkingStaffCount - 1) })}
                        className="p-1 hover:text-gold-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-sm">{state.security.parkingStaffCount}</span>
                      <button
                        onClick={() => updateSecurity({ parkingStaffCount: state.security.parkingStaffCount + 1 })}
                        className="p-1 hover:text-gold-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <label className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gold-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={state.security.vipSecurity}
                      onChange={(e) => updateSecurity({ vipSecurity: e.target.checked })}
                      className="accent-gold-500 w-5 h-5"
                    />
                    <div>
                      <span className="font-bold text-xs text-maroon-900 block">VIP / Stage Security Detail</span>
                      <span className="text-[11px] text-maroon-700">Dedicated stage & family security</span>
                    </div>
                  </label>
                </GlassCard>
              </motion.div>
            )}

            {/* STEP 7: WELCOME GIRLS */}
            {state.currentStep === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="border-b border-gold-300/40 pb-4">
                  <h2 className="font-playfair text-2xl font-bold text-maroon-900">
                    Step 7: Traditional Welcome Hostesses
                  </h2>
                  <p className="text-xs text-maroon-700/80">
                    Graceful hostesses in Kanchipuram silk sarees with floral Aarathi plates.
                  </p>
                </div>

                <GlassCard className="space-y-6">
                  <div className="space-y-3">
                    <label className="font-bold text-maroon-900 text-sm block">Number of Hostesses</label>
                    <div className="grid grid-cols-4 gap-3">
                      {[2, 4, 6, 8].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => updateWelcomeGirls({ count: c as 2 | 4 | 6 | 8 })}
                          className={`py-3 rounded-xl font-bold text-sm border transition-all ${
                            state.welcomeGirls.count === c
                              ? 'bg-maroon-800 text-gold-300 border-gold-400'
                              : 'bg-white text-maroon-900 border-gold-300'
                          }`}
                        >
                          {c} Hostesses
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="font-bold text-maroon-900 text-sm block">Attire</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'traditional_saree', label: 'Traditional Kanchipuram Saree' },
                        { id: 'modern_lehenga', label: 'Modern Lehenga' },
                      ].map((a) => (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => updateWelcomeGirls({ attire: a.id as 'traditional_saree' | 'modern_lehenga' })}
                          className={`py-3 rounded-xl font-bold text-xs border transition-all ${
                            state.welcomeGirls.attire === a.id
                              ? 'bg-maroon-800 text-gold-300 border-gold-400'
                              : 'bg-white text-maroon-900 border-gold-300'
                          }`}
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gold-300 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={state.welcomeGirls.includeFlowerBasket}
                        onChange={(e) => updateWelcomeGirls({ includeFlowerBasket: e.target.checked })}
                        className="accent-gold-500 w-5 h-5"
                      />
                      <div>
                        <span className="font-bold text-xs text-maroon-900 block">Flower Petal Baskets</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gold-300 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={state.welcomeGirls.includeWelcomePlate}
                        onChange={(e) => updateWelcomeGirls({ includeWelcomePlate: e.target.checked })}
                        className="accent-gold-500 w-5 h-5"
                      />
                      <div>
                        <span className="font-bold text-xs text-maroon-900 block">Aarathi Welcome Plates</span>
                      </div>
                    </label>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* STEP 8: DANCERS */}
            {state.currentStep === 8 && (
              <motion.div
                key="step8"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="border-b border-gold-300/40 pb-4">
                  <h2 className="font-playfair text-2xl font-bold text-maroon-900">
                    Step 8: Cultural Performances & Dancers
                  </h2>
                  <p className="text-xs text-maroon-700/80">
                    Chenda Melam, Dollu Kunitha, Bharatanatyam & fusion troupes.
                  </p>
                </div>

                <GlassCard className="space-y-6">
                  <div className="space-y-3">
                    <label className="font-bold text-maroon-900 text-sm block">Package Level</label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: 'standard', name: 'Standard Package', desc: '4 Performers, 2 Hour Set' },
                        { id: 'premium', name: 'Premium Package', desc: '8 Performers, 3 Hour Set + Live Percussion' },
                      ].map((p) => (
                        <div
                          key={p.id}
                          onClick={() =>
                            updateDancers(
                              p.id === 'premium'
                                ? { performerCount: 8, durationHours: 3 }
                                : { performerCount: 4, durationHours: 2 }
                            )
                          }
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            (p.id === 'premium' ? state.dancers.performerCount >= 8 : state.dancers.performerCount < 8)
                              ? 'bg-maroon-800 text-ivory border-gold-400 shadow-md'
                              : 'bg-white text-maroon-900 border-gold-200 hover:border-gold-400'
                          }`}
                        >
                          <h4 className="font-bold text-sm">{p.name}</h4>
                          <p className="text-xs text-gold-300 mt-1">{p.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <TraditionalBorder />

                  <label className="font-bold text-maroon-900 text-sm block">Dance Style</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'dollu_kunitha', name: 'Dollu Kunitha Folk Troupe', desc: 'Energetic traditional drum welcome' },
                      { id: 'chenda_melam', name: 'Chenda Melam Kerala Drum Troupe', desc: 'Auspicious loud traditional beats' },
                      { id: 'classical_bharatanatyam', name: 'Classical Bharatanatyam Recital', desc: 'Graceful temple dance showcase' },
                      { id: 'bollywood', name: 'Fusion & Sangeet Dance Troupe', desc: 'High-energy choreography' },
                    ].map((d) => (
                      <div
                        key={d.id}
                        onClick={() => updateDancers({ style: d.id as 'classical_bharatanatyam' | 'dollu_kunitha' | 'chenda_melam' | 'folk' | 'bollywood' })}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          state.dancers.style === d.id
                            ? 'bg-maroon-800 text-ivory border-gold-400 shadow-md'
                            : 'bg-white text-maroon-900 border-gold-200 hover:border-gold-400'
                        }`}
                      >
                        <h4 className="font-bold text-sm">{d.name}</h4>
                        <p className="text-xs text-gold-300 mt-1">{d.desc}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* STEP 9: FINAL REVIEW */}
            {state.currentStep === 9 && (
              <motion.div
                key="step9"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="border-b border-gold-300/40 pb-4">
                  <h2 className="font-playfair text-2xl font-bold text-maroon-900">
                    Step 9: Review Your Selections
                  </h2>
                  <p className="text-xs text-maroon-700/80">
                    Check everything you&apos;ve chosen, then send it to us for a detailed quote &mdash; no fixed prices shown here.
                  </p>
                </div>

                <GlassCard variant="warm" className="space-y-6">
                  <div className="flex justify-between items-center border-b border-gold-300 pb-4">
                    <div>
                      <h3 className="font-playfair text-2xl font-bold text-maroon-900">
                        Package Summary
                      </h3>
                      <p className="text-xs text-maroon-700">Reference #: SID-2026-992</p>
                    </div>
                    <span className="bg-maroon-800 text-gold-300 text-xs font-bold px-3 py-1 rounded-full border border-gold-400">
                      Ready to Send
                    </span>
                  </div>

                  <div className="space-y-3 text-xs text-maroon-900">
                    <div className="flex justify-between border-b border-gold-200/60 pb-2">
                      <span>Decoration Items Selected:</span>
                      <span className="font-bold">{Object.keys(state.selectedServices).length}</span>
                    </div>
                    <div className="flex justify-between border-b border-gold-200/60 pb-2">
                      <span>Catering:</span>
                      <span className="font-bold capitalize">{state.catering.packageTier} &middot; {state.catering.guestCount} Guests &middot; {state.catering.cuisine.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between border-b border-gold-200/60 pb-2">
                      <span>Photography:</span>
                      <span className="font-bold capitalize">{state.photography.packageTier} Tier{state.photography.includeDrone ? ' + Drone' : ''}{state.photography.includeLedWall ? ' + LED Wall' : ''}</span>
                    </div>
                    <div className="flex justify-between border-b border-gold-200/60 pb-2">
                      <span>Bridal Makeup:</span>
                      <span className="font-bold capitalize">{state.makeup.packageTier} &middot; {state.makeup.familyCount} Family Members</span>
                    </div>
                    <div className="flex justify-between border-b border-gold-200/60 pb-2">
                      <span>Purohit:</span>
                      <span className="font-bold capitalize">{state.purohit.packageTier} &middot; {state.purohit.language}{state.purohit.homaRequired ? ' + Homa' : ''}</span>
                    </div>
                    <div className="flex justify-between border-b border-gold-200/60 pb-2">
                      <span>Security & Staff:</span>
                      <span className="font-bold">{(state.security?.maleBouncers || 0) + (state.security?.femaleBouncers || 0)} Bouncers &middot; {state.security?.parkingStaffCount || 0} Parking Staff</span>
                    </div>
                    <div className="flex justify-between border-b border-gold-200/60 pb-2">
                      <span>Welcome Hostesses:</span>
                      <span className="font-bold">{state.welcomeGirls?.count || 0} Hostesses</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dancers & Music:</span>
                      <span className="font-bold capitalize">{(state.dancers?.style || 'dollu_kunitha').replace('_', ' ')}</span>
                    </div>
                  </div>

                  <div className="bg-maroon-900 text-ivory p-6 rounded-2xl border-2 border-gold-400 text-center space-y-1">
                    <p className="text-sm font-bold text-gold-300">No Fixed Pricing Shown</p>
                    <p className="text-xs text-gold-100/80">
                      Send us this package and our team will get back to you with a detailed, no-obligation quote.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <button
                      onClick={saveDraft}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-xs bg-gold-100 text-maroon-900 border border-gold-300 hover:bg-gold-200 transition-colors"
                    >
                      <Save className="w-4 h-4 text-gold-700" /> Save Package
                    </button>

                    <GoldButton
                      variant="copper"
                      size="sm"
                      onClick={() => downloadQuotationPDF('SID-2026-992', state)}
                      icon={<Download className="w-4 h-4" />}
                    >
                      Download Summary (PDF)
                    </GoldButton>

                    <a
                      href={getWhatsAppShareUrl('SID-2026-992', state)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <GoldButton variant="dark" size="sm" fullWidth icon={<Share2 className="w-4 h-4" />}>
                        WhatsApp Inquiry
                      </GoldButton>
                    </a>

                    <Link href="/booking" className="w-full">
                      <GoldButton variant="gold" size="sm" fullWidth icon={<Check className="w-4 h-4" />}>
                        Request Quote
                      </GoldButton>
                    </Link>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gold-300/40">
            <button
              onClick={prevStep}
              disabled={state.currentStep === 1}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gold-100 text-maroon-900 hover:bg-gold-200 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Step
            </button>

            <button onClick={saveDraft} className="inline-flex items-center gap-1.5 text-xs text-gold-600 hover:underline">
              <Save className="w-3.5 h-3.5" /> Save Draft
            </button>

            {state.currentStep < 9 && (
              <GoldButton size="sm" variant="copper" onClick={nextStep} icon={<ChevronRight className="w-4 h-4" />}>
                Next Step
              </GoldButton>
            )}
          </div>
        </div>

        {/* Right Sticky Selections Sidebar (4 cols) */}
        <div className="lg:col-span-4 sticky top-32 space-y-6">
          <GlassCard variant="dark" className="border-2 border-gold-400 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-gold-400/40 pb-3">
              <h3 className="font-playfair text-lg font-bold text-gold-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-400" /> Your Selections
              </h3>
              <span className="text-[10px] uppercase font-bold text-gold-200 bg-maroon-900 px-2 py-0.5 rounded border border-gold-400/40">
                Step {state.currentStep} of 9
              </span>
            </div>

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
                <span>Security & Hostesses:</span>
                <span className="font-bold">{(state.security?.maleBouncers || 0) + (state.security?.femaleBouncers || 0) + (state.welcomeGirls?.count || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Dancers & Music:</span>
                <span className="font-bold capitalize">{(state.dancers?.style || 'dollu_kunitha').replace('_', ' ')}</span>
              </div>
            </div>

            <div className="border-t border-gold-400/40 pt-4 text-center space-y-1">
              <p className="text-xs text-gold-200/80">
                No live pricing here &mdash; request a detailed quote once you&apos;re happy with your selections.
              </p>
            </div>

            <Link href="/booking">
              <GoldButton fullWidth variant="copper" size="md">
                Request a Quote
              </GoldButton>
            </Link>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
