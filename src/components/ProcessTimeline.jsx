import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle, ArrowRight, ShieldAlert, 
  Plane, Hotel, UserCheck, Mic, Video, ChevronRight, Award 
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/jamjapData';

const stepIcons = [
  UserCheck, // 01 Talent Selection
  Plane,     // 02 Flights & Hotel
  Hotel,     // 03 Tarmac & VIP Care
  Mic,       // 04 Event Execution
  Video,     // 05 Wrap & Video
];

export default function ProcessTimeline({ onNavigate }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = PROCESS_STEPS[activeStepIndex];
  const IconComponent = stepIcons[activeStepIndex] || CheckCircle;

  return (
    <section id="process" className="py-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-[#E50914]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold uppercase tracking-widest text-[#E50914] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The JAMJAP 360° Standard</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            How Client Requests Are <br />
            <span className="text-gradient-red">Flawlessly Fulfilled.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            A battle-tested 5-step operational pipeline designed to eliminate delays, protect artist dignity, and guarantee organizer peace of mind.
          </p>
        </div>

        {/* Interactive Step Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10 max-w-5xl mx-auto">
          {PROCESS_STEPS.map((stepItem, idx) => {
            const isActive = activeStepIndex === idx;
            const StepIcon = stepIcons[idx] || CheckCircle;

            return (
              <button
                key={stepItem.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`relative p-4 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-b from-[#E50914]/20 to-[#0F0F11] border-[#E50914] shadow-[0_0_25px_rgba(229,9,20,0.35)] scale-[1.02]'
                    : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.15]'
                }`}
              >
                {/* Active Indicator Top Light */}
                {isActive && (
                  <div className="absolute -top-1 left-4 right-4 h-1 bg-[#E50914] rounded-full shadow-[0_0_10px_#E50914]" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono text-sm font-black ${isActive ? 'text-[#E50914]' : 'text-zinc-500'}`}>
                    {stepItem.step}
                  </span>
                  <StepIcon className={`w-4 h-4 ${isActive ? 'text-[#E50914]' : 'text-zinc-500'}`} />
                </div>

                <div>
                  <div className={`text-xs font-bold leading-snug line-clamp-2 ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                    {stepItem.title}
                  </div>
                  <div className="text-[10px] text-zinc-500 font-medium mt-1">
                    {stepItem.tag}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Step Stage & Mock Deliverable Visual */}
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl p-6 sm:p-10 glass-panel border border-[#E50914]/30 shadow-[0_20px_50px_-20px_rgba(229,9,20,0.3)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Step Details */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#E50914] text-white text-xs font-extrabold tracking-wider uppercase shadow-md">
                    {currentStep.badge}
                  </span>
                  <span className="text-xs font-semibold text-[#F59E0B] uppercase tracking-wider">
                    {currentStep.tag}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  {currentStep.title}
                </h3>

                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                  {currentStep.description}
                </p>

                {/* Highlight Perk */}
                <div className="p-4 rounded-2xl bg-black/50 border border-white/[0.08] mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E50914]/20 border border-[#E50914]/40 flex items-center justify-center text-[#E50914] shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">
                      Standard Quality Metric
                    </div>
                    <div className="text-sm font-bold text-white">
                      {currentStep.highlight}
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons for Steps */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex(prev => prev - 1)}
                    className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-zinc-300 transition-colors"
                  >
                    ← Previous Step
                  </button>
                  
                  <button
                    disabled={activeStepIndex === PROCESS_STEPS.length - 1}
                    onClick={() => setActiveStepIndex(prev => prev + 1)}
                    className="px-5 py-2 rounded-xl bg-[#E50914] hover:bg-[#FF2A36] disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-white uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(229,9,20,0.4)] flex items-center gap-1.5"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Interactive Mock Deliverable Card */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl p-6 bg-gradient-to-br from-[#18181B] to-[#0A0A0C] border border-white/10 shadow-2xl relative overflow-hidden">
                  {/* Watermark Logo */}
                  <div className="absolute top-3 right-4 text-3xl font-black text-white/5 font-display select-none">
                    JAMJAP
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#E50914] animate-ping" />
                      <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-300">
                        OFFICIAL DELIVERABLE
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      SECURED & AUDITED
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="text-[10px] uppercase font-bold text-[#F59E0B] tracking-wider mb-1">
                      Artifact Generated
                    </div>
                    <div className="text-base font-bold text-white">
                      {currentStep.deliverableName}
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 mb-5 leading-relaxed bg-black/40 p-3 rounded-xl border border-white/[0.04]">
                    {currentStep.deliverableDetails}
                  </p>

                  <div className="space-y-2 text-[11px] text-zinc-300 pb-2">
                    <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                      <span className="text-zinc-500">JAMJAP Handler Dispatch:</span>
                      <span className="font-semibold text-white">Assigned & Synchronized</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                      <span className="text-zinc-500">Confidentiality:</span>
                      <span className="font-semibold text-white">NDA Tier-1 Encrypted</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-zinc-500">Live Status:</span>
                      <span className="font-semibold text-[#E50914]">Active Deployment Ready</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full mt-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-[#E50914] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Inquire for This Pipeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
