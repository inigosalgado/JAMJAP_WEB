import React, { useRef, useEffect } from 'react';

export default function Logo3D({ 
  className = "w-10 h-10", 
  glow = true, 
  glowIntensity = "normal" 
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle autoplay policy if needed
      });
    }
  }, []);

  const glowStyles = {
    subtle: 'drop-shadow-[0_0_12px_rgba(229,9,20,0.4)]',
    normal: 'drop-shadow-[0_0_20px_rgba(229,9,20,0.55)]',
    intense: 'drop-shadow-[0_0_35px_rgba(229,9,20,0.85)] filter-brightness-110',
    none: '',
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {/* Ambient Red Halo Behind 3D Logo */}
      {glow && (
        <div 
          className="absolute inset-0 rounded-full bg-[#E50914] opacity-30 blur-xl pointer-events-none transform scale-110 animate-pulse-subtle" 
        />
      )}

      {/* 3D WebM Logo Video */}
      <video
        ref={videoRef}
        src="/extruded_3d_logo.webm"
        autoPlay
        loop
        muted
        playsInline
        className={`w-full h-full object-contain relative z-10 select-none pointer-events-none ${
          glow ? glowStyles[glowIntensity] || glowStyles.normal : ''
        }`}
      />
    </div>
  );
}
