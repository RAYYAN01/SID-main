'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { GoldButton } from '@/components/ui/gold-button';
import { TraditionalBorder } from '@/components/ui/traditional-border';
import {
  getAdminQuotes,
  updateQuoteStatus,
  deleteAdminQuote,
  getAdminInquiries,
  updateInquiryStatus,
  AdminQuoteRequest,
  AdminInquiry,
} from '@/lib/store/admin-store';
import {
  FileText,
  Users,
  IndianRupee,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageCircle,
  Search,
  Trash2,
  Filter,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [quotes, setQuotes] = useState<AdminQuoteRequest[]>([]);
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [activeTab, setActiveTab] = useState<'quotes' | 'inquiries' | 'pricing'>('quotes');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isUnlocked, setIsUnlocked] = useState(true);

  useEffect(() => {
    setQuotes(getAdminQuotes());
    setInquiries(getAdminInquiries());
  }, []);

  const handleUpdateStatus = (id: string, newStatus: AdminQuoteRequest['status']) => {
    const updated = updateQuoteStatus(id, newStatus);
    setQuotes(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this quote request?')) {
      const updated = deleteAdminQuote(id);
      setQuotes(updated);
    }
  };

  const handleUpdateInquiryStatus = (id: string, newStatus: AdminInquiry['status']) => {
    const updated = updateInquiryStatus(id, newStatus);
    setInquiries(updated);
  };

  // Filter quotes
  const filteredQuotes = quotes.filter((q) => {
    const matchesSearch =
      q.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.refCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.customerPhone.includes(searchQuery) ||
      q.venueCity.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || q.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalRevenuePipeline = quotes.reduce((acc, q) => acc + q.estimatedCost, 0);
  const pendingCount = quotes.filter((q) => q.status === 'Pending').length;
  const confirmedCount = quotes.filter((q) => q.status === 'Confirmed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gold-300">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-gold-600 font-bold text-xs uppercase tracking-widest bg-gold-100 px-3 py-1 rounded-full border border-gold-300">
              Admin Portal
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-bold">
              <Sparkles className="w-3.5 h-3.5" /> Live Auto-Sync Active
            </span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-maroon-900 mt-2">
            SID Events Management Dashboard
          </h1>
          <p className="text-maroon-700/80 text-sm mt-1">
            Real-time customer quote requests, wedding bookings, and event inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <GoldButton variant="gold" size="sm" onClick={() => setQuotes(getAdminQuotes())}>
            Refresh Data
          </GoldButton>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard variant="warm" className="p-6 space-y-2 border-l-4 border-l-gold-500">
          <div className="flex items-center justify-between text-maroon-700">
            <span className="text-xs font-bold uppercase tracking-wider">Total Quote Requests</span>
            <FileText className="w-5 h-5 text-gold-600" />
          </div>
          <p className="font-playfair text-3xl font-bold text-maroon-900">{quotes.length}</p>
          <p className="text-[11px] text-maroon-700/70">{pendingCount} pending review</p>
        </GlassCard>

        <GlassCard variant="warm" className="p-6 space-y-2 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between text-maroon-700">
            <span className="text-xs font-bold uppercase tracking-wider">Pipeline Revenue</span>
            <IndianRupee className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="font-playfair text-3xl font-bold text-maroon-900">
            ₹{totalRevenuePipeline.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-maroon-700/70">Estimated package totals</p>
        </GlassCard>

        <GlassCard variant="warm" className="p-6 space-y-2 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between text-maroon-700">
            <span className="text-xs font-bold uppercase tracking-wider">Confirmed Bookings</span>
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
          </div>
          <p className="font-playfair text-3xl font-bold text-maroon-900">{confirmedCount}</p>
          <p className="text-[11px] text-maroon-700/70">Ready for execution</p>
        </GlassCard>

        <GlassCard variant="warm" className="p-6 space-y-2 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between text-maroon-700">
            <span className="text-xs font-bold uppercase tracking-wider">Online Inquiries</span>
            <Users className="w-5 h-5 text-amber-600" />
          </div>
          <p className="font-playfair text-3xl font-bold text-maroon-900">{inquiries.length}</p>
          <p className="text-[11px] text-maroon-700/70">General consultations</p>
        </GlassCard>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gold-300 gap-8">
        <button
          onClick={() => setActiveTab('quotes')}
          className={`pb-3 font-bold text-sm transition-all border-b-2 ${
            activeTab === 'quotes'
              ? 'border-gold-600 text-maroon-900'
              : 'border-transparent text-maroon-700/60 hover:text-maroon-900'
          }`}
        >
          Customer Quote Requests ({quotes.length})
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`pb-3 font-bold text-sm transition-all border-b-2 ${
            activeTab === 'inquiries'
              ? 'border-gold-600 text-maroon-900'
              : 'border-transparent text-maroon-700/60 hover:text-maroon-900'
          }`}
        >
          Online Inquiries ({inquiries.length})
        </button>
      </div>

      {/* Quote Requests View */}
      {activeTab === 'quotes' && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-maroon-700/50" />
              <input
                type="text"
                placeholder="Search by customer name, ref code or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gold-300 rounded-xl pl-9 pr-4 py-2 text-xs text-maroon-900 focus:outline-none focus:border-gold-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-gold-600" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white border border-gold-300 rounded-xl px-3 py-2 text-xs text-maroon-900 focus:outline-none focus:border-gold-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Quotes Table */}
          <div className="space-y-4">
            {filteredQuotes.length === 0 ? (
              <GlassCard className="p-12 text-center text-maroon-700/70">
                <p className="text-sm font-bold">No quote requests found matching criteria.</p>
              </GlassCard>
            ) : (
              filteredQuotes.map((q) => (
                <GlassCard key={q.id} className="p-6 space-y-4 border border-gold-300 hover:border-gold-500 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold-200 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm text-gold-700 bg-gold-100 border border-gold-300 px-2.5 py-0.5 rounded-md font-mono">
                          #{q.refCode}
                        </span>
                        <h3 className="font-playfair text-lg font-bold text-maroon-900">{q.customerName}</h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-maroon-700/80 font-sans">
                        <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-gold-600" /> {q.customerPhone}</span>
                        <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-gold-600" /> {q.customerEmail}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gold-600" /> {q.weddingDate}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gold-600" /> {q.venueCity} &mdash; {q.venueAddress}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={q.status}
                        onChange={(e) => handleUpdateStatus(q.id, e.target.value as any)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none ${
                          q.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : q.status === 'Contacted'
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : q.status === 'Cancelled'
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <a
                        href={`https://wa.me/${q.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Namaste ${q.customerName}! Thank you for choosing SID Events. We are following up regarding your quote request #${q.refCode}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => handleDelete(q.id)}
                        className="p-2 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors"
                        title="Delete Quote"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 text-xs bg-white/60 p-4 rounded-xl border border-gold-200">
                    <div>
                      <span className="text-maroon-700/60 block font-semibold">Guests</span>
                      <span className="font-bold text-maroon-900">{q.guestCount} Guests</span>
                    </div>
                    <div>
                      <span className="text-maroon-700/60 block font-semibold">Catering Feast</span>
                      <span className="font-bold text-maroon-900 capitalize">{q.cateringTier} Sadhya</span>
                    </div>
                    <div>
                      <span className="text-maroon-700/60 block font-semibold">Photography</span>
                      <span className="font-bold text-maroon-900 capitalize">{q.photographyTier} Tier</span>
                    </div>
                    <div>
                      <span className="text-maroon-700/60 block font-semibold">Purohit Tier</span>
                      <span className="font-bold text-maroon-900 capitalize">{q.purohitTier.replace('_', ' ')}</span>
                    </div>
                    <div>
                      <span className="text-maroon-700/60 block font-semibold">Decor Items</span>
                      <span className="font-bold text-maroon-900">{q.selectedServicesCount} Selected</span>
                    </div>
                    <div>
                      <span className="text-maroon-700/60 block font-semibold">Est. Package Total</span>
                      <span className="font-bold text-emerald-700">₹{q.estimatedCost.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {q.notes && (
                    <div className="text-xs bg-amber-50/70 p-3 rounded-lg border border-amber-200 text-amber-900">
                      <span className="font-bold">Customer Notes:</span> &ldquo;{q.notes}&rdquo;
                    </div>
                  )}
                </GlassCard>
              ))
            )}
          </div>
        </div>
      )}

      {/* Inquiries View */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <GlassCard key={inq.id} className="p-6 space-y-3 border border-gold-300 flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="font-playfair text-base font-bold text-maroon-900">{inq.fullName}</h4>
                <div className="flex items-center gap-4 text-xs text-maroon-700/80 font-sans">
                  <span>Phone: {inq.phone}</span>
                  <span>Event Date: {inq.weddingDate}</span>
                </div>
                {inq.notes && <p className="text-xs text-maroon-900 italic">&ldquo;{inq.notes}&rdquo;</p>}
              </div>

              <select
                value={inq.status}
                onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                className="text-xs font-bold px-3 py-1.5 rounded-lg border border-gold-300 bg-white"
              >
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
