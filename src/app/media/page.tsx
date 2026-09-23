"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  FaBookOpen,
  FaArrowUpRightFromSquare
} from "react-icons/fa6";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import {
  IPHEX_EVENT_INFO,
  FILTER_CATEGORIES,
  MEDIA_STORIES,
  FilterCategoryKey,
  MediaStory
} from "../../data/mediaData";

export default function MediaPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategoryKey>("All");
  const [activeStoryModal, setActiveStoryModal] = useState<MediaStory | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filtered stories based on selected filter
  const filteredStories = useMemo(() => {
    if (selectedFilter === "All") {
      return MEDIA_STORIES;
    }
    return MEDIA_STORIES.filter((story) =>
      story.filterCategories.includes(selectedFilter)
    );
  }, [selectedFilter]);

  // Story modal navigation
  const currentModalIndex = useMemo(() => {
    if (!activeStoryModal) return -1;
    return MEDIA_STORIES.findIndex((s) => s.id === activeStoryModal.id);
  }, [activeStoryModal]);

  const showNextStory = useCallback(() => {
    if (currentModalIndex === -1) return;
    const nextIdx = (currentModalIndex + 1) % MEDIA_STORIES.length;
    setActiveStoryModal(MEDIA_STORIES[nextIdx]);
  }, [currentModalIndex]);

  const showPrevStory = useCallback(() => {
    if (currentModalIndex === -1) return;
    const prevIdx = (currentModalIndex - 1 + MEDIA_STORIES.length) % MEDIA_STORIES.length;
    setActiveStoryModal(MEDIA_STORIES[prevIdx]);
  }, [currentModalIndex]);

  // Gallery Lightbox navigation
  const showNextGalleryPhoto = useCallback(() => {
    if (activeGalleryIndex === null) return;
    setActiveGalleryIndex((prev) => (prev! + 1) % MEDIA_STORIES.length);
  }, [activeGalleryIndex]);

  const showPrevGalleryPhoto = useCallback(() => {
    if (activeGalleryIndex === null) return;
    setActiveGalleryIndex((prev) => (prev! - 1 + MEDIA_STORIES.length) % MEDIA_STORIES.length);
  }, [activeGalleryIndex]);

  // Keyboard accessibility for modals & lightboxes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveStoryModal(null);
        setActiveGalleryIndex(null);
      }
      if (activeStoryModal) {
        if (e.key === "ArrowRight") showNextStory();
        if (e.key === "ArrowLeft") showPrevStory();
      }
      if (activeGalleryIndex !== null) {
        if (e.key === "ArrowRight") showNextGalleryPhoto();
        if (e.key === "ArrowLeft") showPrevGalleryPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeStoryModal, activeGalleryIndex, showNextStory, showPrevStory, showNextGalleryPhoto, showPrevGalleryPhoto]);

  // Scroll lock when modal is open
  useEffect(() => {
    if (activeStoryModal || activeGalleryIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeStoryModal, activeGalleryIndex]);

  // Related moments for the modal (items excluding current)
  const relatedMoments = useMemo(() => {
    if (!activeStoryModal) return [];
    return MEDIA_STORIES.filter((s) => s.id !== activeStoryModal.id).slice(0, 4);
  }, [activeStoryModal]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-sky-500 selection:text-white pt-20">
        
        {/* ─── 1. Page Hero Section ─── */}
        <header className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-12 pb-16 md:pt-16 md:pb-20 border-b border-slate-200/80 overflow-hidden">
          <div className="absolute inset-0 grid-texture opacity-40 pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#7CB800]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase mb-6 text-slate-500">
              <Link href="/" className="hover:text-sky-600 transition-colors">
                Home
              </Link>
              <span className="text-slate-400">/</span>
              <span className="text-sky-700 font-semibold">Event & Media</span>
            </nav>

            <div className="max-w-4xl">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-[11px] font-mono font-semibold tracking-[0.16em] uppercase mb-4 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
                <span>{IPHEX_EVENT_INFO.heroEyebrow}</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 tracking-tight">
                {IPHEX_EVENT_INFO.heroHeading}
              </h1>

              {/* Exact Description Requirement */}
              <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
                {IPHEX_EVENT_INFO.heroDescription}
              </p>

              {/* Key Event Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-600">
                <span className="inline-flex items-center gap-1.5 bg-slate-100/80 px-3 py-1.5 rounded-md border border-slate-200/60 font-mono text-slate-700">
                  <FaLocationDot className="w-3.5 h-3.5 text-sky-600" />
                  <span>Bharat Mandapam • Pragati Maidan</span>
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-100/80 px-3 py-1.5 rounded-md border border-slate-200/60 font-mono text-slate-700">
                  <FaCalendarDays className="w-3.5 h-3.5 text-emerald-600" />
                  <span>7 – 9 September 2026</span>
                </span>
                <span className="inline-flex items-center gap-1.5 bg-sky-50 px-3 py-1.5 rounded-md border border-sky-200/80 font-mono text-sky-800 font-semibold">
                  <FaStore className="w-3.5 h-3.5 text-sky-600" />
                  <span>Hall: 3FF • Stall: 3FC-07</span>
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* ─── 2. Event Information Strip ─── */}
        <section aria-label="Event Key Metrics" className="py-8 bg-slate-50/60 border-b border-slate-200/80">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_24px_rgba(15,23,42,0.04)] p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                
                {/* 1. Featured Expo */}
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
                    <FaAward className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                      Featured Expo
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                      {IPHEX_EVENT_INFO.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                      {IPHEX_EVENT_INFO.tagline}
                    </p>
                  </div>
                </div>

                {/* 2. Event Schedule */}
                <div className="flex items-start gap-3.5 sm:pl-6 pt-4 sm:pt-0">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <FaCalendarDays className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                      Event Schedule
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                      {IPHEX_EVENT_INFO.scheduleValue}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                      {IPHEX_EVENT_INFO.dates}
                    </p>
                  </div>
                </div>

                {/* 3. Official Venue */}
                <div className="flex items-start gap-3.5 lg:pl-6 pt-4 sm:pt-0">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                    <FaLocationDot className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                      Official Venue
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                      {IPHEX_EVENT_INFO.venueName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                      {IPHEX_EVENT_INFO.venueAddress}
                    </p>
                  </div>
                </div>

                {/* 4. Stall No & Hall (Explicitly Required After Official Venue) */}
                <div className="flex items-start gap-3.5 lg:pl-6 pt-4 sm:pt-0">
                  <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 border border-violet-100">
                    <FaStore className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                      Stall No & Hall
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                      Hall: 3FF
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 font-mono leading-snug">
                      Stall: 3FC-07
                    </p>
                  </div>
                </div>

                {/* 5. Organized By */}
                <div className="flex items-start gap-3.5 lg:pl-6 pt-4 sm:pt-0">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                    <FaBuildingColumns className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                      Organized By
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                      {IPHEX_EVENT_INFO.organizedBy}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                      {IPHEX_EVENT_INFO.organizedBySub}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Short Event / Company Context (Bio Section) ─── */}
        <section aria-label="About This Event" className="py-12 bg-white border-b border-slate-100">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">
            <div className="relative rounded-2xl bg-gradient-to-r from-sky-50/70 via-slate-50/60 to-emerald-50/40 border border-sky-100 p-6 sm:p-8 md:p-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8">
                  <span className="text-sky-700 font-mono text-[11px] font-semibold tracking-[0.2em] uppercase block mb-2">
                    EXECUTIVE SUMMARY & GLOBAL ENGAGEMENT
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-snug mb-3">
                    Accelerating Global Healthcare Partnerships
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Neo Life Sciences Pvt. Ltd. (formerly known as Neo Ayushveda) proudly engaged with global delegates, regulatory authorities and international buyers at India’s flagship pharmaceutical exhibition, fostering meaningful connections and exploring global business opportunities.
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                  <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium bg-white/80 backdrop-blur-xs px-3.5 py-2.5 rounded-lg border border-slate-200/60">
                    <FaCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>WHO-GMP Formulations & APIs</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium bg-white/80 backdrop-blur-xs px-3.5 py-2.5 rounded-lg border border-slate-200/60">
                    <FaCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>CTD / ACTD Regulatory Dossier Support</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium bg-white/80 backdrop-blur-xs px-3.5 py-2.5 rounded-lg border border-slate-200/60">
                    <FaCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Export Footprint Across 50+ Countries</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. Highlights & Category Navigation ─── */}
        <section id="highlights" aria-label="Event Stories and Highlights" className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">
            
            {/* Section Header: Must be "Highlights" (no "All Highlights") */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
              <div>
                <span className="text-sky-600 font-mono text-xs font-semibold tracking-[0.2em] uppercase block mb-1.5">
                  NEWS, STORIES & EXHIBITION DISPATCHES
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                  Highlights
                </h2>
                <p className="text-slate-500 text-sm mt-1 max-w-xl">
                  Chronological event dispatches from the 3-day international pharmaceutical summit.
                </p>
              </div>

              {/* Category Filter Buttons */}
              <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
                {FILTER_CATEGORIES.map((tab) => {
                  const isSelected = selectedFilter === tab.key;
                  
                  // Compute count for this filter
                  const count =
                    tab.key === "All"
                      ? MEDIA_STORIES.length
                      : MEDIA_STORIES.filter((s) => s.filterCategories.includes(tab.key)).length;

                  return (
                    <button
                      key={tab.key}
                      onClick={() => setSelectedFilter(tab.key)}
                      className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-150 active:scale-[0.96] flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 ${
                        isSelected
                          ? "bg-slate-900 text-white shadow-sm ring-1 ring-slate-900"
                          : "bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80"
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-slate-200/70 text-slate-600"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ─── 5. Event Story Cards Grid (Strict Order 1..11) ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {filteredStories.map((story) => (
                <article
                  key={story.id}
                  className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-[0_2px_12px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_32px_rgba(2,132,199,0.10)] hover:border-sky-300 transition-all duration-200 flex flex-col justify-between"
                >
                  {/* Card Image with 1px outline & cursor zoom */}
                  <div
                    onClick={() => setActiveStoryModal(story)}
                    className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden ring-1 ring-black/5 cursor-pointer"
                  >
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Top Eyebrow Tag Overlay */}
                    <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold tracking-wider uppercase bg-white/95 text-slate-800 backdrop-blur-md shadow-xs border border-white/40">
                        {story.category}
                      </span>
                    </div>

                    {/* Hover magnifying overlay */}
                    <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center z-10">
                      <span className="w-10 h-10 rounded-full bg-white/95 text-slate-900 shadow-md flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-200">
                        <FaMagnifyingGlassPlus className="w-3.5 h-3.5 text-sky-600" />
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white">
                    <div>
                      {/* Eyebrow & Story Number */}
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                        <span className="text-sky-600 font-semibold tracking-wider">
                          {story.category}
                        </span>
                        <span className="text-slate-400">
                          #{String(story.id).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => setActiveStoryModal(story)}
                        className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug cursor-pointer line-clamp-2"
                      >
                        {story.title}
                      </h3>

                      {/* Description Snippet */}
                      <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                        {story.description}
                      </p>
                    </div>

                    {/* Card Footer: Badge "iPHEX-2026" & Read Story Button */}
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
                      <span className="inline-flex items-center gap-1.5 text-sky-800 font-mono font-semibold bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                        <FaAward className="w-3 h-3 text-sky-600" />
                        <span>{story.badge}</span>
                      </span>

                      <button
                        onClick={() => setActiveStoryModal(story)}
                        className="text-sky-600 hover:text-sky-700 font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer active:scale-[0.96] py-1"
                        aria-label={`Read story: ${story.title}`}
                      >
                        <span>Read Story</span>
                        <FaArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Empty state safeguard */}
            {filteredStories.length === 0 && (
              <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-sm text-slate-500">No stories found matching this filter.</p>
                <button
                  onClick={() => setSelectedFilter("All")}
                  className="mt-3 text-xs font-semibold text-sky-600 hover:underline"
                >
                  Reset to All
                </button>
              </div>
            )}

          </div>
        </section>

        {/* ─── 6. High-Resolution Event Photo Gallery ─── */}
        <section aria-label="Event Photography Gallery" className="py-16 bg-slate-50/80 border-t border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-sky-600 font-mono text-xs font-semibold tracking-[0.2em] uppercase block mb-1">
                  ARCHIVAL GALLERY
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  iPHEX 2026 Media Gallery
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Click on any photograph to view high-resolution details in full-screen.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/media/iphex-2026"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 bg-white px-3.5 py-2 rounded-lg border border-slate-200 shadow-2xs hover:border-sky-300 transition-all active:scale-[0.96]"
                >
                  <FaBookOpen className="w-3 h-3" />
                  <span>View Full Event Archive</span>
                  <FaArrowUpRightFromSquare className="w-2.5 h-2.5 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Gallery Masonry-like Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {MEDIA_STORIES.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setActiveGalleryIndex(idx)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 border border-slate-200 cursor-pointer shadow-2xs hover:shadow-md transition-all duration-200 ring-1 ring-black/5"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient overlay with caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
                    <span className="text-[10px] font-mono text-sky-300 font-semibold uppercase">
                      {item.category}
                    </span>
                    <p className="text-xs font-semibold text-white truncate">
                      {item.title}
                    </p>
                  </div>

                  {/* Top-right number badge */}
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white/90">
                    {item.id}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ─── 7. Global Outcomes & Sourcing CTA Section ─── */}
        <section aria-label="Strategic Sourcing CTA" className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">
            
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 rounded-2xl text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 bg-sky-900/60 border border-sky-400/30 rounded-full px-3 py-1 mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-[0.16em] uppercase text-sky-200 font-semibold">
                      COMMERCIAL COLLABORATION
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-3">
                    Expanding India’s Pharma Footprint Across Emerging & Regulated Markets
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                    Through our active participation at iPHEX 2026, Neo Life Sciences continues to establish high-trust pharmaceutical export partnerships, delivering WHO-GMP certified generic formulations, APIs, and herbal healthcare solutions to over 50 countries.
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-200">
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                      <FaCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Direct B2B Buyer Interactions</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                      <FaCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>CTD / ACTD Dossier Support</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
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

                  <Link
                    href="/enquiry"
                    className="w-full bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 font-semibold px-6 py-3.5 rounded-xl transition-all duration-150 active:scale-[0.96] flex items-center justify-center gap-2 text-sm shadow-md"
                  >
                    <span>Connect With Sourcing Desk</span>
                    <FaArrowRight className="w-3.5 h-3.5 text-slate-950" />
                  </Link>
                </div>

              </div>

            </div>

          </div>
        </section>

      </main>

      {/* ─── Story Detail Interactive Modal ─── */}
      {activeStoryModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeStoryModal.title}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
          onClick={() => setActiveStoryModal(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xl flex flex-col my-auto max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-sky-100 text-sky-800 border border-sky-200 text-xs font-mono font-semibold">
                  {activeStoryModal.category}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Story {activeStoryModal.id} of {MEDIA_STORIES.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="text-slate-500 hover:text-slate-800 p-2 rounded-lg hover:bg-slate-200/60 transition-colors text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                  title="Copy Page Link"
                >
                  <FaShareNodes className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{copiedLink ? "Copied!" : "Share"}</span>
                </button>
                <button
                  onClick={() => setActiveStoryModal(null)}
                  className="text-slate-500 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <FaXmark className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Story Content Area */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* Event Metadata Strip */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                <span className="bg-sky-50 text-sky-800 font-mono font-bold px-3 py-1 rounded-md border border-sky-200">
                  {activeStoryModal.meta.event}
                </span>
                <span className="bg-slate-100 text-slate-700 font-mono px-3 py-1 rounded-md border border-slate-200">
                  {activeStoryModal.meta.schedule}
                </span>
                <span className="bg-slate-100 text-slate-700 font-mono px-3 py-1 rounded-md border border-slate-200">
                  {activeStoryModal.meta.hallStall}
                </span>
                <span className="bg-slate-100 text-slate-700 font-mono px-3 py-1 rounded-md border border-slate-200">
                  {activeStoryModal.meta.location}
                </span>
              </div>

              {/* Story Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                {activeStoryModal.title}
              </h2>

              {/* Large High-Res Event Image */}
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 ring-1 ring-black/10">
                <Image
                  src={activeStoryModal.image}
                  alt={activeStoryModal.title}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
              </div>

              {/* Full Description */}
              <div className="prose prose-slate max-w-none">
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed bg-slate-50/80 p-5 rounded-xl border border-slate-200/80">
                  {activeStoryModal.description}
                </p>
              </div>

              {/* Related Moments From The Same Event */}
              {relatedMoments.length > 0 && (
                <div className="pt-6 border-t border-slate-200">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3">
                    Related Moments From iPHEX 2026
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {relatedMoments.map((related) => (
                      <div
                        key={related.id}
                        onClick={() => setActiveStoryModal(related)}
                        className="group cursor-pointer rounded-lg overflow-hidden border border-slate-200 bg-white p-2 hover:border-sky-300 hover:shadow-xs transition-all"
                      >
                        <div className="relative aspect-[16/10] rounded overflow-hidden bg-slate-100 mb-1.5">
                          <Image
                            src={related.image}
                            alt={related.title}
                            fill
                            sizes="200px"
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <span className="text-[10px] font-mono text-sky-600 block uppercase truncate">
                          {related.category}
                        </span>
                        <p className="text-xs font-semibold text-slate-800 line-clamp-1 group-hover:text-sky-600">
                          {related.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Bottom Controls: Prev / Next */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={showPrevStory}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-sky-600 px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-all active:scale-[0.96] cursor-pointer"
              >
                <FaChevronLeft className="w-3 h-3" />
                <span>Previous Story</span>
              </button>

              <span className="text-xs font-mono text-slate-500">
                {currentModalIndex + 1} / {MEDIA_STORIES.length}
              </span>

              <button
                onClick={showNextStory}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-sky-600 px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-all active:scale-[0.96] cursor-pointer"
              >
                <span>Next Story</span>
                <FaChevronRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ─── 8. Gallery Fullscreen Lightbox Modal ─── */}
      {activeGalleryIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={MEDIA_STORIES[activeGalleryIndex].title}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setActiveGalleryIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="px-6 py-3.5 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-sky-600/30 text-sky-300 border border-sky-500/30 text-xs font-mono font-semibold">
                  {MEDIA_STORIES[activeGalleryIndex].category}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {activeGalleryIndex + 1} of {MEDIA_STORIES.length}
                </span>
              </div>

              <button
                onClick={() => setActiveGalleryIndex(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <FaXmark className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image with Navigation Arrows */}
            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black flex items-center justify-center">
              <Image
                src={MEDIA_STORIES[activeGalleryIndex].image}
                alt={MEDIA_STORIES[activeGalleryIndex].title}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrevGalleryPhoto();
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
                  showNextGalleryPhoto();
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
                  {MEDIA_STORIES[activeGalleryIndex].title}
                </h4>
                <span className="text-xs font-mono text-sky-400">
                  {MEDIA_STORIES[activeGalleryIndex].badge} • {MEDIA_STORIES[activeGalleryIndex].meta.hallStall}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl line-clamp-2">
                {MEDIA_STORIES[activeGalleryIndex].description}
              </p>
            </div>

            {/* Clickable Thumbnail Reel */}
            <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto">
              {MEDIA_STORIES.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveGalleryIndex(idx)}
                  className={`relative w-14 h-10 rounded-md overflow-hidden shrink-0 border transition-all cursor-pointer ${
                    idx === activeGalleryIndex
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
