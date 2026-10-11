import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

/* ─────────────────────────
   INLINE STYLES FOR ANIMATIONS & ABSTRACT BG
───────────────────────── */
const GlobalStyles = () => (
  <style>{`
    /* Abstract Motion Background */
    .site-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -2;
      background: #08080a;
      overflow: hidden;
      pointer-events: none;
    }
    
    .abstract-gradient-layer {
      position: absolute;
      width: 140%;
      height: 140%;
      top: -20%;
      left: -20%;
      background: radial-gradient(circle at 50% 30%, rgba(229, 9, 20, 0.18) 0%, rgba(15, 15, 17, 0.8) 50%, rgba(8, 8, 10, 1) 85%);
      animation: abstractPulse 14s ease-in-out infinite alternate;
      filter: blur(60px);
    }

    .abstract-fluid-wave {
      position: absolute;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(229, 9, 20, 0.12) 0%, rgba(0,0,0,0) 70%);
      top: 15%;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50%;
      animation: floatWave 18s ease-in-out infinite alternate;
      pointer-events: none;
    }

    .site-grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 80%);
    }

    /* Floating 3D Logo Header Stage */
    .hero-logo-top-stage {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 2rem;
      position: relative;
      width: 100%;
    }

    .hero-logo-standalone-large {
      position: relative;
      width: 480px;
      height: 280px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: continuousFloat 6s ease-in-out infinite alternate;
      perspective: 1000px;
    }

    @media (max-width: 768px) {
      .hero-logo-standalone-large {
        width: 320px;
        height: 200px;
      }
    }

    .hero-logo-glow-large {
      position: absolute;
      width: 300px;
      height: 180px;
      background: radial-gradient(circle, rgba(229, 9, 20, 0.35) 0%, rgba(0,0,0,0) 70%);
      filter: blur(40px);
      z-index: 0;
      pointer-events: none;
      transition: opacity 0.3s;
    }

    .hero-logo-video-wrap-large {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hero-logo-canvas-large {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain;
      filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8));
    }

    /* Keyframes */
    @keyframes abstractPulse {
      0% { transform: scale(1) rotate(0deg); opacity: 0.8; }
      50% { transform: scale(1.1) rotate(3deg); opacity: 1; }
      100% { transform: scale(0.95) rotate(-3deg); opacity: 0.7; }
    }

    @keyframes floatWave {
      0% { transform: translate(-50%, -20px) scale(1); }
      100% { transform: translate(-50%, 30px) scale(1.25); }
    }

    @keyframes continuousFloat {
      0% { transform: translateY(0px) rotateX(0deg); }
      50% { transform: translateY(-12px) rotateX(4deg); }
      100% { transform: translateY(6px) rotateX(-2deg); }
    }

    .shockwave-ring {
      position: absolute;
      inset: 0;
      border: 2px solid rgba(229, 9, 20, 0.8);
      border-radius: 50%;
      animation: shockwave 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
      pointer-events: none;
    }

    @keyframes shockwave {
      0% { transform: scale(0.4); opacity: 1; }
      100% { transform: scale(2.2); opacity: 0; }
    }
  `}</style>
);

/* ─────────────────────────
   ABSTRACT BACKGROUND
───────────────────────── */
function Background() {
  return (
    <div className="site-bg" aria-hidden="true">
      <div className="abstract-gradient-layer" />
      <div className="abstract-fluid-wave" />
      <div className="site-grid" />
    </div>
  );
}

