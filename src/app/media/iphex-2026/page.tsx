"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FaCalendarDays,
  FaLocationDot,
  FaBuildingColumns,
  FaStore,
  FaAward,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaShareNodes,
  FaArrowLeft
} from "react-icons/fa6";
import Header from "../../../../components/layout/Header";
import Footer from "../../../../components/layout/Footer";
import {
  IPHEX_EVENT_INFO,
  MEDIA_STORIES,
  MediaStory
} from "../../../data/mediaData";

function StoryDetailContent() {
  const searchParams = useSearchParams();
  const storyParam = searchParams.get("story");
  const initialId = storyParam ? parseInt(storyParam, 10) : 1;

  const [selectedStoryId, setSelectedStoryId] = useState<number>(
    initialId >= 1 && initialId <= 11 ? initialId : 1
  );
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (storyParam) {
      const parsed = parseInt(storyParam, 10);
      if (parsed >= 1 && parsed <= 11) {
        setSelectedStoryId(parsed);
      }
    }
  }, [storyParam]);

  const currentStory: MediaStory =
    MEDIA_STORIES.find((s) => s.id === selectedStoryId) || MEDIA_STORIES[0];

  const currentIndex = MEDIA_STORIES.findIndex((s) => s.id === currentStory.id);

  const prevStory = () => {
    const prevIdx = (currentIndex - 1 + MEDIA_STORIES.length) % MEDIA_STORIES.length;
    setSelectedStoryId(MEDIA_STORIES[prevIdx].id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextStory = () => {
    const nextIdx = (currentIndex + 1) % MEDIA_STORIES.length;
    setSelectedStoryId(MEDIA_STORIES[nextIdx].id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const relatedMoments = MEDIA_STORIES.filter((s) => s.id !== currentStory.id);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-sky-500 selection:text-white pt-20">
      
      {/* ─── Breadcrumb & Navigation Bar ─── */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-4">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-slate-500 uppercase tracking-wider">
            <Link href="/" className="hover:text-sky-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/media" className="hover:text-sky-600 transition-colors">
              Event & Media
            </Link>
            <span>/</span>
            <span className="text-sky-700 font-semibold truncate max-w-xs sm:max-w-md">
              {currentStory.title}
            </span>
          </nav>

          <Link
            href="/media"
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-sky-600 transition-colors font-sans font-medium text-xs"
          >
            <FaArrowLeft className="w-3 h-3" />
            <span>Back to All Media</span>
          </Link>
        </div>
      </div>

      {/* ─── Story Header & Hero ─── */}
      <section className="py-10 md:py-14 bg-gradient-to-b from-slate-50/60 via-white to-white border-b border-slate-200">
        <div className="max-w-[1024px] mx-auto px-4 sm:px-6 md:px-8">
          
          {/* Header Eyebrow */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-semibold tracking-wider uppercase">
                {currentStory.category}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Dispatch #{String(currentStory.id).padStart(2, "0")} of {MEDIA_STORIES.length}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="text-slate-500 hover:text-slate-800 p-2 rounded-lg hover:bg-slate-100 transition-colors text-xs font-mono flex items-center gap-1.5 cursor-pointer"
              title="Copy Page Link"
            >
              <FaShareNodes className="w-3.5 h-3.5" />
              <span>{copiedLink ? "Link Copied!" : "Share Story"}</span>
            </button>
          </div>

          {/* Story Title */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
            {currentStory.title}
          </h1>

          {/* Event Metadata Strip (Strictly Required in Story Page) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs mb-8 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <FaAward className="w-4 h-4 text-sky-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Event</span>
                <span className="font-bold text-slate-800">iPHEX-2026</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 border-l border-slate-100 pl-3">
              <FaCalendarDays className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Schedule</span>
                <span className="font-bold text-slate-800">B2B Summit</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 border-l border-slate-100 pl-3">
              <FaStore className="w-4 h-4 text-violet-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Stall No & Hall</span>
                <span className="font-bold text-slate-800">Hall: 3FF • Stall: 3FC-07</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 border-l border-slate-100 pl-3">
              <FaLocationDot className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Venue</span>
                <span className="font-bold text-slate-800">Bharat Mandapam</span>
              </div>
            </div>
          </div>

          {/* Large Hero/Event Image */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 shadow-xl ring-1 ring-black/10 mb-8">
            <Image
              src={currentStory.image}
              alt={currentStory.title}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          {/* Story Content / Full Description */}
          <article className="prose prose-slate lg:prose-lg max-w-none mb-10">
            <div className="bg-slate-50/90 rounded-2xl p-6 sm:p-8 border border-slate-200/90 leading-relaxed text-slate-700 text-base sm:text-lg">
              <p>{currentStory.description}</p>
            </div>
          </article>

          {/* Story Navigation Controls */}
          <div className="flex items-center justify-between py-6 border-t border-b border-slate-200 mb-12">
            <button
              onClick={prevStory}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-sky-600 px-4 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-all active:scale-[0.96] cursor-pointer"
            >
              <FaChevronLeft className="w-3 h-3" />
              <span>Previous Moment</span>
            </button>

            <span className="text-xs font-mono text-slate-500">
              Moment {currentIndex + 1} of {MEDIA_STORIES.length}
            </span>

            <button
              onClick={nextStory}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-sky-600 px-4 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-all active:scale-[0.96] cursor-pointer"
            >
              <span>Next Moment</span>
              <FaChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* ─── Related Moments From The Same Event ─── */}
          <section aria-label="Related Moments" className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                Related Moments From iPHEX 2026
              </h3>
              <Link
                href="/media"
                className="text-xs font-semibold text-sky-600 hover:underline"
              >
                View Full Event Wall →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedMoments.slice(0, 8).map((moment) => (
                <div
                  key={moment.id}
                  onClick={() => {
                    setSelectedStoryId(moment.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group cursor-pointer rounded-xl overflow-hidden border border-slate-200 bg-white p-2.5 hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-slate-100 mb-2 ring-1 ring-black/5">
                      <Image
                        src={moment.image}
                        alt={moment.title}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-sky-600 block uppercase truncate font-semibold">
                      {moment.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-2 group-hover:text-sky-600 mt-0.5 leading-snug">
                      {moment.title}
                    </h4>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>#{moment.id}</span>
                    <span className="text-sky-600 group-hover:translate-x-0.5 transition-transform">
                      Read →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </section>

      {/* ─── Bottom CTA Band ─── */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1024px] mx-auto px-4 sm:px-6 md:px-8 text-center">
          <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
            Interested in Pharmaceutical Sourcing with Neo Life Sciences?
          </h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto mb-6">
            Connect with our international trade desk for dossier access, product specifications, and direct B2B partnership enquiries.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/enquiry"
              className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-[0.96] inline-flex items-center gap-2"
            >
              <span>Submit Sourcing Enquiry</span>
              <FaArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/media"
              className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold px-6 py-3 rounded-lg border border-slate-200 transition-all active:scale-[0.96]"
            >
              Back to Media Page
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export default function StoryDetailPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="min-h-screen pt-28 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <StoryDetailContent />
      </Suspense>
      <Footer />
    </>
  );
}
