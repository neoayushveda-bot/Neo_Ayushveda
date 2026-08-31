"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaChevronRight,
  FaLayerGroup,
  FaDiagramProject,
  FaArrowRight,
  FaShieldHalved
} from "react-icons/fa6";
import Header from "../../../../components/layout/Header";
import Footer from "../../../../components/layout/Footer";
import {
  getCategoryBySlug,
  PRODUCT_CATEGORY_DETAILS,
} from "../../../../components/layout/productCategoryData";
import { useParams } from "next/navigation";

function buildEnquiryUrl(categoryName: string, groupTitle: string, itemName: string) {
  const params = new URLSearchParams({
    category: categoryName,
    group: groupTitle,
    product: itemName,
  });
  return `/enquiry?${params.toString()}`;
}

export default function ProductCategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const category = getCategoryBySlug(slug);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const reveals = document.querySelectorAll(".reveal, .reveal-scale");
    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [category]);

  if (!category) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white pt-20 font-sans">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-32 text-center">
            <h1 className="font-serif text-4xl text-slate-900 mb-4 font-bold">Category Not Found</h1>
            <p className="text-slate-500 mb-8">
              The product category you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold transition-colors uppercase tracking-wider text-xs font-mono"
            >
              <FaArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-slate-900 font-sans">
        {/* ─── Hero Section ─── */}
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 grid-texture opacity-50 pointer-events-none" />

          <div className="relative max-w-[1280px] mx-auto px-6 md:px-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs tracking-wider uppercase mb-6 opacity-0 animate-fade-in-up font-mono">
              <Link
                href="/"
                className="text-slate-500 hover:text-sky-600 transition-colors"
              >
                Home
              </Link>
              <FaChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-slate-500">Products</span>
              <FaChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-sky-600 font-bold">{category.name}</span>
            </nav>

            {/* Badge */}
            {category.badge && (
              <div className="inline-flex items-center gap-2 mb-4 opacity-0 animate-fade-in-up animation-delay-100">
                <span className="text-[11px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 tracking-wider">
                  {category.badge}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-[1.12] max-w-3xl mb-4 opacity-0 animate-fade-in-up animation-delay-200 font-bold">
              {category.name}
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl opacity-0 animate-fade-in-up animation-delay-300">
              {category.heroDesc}
            </p>

            {/* Stats bar */}
            <div className="flex flex-wrap items-center gap-6 mt-8 opacity-0 animate-fade-in-up animation-delay-400 font-mono">
              <div className="flex items-center gap-2">
                <FaLayerGroup className="w-3.5 h-3.5 text-sky-600" />
                <span className="text-xs text-slate-600 tracking-wider uppercase font-semibold">
                  {category.subcategories.length}{" "}
                  {category.subcategories.length === 1 ? "Category" : "Categories"}
                </span>
              </div>
              <div className="w-px h-4 bg-slate-300 hidden sm:block" />
              <div className="flex items-center gap-2">
                <FaDiagramProject className="w-3.5 h-3.5 text-sky-600" />
                <span className="text-xs text-slate-600 tracking-wider uppercase font-semibold">
                  {category.subcategories.reduce((acc, sc) => acc + sc.items.length, 0)} Segments
                </span>
              </div>
              <div className="w-px h-4 bg-slate-300 hidden sm:block" />
              <div className="flex items-center gap-2">
                <FaShieldHalved className="w-3.5 h-3.5 text-[#7CB800]" />
                <span className="text-xs text-slate-600 tracking-wider uppercase font-semibold">
                  WHO-GMP & CTD Ready
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Subcategory Sections ─── */}
        <section className="py-16 md:py-24 bg-slate-50/50 border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <div className="flex flex-col gap-14 md:gap-16">
              {category.subcategories.map((group, gi) => (
                <div
                  key={group.groupTitle}
                  ref={(el) => { sectionsRef.current[gi] = el; }}
                  className="reveal"
                  style={{ transitionDelay: `${gi * 100}ms` }}
                >
                  {/* Group Header */}
                  <div className="flex items-center gap-3.5 mb-6 pb-3 border-b border-slate-200">
                    <div className="w-1.5 h-6 rounded-full bg-sky-600" />
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                        {group.groupTitle}
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5 font-mono">
                        {group.items.length} specialized segments — select any item to submit custom batch RFQ
                      </p>
                    </div>
                  </div>

                  {/* Items Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {group.items.map((item, ii) => {
                      const hasChildren = "children" in item && item.children;

                      if (hasChildren) {
                        return (
                          <div
                            key={item.name}
                            className="sm:col-span-2 reveal-scale"
                            style={{ transitionDelay: `${(gi * 100) + (ii * 50)}ms` }}
                          >
                            <div className="group relative p-5 rounded-xl border border-slate-200 bg-white hover:border-sky-500 hover:shadow-md transition-all duration-200">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
                                  <FaDiagramProject className="w-4 h-4" />
                                </div>
                                <div>
                                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                                    {item.name}
                                  </h3>
                                  <p className="text-xs text-slate-500 font-mono">
                                    {item.children!.length} sub-specialties
                                  </p>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {item.children!.map((child) => (
                                  <Link
                                    key={child.name}
                                    href={buildEnquiryUrl(category.name, group.groupTitle, child.name)}
                                    className="flex items-center gap-2 py-2 px-3 rounded-md bg-slate-50 border border-slate-200 hover:border-sky-400 hover:bg-sky-50/60 transition-all duration-150 group/child active:scale-[0.96]"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 group-hover/child:scale-125 transition-transform" />
                                    <span className="text-xs text-slate-700 font-medium group-hover/child:text-sky-700 transition-colors flex-1">
                                      {child.name}
                                    </span>
                                    <FaArrowRight className="w-2.5 h-2.5 text-sky-600 opacity-0 group-hover/child:opacity-100 transition-opacity" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={item.name}
                          className="reveal-scale"
                          style={{ transitionDelay: `${(gi * 100) + (ii * 50)}ms` }}
                        >
                          <Link
                            href={buildEnquiryUrl(category.name, group.groupTitle, item.name)}
                            className="group relative h-full p-4 rounded-xl border border-slate-200 bg-white hover:border-sky-500 hover:shadow-md transition-all duration-200 flex items-center gap-3 active:scale-[0.96]"
                          >
                            <div className="w-2 h-2 rounded-full bg-sky-500 group-hover:scale-125 transition-transform shrink-0" />
                            <h3 className="text-xs font-semibold text-slate-800 group-hover:text-sky-600 transition-colors leading-snug flex-1">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-1 text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider hidden sm:inline">Enquire</span>
                              <FaArrowRight className="w-3 h-3" />
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Other Categories Section ─── */}
        <section className="py-16 md:py-20 bg-slate-900 text-slate-100">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <div className="text-center mb-10 reveal">
              <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-sky-400 font-semibold mb-2">
                EXPLORE DIRECTORY
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-white font-bold">
                Other Product Categories
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRODUCT_CATEGORY_DETAILS.filter((c) => c.slug !== slug).map(
                (cat, i) => (
                  <Link
                    key={cat.slug}
                    href={`/products/${cat.slug}`}
                    className="reveal-scale group relative p-5 rounded-xl border border-slate-800 bg-slate-950 hover:border-sky-500 transition-all duration-200 active:scale-[0.96]"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors leading-snug pr-2">
                        {cat.name}
                      </h3>
                      {cat.badge && (
                        <span className="text-[9px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30 shrink-0 whitespace-nowrap">
                          {cat.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {cat.shortDesc}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider transition-all">
                      <span>View Details</span>
                      <FaChevronRight className="w-2.5 h-2.5" />
                    </div>
                  </Link>
                )
              )}
            </div>

            <div className="text-center mt-10 reveal">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 font-semibold text-xs font-mono tracking-wider uppercase transition-colors"
              >
                <FaArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
