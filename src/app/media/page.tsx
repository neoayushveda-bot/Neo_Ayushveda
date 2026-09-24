"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaCalendarDays,
  FaLocationDot,
  FaBuildingColumns,
  FaStore,
  FaAward,
  FaArrowRight,
  FaXmark,
  FaChevronLeft,
  FaChevronRight,
  FaMagnifyingGlassPlus,
  FaGlobe,
  FaUsers,
  FaCheck,
  FaShareNodes,
  FaQuoteLeft,
  FaClock,
  FaUserTie,
  FaFileLines
} from "react-icons/fa6";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import {
  IPHEX_EVENT_INFO,
  MEDIA_STORIES,
  MediaStory
} from "../../data/mediaData";

export default function MediaPage() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Helper to open lightbox by 1-indexed ID or 0-indexed index
  const openPhotoById = (id: number) => {
    const idx = MEDIA_STORIES.findIndex((s) => s.id === id);
    if (idx !== -1) setActivePhotoIndex(idx);
  };

  // Lightbox navigation
  const showNextPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! + 1) % MEDIA_STORIES.length);
  }, [activePhotoIndex]);

  const showPrevPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! - 1 + MEDIA_STORIES.length) % MEDIA_STORIES.length);
  }, [activePhotoIndex]);

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePhotoIndex(null);
      }
      if (activePhotoIndex !== null) {
        if (e.key === "ArrowRight") showNextPhoto();
        if (e.key === "ArrowLeft") showPrevPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, showNextPhoto, showPrevPhoto]);

  // Lock body scroll when lightbox is active
  useEffect(() => {
    if (activePhotoIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePhotoIndex]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Specific story lookups for photo distribution
  const story1 = MEDIA_STORIES[0]; // Inauguration lamp lighting
  const story2 = MEDIA_STORIES[1]; // Global healthcare dialogue
  const story3 = MEDIA_STORIES[2]; // MoS Jitin Prasada address
  const story4 = MEDIA_STORIES[3]; // International Buyer Engagement
  const story5 = MEDIA_STORIES[4]; // International Business Connections
  const story6 = MEDIA_STORIES[5]; // Connecting Across Markets
  const story7 = MEDIA_STORIES[6]; // Bilateral Business Discussions
  const story8 = MEDIA_STORIES[7]; // Neo Life Sciences Stall 3FC-07
  const story9 = MEDIA_STORIES[8]; // Relationships Beyond Business
  const story10 = MEDIA_STORIES[9]; // Pharmaceutical Business Discussions
  const story11 = MEDIA_STORIES[10]; // Focused Technical Meetings

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-sky-500 selection:text-white pt-20">
        
        {/* ─── 1. Blog Post Header & Event Identity ─── */}
        <article className="relative">
          <header className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-10 pb-8 sm:pt-14 sm:pb-12 border-b border-slate-200/80 overflow-hidden">
            <div className="absolute inset-0 grid-texture opacity-30 pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
              
              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase mb-6 text-slate-500">
                <Link href="/" className="hover:text-sky-600 transition-colors">
                  Home
                </Link>
                <span className="text-slate-400">/</span>
                <span className="text-sky-700 font-semibold">Event & Media</span>
                <span className="text-slate-400">/</span>
                <span className="text-slate-600 truncate">iPHEX 2026 Dispatch</span>
              </nav>

              {/* Eyebrow & Category Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-[11px] font-mono font-semibold tracking-wider uppercase shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
                  <span>EVENT FEATURE • iPHEX 2026</span>
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500 text-xs font-mono">
                  <FaClock className="w-3 h-3 text-slate-400" />
                  <span>6 Min Read</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 text-xs font-mono">
                  September 2026
                </span>
              </div>

              {/* Main Headline (The Event Name) */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.15] text-slate-900 tracking-tight">
                {IPHEX_EVENT_INFO.heroHeading}
              </h1>

              {/* Editorial Subtitle / Lead Summary */}
              <p className="mt-4 sm:mt-5 text-base sm:text-xl text-slate-600 leading-relaxed font-sans font-normal">
                {IPHEX_EVENT_INFO.heroDescription}
              </p>

              {/* Author & Action Strip */}
              <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-600 to-sky-800 text-white flex items-center justify-center font-bold text-sm shadow-xs border border-white/20">
                    <FaUserTie className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      Neo Life Sciences Corporate Media
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      Published from Pragati Maidan, New Delhi
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:text-sky-600 hover:border-sky-300 text-xs font-medium transition-all shadow-2xs cursor-pointer active:scale-[0.96]"
                    title="Share this blog post"
                  >
                    <FaShareNodes className="w-3.5 h-3.5 text-slate-500" />
                    <span>{copiedLink ? "Link Copied!" : "Share Post"}</span>
                  </button>
                </div>
              </div>

            </div>
          </header>

          {/* ─── 2. Key Event Information Strip ─── */}
          <section aria-label="Event Key Metrics" className="py-6 bg-slate-50/70 border-b border-slate-200/80">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(15,23,42,0.03)] p-4 sm:p-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  
                  {/* Expo */}
                  <div className="flex items-start gap-2.5 pt-2 sm:pt-0">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100 mt-0.5">
                      <FaAward className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                        Featured Expo
                      </span>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">
                        {IPHEX_EVENT_INFO.name}
                      </p>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="flex items-start gap-2.5 sm:pl-3 pt-2 sm:pt-0">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 mt-0.5">
                      <FaCalendarDays className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                        Dates
                      </span>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">
                        {IPHEX_EVENT_INFO.dates}
                      </p>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="flex items-start gap-2.5 sm:pl-3 pt-2 sm:pt-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 mt-0.5">
                      <FaLocationDot className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                        Venue
                      </span>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">
                        {IPHEX_EVENT_INFO.venueName}
                      </p>
                    </div>
                  </div>

                  {/* Stall */}
                  <div className="flex items-start gap-2.5 lg:pl-3 pt-2 sm:pt-0">
                    <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 border border-violet-100 mt-0.5">
                      <FaStore className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                        Hall & Stall
                      </span>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">
                        {IPHEX_EVENT_INFO.stallDetail}
                      </p>
                    </div>
                  </div>

                  {/* Organized by */}
                  <div className="flex items-start gap-2.5 lg:pl-3 pt-2 sm:pt-0">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100 mt-0.5">
                      <FaBuildingColumns className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                        Organized By
                      </span>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">
                        {IPHEX_EVENT_INFO.organizedBy}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* ─── 3. PHOTOS AT THE START ─── */}
          <section aria-label="Event Inauguration Photos" className="py-8 sm:py-12 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
              
              <div className="mb-4">
                <span className="text-sky-600 font-mono text-[11px] font-semibold tracking-[0.2em] uppercase block">
                  PHOTO SHOWCASE • INAUGURATION & MINISTERIAL KEYNOTES
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  The Opening Summit at Bharat Mandapam
                </h2>
              </div>

              {/* 3-Photo Hero Grid at the Start */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                
                {/* Photo 1 (Main Lead / Opening Ceremony) */}
                <div
                  onClick={() => openPhotoById(1)}
                  className="md:col-span-7 group relative aspect-[16/10] md:aspect-auto md:min-h-[380px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ring-1 ring-black/5"
                >
                  <Image
                    src={story1.image}
                    alt={story1.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 560px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent p-4 sm:p-5 flex flex-col justify-end text-white">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-sky-600/90 backdrop-blur-xs text-[10px] font-mono font-semibold uppercase tracking-wider w-fit mb-1.5">
                      <FaAward className="w-3 h-3 text-white" />
                      <span>{story1.category}</span>
                    </span>
                    <h3 className="text-base sm:text-lg font-bold leading-snug text-white">
                      {story1.title}
                    </h3>
                    <p className="text-xs text-slate-200 line-clamp-2 mt-1 leading-relaxed opacity-95">
                      {story1.description}
                    </p>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaMagnifyingGlassPlus className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Right Column: Photos 2 & 3 Stacked */}
                <div className="md:col-span-5 flex flex-col gap-4">
                  
                  {/* Photo 2: Global Healthcare Dialogue */}
                  <div
                    onClick={() => openPhotoById(2)}
                    className="group relative flex-1 min-h-[180px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ring-1 ring-black/5"
                  >
                    <Image
                      src={story2.image}
                      alt={story2.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-4 flex flex-col justify-end text-white">
                      <span className="text-[10px] font-mono text-sky-300 font-semibold uppercase">
                        {story2.category}
                      </span>
                      <h4 className="text-sm font-bold text-white leading-tight mt-0.5">
                        {story2.title}
                      </h4>
                    </div>
                    <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <FaMagnifyingGlassPlus className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Photo 3: MoS Jitin Prasada Address */}
                  <div
                    onClick={() => openPhotoById(3)}
                    className="group relative flex-1 min-h-[180px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ring-1 ring-black/5"
                  >
                    <Image
                      src={story3.image}
                      alt={story3.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-4 flex flex-col justify-end text-white">
                      <span className="text-[10px] font-mono text-sky-300 font-semibold uppercase">
                        {story3.category}
                      </span>
                      <h4 className="text-sm font-bold text-white leading-tight mt-0.5">
                        {story3.title}
                      </h4>
                    </div>
                    <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <FaMagnifyingGlassPlus className="w-3 h-3" />
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </section>

          {/* ─── 4. BLOG POST BODY NARRATIVE & EVENLY DISTRIBUTED PHOTOS ─── */}
          <section className="py-6 sm:py-10 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 space-y-12">
              
              {/* Executive Opening Paragraph */}
              <div className="text-slate-700 text-base sm:text-lg leading-relaxed space-y-4">
                <p className="font-serif text-xl sm:text-2xl text-slate-900 leading-snug font-normal text-slate-800">
                  <span className="float-left text-5xl font-serif font-bold text-sky-700 leading-none pr-3 pt-1">
                    N
                  </span>
                  eo Life Sciences Pvt. Ltd. (formerly known as Neo Ayushveda) marked an impactful presence at the prestigious 10th edition of <strong>iPHEX 2026</strong>, organized by the Pharmaceuticals Export Promotion Council of India (Pharmexcil) under the Ministry of Commerce & Industry, Government of India.
                </p>
                <p>
                  Convened at the state-of-the-art Bharat Mandapam convention complex in Pragati Maidan, New Delhi, the 3-day international summit brought together over 10,000 healthcare leaders, government delegates, institutional buyers, and pharmaceutical innovators from across 120 nations. The summit serves as the primary bridge connecting Indian formulation excellence with the escalating healthcare requirements of emerging and regulated markets globally.
                </p>
              </div>

              {/* Chapter 1: The National Healthcare Vision & Ministerial Insights */}
              <div className="pt-8 border-t border-slate-200/90 space-y-6">
                <div>
                  <span className="text-sky-600 font-mono text-xs font-semibold tracking-wider uppercase block">
                    CHAPTER 1 • POLICY, INNOVATION & NATIONAL MANDATE
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                    Upholding India’s Role as the “Pharmacy of the World”
                  </h2>
                </div>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  The exhibition commenced with the traditional ceremonial lighting of the lamp by <strong>Hon’ble Union Minister for Commerce & Industry, Mr. Piyush Goyal</strong>, who reaffirmed the government’s unwavering commitment to empowering Indian manufacturers in advancing global healthcare access.
                </p>

                {/* Quote Box 1: Piyush Goyal */}
                <div className="relative rounded-2xl bg-gradient-to-r from-sky-50 via-slate-50 to-white border-l-4 border-sky-600 p-6 sm:p-7 shadow-2xs">
                  <FaQuoteLeft className="w-8 h-8 text-sky-200 absolute top-4 right-6 pointer-events-none" />
                  <p className="text-slate-800 text-base sm:text-lg italic font-serif leading-relaxed relative z-10">
                    “Trust, innovation, partnership, and equitable global access remain our core pillars. The Indian pharmaceutical sector continues to push R&D, patent indigenous formulations, and scale biosimilars for the world.”
                  </p>
                  <div className="mt-3 pt-3 border-t border-sky-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Hon’ble Union Minister Mr. Piyush Goyal</span>
                    <span className="text-slate-500 font-mono">Ministry of Commerce & Industry</span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  In his keynote address, <strong>Minister of State for Commerce & Industry, Mr. Jitin Prasada</strong>, aptly designated iPHEX as the <em>“Mother of All Exhibitions”</em>, underscoring that global supply chains increasingly rely upon India’s robust manufacturing ethics, regulatory compliance, and cost-efficient generic therapies.
                </p>

                {/* Quote Box 2: Jitin Prasada */}
                <div className="relative rounded-2xl bg-slate-50 border-l-4 border-emerald-600 p-5 sm:p-6 shadow-2xs">
                  <p className="text-slate-800 text-sm sm:text-base italic font-serif leading-relaxed">
                    “Greater global collaboration in pharmaceuticals and healthcare will fortify healthcare systems across borders. India stands steadfast as the trusted Pharmacy of the World.”
                  </p>
                  <div className="mt-2.5 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Mr. Jitin Prasada</span>
                    <span className="text-slate-500 font-mono">Minister of State for Commerce & Industry</span>
                  </div>
                </div>
              </div>

              {/* Chapter 2: Global B2B Engagements & Market Expansion */}
              <div className="pt-8 border-t border-slate-200/90 space-y-6">
                <div>
                  <span className="text-sky-600 font-mono text-xs font-semibold tracking-wider uppercase block">
                    CHAPTER 2 • CROSS-BORDER TRADE & STRATEGIC NETWORKING
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                    Accelerating B2B Buyer Engagements Across 50+ Countries
                  </h2>
                </div>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  A defining cornerstone of Neo Life Sciences’ presence at iPHEX was an exhaustive series of scheduled and walk-in buyer-seller meetings. Delegations from the Middle East, West Asia & North Africa (WANA), Southeast Asia, Africa, and CIS nations engaged with our corporate leadership to evaluate long-term procurement frameworks.
                </p>

                {/* ─── PHOTOS EVENLY DISTRIBUTED: Pair 1 (Photos 4 & 5) ─── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  
                  {/* Photo 4 */}
                  <div
                    onClick={() => openPhotoById(4)}
                    className="group bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer ring-1 ring-black/5"
                  >
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      <Image
                        src={story4.image}
                        alt={story4.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white">
                        #{story4.id} • {story4.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-sky-600 transition-colors">
                        {story4.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">
                        {story4.description}
                      </p>
                    </div>
                  </div>

                  {/* Photo 5 */}
                  <div
                    onClick={() => openPhotoById(5)}
                    className="group bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer ring-1 ring-black/5"
                  >
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      <Image
                        src={story5.image}
                        alt={story5.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white">
                        #{story5.id} • {story5.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-sky-600 transition-colors">
                        {story5.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">
                        {story5.description}
                      </p>
                    </div>
                  </div>

                </div>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  International delegates placed particular emphasis on regulatory documentation and dossier support. Neo Life Sciences demonstrated our comprehensive capability in delivering ready-to-file <strong>Common Technical Document (CTD)</strong> and <strong>ACTD dossiers</strong>, facilitating rapid market registrations in emerging healthcare jurisdictions where regulatory frameworks are progressively harmonizing with international standards.
                </p>

                {/* ─── PHOTOS EVENLY DISTRIBUTED: Pair 2 (Photos 6 & 7) ─── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  
                  {/* Photo 6 */}
                  <div
                    onClick={() => openPhotoById(6)}
                    className="group bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer ring-1 ring-black/5"
                  >
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      <Image
                        src={story6.image}
                        alt={story6.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white">
                        #{story6.id} • {story6.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-sky-600 transition-colors">
                        {story6.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">
                        {story6.description}
                      </p>
                    </div>
                  </div>

                  {/* Photo 7 */}
                  <div
                    onClick={() => openPhotoById(7)}
                    className="group bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer ring-1 ring-black/5"
                  >
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      <Image
                        src={story7.image}
                        alt={story7.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white">
                        #{story7.id} • {story7.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-sky-600 transition-colors">
                        {story7.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">
                        {story7.description}
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* Chapter 3: Inside Stall 3FC-07 — Portfolio Showcase & Formulation Excellence */}
              <div className="pt-8 border-t border-slate-200/90 space-y-6">
                <div>
                  <span className="text-sky-600 font-mono text-xs font-semibold tracking-wider uppercase block">
                    CHAPTER 3 • EXHIBITION SHOWCASE & CLIENT DIALOGUE
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                    Inside Hall 3FF • Stall 3FC-07: Showcasing Product Excellence
                  </h2>
                </div>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Located in Hall 3FF, our exhibition stall served as an energetic focal point for international distributors, hospital procurement heads, and pharmaceutical formulators. We showcased our complete spectrum of WHO-GMP certified generic solid orals, liquid dosages, injectables, APIs, and standardized herbal extracts.
                </p>

                {/* ─── PHOTOS EVENLY DISTRIBUTED: Pair 3 (Photos 8 & 9) ─── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  
                  {/* Photo 8 */}
                  <div
                    onClick={() => openPhotoById(8)}
                    className="group bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer ring-1 ring-black/5"
                  >
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      <Image
                        src={story8.image}
                        alt={story8.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white">
                        #{story8.id} • {story8.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-sky-600 transition-colors">
                        {story8.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">
                        {story8.description}
                      </p>
                    </div>
                  </div>

                  {/* Photo 9 */}
                  <div
                    onClick={() => openPhotoById(9)}
                    className="group bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer ring-1 ring-black/5"
                  >
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      <Image
                        src={story9.image}
                        alt={story9.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white">
                        #{story9.id} • {story9.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-sky-600 transition-colors">
                        {story9.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">
                        {story9.description}
                      </p>
                    </div>
                  </div>

                </div>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Direct engagement at our booth enabled visitors to evaluate sample packaging, verify batch stability documentation, and explore private-label contract manufacturing arrangements tailored to regional market volume requirements.
                </p>

                {/* ─── PHOTOS EVENLY DISTRIBUTED: Pair 4 (Photos 10 & 11) ─── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  
                  {/* Photo 10 */}
                  <div
                    onClick={() => openPhotoById(10)}
                    className="group bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer ring-1 ring-black/5"
                  >
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      <Image
                        src={story10.image}
                        alt={story10.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white">
                        #{story10.id} • {story10.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-sky-600 transition-colors">
                        {story10.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">
                        {story10.description}
                      </p>
                    </div>
                  </div>

                  {/* Photo 11 */}
                  <div
                    onClick={() => openPhotoById(11)}
                    className="group bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer ring-1 ring-black/5"
                  >
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      <Image
                        src={story11.image}
                        alt={story11.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white">
                        #{story11.id} • {story11.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-sky-600 transition-colors">
                        {story11.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">
                        {story11.description}
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* ─── Strategic Outcomes & Event Summary ─── */}
              <div className="pt-8 border-t border-slate-200/90">
                <div className="bg-gradient-to-r from-slate-900 to-sky-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="relative z-10">
                    <span className="text-sky-300 font-mono text-xs font-semibold uppercase tracking-wider block mb-1">
                      EXHIBITION STRATEGIC TAKEAWAYS
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold mb-3">
                      Key Outcomes from iPHEX 2026
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-2xl">
                      Neo Life Sciences concluded the 3-day exhibition with tangible commercial momentum and fortified institutional partnerships across high-demand export destinations.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-200">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                        <span className="text-2xl font-bold font-mono text-sky-400 block">100+</span>
                        <span className="text-xs text-slate-300 uppercase tracking-wider font-medium mt-1 block">
                          Buyer Consultations Initiated
                        </span>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                        <span className="text-2xl font-bold font-mono text-emerald-400 block">50+</span>
                        <span className="text-xs text-slate-300 uppercase tracking-wider font-medium mt-1 block">
                          Target Export Markets Represented
                        </span>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                        <span className="text-2xl font-bold font-mono text-violet-400 block">100%</span>
                        <span className="text-xs text-slate-300 uppercase tracking-wider font-medium mt-1 block">
                          CTD / ACTD Dossier Readiness
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* ─── 5. PHOTOS BELOW EVENLY DISTRIBUTED: COMPLETE ARCHIVAL GALLERY ─── */}
          <section aria-label="Archival Event Gallery" className="py-14 sm:py-16 bg-slate-50/80 border-t border-b border-slate-200/90">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
              
              <div className="text-center max-w-xl mx-auto mb-10">
                <span className="text-sky-600 font-mono text-xs font-semibold tracking-[0.2em] uppercase block mb-1">
                  COMPLETE ARCHIVE
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  iPHEX 2026 Photographic Archive
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-2">
                  All 11 official event photographs chronologically captured from the opening ceremony to closing B2B delegations. Click on any photo to inspect in full resolution.
                </p>
              </div>

              {/* Evenly Distributed Grid of All 11 Photos */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {MEDIA_STORIES.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => setActivePhotoIndex(idx)}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 border border-slate-200/80 cursor-pointer shadow-2xs hover:shadow-md transition-all duration-200 ring-1 ring-black/5"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient overlay with caption */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
                      <span className="text-[10px] font-mono text-sky-300 font-semibold uppercase">
                        {item.category}
                      </span>
                      <p className="text-xs font-semibold text-white truncate">
                        {item.title}
                      </p>
                    </div>

                    {/* Top-right number badge */}
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white/90">
                      #{String(item.id).padStart(2, "0")}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* ─── 6. Commercial Collaboration & Sourcing Desk CTA ─── */}
          <section aria-label="Commercial Sourcing Desk" className="py-14 sm:py-18 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
              
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 rounded-2xl text-white p-7 sm:p-10 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  <div className="max-w-xl">
                    <div className="inline-flex items-center gap-2 bg-sky-900/60 border border-sky-400/30 rounded-full px-3 py-1 mb-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-mono tracking-[0.16em] uppercase text-sky-200 font-semibold">
                        GLOBAL TRADE DESK
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-snug mb-2">
                      Partner with Neo Life Sciences for Global Pharma Sourcing
                    </h2>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Discuss WHO-GMP finished formulations, custom generic manufacturing, and regulatory dossier filings with our international export division.
                    </p>
                  </div>

                  <div className="shrink-0">
                    <Link
                      href="/enquiry"
                      className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 font-semibold px-6 py-3.5 rounded-xl transition-all duration-150 active:scale-[0.96] text-sm shadow-md"
                    >
                      <span>Connect With Sourcing Desk</span>
                      <FaArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>

              </div>

            </div>
          </section>

        </article>

      </main>

      {/* ─── FULLSCREEN LIGHTBOX MODAL (Accessible for All 11 Photos) ─── */}
      {activePhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={MEDIA_STORIES[activePhotoIndex].title}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setActivePhotoIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="px-6 py-3.5 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-sky-600/30 text-sky-300 border border-sky-500/30 text-xs font-mono font-semibold">
                  {MEDIA_STORIES[activePhotoIndex].category}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Photo {activePhotoIndex + 1} of {MEDIA_STORIES.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                  title="Copy Page Link"
                >
                  <FaShareNodes className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{copiedLink ? "Copied!" : "Share"}</span>
                </button>
                <button
                  onClick={() => setActivePhotoIndex(null)}
                  className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <FaXmark className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image with Navigation Arrows */}
            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black flex items-center justify-center">
              <Image
                src={MEDIA_STORIES[activePhotoIndex].image}
                alt={MEDIA_STORIES[activePhotoIndex].title}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrevPhoto();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-sky-600 text-white flex items-center justify-center transition-colors shadow-lg border border-white/10 active:scale-[0.96] cursor-pointer"
                aria-label="Previous image"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNextPhoto();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-sky-600 text-white flex items-center justify-center transition-colors shadow-lg border border-white/10 active:scale-[0.96] cursor-pointer"
                aria-label="Next image"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Caption & Metadata */}
            <div className="p-5 bg-slate-900 border-t border-slate-800 text-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                <h4 className="text-base font-bold text-white">
                  {MEDIA_STORIES[activePhotoIndex].title}
                </h4>
                <span className="text-xs font-mono text-sky-400">
                  {MEDIA_STORIES[activePhotoIndex].badge} • {MEDIA_STORIES[activePhotoIndex].meta.hallStall}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl line-clamp-2">
                {MEDIA_STORIES[activePhotoIndex].description}
              </p>
            </div>

            {/* Clickable Thumbnail Reel */}
            <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto">
              {MEDIA_STORIES.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`relative w-14 h-10 rounded-md overflow-hidden shrink-0 border transition-all cursor-pointer ${
                    idx === activePhotoIndex
                      ? "border-sky-500 ring-2 ring-sky-500/40 opacity-100"
                      : "border-slate-800 opacity-50 hover:opacity-80"
                  }`}
                  aria-label={`Thumbnail ${p.id}`}
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </button>
              ))}
            </div>

          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
