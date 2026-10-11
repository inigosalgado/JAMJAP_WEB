import React, { useState, useEffect } from 'react';
import { Play, ArrowRight, Sparkles, Plane, Hotel, ShieldCheck, Star, Award, CheckCircle2 } from 'lucide-react';
import { STATS_DATA } from '../data/jamjapData';

import Logo3D from './Logo3D';

export default function Hero({ onOpenVideo, onNavigate }) {
  // Animated stats counter
  const [counts, setCounts] = useState({ 0: 0, 1: 0, 2: 0, 3: 0 });

  useEffect(() => {
    const duration = 1600;
    const steps = 40;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      
      setCounts({
        0: Math.floor(progress * 100),
        1: 0,
        2: Math.floor(progress * 250),
        3: Math.floor(progress * 100),
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 3D Animated Brand Emblem Centerpiece */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative group cursor-pointer" onClick={() => onNavigate('services')}>
            <div className="relative p-2 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl shadow-[0_0_40px_rgba(229,9,20,0.35)] group-hover:border-[#E50914]/50 group-hover:shadow-[0_0_60px_rgba(229,9,20,0.6)] transition-all duration-500">
              <Logo3D className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" glowIntensity="intense" />
            </div>
            {/* Ambient Red Spot */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#E50914] rounded-full blur-xl opacity-60 pointer-events-none" />
          </div>

          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#E50914]/40 backdrop-blur-xl shadow-[0_0_20px_rgba(229,9,20,0.25)] mt-5">
            <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-300">
              Premier Artist Management & VIP Care Agency
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          </div>
        </div>

        {/* Main Headline & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
            Seamless Artist Management & <br className="hidden sm:inline" />
            <span className="text-gradient-red relative inline-block">
              Flawless VIP Hospitality.
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E50914] to-transparent opacity-80" />
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-zinc-400 font-normal leading-relaxed max-w-3xl mx-auto">
            From flight bookings and luxury accommodations to full on-site artist handling — <span className="text-zinc-200 font-medium">JAMJAP</span> ensures your talent feels valued before, during, and after every event.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            {/* Primary CTA - Watch Greetings with Glowing Pulse */}
            <button
              onClick={() => onOpenVideo('video-1')}
              className="w-full sm:w-auto relative group px-8 py-4 rounded-full bg-gradient-to-r from-[#E50914] to-[#B91C1C] text-white font-bold text-sm sm:text-base tracking-wide uppercase transition-all duration-300 shadow-[0_0_35px_rgba(229,9,20,0.6)] hover:shadow-[0_0_55px_rgba(229,9,20,0.9)] hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shadow-inner group-hover:bg-white group-hover:text-[#E50914] transition-colors">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              <span>Watch Artist Greetings</span>
            </button>

            {/* Secondary CTA - Request Quote */}
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.12] hover:border-[#E50914]/50 text-white font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 backdrop-blur-xl flex items-center justify-center gap-2 group"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-[#E50914] group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>

        {/* Hero Visual Card Showcase */}
        <div className="relative mt-8 max-w-5xl mx-auto">
          {/* Outer glowing border card */}
          <div className="relative rounded-3xl p-1.5 bg-gradient-to-b from-white/10 via-[#E50914]/30 to-white/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
            <div className="relative rounded-[22px] overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-zinc-950">
              
              <img
                src="/images/hero_vip_stage.jpg"
                alt="JAMJAP VIP Artist Runway and Live Stage"
                className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.08] hover:scale-105 transition-transform duration-700"
              />

              {/* Ambient overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F11] via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F11]/60 via-transparent to-[#0F0F11]/60" />

              {/* Center Play Overlay Trigger */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => onOpenVideo('video-1')}
                  className="group relative flex items-center gap-4 px-6 py-3.5 rounded-full bg-black/60 hover:bg-[#E50914] border border-white/20 hover:border-[#E50914] backdrop-blur-xl transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(229,9,20,0.8)]"
                >
                  <div className="w-10 h-10 rounded-full bg-[#E50914] group-hover:bg-white text-white group-hover:text-[#E50914] flex items-center justify-center transition-colors shadow-lg">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-white uppercase tracking-wider">
                      Watch Reel Preview
                    </div>
                    <div className="text-[11px] text-zinc-400 group-hover:text-white/80">
                      Celebrity Judges & Headline Bands
                    </div>
                  </div>
                </button>
              </div>

              {/* Bottom Left Floating Badge */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 max-w-xs">
                <div className="p-3 sm:p-4 rounded-2xl bg-[#0F0F11]/85 border border-white/10 backdrop-blur-md shadow-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-300">
                      Live Event Deployment
                    </span>
                  </div>
                  <p className="text-xs text-white font-medium">
                    Miss Universe Regional & RockFest Arena — 100% On-Time Protocol
                  </p>
                </div>
              </div>

              {/* Top Right Floating Badge */}
              <div className="hidden sm:flex absolute top-6 right-6 items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#0F0F11]/80 border border-white/10 backdrop-blur-md shadow-xl">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-[10px] font-bold border border-black">
                    VIP
                  </div>
                  <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-[10px] font-bold border border-black text-black">
                    ★
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold text-white">End-to-End Escort</div>
                  <div className="text-[10px] text-zinc-400">Tarmac to Stage Backstage</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Quick Stats Banner (Animated Counter) */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-7 rounded-3xl glass-panel shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)] border border-white/[0.08]">
            {STATS_DATA.map((item, idx) => {
              const currentNumber = counts[idx] !== undefined ? counts[idx] : item.value;
              return (
                <div
                  key={item.id}
                  className="flex flex-col items-center sm:items-start text-center sm:text-left px-3 py-2 border-b sm:border-b-0 sm:border-r border-white/[0.06] last:border-none"
                >
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                      {currentNumber}
                    </span>
                    <span className="font-display text-2xl sm:text-3xl font-black text-[#E50914]">
                      {item.suffix}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-zinc-200 mt-1">
                    {item.label}
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5">
                    {item.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