/* ─────────────────────────
   REVEAL HOOK
───────────────────────── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─────────────────────────
   NAVIGATION
───────────────────────── */
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (p) => { setPage(p); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <button className="nav-logo" onClick={() => go('home')} aria-label="JAMJAP Home">
          <img src="/jamjap_logo_white.png" alt="JAMJAP ENTERTAINMENT PRODUCTION" />
        </button>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden md:flex">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`nav-link ${page === l.id ? 'active' : ''}`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', padding: '4px' }}
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <path d="M18 6L6 18M6 6l12 12" />
              : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(8,8,8,0.97)', padding: '1rem 0' }}>
          <div className="container">
            {links.map(l => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: page === l.id ? '#fff' : 'rgba(255,255,255,0.5)',
                  fontSize: '1rem', fontWeight: 500, padding: '0.75rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* ─────────────────────────
   VIDEO MODAL
───────────────────────── */
function VideoModal({ review, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        if (videoRef.current) { videoRef.current.muted = true; videoRef.current.play().catch(() => { }); }
      });
    }
  }, []);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div>
            <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E50914', marginBottom: '0.2rem' }}>
              {review.role}
            </p>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>{review.name}</h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: '4px' }}
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div style={{ background: '#000', aspectRatio: '16/9' }}>
          {review.videoUrl ? (
            <video
              ref={videoRef}
              src={review.videoUrl}
              controls
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
              color: 'rgba(255,255,255,0.2)',
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M15 10l4.553-2.169A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.89L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
              </svg>
              <span style={{ fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Video coming soon</span>
            </div>
          )}
        </div>

        <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="red-dot pulse" />
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.02em' }}>
            Artist greeting — verified by JAMJAP Entertainment Production
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────
   SERVICES & REVIEWS DATA
───────────────────────── */
const REVIEWS = [
  {
    id: 'r1',
    name: 'Maria Santos-Villar',
    role: 'Executive Producer, Miss Asia Pacific Grand Finals',
    quote: 'JAMJAP handled five international pageant judges without a single hiccup. Flights, suites, on-site assistance — our committee felt completely at ease. Exceptional execution.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 'r2',
    name: 'Carl Hendrickson',
    role: 'Festival Director, Starlight Rock Arena',
    quote: 'Managing a 14-member band with 22 cases of gear usually means chaos. JAMJAP turned it into a smooth operation from tarmac to stage.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
  },
  {
    id: 'r3',
    name: 'Samantha Lee',
    role: 'Head of Events, Global Luxury Brand Forum',
    quote: 'Our keynote speaker arrived energized and right on cue. The HD video greeting JAMJAP recorded post-event generated huge traction on our channels.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  },
  {
    id: 'r4',
    name: 'Diana Reyes',
    role: 'Pageant Director, Miss Tourism World',
    quote: 'Every rider was respected. Every flight was on time. Every judge arrived smiling. JAMJAP is the logistics partner I trust for international talent.',
    videoUrl: null,
  },
];

const SERVICES = [
  {
    num: '01',
    title: 'Talent Booking & Provision',
    desc: 'Pageant judges, headline bands, keynote speakers, and event hosts — matched to your event with full coordination transparency.',
  },
  {
    num: '02',
    title: 'Flight & Travel Logistics',
    desc: 'Airline ticketing, priority baggage handling for stage gear and wardrobe, excess baggage arrangements, and smooth airport transfers.',
  },
  {
    num: '03',
    title: 'Artist Accommodations',
    desc: 'Hotel suite reservations pre-configured to exact artist riders — dietary requirements, room setup, and discreet check-in protocols included.',
  },
  {
    num: '04',
    title: 'On-Site Artist Care',
    desc: 'A dedicated JAMJAP handler beside your talent — managing tarmac arrivals, soundchecks, wardrobe, and post-show departures quiet and efficiently.',
  },
  {
    num: '05',
    title: 'Artist Greeting Videos',
    desc: 'HD personalized video greetings recorded and delivered post-event — verified proof and great promotional content for your media channels.',
  },
];

/* ─────────────────────────
   TRANSPARENT 3D LOGO RENDERER
───────────────────────── */
function TransparentLogo3D({ videoRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let animId;
    let gl = null;
    try {
      gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    } catch {
      gl = null;
    }

    if (gl) {
      const vsSource = `
        attribute vec2 a_pos;
        varying vec2 v_uv;
        void main() {
          v_uv = a_pos * 0.5 + 0.5;
          v_uv.y = 1.0 - v_uv.y;
          gl_Position = vec4(a_pos, 0.0, 1.0);
        }
      `;
      const fsSource = `
        precision mediump float;
        uniform sampler2D u_tex;
        varying vec2 v_uv;
        void main() {
          vec4 col = texture2D(u_tex, v_uv);
          float brightness = max(col.r, max(col.g, col.b));
          if (brightness < 0.05) {
            discard;
          }
          float a = smoothstep(0.05, 0.16, brightness);
          gl_FragColor = vec4(col.rgb, col.a * a);
        }
      `;

      const createShader = (type, source) => {
        const s = gl.createShader(type);
        gl.shaderSource(s, source);
        gl.compileShader(s);
        return s;
      };

      const program = gl.createProgram();
      gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSource));
      gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSource));
      gl.linkProgram(program);
      gl.useProgram(program);

      const posBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        -1, 1,
        1, -1,
        1, 1,
      ]), gl.STATIC_DRAW);

      const aPos = gl.getAttribLocation(program, 'a_pos');
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      const render = () => {
        if (video.readyState >= 2) {
          const vw = video.videoWidth || 1152;
          const vh = video.videoHeight || 720;
          if (canvas.width !== vw || canvas.height !== vh) {
            canvas.width = vw;
            canvas.height = vh;
            gl.viewport(0, 0, vw, vh);
          }
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
        animId = requestAnimationFrame(render);
      };

      animId = requestAnimationFrame(render);
    } else {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      canvas.width = 576;
      canvas.height = 360;

      const render2d = () => {
        if (video.readyState >= 2) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = frame.data;
          for (let i = 0; i < data.length; i += 4) {
            const m = Math.max(data[i], data[i + 1], data[i + 2]);
            if (m < 16) {
              data[i + 3] = 0;
            } else if (m < 40) {
              data[i + 3] = Math.round(((m - 16) / 24) * data[i + 3]);
            }
          }
          ctx.putImageData(frame, 0, 0);
        }
        animId = requestAnimationFrame(render2d);
      };

      animId = requestAnimationFrame(render2d);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [videoRef]);

  return (
    <>
      <video
        ref={videoRef}
        src="/extruded_3d_logo.webm"
        autoPlay
        loop
        muted
        playsInline
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: '1px', height: '1px' }}
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className="hero-logo-canvas-large"
        aria-label="JAMJAP 3D Logo"
      />
    </>
  );
}

