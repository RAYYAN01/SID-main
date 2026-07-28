'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu, X, Calculator, Phone, User } from 'lucide-react';
import { GoldButton } from '../ui/gold-button';
import { BrandMark } from '../ui/brand-mark';
import { cn } from '@/lib/utils';
import { SITE } from '@/lib/site-config';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLanding = pathname === '/';

  // Opacity calculation for navbar on landing page:
  // - scrollY === 0: 0% (fully transparent)
  // - scrollY >= 1: 50% (0.5) opaqueness on first 1px scroll, then gradually increases to 1.0 (100%) as scroll reaches ~250px
  let opacity = 1;
  if (isLanding) {
    if (scrollY === 0) {
      opacity = 0;
    } else {
      const scrollProgress = Math.min((scrollY - 1) / 250, 1);
      opacity = 0.5 + 0.5 * scrollProgress;
    }
  }

  const isTransparent = isLanding && opacity === 0;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/packages', label: 'Packages' },
    { href: '/gallery', label: 'Portfolio' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className={cn("z-50 transition-all duration-300", isLanding ? "fixed top-0 left-0 right-0" : "sticky top-0")}>
      {/* Top Announcement Bar */}
      <div
        className="text-[10px] font-bold tracking-widest uppercase py-2 px-4 text-center flex items-center justify-center gap-4 border-b transition-all duration-300"
        style={{
          backgroundColor: isLanding ? `rgba(112, 12, 27, ${opacity * 0.9})` : 'rgba(112, 12, 27, 1)',
          borderColor: `rgba(212, 175, 55, ${isTransparent ? 0.15 : 0.3})`,
          color: 'rgba(247, 219, 167, 1)',
        }}
      >
        <a href={SITE.phoneHref} className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors">
          <Phone className="w-3 h-3" /> {SITE.phoneDisplay}
        </a>
        <span className="hidden sm:inline text-gold-400">•</span>
        <Link href="/contact" className="text-gold-300 hover:text-white underline underline-offset-4">
          BOOK A CONSULTATION
        </Link>
      </div>

      {/* Main Header */}
      <div
        className="transition-all duration-300 border-b shadow-sm"
        style={{
          backgroundColor: isLanding
            ? `rgba(255, 252, 247, ${opacity * 0.96})`
            : 'rgba(255, 252, 247, 0.95)',
          backdropFilter: opacity > 0 ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: opacity > 0 ? 'blur(16px)' : 'none',
          borderColor: `rgba(212, 175, 55, ${opacity * 0.3})`,
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <BrandMark className="w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-105 transition-transform" />
              <div>
                <span
                  className={cn(
                    "font-playfair font-bold text-base sm:text-lg tracking-wider block leading-none transition-colors duration-300",
                    isTransparent ? "text-silk-50" : "maroon-text-gradient"
                  )}
                >
                  SID Events
                </span>
                <span
                  className={cn(
                    "text-[8px] sm:text-[9px] uppercase font-semibold tracking-widest block mt-1 transition-colors duration-300",
                    isTransparent ? "text-gold-300/90" : "text-gold-700"
                  )}
                >
                  Weddings • Corporate • Celebrations
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 2xl:gap-2 ml-auto">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-2 py-1.5 xl:px-2.5 xl:py-1.5 rounded-lg text-[10px] xl:text-[11px] 2xl:text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap',
                      isActive
                        ? 'bg-maroon-800 text-gold-300 shadow-md border border-gold-400/40'
                        : isTransparent
                        ? 'text-silk-50 hover:text-gold-300 hover:bg-white/10'
                        : 'text-maroon-900 hover:text-gold-600 hover:bg-gold-50/60'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action CTA Buttons */}
            <div className="hidden lg:flex items-center gap-2 ml-2 xl:ml-3 pl-2 xl:pl-3 border-l border-gold-400/40 shrink-0">
              <Link href="/admin">
                <button
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] xl:text-[11px] font-bold uppercase tracking-wider transition-all duration-200 border",
                    isTransparent
                      ? "bg-white/10 text-gold-300 border-gold-400/40 hover:bg-white/20"
                      : "bg-maroon-900 text-gold-300 border-gold-400/50 hover:bg-maroon-950"
                  )}
                >
                  <User className="w-3.5 h-3.5" />
                  Admin Login
                </button>
              </Link>
              <Link href="/custom-builder">
                <GoldButton size="sm" variant="gold" icon={<Sparkles className="w-3.5 h-3.5" />}>
                  Build Package
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
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isTransparent ? "text-silk-50 hover:bg-white/10" : "text-maroon-800 hover:bg-gold-100"
                )}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-maroon-950/95 text-silk-50 border-t border-gold-400/30 px-4 pt-3 pb-6 space-y-2 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors',
                  pathname === link.href
                    ? 'bg-maroon-800 text-gold-300 font-bold border border-gold-400/40'
                    : 'text-silk-100 hover:bg-maroon-900/80 hover:text-gold-300'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              <Link href="/custom-builder" onClick={() => setMobileMenuOpen(false)}>
                <GoldButton fullWidth variant="gold" icon={<Sparkles className="w-4 h-4" />}>
                  Build Custom Package
                </GoldButton>
              </Link>
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                <GoldButton fullWidth variant="dark" icon={<User className="w-4 h-4" />}>
                  Admin Login
                </GoldButton>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
