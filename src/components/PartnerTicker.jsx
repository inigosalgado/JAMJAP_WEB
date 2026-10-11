import React from 'react';
import { TRUST_PARTNERS } from '../data/jamjapData';
import { ShieldCheck, Award } from 'lucide-react';

export default function PartnerTicker() {
  return (
    <section className="py-8 border-y border-white/[0.06] bg-black/40 backdrop-blur-md overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex items-center justify-center gap-2 text-center text-xs font-semibold uppercase tracking-widest text-zinc-500">
          <Award className="w-3.5 h-3.5 text-[#E50914]" />
          <span>Trusted by Premier Pageants, Global Festivals & Luxury Venues</span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Left & Right gradient masks for smooth edge fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0F0F11] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0F0F11] to-transparent z-10 pointer-events-none" />

        <div className="flex whitespace-nowrap animate-marquee">
          {[...TRUST_PARTNERS, ...TRUST_PARTNERS].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="inline-flex items-center gap-3 mx-6 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-zinc-300 hover:border-[#E50914]/40 hover:text-white transition-all duration-300 cursor-default"
            >
              <div className="w-2 h-2 rounded-full bg-[#E50914]" />
              <span className="font-display font-bold text-sm tracking-wide text-zinc-200">
                {partner.name}
              </span>
              <span className="text-[10px] text-zinc-500 font-medium px-2 py-0.5 rounded bg-white/[0.04]">
                {partner.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