function HeroLogoHighlight() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [spinDegree, setSpinDegree] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [shockwaves, setShockwaves] = useState([]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, []);

  const playInteractionSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now);
      osc1.frequency.exponentialRampToValueAtTime(1318.5, now + 0.08);
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.5);
    } catch {
      // Audio fallback
    }
  };

  const handleMouseMove = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = (x / (rect.width / 2)) * 18;
    const rotateX = -(y / (rect.height / 2)) * 18;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) videoRef.current.playbackRate = 1.6;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    if (videoRef.current) videoRef.current.playbackRate = 1.0;
  };

  const handleClick = () => {
    playInteractionSound();
    setSpinDegree(prev => prev + 360);

    const id = Date.now();
    setShockwaves(prev => [...prev, id]);
    setTimeout(() => setShockwaves(prev => prev.filter(w => w !== id)), 800);

    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 45,
        spread: 80,
        origin: { x: originX, y: originY },
        colors: ['#E50914', '#ff2233', '#ffffff', '#ff7788'],
        ticks: 140,
        gravity: 1.1,
        scalar: 0.95,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="hero-logo-standalone-large"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Interactive JAMJAP 3D Logo"
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y + spinDegree}deg) scale(${isHovered ? 1.08 : 1.0})`,
        transition: spinDegree > 0 ? 'transform 0.75s cubic-bezier(0.2, 0.9, 0.3, 1.2)' : 'transform 0.15s ease-out',
      }}
    >
      <div className="hero-logo-glow-large" />

      {shockwaves.map(id => (
        <span key={id} className="shockwave-ring" />
      ))}

      <div className="hero-logo-video-wrap-large">
        <TransparentLogo3D videoRef={videoRef} />
      </div>
    </div>
  );
}

/* ─────────────────────────
   HOME PAGE
───────────────────────── */
function Home({ setPage, setActiveReview }) {
  const aboutRef = useReveal();
  const servicesRef = useReveal();
  const reviewsRef = useReveal();

  const serviceItemRefs = SERVICES.map(() => useRef(null));

  useEffect(() => {
    serviceItemRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      el.classList.add('reveal', `reveal-delay-${Math.min(i + 1, 3)}`);
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
        { threshold: 0.08 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    });
  }, []);

  return (
    <>
      {/* ── HERO SECTION ── */}
      <section style={{ paddingTop: 'clamp(6rem, 12vh, 8rem)', paddingBottom: 'clamp(4rem, 8vh, 6rem)', position: 'relative' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

          {/* 3D LOGO EMBLEM AT TOP OF HEADLINE */}
          <div className="hero-logo-top-stage">
            <HeroLogoHighlight />
          </div>

          {/* HEADLINE & SUBTEXT */}
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <span className="red-dot pulse" />
              <span className="eyebrow" style={{ marginBottom: 0 }}>Artist Management & Event Logistics</span>
            </div>

            <h1 className="h1" style={{ marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 6vw, 4.2rem)' }}>
              JAMJAP acts.<br />
              <span style={{ color: '#E50914' }}>Jam-packed acts.</span>
            </h1>

            <p style={{ fontSize: '1.08rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', maxWidth: '620px', margin: '0 auto 2.5rem' }}>
              From securing pageant judges and headline bands to managing flights, accommodations, and stage execution — JAMJAP delivers seamless coordination so your event shines.
            </p>

            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
              <button className="btn btn-red" onClick={() => { setPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                Book Talent
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <button className="btn btn-ghost" onClick={() => { setPage('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                Explore Showcase
              </button>
            </div>

            {/* SHOWCASE HIGHLIGHT BADGES */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginTop: '3rem', paddingTop: '1.75rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div>
                <p style={{ fontSize: '0.66rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>Core Specialization</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>Pageant Judges & Artists</p>
              </div>
              <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />
              <div>
                <p style={{ fontSize: '0.66rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>Coordination</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#E50914' }}>End-to-End Execution</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── STAT BAR ── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', textAlign: 'center' }}>
            {[
              { num: '100+', label: 'Flights Coordinated' },
              { num: '250+', label: 'Artists Managed' },
              { num: '100%', label: 'Rider Compliance' },
            ].map((s, i) => (
              <div key={i} style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, color: '#fff', marginBottom: '0.25rem' }}>
                  {s.num}
                </div>
                <p style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section">
        <div className="container">
          <div ref={aboutRef} className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
            <div>
              <p className="eyebrow">About JAMJAP</p>
              <h2 className="h2">Complete management.<br />Flawless delivery.</h2>
            </div>
            <div>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>
                JAMJAP Entertainment Production was built to give organizers absolute peace of mind. We act as the single management partner coordinating talent procurement, flights, hospitality, and ground execution.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.5)' }}>
                Our team operates with standard-setting precision so every stage appearance, judging panel, and artist greeting happens seamlessly on time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── SERVICES ── */}
      <section className="section">
        <div className="container">
          <div ref={servicesRef} className="reveal" style={{ marginBottom: '3.5rem' }}>
            <p className="eyebrow">What We Provide</p>
            <h2 className="h2">Our core services.</h2>
          </div>

          <div>
            {SERVICES.map((svc, i) => (
              <div key={i} ref={serviceItemRefs[i]} className="service-item">
                <span className="service-num">{svc.num}</span>
                <div>
                  <h3 className="h3" style={{ marginBottom: '0.5rem' }}>{svc.title}</h3>
                  <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.45)' }}>{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── REVIEWS / VIDEO PROOF ── */}
      <section className="section">
        <div className="container">
          <div ref={reviewsRef} className="reveal" style={{ marginBottom: '3.5rem' }}>
            <p className="eyebrow">Artist Greetings & Reviews</p>
            <h2 className="h2">Verified proof from<br />the talent themselves.</h2>
            <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 10l4.553-2.169A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.89L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" /></svg>
              Click any review card to play their official video greeting
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.07)' }}>
            {REVIEWS.map((r, i) => (
              <ReviewCard key={r.id} review={r} delay={i * 80} onOpen={() => setActiveReview(r)} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ReviewCard({ review, delay, onOpen }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, delay);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="review-card" onClick={onOpen} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onOpen()}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '2.2rem', lineHeight: 1, color: '#E50914', opacity: 0.6, fontFamily: 'Georgia, serif', marginTop: '-0.2rem' }}>"</div>
        <div className="play-icon">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 3l14 9-14 9V3z" />
          </svg>
        </div>
      </div>

      <p style={{ fontSize: '0.88rem', lineHeight: 1.78, color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
        {review.quote}
      </p>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1rem', position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff', marginBottom: '0.15rem' }}>{review.name}</p>
        <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>{review.role}</p>
      </div>

      {review.videoUrl ? (
        <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', position: 'relative', zIndex: 1 }}>
          <span className="red-dot pulse" />
          <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E50914' }}>Watch Greeting</span>
        </div>
      ) : (
        <div style={{ marginTop: '0.75rem', position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Video pending</span>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────
   PROJECTS SHOWCASE PAGE
───────────────────────── */
const PROJECTS = [
  {
    id: 'p1',
    title: 'Miss Asia Pacific Grand Finals',
    type: 'Pageant Judges',
    year: '2025',
    desc: 'Full coordination for 5 international celebrity pageant judges — flight booking, hotel suites, on-site assistance, and post-event greeting videos.',
    tags: ['5 Judges', 'Multi-City Routing', '5-Star Hospitality', 'HD Video Greetings'],
  },
  {
    id: 'p2',
    title: 'Starlight Rock Arena World Tour',
    type: 'Headline Band',
    year: '2025',
    desc: 'End-to-end management of a 14-member rock band with 22 cases of equipment — excess baggage waivers, stage rider fulfillment, and venue transport.',
    tags: ['14-Member Band', '22 Cases Equipment', 'Multi-Venue', 'Rider Fulfillment'],
  },
  {
    id: 'p3',
    title: 'Global Luxury Brand Forum',
    type: 'Keynote & Hosting',
    year: '2024',
    desc: 'Event coordination for keynote speaker and gala host. Terminal assistance, suite accommodations, and post-event promotional content collection.',
    tags: ['Keynote Speaker', 'Gala MC', 'Promotional Content'],
  },
  {
    id: 'p4',
    title: 'Miss Tourism World Philippines',
    type: 'Pageant Judges',
    year: '2024',
    desc: 'Coordinated international judges panel — customized dietary riders, seamless check-in protocol, and 24/7 on-site coordinator coverage throughout the event.',
    tags: ['International Panel', 'Dietary Riders', 'On-Site Handler'],
  },
];

function Projects({ setPage }) {
  const headRef = useReveal();

  return (
    <section style={{ paddingTop: 'clamp(7rem, 15vh, 10rem)', paddingBottom: '6rem' }}>
      <div className="container">
        <div ref={headRef} className="reveal" style={{ marginBottom: '5rem', maxWidth: '600px' }}>
          <p className="eyebrow">Our Work</p>
          <h1 className="h1" style={{ marginBottom: '1.25rem' }}>Projects & Showcase.</h1>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.45)' }}>
            A curated selection of events, artist coordination, and talent management projects handled by JAMJAP.
          </p>
        </div>

        <div>
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>

        <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h3 className="h3" style={{ marginBottom: '0.35rem' }}>Planning an upcoming event?</h3>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>Let’s secure and coordinate your talent lineup.</p>
          </div>
          <button className="btn btn-red" onClick={() => { setPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            Get In Touch
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, index * 80);
          obs.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '2rem 0',
        cursor: 'pointer',
      }}
      onClick={() => setOpen(o => !o)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E50914' }}>{project.type}</span>
            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>{project.year}</span>
          </div>
          <h3 className="h3">{project.title}</h3>
        </div>
        <div style={{
          color: 'rgba(255,255,255,0.3)', transition: 'transform 0.3s, color 0.2s',
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
          flexShrink: 0, paddingTop: '0.25rem',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </div>

      {open && (
        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.78, color: 'rgba(255,255,255,0.5)', marginBottom: '1.25rem', maxWidth: '600px' }}>
            {project.desc}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.tags.map(t => (
              <span key={t} style={{
                padding: '0.25rem 0.75rem',
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
/* ─────────────────────────
   CONTACT PAGE (SMART DESKTOP & MOBILE VIBER INTEGRATION)
───────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: 'Pageant', service: 'Full Package', talent: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [ref_id, setRefId] = useState('');
  const [copied, setCopied] = useState(false);
  const [formattedMessage, setFormattedMessage] = useState('');
  const [viberUri, setViberUri] = useState('');

  const headRef = useReveal();
  const formRef = useReveal();

  const targetViberNumber = '+63 915 749 5354';
  const cleanNumber = '639157495354'; // Raw number for URI scheme

  const handleSubmit = e => {
    e.preventDefault();
    const id = `JJ-${Date.now().toString(36).toUpperCase()}`;
    setRefId(id);

    // Format inquiry details
    const messageText =
      `Hello JAMJAP Entertainment Production!\n\n` +
      `I would like to submit an inquiry (Ref: ${id}):\n` +
      `• Name / Org: ${form.name}\n` +
      `• Email: ${form.email}\n` +
      `• Phone/Viber: ${form.phone || 'N/A'}\n` +
      `• Event Type: ${form.type}\n` +
      `• Service Required: ${form.service}\n` +
      `• Target Talent: ${form.talent || 'N/A'}\n` +
      `• Notes: ${form.notes || 'None'}`;

    setFormattedMessage(messageText);

    // Try auto-copying to clipboard for seamless paste on desktop
    if (navigator.clipboard) {
      navigator.clipboard.writeText(messageText).then(() => setCopied(true)).catch(() => { });
    }

    // Build Viber Deep Link URIs
    const encodedText = encodeURIComponent(messageText);
    // standard URI scheme
    const uri = `viber://chat?number=${cleanNumber}&text=${encodedText}`;
    setViberUri(uri);

    setSubmitted(true);

    // Trigger protocol launch attempt
    try {
      window.location.href = uri;
    } catch {
      // Browser blocked URI protocol launch
    }
  };

  const copyTextToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(formattedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <section style={{ paddingTop: 'clamp(7rem, 15vh, 10rem)', paddingBottom: '6rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '6rem', alignItems: 'start' }}>

          {/* Left Info Column */}
          <div ref={headRef} className="reveal">
            <p className="eyebrow">Get In Touch</p>
            <h1 className="h1" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>Let's work together.</h1>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.45)', marginBottom: '3rem' }}>
              Submitting your inquiry will format your details and open a chat with our Viber coordination team at <strong>{targetViberNumber}</strong>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', display: 'block', marginBottom: '0.35rem' }}>Email</span>
                <a href="mailto:jamjaptradingphil@gmail.com" style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', textDecoration: 'none' }}>
                  jamjaptradingphil@gmail.com
                </a>
              </div>

              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', display: 'block', marginBottom: '0.35rem' }}>Viber Direct</span>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', margin: 0 }}>
                  {targetViberNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div ref={formRef} className="reveal reveal-delay-2">
            {submitted ? (
              <div style={{ padding: '2.5rem', border: '1px solid rgba(229,9,20,0.3)', background: 'rgba(229,9,20,0.04)', borderRadius: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ width: '36px', height: '36px', background: '#E50914', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E50914', margin: 0 }}>Ref ID: {ref_id}</p>
                    <h3 className="h3" style={{ fontSize: '1.1rem', margin: 0 }}>Inquiry Formatted!</h3>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', marginBottom: '1.25rem' }}>
                  Your inquiry details have been {copied ? <strong style={{ color: '#4ADE80' }}>copied to your clipboard</strong> : 'formatted'}. Send them to Viber number: <strong style={{ color: '#fff' }}>{targetViberNumber}</strong>
                </p>

                {/* Formatted Text Preview Box */}
                <div style={{
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '1rem',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.8)',
                  whiteSpace: 'pre-wrap',
                  maxHeight: '180px',
                  overflowY: 'auto',
                  marginBottom: '1.5rem'
                }}>
                  {formattedMessage}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  <a
                    href={viberUri}
                    className="btn btn-red"
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem' }}
                  >
                    Open Viber App
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </a>

                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={copyTextToClipboard}
                    style={{ fontSize: '0.82rem', borderColor: copied ? '#4ADE80' : 'rgba(255,255,255,0.2)' }}
                  >
                    {copied ? '✓ Copied to Clipboard' : 'Copy Message Text'}
                  </button>
                </div>

                <button className="btn btn-ghost" onClick={() => setSubmitted(false)} style={{ fontSize: '0.75rem', opacity: 0.5, border: 'none', padding: 0 }}>
                  ← Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div className="field">
                    <label>Name / Organization <span style={{ color: '#E50914' }}>*</span></label>
                    <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Apex Productions" required />
                  </div>
                  <div className="field">
                    <label>Email <span style={{ color: '#E50914' }}>*</span></label>
                    <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@company.com" required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div className="field">
                    <label>Phone / Viber Number</label>
                    <input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="0915 749 5354" />
                  </div>
                  <div className="field">
                    <label>Event Type</label>
                    <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                      {['Pageant', 'Concert / Festival', 'Corporate Gala', 'Private Event', 'Other'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label>Services Required</label>
                  <select value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))}>
                    {['Full Package', 'Talent Booking Only', 'Flight & Travel Logistics', 'Accommodation Handling', 'Artist Greeting Video'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>

                <div className="field">
                  <label>Requested Artist / Category (optional)</label>
                  <input type="text" value={form.talent} onChange={e => setForm(p => ({ ...p, talent: e.target.value }))} placeholder="e.g. Pageant Judges, Rock Band..." />
                </div>

                <div className="field">
                  <label>Additional Details</label>
                  <textarea rows={3} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Event dates, rider specifics, venue..." />
                </div>

                <button type="submit" className="btn btn-red" style={{ alignSelf: 'flex-start', justifyContent: 'center' }}>
                  Submit Inquiry via Viber
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────
   FOOTER
───────────────────────── */
function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <img src="/jamjap_logo_white.png" alt="JAMJAP" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
              © {new Date().getFullYear()} JAMJAP Entertainment Production. All rights reserved.
            </span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[
              { id: 'home', label: 'Home' },
              { id: 'projects', label: 'Projects' },
              { id: 'contact', label: 'Contact' },
            ].map(l => (
              <button
                key={l.id}
                onClick={() => { setPage(l.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, sans-serif', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────
   ROOT APP
───────────────────────── */
export default function App() {
  const [page, setPage] = useState('home');
  const [activeReview, setActiveReview] = useState(null);

  return (
    <>
      <GlobalStyles />
      <Background />

      <div className="page-wrap">
        <Nav page={page} setPage={setPage} />

        <main>
          {page === 'home' && <Home setPage={setPage} setActiveReview={setActiveReview} />}
          {page === 'projects' && <Projects setPage={setPage} />}
          {page === 'contact' && <Contact />}
        </main>

        <Footer setPage={setPage} />
      </div>

      {activeReview && (
        <VideoModal review={activeReview} onClose={() => setActiveReview(null)} />
      )}
    </>
  );
}