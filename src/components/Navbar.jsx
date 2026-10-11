import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';
import Logo3D from './Logo3D';

export default function Navbar({ activeSection, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'video-proof', label: 'Artist Video Proof' },
    { id: 'talent-roster', label: 'Talent Showcase' },
    { id: 'process', label: 'The 360° Process' },
    { id: 'contact', label: 'Contact & Book' },
  ];

  const handleLinkClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0F0F11]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with 3D WebM Animation */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-3.5 text-left group focus:outline-none"
          >
            <div className="relative group-hover:scale-105 transition-transform duration-300">
              <Logo3D className="w-11 h-11" glowIntensity="normal" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#F59E0B] rounded-full border-2 border-[#0F0F11] animate-pulse" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xl tracking-wider text-white">
                  JAM<span className="text-[#E50914]">JAP</span>
                </span>
                <span className="text-[10px] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded bg-white/[0.08] text-[#F59E0B] border border-[#F59E0B]/30">
                  VIP
                </span>
              </div>
              <span className="text-[10px] font-medium tracking-widest text-[#A1A1AA] uppercase">
                Artist Care & Logistics
              </span>
            </div>
          </button>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-inner">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'text-white shadow-[0_0_15px_rgba(229,9,20,0.35)]'
                      : 'text-[#A1A1AA] hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E50914] to-[#B91C1C] -z-10 animate-fade-in" />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Header Action Button & Status */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>24/7 VIP Ops Live</span>
            </div>

            <button
              onClick={() => handleLinkClick('contact')}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-[#E50914] hover:bg-[#FF2A36] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.45)] hover:shadow-[0_0_30px_rgba(229,9,20,0.8)] flex items-center gap-2"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white hover:text-[#E50914] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-[#0F0F11]/95 backdrop-blur-2xl border-b border-white/[0.1] p-5 shadow-2xl transition-all animate-fade-in">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#E50914] text-white shadow-[0_0_20px_rgba(229,9,20,0.4)]'
                      : 'text-[#A1A1AA] hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-white" />}
                </button>
              );
            })}
            
            <div className="pt-3 border-t border-white/[0.08] mt-2 flex flex-col gap-2">
              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E50914] to-[#B91C1C] text-white font-bold text-center text-sm shadow-[0_0_20px_rgba(229,9,20,0.5)] flex items-center justify-center gap-2"
              >
                <span>Request a Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
