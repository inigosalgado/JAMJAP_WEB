import React, { useState } from 'react';
import { Sparkles, Star, ArrowRight, UserCheck, CheckCircle2, Shield, Calendar } from 'lucide-react';
import { TALENT_ROSTER } from '../data/jamjapData';

export default function TalentRoster({ onBookTalent, onOpenVideoByArtist }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Roster' },
    { id: 'pageant', label: 'Pageant Judges' },
    { id: 'bands', label: 'Bands & Musicians' },
    { id: 'hosts', label: 'VIP Hosts & Emcees' },
  ];

  const filteredTalents = activeCategory === 'all'
    ? TALENT_ROSTER
    : TALENT_ROSTER.filter(t => t.category === activeCategory);

  return (
    <section id="talent-roster" className="py-24 relative overflow-hidden bg-black/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#E50914]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold uppercase tracking-widest text-[#E50914] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vetted Celebrity & Headliner Roster</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Curated Talent Showcase, <br />
            <span className="text-gradient-red">Ready for Prime Stage.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            From internationally recognized pageant queens to high-energy festival headliners and polished prime-time hosts — managed with full VIP hospitality care.
          </p>
        </div>

        {/* Tabbed Filter Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-[#E50914] text-white shadow-[0_0_25px_rgba(229,9,20,0.5)] scale-105'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Talent Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredTalents.map((talent) => (
            <div
              key={talent.id}
              className="group relative rounded-3xl overflow-hidden glass-panel glass-panel-hover border border-white/[0.08] flex flex-col justify-between"
            >
              {/* Profile Image & Badges */}
              <div className="relative aspect-[4/4.5] overflow-hidden bg-zinc-950">
                <img
                  src={talent.image}
                  alt={talent.name}
                  className="w-full h-full object-cover object-top filter brightness-[0.95] group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-black/20 to-transparent" />

                {/* Availability status tag */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{talent.availStatus}</span>
                </div>

                {/* Tier tag */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#E50914] text-[10px] font-extrabold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(229,9,20,0.5)]">
                  {talent.quoteTier}
                </div>
              </div>

              {/* Profile Meta Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold text-[#F59E0B] uppercase tracking-wider">
                      {talent.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{talent.rating.toFixed(1)}</span>
                      <span className="text-zinc-500 text-[10px]">({talent.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-red-400 transition-colors">
                    {talent.name}
                  </h3>
                  
                  <div className="text-xs text-zinc-400 font-medium mb-3">
                    {talent.role}
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                    {talent.bio}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {talent.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-[10px] font-medium text-zinc-300 border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2">
                  <button
                    onClick={() => onBookTalent(talent.name)}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#E50914] to-[#B91C1C] hover:from-[#FF2A36] hover:to-[#DC2626] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:shadow-[0_0_30px_rgba(229,9,20,0.7)] flex items-center justify-center gap-2"
                  >
                    <span>Book This Talent</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenVideoByArtist(talent.name)}
                    className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/[0.08] transition-colors"
                    title="Watch greetings & footage"
                  >
                    <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Custom Talent Match Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E50914]/20 border border-[#E50914]/40 flex items-center justify-center text-[#E50914] shrink-0">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Looking for a Specific Celebrity or Artist Not Listed Here?
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                JAMJAP maintains direct relations with top global agencies, regional television networks, and international pageant organizations.
              </p>
            </div>
          </div>

          <button
            onClick={() => onBookTalent("Custom Celebrity Inquiry")}
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all shrink-0"
          >
            Custom Talent Inquiry
          </button>
        </div>

      </div>
    </section>
  );
}
