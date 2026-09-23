"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  FaPlay,
  FaPause,
  FaShareNodes,
  FaCheck,
  FaYoutube,
  FaCircleCheck,
  FaGlobe,
  FaFileContract,
  FaTruckFast,
  FaShieldHalved
} from "react-icons/fa6";

interface CorporateVideoPlayerProps {
  videoSrc?: string;
  posterSrc?: string;
  title?: string;
  className?: string;
}

export default function CorporateVideoPlayer({
  videoSrc = "/intro.mp4",
  title = "Neo Life Sciences Pvt Ltd — Corporate Overview & Global Sourcing Excellence",
  className = "",
}: CorporateVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showControlsOverlay, setShowControlsOverlay] = useState<boolean>(true);
  const overlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch((err) => {
          console.error("Video play error:", err);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowControlsOverlay(true);
  };

  const handleMouseMove = () => {
    if (!hasStarted) return;
    setShowControlsOverlay(true);
    if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
    overlayTimerRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControlsOverlay(false);
      }
    }, 2800);
  };

  useEffect(() => {
    return () => {
      if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
    };
  }, []);

  return (
    <div className={`w-full max-w-5xl mx-auto my-10 sm:my-14 ${className}`}>
      {/* Header Eyebrow & Title */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
        <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200/80 rounded-full px-3.5 py-1 mb-3.5 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-sky-800 font-semibold">
            Corporate Film & Presentation
          </span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Neo Life Sciences in Motion
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
          Watch our corporate overview highlighting WHO-GMP certified sourcing, 
          temperature-controlled supply chains, and regulatory dossiers across 50+ export markets.
        </p>
      </div>

      {/* ─── YouTube Iframe Player Frame ─── */}
      <div
        className="relative group rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-[0_20px_60px_-15px_rgba(0,58,149,0.2)] ring-1 ring-slate-900/10 aspect-video select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControlsOverlay(false)}
      >
        {/* HTML5 Video Element */}
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-cover bg-black"
          playsInline
          preload="metadata"
          controls={hasStarted}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={handleVideoEnded}
        />

        {/* ─── YouTube Style Top Bar (Header Overlay) ─── */}
        <div
          className={`absolute top-0 inset-x-0 p-3 sm:p-5 bg-gradient-to-b from-black/85 via-black/40 to-transparent flex items-center justify-between gap-3 text-white transition-opacity duration-300 z-20 ${
            !hasStarted || showControlsOverlay || !isPlaying
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Channel info & Video Title */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Brand Logo Avatar */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white p-1 shrink-0 flex items-center justify-center shadow-md ring-2 ring-white/20">
              <span className="font-sans font-black text-sky-700 text-[11px] sm:text-xs tracking-tighter">
                NEO
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs sm:text-sm text-white drop-shadow-md truncate max-w-[240px] sm:max-w-md lg:max-w-xl">
                  {title}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono bg-sky-600/70 border border-sky-400/40 text-white px-1.5 py-0.5 rounded font-medium">
                  <FaCircleCheck className="w-2.5 h-2.5 text-[#7CB800]" /> Verified
                </span>
              </div>
              <div className="text-[11px] text-slate-300/90 font-mono tracking-wide hidden sm:block">
                Neo Life Sciences Pvt Ltd • Corporate Film
              </div>
            </div>
          </div>

          {/* Right Action Icons (YouTube Iframe Style) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs px-2.5 sm:px-3 py-1.5 rounded-full transition-all duration-150 active:scale-95 cursor-pointer shadow-sm"
              title="Share Corporate Film"
              type="button"
            >
              {copied ? (
                <>
                  <FaCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px] font-mono text-emerald-400 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <FaShareNodes className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-mono hidden sm:inline">Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ─── YouTube Style Central Big Red Play Button (Initial Cover State) ─── */}
        {!hasStarted && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 hover:bg-black/25 backdrop-blur-[1px] transition-colors duration-200 cursor-pointer z-10 group"
          >
            {/* Signature YouTube Red Play Button */}
            <div className="relative flex items-center justify-center">
              {/* Outer pulsing halo */}
              <div className="absolute -inset-3 rounded-[28px] bg-red-600/30 blur-md group-hover:bg-red-600/50 group-hover:scale-110 transition-all duration-300 animate-pulse" />

              {/* YouTube Play Icon Container */}
              <button
                type="button"
                className="relative w-18 h-12 sm:w-22 sm:h-15 bg-[#FF0000] hover:bg-[#E60000] active:scale-[0.96] rounded-[18px] sm:rounded-[20px] flex items-center justify-center text-white shadow-2xl transition-transform duration-200 ease-out group-hover:scale-105 cursor-pointer"
                aria-label="Play Corporate Video"
              >
                {/* White triangle icon optically centered with slight right offset */}
                <FaPlay className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-1 fill-current" />
              </button>
            </div>

            {/* Click to Watch text */}
            <div className="mt-4 sm:mt-5 text-center">
              <span className="inline-block bg-black/60 backdrop-blur-md border border-white/15 text-white/95 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full shadow-lg font-sans">
                Click to Play Corporate Film
              </span>
            </div>
          </div>
        )}

        {/* Bottom YouTube Branding Watermark in Iframe */}
        <div
          className={`absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-1.5 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md text-[10px] sm:text-xs text-white/80 pointer-events-none transition-opacity duration-300 ${
            !hasStarted || showControlsOverlay || !isPlaying
              ? "opacity-90"
              : "opacity-0"
          }`}
        >
          <FaYoutube className="w-3.5 h-3.5 text-[#FF0000]" />
          <span className="font-mono font-semibold tracking-wide">Corporate Presentation</span>
        </div>
      </div>

      {/* ─── Highlights Strip Under Video ─── */}
      <div className="mt-4 sm:mt-5 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 text-slate-700">
        <div className="bg-white border border-slate-200/90 rounded-xl p-3 flex items-center gap-2.5 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
            <FaShieldHalved className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] sm:text-xs font-bold text-slate-900 truncate">WHO-GMP Network</div>
            <div className="text-[10px] text-slate-500 font-mono">100% Certified Labs</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-3 flex items-center gap-2.5 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <FaGlobe className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] sm:text-xs font-bold text-slate-900 truncate">50+ Global Markets</div>
            <div className="text-[10px] text-slate-500 font-mono">Worldwide Exports</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-3 flex items-center gap-2.5 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <FaFileContract className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] sm:text-xs font-bold text-slate-900 truncate">CTD / eCTD Dossiers</div>
            <div className="text-[10px] text-slate-500 font-mono">Regulatory Fast-Track</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-3 flex items-center gap-2.5 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <FaTruckFast className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] sm:text-xs font-bold text-slate-900 truncate">Cold-Chain Logistics</div>
            <div className="text-[10px] text-slate-500 font-mono">Hyderabad Origin Hub</div>
          </div>
        </div>
      </div>
    </div>
  );
}
