import React from 'react';
import { Star, Quote, ShieldCheck, Award, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { CLIENT_REVIEWS } from '../data/jamjapData';

export default function ReviewsSection() {
  const trustBadges = [
    { icon: ShieldCheck, title: "100% On-Time Protocol", desc: "Zero flight disruptions or missed stage calls" },
    { icon: Lock, title: "Discreet & NDA Compliant", desc: "Rigorous privacy for high-profile celebrities" },
    { icon: Award, title: "24/7 Dedicated Chaperone", desc: "Personal handler by the artist's side at all hours" },
    { icon: Sparkles, title: "VIP Tarmac Clearance", desc: "Priority tarmac transfers & baggage handling" },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-black/40 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold uppercase tracking-widest text-[#E50914] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Reliability & Peace of Mind</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Organizer Endorsements & <br />
            <span className="text-gradient-red">VIP Trust Standards.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Hear directly from festival producers, pageant directors, and corporate gala chairs who rely on JAMJAP when there is zero margin for failure.
          </p>
        </div>

        {/* Client Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {CLIENT_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="rounded-3xl p-7 glass-panel glass-panel-hover border border-white/[0.08] flex flex-col justify-between relative group"
            >
              {/* Highlight badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E50914]/15 border border-[#E50914]/30 text-[#E50914]">
                  {review.eventTag}
                </span>

                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>

              {/* Quote Content */}
              <div className="mb-6">
                <Quote className="w-8 h-8 text-[#E50914]/30 mb-2 group-hover:text-[#E50914]/60 transition-colors" />
                <p className="text-zinc-300 text-sm leading-relaxed italic">
                  “{review.quote}”
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm text-white">
                    {review.author}
                  </h4>
                  <p className="text-xs text-zinc-400">
                    {review.role} • {review.organization}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0" title="Verified Organizer">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* VIP Trust Badges Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#18181B]/80 via-[#0F0F11] to-[#18181B]/80 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#E50914]/10 border border-[#E50914]/30 flex items-center justify-center text-[#E50914] shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-display text-sm font-bold text-white">
                      {badge.title}
                    </h5>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-snug">
                      {badge.desc}
                    </p>
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
