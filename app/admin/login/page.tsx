'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/glass-card';
import { GoldButton } from '@/components/ui/gold-button';
import { BrandMark } from '@/components/ui/brand-mark';
import { TraditionalBorder } from '@/components/ui/traditional-border';
import { Lock, Mail, Key, ShieldCheck, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@sidevents.com');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      // 1. Try Supabase Authentication if configured
      if (isSupabaseConfigured() && email !== 'admin@sidevents.com') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMsg(error.message);
          setIsLoading(false);
          return;
        }

        if (data.session) {
          sessionStorage.setItem('sid_admin_authenticated', 'true');
          sessionStorage.setItem('sid_admin_user', JSON.stringify(data.user));
          router.push('/admin');
          return;
        }
      }

      // 2. Default Master Key Verification (admin@sidevents.com / admin123 or any password provided)
      if (email === 'admin@sidevents.com' && (password === 'admin123' || password.length >= 4)) {
        sessionStorage.setItem('sid_admin_authenticated', 'true');
        sessionStorage.setItem('sid_admin_user', JSON.stringify({ email: 'admin@sidevents.com', role: 'admin' }));
        router.push('/admin');
      } else {
        setErrorMsg('Invalid admin credentials. Default credentials: admin@sidevents.com / admin123');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <BrandMark className="w-16 h-16 shadow-2xl" />
          </div>
          <span className="text-gold-600 font-bold text-xs uppercase tracking-widest bg-gold-100 px-3.5 py-1 rounded-full border border-gold-300">
            Admin Authentication
          </span>
          <h1 className="font-playfair text-3xl font-bold text-maroon-900">
            SID Events Management Portal
          </h1>
          <p className="text-xs text-maroon-700/80">
            Sign in with Supabase credentials or master admin access key.
          </p>
          <TraditionalBorder />
        </div>

        {/* Login Form Card */}
        <GlassCard className="p-8 space-y-6 shadow-2xl border-2 border-gold-400">
          {errorMsg && (
            <div className="p-3 bg-rose-100 border border-rose-300 rounded-xl text-rose-900 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-maroon-900 mb-1">Admin Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-600" />
                <input
                  type="email"
                  required
                  placeholder="admin@sidevents.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-gold-300 rounded-xl pl-9 pr-4 py-2.5 text-xs text-maroon-900 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-maroon-900 mb-1">Password / Security Key</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-600" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-gold-300 rounded-xl pl-9 pr-4 py-2.5 text-xs text-maroon-900 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30"
                />
              </div>
            </div>

            <div className="pt-2">
              <GoldButton fullWidth variant="gold" icon={<Lock className="w-4 h-4" />} disabled={isLoading}>
                {isLoading ? 'Verifying Credentials...' : 'Sign In To Dashboard'}
              </GoldButton>
            </div>
          </form>

          <div className="bg-maroon-950/90 text-gold-200 p-3 rounded-xl text-[11px] space-y-1 border border-gold-400/30">
            <div className="flex items-center gap-1.5 font-bold text-gold-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Default Credentials Demo:
            </div>
            <p><strong>Email:</strong> admin@sidevents.com</p>
            <p><strong>Password:</strong> admin123</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
