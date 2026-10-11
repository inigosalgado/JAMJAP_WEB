import React, { useRef, useState, useEffect } from 'react';
import { 
  X, Play, Pause, Volume2, VolumeX, Maximize2, 
  CheckCircle2, Star, ShieldCheck, Sparkles, Clock, Calendar 
} from 'lucide-react';

export default function VideoModal({ video, onClose, onBookArtist }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');

  useEffect(() => {
    // Escape key listener
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy might mute video first
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => setIsPlaying(false));
        }
      });
    }
  }, [video]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress((current / duration) * 100);

      const mins = Math.floor(current / 60);
      const secs = Math.floor(current % 60);
      setCurrentTime(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = pos * (videoRef.current.duration || 1);
    }
  };

  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#121216] border border-red-500/30 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(229,9,20,0.35)] z-10 flex flex-col my-auto max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#09090b]/80 border-b border-white/[0.08] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] animate-pulse" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>{video.artist}</span>
                <span className="text-[10px] text-[#F59E0B] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                  {video.categoryLabel}
                </span>
              </div>
              <div className="text-[11px] text-zinc-400">
                Verified Artist Greeting • {video.event}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/[0.06] hover:bg-[#E50914] text-zinc-400 hover:text-white transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-video bg-black overflow-hidden group">
          <video
            ref={videoRef}
            src={video.videoUrl}
            poster={video.thumbnail}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            playsInline
            className="w-full h-full object-cover"
            onClick={togglePlay}
          />

          {/* Video Control Bar Overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 opacity-90 group-hover:opacity-100 transition-opacity">
            {/* Scrubber Bar */}
            <div
              onClick={handleSeek}
              className="w-full h-2 bg-white/20 rounded-full mb-3 cursor-pointer relative overflow-hidden"
            >
              <div
                className="h-full bg-gradient-to-r from-[#E50914] to-[#FF2A36] rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-[#E50914] transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="font-mono text-zinc-300">
                  {currentTime} / {video.duration}
                </span>
              </div>

              <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Authenticated Footage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Logistics Handled Breakdown & Artist Quote */}
        <div className="p-5 sm:p-7 bg-[#121216] overflow-y-auto">
          {/* Quote Block */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-5 relative">
            <span className="text-3xl font-serif text-[#E50914] leading-none absolute top-2 left-3 opacity-40">“</span>
            <p className="text-sm sm:text-base text-zinc-200 font-medium italic pl-4 leading-relaxed">
              {video.quote}
            </p>
            <div className="mt-2 text-right text-xs font-semibold text-[#F59E0B]">
              — {video.artist} ({video.role})
            </div>
          </div>

          {/* Logistics Managed By JAMJAP */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
                <span>Logistics Handled by JAMJAP for this Event</span>
              </h4>
              <span className="text-[11px] text-emerald-400 font-medium">
                100% On-Site Adherence
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
              {video.logisticsHandled.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 border border-white/[0.06] text-xs text-zinc-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/[0.08]">
            <div className="text-xs text-zinc-400 text-center sm:text-left">
              Organizer: <span className="text-white font-medium">{video.organizer}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 text-xs font-medium transition-colors"
              >
                Close Reel
              </button>
              
              <button
                onClick={() => {
                  onClose();
                  onBookArtist(video.artist);
                }}
                className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-[#E50914] hover:bg-[#FF2A36] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(229,9,20,0.5)] transition-all"
              >
                Book This Artist
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
