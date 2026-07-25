'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu, X, Calculator, Phone } from 'lucide-react';
import { GoldButton } from '../ui/gold-button';
import { BrandMark } from '../ui/brand-mark';
import { cn } from '@/lib/utils';
import { SITE } from '@/lib/site-config';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/packages', label: 'Wedding Packages' },
    { href: '/custom-builder', label: 'Build Your Package' },
    { href: '/gallery', label: 'Portfolio' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-maroon-800 text-gold-200 text-[10px] font-bold tracking-widest uppercase py-2 px-4 text-center flex items-center justify-center gap-4 border-b border-gold-400/30">
        <a href={SITE.phoneHref} className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors">
          <Phone className="w-3 h-3" /> {SITE.phoneDisplay}
        </a>
        <span className="hidden sm:inline text-gold-400">•</span>
        <Link href="/contact" className="text-gold-300 hover:text-white underline underline-offset-4">
          BOOK A CONSULTATION
        </Link>
      </div>

      {/* Main Header */}
      <div className="bg-silk-100/95 backdrop-blur-xl border-b border-gold-400/30 text-maroon-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <BrandMark className="w-16 h-16 shadow-md group-hover:scale-105 transition-transform" />
              <div>
                <span className="font-playfair font-bold text-xl tracking-wider maroon-text-gradient block leading-none">
                  SID Events
                </span>
                <span className="text-[9px] uppercase font-semibold text-gold-700 tracking-widest block mt-1">
                  Weddings • Corporate • Celebrations
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300',
                      isActive
                        ? 'bg-maroon-800 text-gold-300 shadow-md'
                        : 'text-maroon-900 hover:text-gold-600 hover:bg-gold-50/60'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/custom-builder">
                <GoldButton size="sm" variant="gold" icon={<Sparkles className="w-4 h-4" />}>
                  Build Custom Package
                </GoldButton>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <Link href="/custom-builder">
                <GoldButton size="sm" variant="gold">
                  <Calculator className="w-4 h-4" />
                </GoldButton>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-maroon-800 hover:bg-gold-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-silk-100 border-t border-gold-400/30 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors',
                  pathname === link.href
                    ? 'bg-maroon-800 text-gold-300 font-bold'
                    : 'text-maroon-900 hover:bg-gold-100'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/custom-builder" onClick={() => setMobileMenuOpen(false)}>
                <GoldButton fullWidth variant="gold" icon={<Sparkles className="w-4 h-4" />}>
                  Build Custom Package
                </GoldButton>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
