import React from 'react';
import { ArrowUp, Sparkles, Shield, Heart } from 'lucide-react';

import Logo3D from './Logo3D';

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#09090B] border-t border-white/[0.08] pt-16 pb-12 overflow-hidden text-zinc-400">
      {/* Top red glow bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Col with 3D Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <Logo3D className="w-12 h-12" glowIntensity="normal" />
              <div>
                <span className="font-display font-black text-xl tracking-wider text-white">
                  JAM<span className="text-[#E50914]">JAP</span>
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-[#A1A1AA] font-semibold">
                  VIP Artist Management
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              JAMJAP is the luxury entertainment industry’s trusted partner for celebrity pageant judges, headline bands, keynote speakers, and end-to-end VIP logistics care.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Zero Flight Delays • 24/7 Dedicated Chaperones</span>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-white transition-colors">
                  Home / Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Our VIP Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('video-proof')} className="hover:text-white transition-colors">
                  Artist Video Greetings
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('talent-roster')} className="hover:text-white transition-colors">
                  Talent Showcase
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('process')} className="hover:text-white transition-colors">
                  The 360° Process
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Request a Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services Col */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
              Logistics Deliverables
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="text-zinc-400">Celebrity Judge Booking</li>
              <li className="text-zinc-400">Headline Festival Bands</li>
              <li className="text-zinc-400">Private Jet & Flight Routing</li>
              <li className="text-zinc-400">Presidential Suite Handling</li>
              <li className="text-zinc-400">Tarmac Red Carpet Escort</li>
              <li className="text-zinc-400">Post-Event Video Feedback</li>
            </ul>
          </div>

          {/* Bureau & Operations */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="text-white font-medium">Operations Hotline:</div>
              <div className="text-zinc-300 font-mono">+1 (800) JAM-JAP0</div>
              <div className="text-zinc-300 font-mono">+63 917 888 5265</div>
              <div className="text-white font-medium pt-2">Direct Inquiries:</div>
              <div className="text-zinc-300">vip@jamjap.com</div>
              <div className="text-zinc-300">bookings@jamjap.com</div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-zinc-500 text-center sm:text-left">
            © {new Date().getFullYear()} JAMJAP Entertainment Logistics Group. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-zinc-500 hover:text-zinc-400 cursor-pointer">
              Discreet Client NDA Policy
            </span>
            <span className="text-zinc-500 hover:text-zinc-400 cursor-pointer">
              Hospitality Protocol
            </span>
            
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-white/[0.04] hover:bg-[#E50914] text-zinc-400 hover:text-white transition-all shadow-md ml-2"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
