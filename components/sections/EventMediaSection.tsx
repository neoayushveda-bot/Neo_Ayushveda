"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  FaCalendarDays,
  FaLocationDot,
  FaBuildingColumns,
  FaHandshakeAngle,
  FaArrowRight,
  FaXmark,
  FaChevronLeft,
  FaChevronRight,
  FaMagnifyingGlassPlus,
  FaAward,
  FaGlobe,
  FaUsers,
  FaCheck
} from "react-icons/fa6";

interface EventPhoto {
  id: string;
  src: string;
  title: string;
  category: "all" | "b2b" | "ceremony" | "showcase";
  categoryLabel: string;
  tagline: string;
  description: string;
  featured?: boolean;
}

const EVENT_PHOTOS: EventPhoto[] = [
  {
    id: "stall-partnership",
    src: "/images/events/iphex-2026-b2b-exhibition-stall.jpg",
    title: "Product Portfolio Showcase & Buyer Consultations",
    category: "showcase",
    categoryLabel: "Exhibition Stall",
    tagline: "Neo Life Sciences Booth — Hall Plenary",
    description:
      "Neo Life Sciences Pvt. Ltd. showcasing its export catalog of WHO-GMP certified finished formulations, active pharmaceutical ingredients (APIs), and standardized herbal therapeutics to international healthcare buyers.",
    featured: true,
  },
  {
    id: "inauguration",
    src: "/images/events/iphex-2026-lamp-lighting-ceremony.jpg",
    title: "Auspicious Lamp Lighting & Grand Inauguration",
    category: "ceremony",
    categoryLabel: "Ceremonial Opening",
    tagline: "Bharat Health Global Expo & iPHEX 2026",
    description:
      "Distinguished central ministers, Pharmexcil council officials, and pharma industry leaders inaugurating the premier global exhibition at the grand stage in Bharat Mandapam, New Delhi.",
    featured: true,
  },
  {
    id: "delegates-discussion",
    src: "/images/events/iphex-2026-delegates-booth.jpg",
    title: "B2B Bilateral Trade & Delegate Discussions",
    category: "b2b",
    categoryLabel: "B2B Networking",
    tagline: "International Buyer-Seller Meet",
    description:
      "Engaging directly with international trade delegates and health ministry representatives from Africa and overseas markets to establish regional distribution channels and regulatory dossier support.",
  },
  {
    id: "ministerial-address",
    src: "/images/events/iphex-2026-minister-address.jpg",
    title: "Keynote Address by Union Minister Shri Piyush Goyal",
    category: "ceremony",
    categoryLabel: "Ministerial Plenary",
    tagline: "Ministry of Commerce & Industry",
    description:
      "Hon'ble Union Minister of Commerce & Industry delivering the inaugural keynote on powering global healthcare accessibility, strengthening Indian pharma exports, and connecting regulated markets.",
  },
  {
    id: "keynote-podium",
    src: "/images/events/iphex-2026-keynote-speech.jpg",
    title: "Global Healthcare Leadership & Plenary Session",
    category: "ceremony",
    categoryLabel: "Leadership Session",
    tagline: "Main Plenary Hall • Bharat Mandapam",
    description:
      "Industry leaders addressing attendees on international regulatory convergence, WHO-GMP quality assurance, and expanding Indian pharmaceutical manufacturing footprints worldwide.",
  },
];

