'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2,
  Calendar,
  Users,
  ShieldCheck,
  Award,
  X,
  ZoomIn,
  Heart,
  Plane,
  Briefcase,
  Cake,
  Gem,
  Baby,
  Home as HomeIcon,
  Palette,
  Camera,
  MessagesSquare,
  ClipboardList,
  PenTool,
  PartyPopper,
  Phone,
} from 'lucide-react';
import { GoldButton } from '@/components/ui/gold-button';
import { GlassCard } from '@/components/ui/glass-card';
import { TraditionalBorder } from '@/components/ui/traditional-border';
import { CountdownTimer } from '@/components/ui/countdown-timer';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { MOCK_STANDARD_PACKAGES, MOCK_TESTIMONIALS, BUSINESS_OFFERINGS, BusinessOffering } from '@/lib/mock-data';
import { SITE, SITE_STATS, getWhatsAppUrl } from '@/lib/site-config';

export default function HomePage() {
  const [galleryCategory, setGalleryCategory] = useState('all');
  const [lightboxImg, setLightboxImg] = useState<{ title: string; url: string; category: string } | null>(null);

  useEffect(() => {
    if (!lightboxImg) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImg(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg]);

  const statIcons = [
    <Award key="i1" className="w-5 h-5 text-gold-500" />,
    <Calendar key="i2" className="w-5 h-5 text-gold-500" />,
    <Users key="i3" className="w-5 h-5 text-gold-500" />,
    <ShieldCheck key="i4" className="w-5 h-5 text-gold-500" />,
  ];
  const stats = SITE_STATS.map((s, i) => ({ ...s, icon: statIcons[i] }));

  const offeringIcons: Record<BusinessOffering['iconKey'], React.ReactNode> = {
    heart: <Heart className="w-5 h-5" />,
    plane: <Plane className="w-5 h-5" />,
    briefcase: <Briefcase className="w-5 h-5" />,
    cake: <Cake className="w-5 h-5" />,
    gem: <Gem className="w-5 h-5" />,
    baby: <Baby className="w-5 h-5" />,
    home: <HomeIcon className="w-5 h-5" />,
    palette: <Palette className="w-5 h-5" />,
    camera: <Camera className="w-5 h-5" />,
  };

  const whyChooseUs = [
    { title: 'End-to-End Planning', desc: 'From the first consultation to cleanup, one team manages the whole event.' },
    { title: 'Customized Experiences', desc: 'Every event is built around your vision and budget, not a fixed template.' },
    { title: 'Experienced Team', desc: '10+ years of hands-on event execution across Karnataka.' },
    { title: 'Creative Event Concepts', desc: 'Fresh décor and staging ideas for weddings, corporate events and celebrations.' },
    { title: 'Trusted Across Karnataka', desc: `${SITE.googleRating} average rating from 100+ clients we've worked with.` },
    { title: 'Attention To Every Detail', desc: 'From seating charts to lighting cues, nothing is left to chance.' },
  ];

  const processSteps = [
    { num: '01', title: 'Consultation', desc: 'Understanding your vision, guest count and budget.', icon: <MessagesSquare className="w-5 h-5" /> },
    { num: '02', title: 'Planning', desc: 'A detailed blueprint covering every vendor and timeline.', icon: <ClipboardList className="w-5 h-5" /> },
    { num: '03', title: 'Design', desc: 'Décor concepts, stage design and lighting finalized with you.', icon: <PenTool className="w-5 h-5" /> },
    { num: '04', title: 'Execution', desc: 'Vendor coordination and day-of management, handled by our team.', icon: <Sparkles className="w-5 h-5" /> },
    { num: '05', title: 'Celebration', desc: 'You enjoy the event while we manage the details in the background.', icon: <PartyPopper className="w-5 h-5" /> },
  ];

  const pillars = [
    {
      title: 'Saptapadi & Temple Mandapams',
      subtitle: 'Brass Oil Lamps, Fresh Jasmine Veni & Banana Trunk Pillars',
      desc: 'Authentic temple architecture backdrops with handcrafted brass lamps, lotus floral arches, and golden silk drapes.',
      img: '/sid-party29.jpeg',
      badge: 'MANDAPAM DECOR',
    },
    {
      title: 'Banana Leaf Royal Sadhya',
      subtitle: '28-Item Traditional Feast & Live Dosa Counters',
      desc: 'Authentic South Indian feast served on fresh banana leaves including Payasam, Bisi Bele Bath, Vadai, Mysuru Pak & live mocktails.',
      img: '/onam-sadhya-lunch-menu-1.webp',
      badge: 'CATERING & FEAST',
    },
    {
      title: 'Vedic Rituals & Live Nadaswaram',
      subtitle: 'Senior Vedic Scholars & Auspicious Thavil Ensemble',
      desc: 'Experienced Vedic pundits conducting complete Muhurtham, Ganapathi Homa, Saptapadi rites alongside live Nadaswaram ragas.',
      img: '/ChatGPT Image Jul 28, 2026, 11_34_17 AM.png',
      badge: 'VEDIC RITES',
    },
    {
      title: 'Wedding Photography Package',
      subtitle: 'Pre-Wedding Shoot, Wedding Day Coverage & Cinematic Films',
      desc: 'A 2-day pre-wedding photoshoot plus full wedding day coverage with drone footage, a teaser reel, a complete cinematic song and a premium photo album.',
      img: '/Sid5.png',
      badge: 'PHOTOGRAPHY PACKAGE',
    },
  ];

  const galleryShowcase = [
    {
      title: 'Tropical Floral Reception Backdrop',
      category: 'mandapam',
      url: '/sid-party25.jpeg',
    },
    {
      title: 'Traditional Saptapadi Muhurtham Ceremony',
      category: 'rituals',
      url: '/sid-party7.jpeg',
    },
    {
      title: 'Authentic South Indian Feast',
      category: 'sadhya',
      url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Kanchipuram Silk Bridal Portrait & Jewelry',
      category: 'bridal',
      url: '/sid-party9.jpeg',
    },
    {
      title: 'Vibrant Floral Wall Art Decoration',
      category: 'mandapam',
      url: '/sid-party22.jpeg',
    },
    {
      title: 'Live Auspicious Nadaswaram & Thavil Recital',
      category: 'rituals',
      url: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const filteredGallery = galleryCategory === 'all'
    ? galleryShowcase
    : galleryShowcase.filter((g) => g.category === galleryCategory);

  return (
    <div className="bg-silk-100 text-maroon-900 min-h-screen relative pb-12 font-sans">
      
      {/* 1. CINEMATIC HERO SECTION ("Royal South Indian Sanctum") */}
      <section className="relative min-h-screen sm:min-h-[110vh] flex items-center justify-center bg-maroon-950 text-silk-50 px-4 overflow-hidden pt-20 pb-16">
        
        {/* Background Video rotated 90 degrees to the left with Warm Ambient Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center bg-maroon-950">
          <video
            src="/sid-video1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 object-cover opacity-85 pointer-events-none"
            style={{
              width: 'max(160vh, 160vw)',
              height: 'max(160vw, 160vh)',
              minWidth: '110vh',
              minHeight: '110vw',
              transform: 'translate(-50%, -50%) rotate(-90deg)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-maroon-950/20 to-maroon-950/30" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 py-10">
          
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-maroon-900/90 border border-gold-400/50 backdrop-blur-xl shadow-xl text-gold-300 text-xs font-bold uppercase tracking-widest"
          >
            <Sparkles className="w-4 h-4 text-gold-400" /> {SITE.tagline.toUpperCase()}
          </motion.div>

          {/* Main Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-playfair text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-silk-50"
          >
            Crafting Extraordinary Celebrations <br />
            <span className="gold-text-foil font-serif italic font-normal">Creating Timeless Memories</span>
          </motion.h1>

          {/* Subtitle Paragraph */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-gold-100/90 max-w-3xl mx-auto font-sans leading-relaxed font-light"
          >
            From dream weddings to grand corporate experiences, SID Events transforms every occasion in {SITE.city}, {SITE.state}{' '}into an unforgettable celebration &mdash; with a live custom wedding package builder to plan every detail.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link href="/custom-builder">
              <GoldButton size="lg" variant="gold" icon={<Sparkles className="w-5 h-5" />}>
                Plan Your Event
              </GoldButton>
            </Link>
            <Link href="/gallery">
              <GoldButton
                size="lg"
                variant="outline"
                className="!bg-transparent !text-silk-50 !border-silk-50/50 hover:!bg-silk-50/10"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Explore Work
              </GoldButton>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="max-w-[1600px] mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-silk-50 border-2 border-gold-400/40 rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-maroon-900">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-2 border-r last:border-0 border-gold-400/20 px-2">
              <div className="flex justify-center">{stat.icon}</div>
              <div className="text-2xl sm:text-4xl font-bold font-outfit maroon-text-gradient">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-[9px] sm:text-[10px] uppercase font-bold text-maroon-700 tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 2B. SERVICES TEASER */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] font-bold text-maroon-800 uppercase tracking-widest bg-gold-100 px-4 py-1 rounded-full border border-gold-400/40">
            WHAT WE DO
          </span>
          <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-maroon-950">
            Every Occasion, <span className="maroon-text-gradient font-serif">Planned Properly</span>
          </h2>
          <p className="text-sm text-maroon-800/80 leading-relaxed font-sans">
            Weddings are our specialty, but not the only thing we plan.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {BUSINESS_OFFERINGS.slice(0, 5).map((offering) => (
            <Link
              key={offering.id}
              href="/services"
              className="flex flex-col items-center text-center gap-2 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-gold-200/50"
            >
              <div className="w-11 h-11 rounded-xl bg-gold-100 text-gold-700 flex items-center justify-center">
                {offeringIcons[offering.iconKey]}
              </div>
              <span className="text-xs font-bold text-maroon-900">{offering.title}</span>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-bold text-gold-700 hover:text-maroon-900">
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. THE 4 SACRED PILLARS OF SOUTH INDIAN WEDDINGS */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[10px] font-bold text-maroon-800 uppercase tracking-widest bg-gold-100 px-4 py-1 rounded-full border border-gold-400/40">
            HERITAGE CRAFTSMANSHIP
          </span>
          <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-maroon-950">
            The Four Things Every <span className="maroon-text-gradient font-serif">Muhurtham Needs</span>
          </h2>
          <p className="text-sm text-maroon-800/80 leading-relaxed font-sans">
            Decor, the feast, the rituals and the coverage &mdash; these are the four categories most families start with, and where our custom builder begins too.
          </p>
          <TraditionalBorder />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-8">
          {pillars.map((p, idx) => (
            <div key={idx} className="flex flex-col justify-between bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-64 w-full">
                <Image src={p.img} alt={p.title} fill className="object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-maroon-950/30 to-transparent" />
                <span className="absolute top-4 left-4 bg-maroon-900/90 text-gold-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-gold-400/40 backdrop-blur-md">
                  {p.badge}
                </span>
              </div>

              <div className="p-8 space-y-3">
                <h3 className="font-playfair text-2xl font-bold text-maroon-950">{p.title}</h3>
                <p className="text-xs font-bold text-gold-700 uppercase tracking-wider">{p.subtitle}</p>
                <p className="text-xs text-maroon-800/80 leading-relaxed font-sans">{p.desc}</p>
                
                <div className="pt-3">
                  <Link href="/custom-builder" className="inline-flex items-center gap-1.5 text-xs font-bold text-maroon-800 hover:text-gold-600">
                    Customize Item <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. STANDARD WEDDING PACKAGES */}
      <section className="bg-maroon-950 text-silk-50 py-20 border-y-2 border-gold-400/40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-[10px] font-bold text-gold-300 uppercase tracking-widest bg-maroon-900 px-4 py-1 rounded-full border border-gold-400/30">
              CURATED COLLECTIONS
            </span>
            <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-silk-50">
              Standard South Indian <span className="gold-text-foil font-serif">Wedding Tiers</span>
            </h2>
            <p className="text-sm text-gold-100/80 leading-relaxed font-sans">
              Choose from our all-inclusive standard packages or load any tier directly into our custom builder to tailor every line item.
            </p>
            <TraditionalBorder />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-8">
            {MOCK_STANDARD_PACKAGES.map((pkg) => (
              <GlassCard
                key={pkg.id}
                variant="dark"
                className={`flex flex-col justify-between space-y-6 relative border ${
                  pkg.isPopular ? 'border-2 border-gold-400 shadow-2xl scale-100 md:scale-105 bg-maroon-900' : 'border-gold-400/20'
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-gold-300 to-gold-500 text-maroon-950 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow">
                    ★ MOST POPULAR
                  </div>
                )}

                <div>
                  <h3 className="font-playfair text-2xl font-bold text-silk-50 mb-1">{pkg.name}</h3>
                  <p className="text-xs text-gold-300 font-semibold mb-4">{pkg.tagline}</p>

                  <div className="bg-maroon-900/90 p-4 rounded-xl mb-6 border border-gold-400/30">
                    <span className="text-[10px] text-gold-200/70 uppercase block font-semibold">Capacity</span>
                    <span className="text-2xl font-bold font-outfit gold-text-foil">{pkg.guestCapacity} Guests</span>
                    <span className="text-[10px] text-gold-200/70 block mt-0.5">Contact us for a custom quote</span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-silk-100/90 mb-6">
                    {pkg.featuredInclusions.map((inc: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/custom-builder">
                  <GoldButton fullWidth variant={pkg.isPopular ? 'gold' : 'maroon'} size="sm">
                    Customize Package
                  </GoldButton>
                </Link>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE VISUAL GALLERY SHOWCASE */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gold-400/30 pb-6">
          <div>
            <span className="text-[10px] font-bold text-maroon-800 uppercase tracking-widest">VISUAL HERITAGE</span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-maroon-950">
              South Indian Wedding Showcase
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Showcase' },
              { id: 'mandapam', label: 'Mandapams' },
              { id: 'rituals', label: 'Rituals' },
              { id: 'sadhya', label: 'Sadhya Feast' },
              { id: 'bridal', label: 'Bridal Portraits' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setGalleryCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  galleryCategory === cat.id
                    ? 'bg-maroon-800 text-gold-300 shadow'
                    : 'bg-silk-200 text-maroon-900 hover:bg-gold-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredGallery.map((item, i) => (
            <div
              key={i}
              onClick={() => setLightboxImg(item)}
              className="group relative h-80 rounded-3xl overflow-hidden shadow-lg cursor-pointer border border-gold-400/30"
            >
              <Image src={item.url} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-maroon-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute top-4 right-4 bg-maroon-950/80 text-gold-300 p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity border border-gold-400/30">
                <ZoomIn className="w-5 h-5" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-silk-50">
                <span className="text-[10px] uppercase font-bold text-gold-300 bg-maroon-950/80 px-2.5 py-0.5 rounded border border-gold-400/30">
                  {item.category}
                </span>
                <h4 className="font-playfair text-lg font-bold text-silk-50 mt-1">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5B. WHY CHOOSE US */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] font-bold text-maroon-800 uppercase tracking-widest bg-gold-100 px-4 py-1 rounded-full border border-gold-400/40">
            WHY CHOOSE US
          </span>
          <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-maroon-950">
            What Makes Us <span className="maroon-text-gradient font-serif">Different</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-6">
          {whyChooseUs.map((item, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gold-200/40 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-maroon-900 text-gold-300 flex items-center justify-center text-xs font-bold font-outfit">
                {idx + 1}
              </div>
              <h3 className="font-playfair text-base font-bold text-maroon-900">{item.title}</h3>
              <p className="text-xs text-maroon-700/80 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5C. OUR PROCESS */}
      <section className="bg-maroon-950 text-silk-50 py-20 border-y-2 border-gold-400/40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-gold-300 uppercase tracking-widest bg-maroon-900 px-4 py-1 rounded-full border border-gold-400/30">
              HOW IT WORKS
            </span>
            <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-silk-50">
              Our <span className="gold-text-foil font-serif">Process</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step) => (
              <div key={step.num} className="text-center space-y-3 px-2">
                <div className="w-14 h-14 mx-auto rounded-full bg-maroon-900 border-2 border-gold-400 text-gold-300 flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="text-[10px] font-bold text-gold-400 tracking-widest block">{step.num}</span>
                <h3 className="font-playfair text-base font-bold text-silk-50">{step.title}</h3>
                <p className="text-xs text-gold-100/70 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VERIFIED CLIENT TESTIMONIALS */}
      <section className="bg-maroon-950 text-silk-50 py-20 border-t-2 border-gold-400/30">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-gold-300 uppercase tracking-widest bg-maroon-900 px-4 py-1 rounded-full border border-gold-400/30">
              CLIENT GRATITUDE
            </span>
            <h2 className="font-playfair text-3xl sm:text-5xl font-bold gold-text-foil">
              Words From Happy Families
            </h2>
            <TraditionalBorder />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-6">
            {MOCK_TESTIMONIALS.slice(0, 6).map((t) => (
              <GlassCard key={t.id} variant="dark" className="flex flex-col justify-between space-y-6 p-8 border border-gold-400/30">
                <div className="space-y-4">
                  <div className="flex gap-1 text-gold-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-silk-100/90 italic leading-relaxed font-sans">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-gold-400/20">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 text-maroon-950 font-bold font-playfair flex items-center justify-center border border-gold-300 shadow-md text-xs shrink-0 uppercase">
                    {t.coupleNames.split(/\s+/).map(n => n[0]).join('').substring(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-playfair text-sm font-bold text-gold-300">{t.coupleNames}</h4>
                    <p className="text-[11px] text-gold-200/70">{t.location}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 7. LIVE WEDDING COUNTDOWN */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <CountdownTimer title="Upcoming Royal Muhurtham Countdown" />
      </section>

      {/* 8. FINAL CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="bg-maroon-950 rounded-3xl p-10 sm:p-16 text-center space-y-6 border border-gold-400/30 relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-silk-50">
              Let&apos;s Create Something <span className="gold-text-foil font-serif">Extraordinary Together</span>
            </h2>
            <p className="text-sm sm:text-base text-gold-100/80 max-w-xl mx-auto">
              Your event deserves careful planning and flawless execution. Tell us what you have in mind.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/contact">
                <GoldButton variant="gold" size="lg" icon={<Phone className="w-5 h-5" />}>
                  Get Free Consultation
                </GoldButton>
              </Link>
              <a href={getWhatsAppUrl('Hi! I would like to plan an event with SID Events.')} target="_blank" rel="noopener noreferrer">
                <GoldButton variant="dark" size="lg" icon={<MessagesSquare className="w-5 h-5" />}>
                  Message Us on WhatsApp
                </GoldButton>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-maroon-950/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-maroon-900 rounded-3xl p-4 border-2 border-gold-400 shadow-2xl"
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 text-gold-300 bg-maroon-950 p-2 rounded-full border border-gold-400/40 hover:bg-maroon-800"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative h-[65vh] w-full rounded-2xl overflow-hidden mb-4">
              <Image src={lightboxImg.url} alt={lightboxImg.title} fill className="object-contain" />
            </div>

            <div className="text-center text-silk-50 space-y-1">
              <h3 className="font-playfair text-2xl font-bold text-gold-300">{lightboxImg.title}</h3>
              <p className="text-xs text-gold-200/70 uppercase tracking-widest">{lightboxImg.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
