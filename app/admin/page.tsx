'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/glass-card';
import { GoldButton } from '@/components/ui/gold-button';
import { TraditionalBorder } from '@/components/ui/traditional-border';
import {
  getAdminQuotes,
  saveAdminQuote,
  updateAdminQuote,
  updateQuoteStatus,
  deleteAdminQuote,
  getAdminInquiries,
  saveAdminInquiry,
  updateInquiryStatus,
  deleteAdminInquiry,
  getAdminServices,
  saveAdminService,
  updateAdminService,
  deleteAdminService,
  getAdminPackages,
  saveAdminPackage,
  updateAdminPackage,
  deleteAdminPackage,
  AdminQuoteRequest,
  AdminInquiry,
} from '@/lib/store/admin-store';
import { Service, StandardPackage } from '@/lib/types/wedding';
import {
  FileText,
  Users,
  IndianRupee,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageCircle,
  Search,
  Trash2,
  Filter,
  Sparkles,
  Plus,
  Edit3,
  LogOut,
  Package,
  Layers,
  X,
  Save,
  Check,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [quotes, setQuotes] = useState<AdminQuoteRequest[]>([]);
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [packages, setPackages] = useState<StandardPackage[]>([]);

  const [activeTab, setActiveTab] = useState<'quotes' | 'inquiries' | 'services' | 'packages'>('quotes');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modals state
  const [editQuoteModal, setEditQuoteModal] = useState<AdminQuoteRequest | null>(null);
  const [editServiceModal, setEditServiceModal] = useState<Service | null>(null);
  const [editPackageModal, setEditPackageModal] = useState<StandardPackage | null>(null);
  const [isNewServiceModal, setIsNewServiceModal] = useState(false);
  const [isNewPackageModal, setIsNewPackageModal] = useState(false);

  // Form inputs for modals
  const [svcForm, setSvcForm] = useState<Partial<Service>>({
    name: '',
    category: 'decoration',
    price: 50000,
    unit: 'setup',
    imageUrl: '/sid-party29.jpeg',
    description: '',
  });

  const [pkgForm, setPkgForm] = useState<Partial<StandardPackage>>({
    name: '',
    tagline: '',
    tier: 'gold',
    basePrice: 500000,
    guestCapacity: 500,
    description: '',
    decorationSummary: 'Mandapam & Entrance Decor',
    cateringSummary: 'Banana Leaf Sadhya',
    photographySummary: '4K Cinematic Coverage',
    makeupSummary: 'Bridal HD Makeup',
    purohitSummary: 'Vedic Samagri',
    entertainmentSummary: 'Chenda Melam Troupe',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('sid_admin_authenticated');
      if (!auth) {
        router.push('/admin/login');
        return;
      }
      setIsAuthenticated(true);
      setQuotes(getAdminQuotes());
      setInquiries(getAdminInquiries());
      setServices(getAdminServices());
      setPackages(getAdminPackages());
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('sid_admin_authenticated');
    sessionStorage.removeItem('sid_admin_user');
    router.push('/admin/login');
  };

  // --- Quote Operations ---
  const handleUpdateQuoteStatus = (id: string, status: AdminQuoteRequest['status']) => {
    const updated = updateQuoteStatus(id, status);
    setQuotes(updated);
  };

  const handleDeleteQuote = (id: string) => {
    if (confirm('Are you sure you want to delete this quote request?')) {
      const updated = deleteAdminQuote(id);
      setQuotes(updated);
    }
  };

  const handleSaveQuoteEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editQuoteModal) {
      const updated = updateAdminQuote(editQuoteModal);
      setQuotes(updated);
      setEditQuoteModal(null);
    }
  };

  // --- Service Operations ---
  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (svcForm.name && svcForm.price) {
      const updated = saveAdminService({
        category: (svcForm.category || 'decoration') as any,
        name: svcForm.name,
        description: svcForm.description || '',
        price: Number(svcForm.price),
        unit: svcForm.unit || 'setup',
        imageUrl: svcForm.imageUrl || '/sid-party29.jpeg',
        popular: true,
      });
      setServices(updated);
      setIsNewServiceModal(false);
      setSvcForm({ name: '', category: 'decoration', price: 50000, unit: 'setup', imageUrl: '/sid-party29.jpeg', description: '' });
    }
  };

  const handleSaveServiceEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editServiceModal) {
      const updated = updateAdminService(editServiceModal);
      setServices(updated);
      setEditServiceModal(null);
    }
  };

  const handleDeleteService = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      const updated = deleteAdminService(id);
      setServices(updated);
    }
  };

  // --- Package Operations ---
  const handleCreatePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (pkgForm.name && pkgForm.basePrice) {
      const updated = saveAdminPackage({
        name: pkgForm.name,
        tagline: pkgForm.tagline || '',
        tier: (pkgForm.tier || 'gold') as any,
        basePrice: Number(pkgForm.basePrice),
        guestCapacity: Number(pkgForm.guestCapacity) || 500,
        description: pkgForm.description || '',
        decorationSummary: pkgForm.decorationSummary || '',
        cateringSummary: pkgForm.cateringSummary || '',
        photographySummary: pkgForm.photographySummary || '',
        makeupSummary: pkgForm.makeupSummary || '',
        purohitSummary: pkgForm.purohitSummary || '',
        entertainmentSummary: pkgForm.entertainmentSummary || '',
        popular: false,
      });
      setPackages(updated);
      setIsNewPackageModal(false);
    }
  };

  const handleSavePackageEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editPackageModal) {
      const updated = updateAdminPackage(editPackageModal);
      setPackages(updated);
      setEditPackageModal(null);
    }
  };

  const handleDeletePackage = (id: string) => {
    if (confirm('Are you sure you want to delete this wedding package?')) {
      const updated = deleteAdminPackage(id);
      setPackages(updated);
    }
  };

  // --- Inquiry Operations ---
  const handleDeleteInquiry = (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      const updated = deleteAdminInquiry(id);
      setInquiries(updated);
    }
  };

  const handleUpdateInquiryStatus = (id: string, status: AdminInquiry['status']) => {
    const updated = updateInquiryStatus(id, status);
    setInquiries(updated);
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-maroon-950 text-white flex items-center justify-center">Verifying Access...</div>;
  }

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
      
      {/* Top Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gold-300">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-gold-600 font-bold text-xs uppercase tracking-widest bg-gold-100 px-3 py-1 rounded-full border border-gold-300">
              Admin Portal
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-bold">
              <Sparkles className="w-3.5 h-3.5" /> Supabase Live Data Sync
            </span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-maroon-900 mt-2">
            SID Events Control Center
          </h1>
          <p className="text-maroon-700/80 text-sm mt-1">
            Manage quotes, customer bookings, service catalog prices and wedding packages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <GoldButton variant="dark" size="sm" onClick={handleLogout} icon={<LogOut className="w-4 h-4" />}>
            Sign Out
          </GoldButton>
        </div>
      </div>

      {/* Overview Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard variant="warm" className="p-6 space-y-2 border-l-4 border-l-gold-500">
          <div className="flex items-center justify-between text-maroon-700">
            <span className="text-xs font-bold uppercase tracking-wider">Quote Requests</span>
            <FileText className="w-5 h-5 text-gold-600" />
          </div>
          <p className="font-playfair text-3xl font-bold text-maroon-900">{quotes.length}</p>
          <p className="text-[11px] text-maroon-700/70">{pendingCount} pending review</p>
        </GlassCard>

        <GlassCard variant="warm" className="p-6 space-y-2 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between text-maroon-700">
            <span className="text-xs font-bold uppercase tracking-wider">Pipeline Value</span>
            <IndianRupee className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="font-playfair text-3xl font-bold text-maroon-900">
            ₹{totalRevenuePipeline.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-maroon-700/70">Total value in pipeline</p>
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
            <span className="text-xs font-bold uppercase tracking-wider">Active Services</span>
            <Layers className="w-5 h-5 text-amber-600" />
          </div>
          <p className="font-playfair text-3xl font-bold text-maroon-900">{services.length}</p>
          <p className="text-[11px] text-maroon-700/70">Configured offerings</p>
        </GlassCard>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-gold-300 gap-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('quotes')}
          className={`pb-3 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'quotes'
              ? 'border-gold-600 text-maroon-900'
              : 'border-transparent text-maroon-700/60 hover:text-maroon-900'
          }`}
        >
          Quote Requests ({quotes.length})
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`pb-3 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'inquiries'
              ? 'border-gold-600 text-maroon-900'
              : 'border-transparent text-maroon-700/60 hover:text-maroon-900'
          }`}
        >
          Online Inquiries ({inquiries.length})
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`pb-3 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'services'
              ? 'border-gold-600 text-maroon-900'
              : 'border-transparent text-maroon-700/60 hover:text-maroon-900'
          }`}
        >
          Services Manager ({services.length})
        </button>

        <button
          onClick={() => setActiveTab('packages')}
          className={`pb-3 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'packages'
              ? 'border-gold-600 text-maroon-900'
              : 'border-transparent text-maroon-700/60 hover:text-maroon-900'
          }`}
        >
          Packages Manager ({packages.length})
        </button>
      </div>

      {/* TAB 1: QUOTES */}
      {activeTab === 'quotes' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-maroon-700/50" />
              <input
                type="text"
                placeholder="Search name, ref code or city..."
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

          <div className="space-y-4">
            {filteredQuotes.map((q) => (
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
                      onChange={(e) => handleUpdateQuoteStatus(q.id, e.target.value as any)}
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

                    <button
                      onClick={() => setEditQuoteModal(q)}
                      className="p-2 rounded-lg bg-gold-100 text-gold-800 hover:bg-gold-200 transition-colors"
                      title="Edit Record"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <a
                      href={`https://wa.me/${q.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Namaste ${q.customerName}! Thank you for choosing SID Events. We are following up regarding quote request #${q.refCode}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
                      title="Chat on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => handleDeleteQuote(q.id)}
                      className="p-2 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors"
                      title="Delete Quote"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

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
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <GlassCard key={inq.id} className="p-6 space-y-3 border border-gold-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-playfair text-base font-bold text-maroon-900">{inq.fullName}</h4>
                <div className="flex items-center gap-4 text-xs text-maroon-700/80 font-sans">
                  <span>Phone: {inq.phone}</span>
                  <span>Event Date: {inq.weddingDate}</span>
                </div>
                {inq.notes && <p className="text-xs text-maroon-900 italic">&ldquo;{inq.notes}&rdquo;</p>}
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={inq.status}
                  onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg border border-gold-300 bg-white"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <button
                  onClick={() => handleDeleteInquiry(inq.id)}
                  className="p-2 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* TAB 3: SERVICES CATALOG MANAGER */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-playfair text-xl font-bold text-maroon-900">Manage Service Offerings & Pricing</h3>
            <GoldButton size="sm" variant="gold" icon={<Plus className="w-4 h-4" />} onClick={() => setIsNewServiceModal(true)}>
              Add New Service
            </GoldButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <GlassCard key={svc.id} className="p-5 space-y-3 relative border border-gold-300 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600 bg-gold-100 px-2 py-0.5 rounded border border-gold-300">
                    {svc.category}
                  </span>
                  <h4 className="font-playfair font-bold text-base text-maroon-900">{svc.name}</h4>
                  <p className="text-xs text-maroon-700/80 line-clamp-2">{svc.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gold-200">
                  <span className="font-bold text-sm text-emerald-800">
                    ₹{svc.price.toLocaleString('en-IN')} <span className="text-[10px] font-normal text-maroon-700">/{svc.unit}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditServiceModal(svc)}
                      className="p-1.5 rounded-md bg-gold-100 text-gold-800 hover:bg-gold-200"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(svc.id)}
                      className="p-1.5 rounded-md bg-rose-100 text-rose-700 hover:bg-rose-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PACKAGES MANAGER */}
      {activeTab === 'packages' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-playfair text-xl font-bold text-maroon-900">Manage Standard Wedding Packages</h3>
            <GoldButton size="sm" variant="gold" icon={<Plus className="w-4 h-4" />} onClick={() => setIsNewPackageModal(true)}>
              Add New Package
            </GoldButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.map((pkg) => (
              <GlassCard key={pkg.id} className="p-6 space-y-4 border-2 border-gold-400 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-700 bg-gold-100 px-3 py-1 rounded-full border border-gold-300">
                      {pkg.tier} tier
                    </span>
                    <span className="font-playfair font-bold text-lg text-emerald-800">
                      ₹{pkg.basePrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <h3 className="font-playfair font-bold text-xl text-maroon-900">{pkg.name}</h3>
                  <p className="text-xs text-maroon-700 font-medium">&ldquo;{pkg.tagline}&rdquo;</p>
                  <p className="text-xs text-maroon-800/80">{pkg.description}</p>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-gold-300">
                  <button
                    onClick={() => setEditPackageModal(pkg)}
                    className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-gold-100 text-gold-900 hover:bg-gold-200"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit Package
                  </button>
                  <button
                    onClick={() => handleDeletePackage(pkg.id)}
                    className="p-1.5 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* EDIT QUOTE MODAL */}
      {editQuoteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <GlassCard className="max-w-lg w-full p-6 space-y-4 relative bg-white">
            <button onClick={() => setEditQuoteModal(null)} className="absolute top-4 right-4 text-maroon-800">
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-playfair text-xl font-bold text-maroon-900">Edit Quote #{editQuoteModal.refCode}</h3>

            <form onSubmit={handleSaveQuoteEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Customer Name</label>
                <input
                  type="text"
                  value={editQuoteModal.customerName}
                  onChange={(e) => setEditQuoteModal({ ...editQuoteModal, customerName: e.target.value })}
                  className="w-full border border-gold-300 rounded-lg p-2 text-maroon-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Phone</label>
                  <input
                    type="text"
                    value={editQuoteModal.customerPhone}
                    onChange={(e) => setEditQuoteModal({ ...editQuoteModal, customerPhone: e.target.value })}
                    className="w-full border border-gold-300 rounded-lg p-2 text-maroon-900"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Email</label>
                  <input
                    type="email"
                    value={editQuoteModal.customerEmail}
                    onChange={(e) => setEditQuoteModal({ ...editQuoteModal, customerEmail: e.target.value })}
                    className="w-full border border-gold-300 rounded-lg p-2 text-maroon-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Estimated Cost (₹)</label>
                  <input
                    type="number"
                    value={editQuoteModal.estimatedCost}
                    onChange={(e) => setEditQuoteModal({ ...editQuoteModal, estimatedCost: Number(e.target.value) })}
                    className="w-full border border-gold-300 rounded-lg p-2 text-maroon-900"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Status</label>
                  <select
                    value={editQuoteModal.status}
                    onChange={(e) => setEditQuoteModal({ ...editQuoteModal, status: e.target.value as any })}
                    className="w-full border border-gold-300 rounded-lg p-2 text-maroon-900"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Notes</label>
                <textarea
                  rows={3}
                  value={editQuoteModal.notes || ''}
                  onChange={(e) => setEditQuoteModal({ ...editQuoteModal, notes: e.target.value })}
                  className="w-full border border-gold-300 rounded-lg p-2 text-maroon-900"
                />
              </div>

              <GoldButton fullWidth variant="gold" icon={<Save className="w-4 h-4" />}>
                Save Changes
              </GoldButton>
            </form>
          </GlassCard>
        </div>
      )}

      {/* NEW SERVICE MODAL */}
      {isNewServiceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <GlassCard className="max-w-md w-full p-6 space-y-4 relative bg-white">
            <button onClick={() => setIsNewServiceModal(false)} className="absolute top-4 right-4 text-maroon-800">
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-playfair text-xl font-bold text-maroon-900">Add New Service Offering</h3>

            <form onSubmit={handleCreateService} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Service Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Traditional Flower Gate"
                  value={svcForm.name}
                  onChange={(e) => setSvcForm({ ...svcForm, name: e.target.value })}
                  className="w-full border border-gold-300 rounded-lg p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Category</label>
                  <select
                    value={svcForm.category}
                    onChange={(e) => setSvcForm({ ...svcForm, category: e.target.value as any })}
                    className="w-full border border-gold-300 rounded-lg p-2"
                  >
                    <option value="decoration">Decoration</option>
                    <option value="food">Catering</option>
                    <option value="photography">Photography</option>
                    <option value="makeup">Bridal Makeup</option>
                    <option value="purohit">Purohit</option>
                    <option value="security">Security</option>
                    <option value="welcome_girls">Welcome Hostesses</option>
                    <option value="dancers">Cultural Dancers</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={svcForm.price}
                    onChange={(e) => setSvcForm({ ...svcForm, price: Number(e.target.value) })}
                    className="w-full border border-gold-300 rounded-lg p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={svcForm.description}
                  onChange={(e) => setSvcForm({ ...svcForm, description: e.target.value })}
                  className="w-full border border-gold-300 rounded-lg p-2"
                />
              </div>

              <GoldButton fullWidth variant="gold" icon={<Plus className="w-4 h-4" />}>
                Create Service Offering
              </GoldButton>
            </form>
          </GlassCard>
        </div>
      )}

      {/* EDIT SERVICE MODAL */}
      {editServiceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <GlassCard className="max-w-md w-full p-6 space-y-4 relative bg-white">
            <button onClick={() => setEditServiceModal(null)} className="absolute top-4 right-4 text-maroon-800">
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-playfair text-xl font-bold text-maroon-900">Edit Service Offering</h3>

            <form onSubmit={handleSaveServiceEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Service Name</label>
                <input
                  type="text"
                  required
                  value={editServiceModal.name}
                  onChange={(e) => setEditServiceModal({ ...editServiceModal, name: e.target.value })}
                  className="w-full border border-gold-300 rounded-lg p-2 text-maroon-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editServiceModal.price}
                    onChange={(e) => setEditServiceModal({ ...editServiceModal, price: Number(e.target.value) })}
                    className="w-full border border-gold-300 rounded-lg p-2 text-maroon-900"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Unit</label>
                  <input
                    type="text"
                    value={editServiceModal.unit}
                    onChange={(e) => setEditServiceModal({ ...editServiceModal, unit: e.target.value })}
                    className="w-full border border-gold-300 rounded-lg p-2 text-maroon-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editServiceModal.description}
                  onChange={(e) => setEditServiceModal({ ...editServiceModal, description: e.target.value })}
                  className="w-full border border-gold-300 rounded-lg p-2 text-maroon-900"
                />
              </div>

              <GoldButton fullWidth variant="gold" icon={<Save className="w-4 h-4" />}>
                Save Changes
              </GoldButton>
            </form>
          </GlassCard>
        </div>
      )}

      {/* EDIT PACKAGE MODAL */}
      {editPackageModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <GlassCard className="max-w-md w-full p-6 space-y-4 relative bg-white">
            <button onClick={() => setEditPackageModal(null)} className="absolute top-4 right-4 text-maroon-800">
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-playfair text-xl font-bold text-maroon-900">Edit Package: {editPackageModal.name}</h3>

            <form onSubmit={handleSavePackageEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Package Name</label>
                <input
                  type="text"
                  required
                  value={editPackageModal.name}
                  onChange={(e) => setEditPackageModal({ ...editPackageModal, name: e.target.value })}
                  className="w-full border border-gold-300 rounded-lg p-2 text-maroon-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Base Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editPackageModal.basePrice}
                    onChange={(e) => setEditPackageModal({ ...editPackageModal, basePrice: Number(e.target.value) })}
                    className="w-full border border-gold-300 rounded-lg p-2 text-maroon-900"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Guest Capacity</label>
                  <input
                    type="number"
                    value={editPackageModal.guestCapacity}
                    onChange={(e) => setEditPackageModal({ ...editPackageModal, guestCapacity: Number(e.target.value) })}
                    className="w-full border border-gold-300 rounded-lg p-2 text-maroon-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editPackageModal.description}
                  onChange={(e) => setEditPackageModal({ ...editPackageModal, description: e.target.value })}
                  className="w-full border border-gold-300 rounded-lg p-2 text-maroon-900"
                />
              </div>

              <GoldButton fullWidth variant="gold" icon={<Save className="w-4 h-4" />}>
                Save Changes
              </GoldButton>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
