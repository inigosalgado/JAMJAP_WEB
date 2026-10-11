import React, { useState } from 'react';
import { Play, Sparkles, Filter, Star, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { VIDEO_GREETINGS } from '../data/jamjapData';

export default function VideoProofSection({ onSelectVideo }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Greetings' },
    { id: 'bands', label: 'Bands & Musicians' },
    { id: 'pageant', label: 'Pageant Judges' },
    { id: 'celebrities', label: 'Guest Celebrities' },
  ];

  const filteredVideos = activeCategory === 'all'
    ? VIDEO_GREETINGS
    : VIDEO_GREETINGS.filter(v => v.category === activeCategory);

  return (
    <section id="video-proof" className="py-24 relative overflow-hidden bg-black/30">
      {/* Background ambient red lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#E50914]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold uppercase tracking-widest text-[#E50914] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Unfiltered Video Evidence</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Loved by Artists, <br />
            <span className="text-gradient-red">Trusted by Organizers.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Watch genuine video greetings and shoutouts from bands, pageant judges, and performers we’ve managed on the road.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
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

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => onSelectVideo(video.id)}
              className="group relative rounded-3xl overflow-hidden glass-panel glass-panel-hover border border-white/[0.08] cursor-pointer flex flex-col justify-between"
            >
              {/* Media Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                <img
                  src={video.thumbnail}
                  alt={`${video.artist} greeting`}
                  className="w-full h-full object-cover object-center filter brightness-[0.92] group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F11] via-black/30 to-transparent" />

                {/* Duration Tag */}
                <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-white border border-white/10 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#E50914]" />
                  <span>{video.duration}</span>
                </div>

                {/* Category Tag */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#E50914]/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                  {video.categoryLabel}
                </div>

                {/* Glowing Play Overlay Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Pulsing ring outer glow */}
                    <div className="absolute inset-0 rounded-full bg-[#E50914] blur-md opacity-40 group-hover:opacity-80 group-hover:scale-125 transition-all duration-300" />
                    
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E50914] to-[#B91C1C] text-white flex items-center justify-center shadow-[0_0_30px_rgba(229,9,20,0.6)] group-hover:scale-110 transition-transform duration-300 relative z-10 border border-white/30">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-[#F59E0B] uppercase tracking-wider">
                      {video.event}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(video.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                    {video.artist}
                  </h3>
                  <div className="text-xs text-zinc-400 font-medium mb-4">
                    {video.role}
                  </div>

                  {/* Quote Snippet */}
                  <p className="text-xs text-zinc-300 italic line-clamp-2 mb-4 bg-white/[0.02] p-3 rounded-xl border border-white/[0.04]">
                    {video.quote}
                  </p>
                </div>

                {/* Handled Logistics Preview Badge */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E50914]" />
                    <span>{video.logisticsHandled.length} Key Logistics Handled</span>
                  </div>

                  <span className="text-xs font-bold text-[#E50914] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Watch Reel →
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Trust Bottom Notice */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>All greetings recorded with artist consent post-event. Full raw files available for event organizers upon contract request.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
