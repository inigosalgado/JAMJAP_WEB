import React, { useState, useEffect } from 'react';
import { 
  Send, Sparkles, Phone, Mail, MapPin, 
  CheckCircle2, Calendar, ShieldCheck, Clock, FileText 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FAQS } from '../data/jamjapData';

export default function QuoteBookingSection({ prefilledTalent, prefilledService }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Pageant',
    date: '',
    servicesNeeded: 'Full Turnkey 360° Package',
    talentPreference: '',
    budgetTier: '$15,000 - $35,000 (VIP Package)',
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    if (prefilledTalent) {
      setFormData(prev => ({ ...prev, talentPreference: prefilledTalent }));
    }
  }, [prefilledTalent]);

  useEffect(() => {
    if (prefilledService) {
      setFormData(prev => ({ ...prev, servicesNeeded: prefilledService }));
    }
  }, [prefilledService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mockRefId = `JJ-VIP-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmissionId(mockRefId);
    setSubmitted(true);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E50914', '#FF2A36', '#F59E0B', '#FFFFFF'],
      });
    } catch (err) {
      // safe fallback
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#E50914]/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold uppercase tracking-widest text-[#E50914] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Initiate VIP Booking</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Contact JAMJAP & <br />
            <span className="text-gradient-red">Request a VIP Quote.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Tell us about your upcoming event. Our senior talent coordinators and flight logistics desk will prepare a tailored proposal within 4 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contacts, Office, Socials & FAQ */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Card */}
            <div className="p-7 rounded-3xl glass-panel border border-white/[0.08] shadow-2xl">
              <h3 className="font-display text-xl font-bold text-white mb-2">
                JAMJAP VIP Concierge Desk
              </h3>
              <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                Direct lines to our 24/7 Operations Command for urgent bookings and flight dispatch assistance.
              </p>

              <div className="space-y-4 text-xs">
                {/* Phone / WhatsApp */}
                <a
                  href="tel:+18005265270"
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E50914]/20 border border-[#E50914]/40 flex items-center justify-center text-[#E50914] group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                      Priority WhatsApp & Phone
                    </div>
                    <div className="text-sm font-bold text-white">
                      +1 (800) JAM-JAP0 / +63 917 888 5265
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:bookings@jamjap.com"
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E50914]/20 border border-[#E50914]/40 flex items-center justify-center text-[#E50914] group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                      Booking & Rider Desk
                    </div>
                    <div className="text-sm font-bold text-white">
                      bookings@jamjap.com • vip@jamjap.com
                    </div>
                  </div>
                </a>

                {/* Office */}
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="w-10 h-10 rounded-xl bg-[#E50914]/20 border border-[#E50914]/40 flex items-center justify-center text-[#E50914] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                      Headquarters & Bureau
                    </div>
                    <div className="text-xs font-semibold text-white">
                      Level 24, Prestige Tower, Entertainment City & Los Angeles
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-6 pt-5 border-t border-white/[0.06]">
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-3">
                  Follow Our Road Tour Behind-The-Scenes
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-[#E50914] text-zinc-300 hover:text-white transition-all border border-white/[0.06]"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-[#E50914] text-zinc-300 hover:text-white transition-all border border-white/[0.06]"
                    aria-label="Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-[#E50914] text-zinc-300 hover:text-white transition-all border border-white/[0.06]"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Accordion FAQs */}
            <div className="p-7 rounded-3xl glass-panel border border-white/[0.08]">
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-zinc-300 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#E50914]" />
                <span>Frequently Asked Questions</span>
              </h4>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/[0.05] overflow-hidden bg-black/30"
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full p-3 text-left text-xs font-semibold text-zinc-200 hover:text-white flex items-center justify-between gap-2"
                    >
                      <span>{faq.q}</span>
                      <span className="text-[#E50914] font-bold text-sm">
                        {activeFaq === idx ? '−' : '+'}
                      </span>
                    </button>
                    {activeFaq === idx && (
                      <div className="p-3 pt-0 text-xs text-zinc-400 border-t border-white/[0.03] leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Booking & Event Quote Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-10 rounded-3xl glass-panel border border-[#E50914]/30 shadow-[0_20px_60px_-15px_rgba(229,9,20,0.25)] relative">
              
              {/* Form Title & Indicator */}
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-6">
                <div>
                  <h3 className="font-display text-2xl font-extrabold text-white">
                    Event Specifications & Rider Request
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Fill out the form below to receive a customized artist & logistics quote.
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>4-Hour Turnaround</span>
                </div>
              </div>

              {submitted ? (
                /* Success Receipt State */
                <div className="py-10 text-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#E50914]/20 border border-[#E50914] flex items-center justify-center text-[#E50914] mx-auto mb-4 shadow-[0_0_30px_rgba(229,9,20,0.5)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <span className="px-3 py-1 rounded-full bg-white/[0.06] text-[#F59E0B] font-mono text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                    Reference ID: {submissionId}
                  </span>

                  <h4 className="font-display text-2xl font-black text-white mb-2">
                    Inquiry Received & Routed to Dispatch
                  </h4>

                  <p className="text-sm text-zinc-300 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you, <span className="font-bold text-white">{formData.name}</span>. A senior talent producer has been assigned to your event (<span className="text-[#E50914] font-medium">{formData.eventType}</span>). We are reviewing flight seat availability and artist schedules.
                  </p>

                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 max-w-md mx-auto text-left text-xs space-y-2 mb-6">
                    <div className="flex justify-between text-zinc-400">
                      <span>Services Requested:</span>
                      <span className="text-white font-medium">{formData.servicesNeeded}</span>
                    </div>
                    {formData.talentPreference && (
                      <div className="flex justify-between text-zinc-400">
                        <span>Requested Talent:</span>
                        <span className="text-white font-medium">{formData.talentPreference}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-zinc-400">
                      <span>Tentative Date:</span>
                      <span className="text-white font-medium">{formData.date || 'TBD'}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                /* Main Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Your Name / Organization <span className="text-[#E50914]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Maria Santos (Apex Productions)"
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Work Email Address <span className="text-[#E50914]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="maria@productionhouse.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Phone / WhatsApp <span className="text-[#E50914]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 019-2834"
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all"
                      />
                    </div>

                    {/* Event Date */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Target Event Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Event Type */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Event Category
                      </label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all cursor-pointer"
                      >
                        <option value="Pageant">Beauty Pageant (National / Regional)</option>
                        <option value="Concert">Live Concert / Arena Tour</option>
                        <option value="Festival">Music Festival (Multi-Day)</option>
                        <option value="Corporate">Corporate Gala & Awards Ceremony</option>
                        <option value="Private VIP">Private Celebration / VIP Party</option>
                      </select>
                    </div>

                    {/* Services Needed */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Services Required
                      </label>
                      <select
                        name="servicesNeeded"
                        value={formData.servicesNeeded}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all cursor-pointer"
                      >
                        <option value="Full Turnkey 360° Package">Full Turnkey 360° Package (Recommended)</option>
                        <option value="Talent Booking & Provision">Talent Booking & Provision Only</option>
                        <option value="Flight & Travel Logistics">Flight & Travel Logistics Only</option>
                        <option value="Luxury Accommodation Handling">Luxury Accommodation Handling</option>
                        <option value="On-Site VIP Care & Event Escort">On-Site VIP Care & Event Escort</option>
                      </select>
                    </div>
                  </div>

                  {/* Requested Artist / Judge */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Requested Artist, Judge, or Performer (Optional)
                    </label>
                    <input
                      type="text"
                      name="talentPreference"
                      value={formData.talentPreference}
                      onChange={handleChange}
                      placeholder="e.g. Elizabeth Vance, The Crimson Echo, or Request Matchmaking"
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all"
                    />
                  </div>

                  {/* Special Requests / Rider Details */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Special Requests, Dietary Riders, or City Location
                    </label>
                    <textarea
                      name="specialRequests"
                      rows={3}
                      value={formData.specialRequests}
                      onChange={handleChange}
                      placeholder="Please note any flight preferences (First Class / Executive Jet), 5-star hotel requirements, specific backstage rider needs, or event venue location..."
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all resize-none"
                    />
                  </div>

                  {/* Privacy & Guarantee note */}
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                    <ShieldCheck className="w-4 h-4 text-[#E50914] shrink-0" />
                    <span>All client discussions, fees, and artist riders are protected under strict Mutual NDA.</span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E50914] to-[#B91C1C] hover:from-[#FF2A36] hover:to-[#DC2626] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(229,9,20,0.5)] hover:shadow-[0_0_45px_rgba(229,9,20,0.8)] flex items-center justify-center gap-2 group"
                  >
                    <span>Submit VIP Request For Review</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
