import React, { useState } from 'react';
import { 
  Music, Plane, Hotel, ShieldCheck, CheckCircle, 
  ArrowRight, Sparkles, Check, ChevronRight, Eye 
} from 'lucide-react';
import { SERVICES_DATA } from '../data/jamjapData';

const iconMap = {
  Music: Music,
  Plane: Plane,
  Hotel: Hotel,
  ShieldCheck: ShieldCheck,
  CheckCircle: CheckCircle,
};

export default function ServicesSection({ onSelectService, onNavigate }) {
  const [selectedService, setSelectedService] = useState(null);

  const handleInquireService = (serviceTitle) => {
    onSelectService(serviceTitle);
    onNavigate('contact');
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background radial crimson */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#E50914]/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold uppercase tracking-widest text-[#E50914] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Artist & Event Solutions</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            End-to-End Talent Logistics, <br />
            <span className="text-gradient-red">Zero Margin for Error.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            We handle everything from initial matchmaking to tarmac VIP transfers, 5-star suites, and personal backstage handlers so you can produce an unforgettable event.
          </p>
        </div>

        {/* Interactive Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Music;
            const isFeatured = index === 0 || index === 3;

            return (
              <div
                key={service.id}
                className={`group relative rounded-3xl p-7 transition-all duration-300 glass-panel glass-panel-hover flex flex-col justify-between ${
                  isFeatured ? 'border-[#E50914]/30' : 'border-white/[0.07]'
                }`}
              >
                {/* Glowing top line accent */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#E50914]/40 group-hover:via-[#E50914] to-transparent transition-all duration-500" />

                <div>
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.1] group-hover:border-[#E50914]/50 group-hover:bg-[#E50914]/10 text-[#E50914] flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.1)] group-hover:shadow-[0_0_25px_rgba(229,9,20,0.4)]">
                      <IconComponent className="w-7 h-7" />
                    </div>

                    <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-white/[0.04] text-zinc-400 group-hover:text-white group-hover:bg-[#E50914]/20 border border-white/[0.06] group-hover:border-[#E50914]/30 transition-colors">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-red-400 transition-colors mb-1">
                    {service.title}
                  </h3>
                  <div className="text-xs font-medium text-[#F59E0B] mb-3">
                    {service.tagline}
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-white/[0.06] mb-6">
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-[#E50914] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VIP Perk & Action Buttons */}
                <div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.05] mb-5">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-[#F59E0B] mb-0.5">
                      VIP Advantage
                    </div>
                    <div className="text-xs text-zinc-300 italic">
                      “{service.vipPerk}”
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => handleInquireService(service.title)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-[#E50914] text-white font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-1.5 group-hover:shadow-[0_0_20px_rgba(229,9,20,0.4)]"
                    >
                      <span>Inquire Package</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    
                    <button
                      onClick={() => setSelectedService(service)}
                      className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white border border-white/[0.08] transition-colors"
                      title="View Full Specifications"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}

          {/* 6th Card: Custom 360° VIP Turnkey Package Card */}
          <div className="relative rounded-3xl p-7 bg-gradient-to-b from-[#E50914]/20 via-[#0F0F11] to-[#0F0F11] border border-[#E50914]/40 flex flex-col justify-between shadow-[0_15px_40px_-15px_rgba(229,9,20,0.3)]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E50914] text-white text-[11px] font-bold uppercase tracking-wider mb-5">
                <Sparkles className="w-3 h-3 fill-current" />
                <span>Full Turnkey Production</span>
              </div>

              <h3 className="font-display text-2xl font-black text-white mb-2">
                Need The Complete 360° Package?
              </h3>
              
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                Bundle talent matchmaking, executive private jet transfers, 5-star penthouse booking, dedicated 24/7 security chaperone, and broadcast video proof under one single transparent agreement.
              </p>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2 mb-6 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Single Dedicated Lead Producer</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Custom Rider & Dietary Protocol</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Guaranteed Zero Disruption Clause</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleInquireService("Full Turnkey 360° Package")}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#E50914] hover:bg-[#FF2A36] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(229,9,20,0.5)] hover:shadow-[0_0_35px_rgba(229,9,20,0.8)] flex items-center justify-center gap-2"
            >
              <span>Build Custom 360° Contract</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#121216] border border-[#E50914]/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(229,9,20,0.3)]">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#E50914]/20 border border-[#E50914]/40 text-[#E50914] text-xs font-bold uppercase tracking-wider">
                {selectedService.badge}
              </span>
              <span className="text-xs text-[#F59E0B] font-semibold">{selectedService.tagline}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-3">
              {selectedService.title}
            </h3>

            <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
              {selectedService.description}
            </p>

            <div className="bg-black/50 rounded-2xl p-4 border border-white/[0.06] mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Deliverables & Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-200">
                    <Check className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#E50914]/10 border border-[#E50914]/30 mb-6">
              <div className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider mb-1">
                JAMJAP Exclusive Protocol
              </div>
              <p className="text-xs text-zinc-200">
                {selectedService.vipPerk}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 text-xs font-semibold transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  handleInquireService(title);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#FF2A36] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(229,9,20,0.5)]"
              >
                Inquire For Your Event
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