export default function EventMediaSection() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "b2b" | "ceremony" | "showcase">("all");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const filteredPhotos = selectedCategory === "all"
    ? EVENT_PHOTOS
    : EVENT_PHOTOS.filter((p) => p.category === selectedCategory);

  const openLightbox = (photoId: string) => {
    const index = EVENT_PHOTOS.findIndex((p) => p.id === photoId);
    if (index !== -1) {
      setActivePhotoIndex(index);
    }
  };

  const closeLightbox = useCallback(() => {
    setActivePhotoIndex(null);
  }, []);

  const showNext = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! + 1) % EVENT_PHOTOS.length);
  }, [activePhotoIndex]);

  const showPrev = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! - 1 + EVENT_PHOTOS.length) % EVENT_PHOTOS.length);
  }, [activePhotoIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, closeLightbox, showNext, showPrev]);

  // Scroll to contact function
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const activePhoto = activePhotoIndex !== null ? EVENT_PHOTOS[activePhotoIndex] : null;

  return (
    <section
      id="events"
      className="bg-gradient-to-b from-white via-slate-50/70 to-white py-16 sm:py-24 lg:py-28 relative overflow-hidden font-sans border-b border-slate-200 scroll-mt-20"
    >
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-sky-100/40 via-blue-50/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-sky-700 text-xs font-mono font-semibold tracking-wider uppercase mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
            <span>EVENT & MEDIA SHOWCASE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-slate-900 tracking-tight">
            iPHEX 2026 — Powering Healthcare. Connecting Markets.
          </h2>

          <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            <strong className="text-slate-800 font-semibold">Neo Ayushveda / Neo Life Sciences Pvt. Ltd.</strong> actively engaged with global delegations, regulatory bodies, and international buyers at India&apos;s flagship pharmaceutical export summit.
          </p>
        </div>

        {/* Event Key Meta Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_4px_24px_rgba(15,23,42,0.04)] p-6 sm:p-8 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            
            {/* Event Name */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
                <FaAward className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                  Featured Expo
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  iPHEX 2026
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Bharat Health Global Expo 2026
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-start gap-4 sm:pl-6 pt-4 sm:pt-0">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <FaCalendarDays className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                  Event Schedule
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  7 – 9 September 2026
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  3-Day Global Exhibition & Summit
                </p>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-start gap-4 lg:pl-6 pt-4 sm:pt-0">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <FaLocationDot className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                  Official Venue
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  Bharat Mandapam
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Pragati Maidan, New Delhi, India
                </p>
              </div>
            </div>

            {/* Organized By */}
            <div className="flex items-start gap-4 lg:pl-6 pt-4 sm:pt-0">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                <FaBuildingColumns className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                  Organized By
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  Pharmexcil
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Ministry of Commerce & Industry, Govt. of India
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: "all", label: "All Highlights (5)" },
            { id: "showcase", label: "Exhibition Stall & Portfolio" },
            { id: "b2b", label: "B2B Buyer Discussions" },
            { id: "ceremony", label: "Inauguration & Ministerial" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as typeof selectedCategory)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-150 active:scale-[0.96] ${
                selectedCategory === tab.id
                  ? "bg-slate-900 text-white shadow-sm ring-1 ring-slate-900"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredPhotos.map((photo, index) => {
            const isWide = photo.featured && (index === 0 || photo.id === "inauguration");

            return (
              <div
                key={photo.id}
                onClick={() => openLightbox(photo.id)}
                className={`group cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-[0_2px_12px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_32px_rgba(2,132,199,0.12)] hover:border-sky-300 transition-all duration-200 flex flex-col justify-between ${
                  isWide ? "md:col-span-2 lg:col-span-2" : "col-span-1"
                }`}
              >
                {/* Image Container with 1px outline */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] bg-slate-100 overflow-hidden ring-1 ring-black/5">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes={isWide ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                    className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-105"
                  />

                  {/* Top Badge overlay */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold tracking-wider uppercase bg-white/95 text-slate-800 backdrop-blur-md shadow-xs border border-white/40">
                      {photo.categoryLabel}
                    </span>
                  </div>

                  {/* Hover magnifying badge */}
                  <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="w-11 h-11 rounded-full bg-white/95 text-slate-900 shadow-md flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-200">
                      <FaMagnifyingGlassPlus className="w-4 h-4 text-sky-600" />
                    </span>
                  </div>
                </div>

                {/* Content info */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <span className="text-xs font-mono font-medium text-sky-600 block mb-1.5">
                      {photo.tagline}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                      {photo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                      {photo.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="inline-flex items-center gap-1.5 text-sky-700">
                      <FaAward className="w-3.5 h-3.5" />
                      <span>iPHEX 2026 Delegate</span>
                    </span>
                    <span className="text-slate-400 group-hover:text-sky-600 transition-colors inline-flex items-center gap-1">
                      <span>View Full Image</span>
                      <FaArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Impact & Outcomes Summary Box */}
        <div className="mt-14 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 rounded-2xl text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-sky-400 font-mono text-xs font-semibold tracking-[0.2em] uppercase block mb-2">
                STRATEGIC PARTICIPATION
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-snug mb-3">
                Expanding India’s Pharma Footprint Across Emerging & Regulated Markets
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Through our active participation at iPHEX 2026, Neo Ayushveda Life Sciences continues to establish high-trust pharmaceutical export partnerships, delivering WHO-GMP certified generic formulations, APIs, and herbal healthcare solutions to over 50 countries.
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-200">
                <div className="flex items-center gap-2">
                  <FaCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct B2B Buyer Interactions</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CTD / ACTD Dossier Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Full Regulatory SRA Compliance</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-white block">
                    100+
                  </span>
                  <span className="text-xs text-slate-300 uppercase tracking-wider">
                    Buyer Consultations Initiated
                  </span>
                </div>
                <FaUsers className="w-8 h-8 text-sky-400 opacity-80" />
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-white block">
                    50+
                  </span>
                  <span className="text-xs text-slate-300 uppercase tracking-wider">
                    Target Export Markets Represented
                  </span>
                </div>
                <FaGlobe className="w-8 h-8 text-emerald-400 opacity-80" />
              </div>

              <button
                onClick={scrollToContact}
                className="w-full bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 font-semibold px-6 py-3.5 rounded-xl transition-all duration-150 active:scale-[0.96] flex items-center justify-center gap-2 text-sm shadow-md"
              >
                <FaHandshakeAngle className="w-4 h-4 text-slate-950" />
                <span>Partner With Neo Life Sciences</span>
                <FaArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Fullscreen Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Modal Container */}
          <div
            className="relative max-w-5xl w-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-sky-600/30 text-sky-300 border border-sky-500/30 text-xs font-mono font-semibold">
                  {activePhoto.categoryLabel}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {activePhotoIndex! + 1} of {EVENT_PHOTOS.length}
                </span>
              </div>

              <button
                onClick={closeLightbox}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                aria-label="Close dialog"
              >
                <FaXmark className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image in Lightbox */}
            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black flex items-center justify-center">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-sky-600 text-white flex items-center justify-center transition-colors shadow-lg border border-white/10 active:scale-[0.96]"
                aria-label="Previous photo"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-sky-600 text-white flex items-center justify-center transition-colors shadow-lg border border-white/10 active:scale-[0.96]"
                aria-label="Next photo"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Caption & Description */}
            <div className="p-6 bg-slate-900 border-t border-slate-800 text-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h4 className="text-lg font-bold text-white">
                  {activePhoto.title}
                </h4>
                <span className="text-xs font-mono text-sky-400">
                  {activePhoto.tagline}
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
                {activePhoto.description}
              </p>
            </div>

            {/* Thumbnail Row */}
            <div className="px-6 py-3 bg-slate-950 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto">
              {EVENT_PHOTOS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border transition-all ${
                    idx === activePhotoIndex
                      ? "border-sky-500 ring-2 ring-sky-500/40 opacity-100"
                      : "border-slate-800 opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={p.src}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
