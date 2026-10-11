import React from 'react';

export default function BackgroundGlows() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* Top Center Electric Crimson Ambient Orb */}
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] md:w-[950px] h-[550px] rounded-full blur-[140px] opacity-25 mix-blend-screen"
        style={{ background: 'radial-gradient(circle, #E50914 0%, #DC2626 40%, transparent 75%)' }}
      />

      {/* Right Mid Red Glow */}
      <div 
        className="absolute top-[35%] -right-48 w-[500px] h-[600px] rounded-full blur-[150px] opacity-15 mix-blend-screen"
        style={{ background: 'radial-gradient(circle, #E50914 0%, transparent 70%)' }}
      />

      {/* Left Bottom Crimson Glow */}
      <div 
        className="absolute bottom-[20%] -left-48 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 mix-blend-screen"
        style={{ background: 'radial-gradient(circle, #991B1B 0%, #E50914 30%, transparent 70%)' }}
      />

      {/* Subtle Dark Vignette Border */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#09090b_90%)] opacity-80" />
    </div>
  );
}
