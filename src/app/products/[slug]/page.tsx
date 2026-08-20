"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Layers, GitBranch, ArrowRight, Send } from "lucide-react";
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

  // Scroll-reveal observer
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
  }, [slug]);

  if (!category) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-cream pt-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-32 text-center">
            <h1 className="font-playfair text-4xl text-ink mb-4">Category Not Found</h1>
            <p className="text-ink-soft mb-8">
              The product category you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
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
      <main className="min-h-screen bg-cream">
        {/* ─── Hero Section ─── */}
        <section className="relative bg-emerald pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(244,239,235,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(244,239,235,0.15) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* Gradient glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-soft/30 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-[1280px] mx-auto px-6 md:px-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase mb-8 opacity-0 animate-fade-in-up">
              <Link
                href="/"
                className="text-cream/50 hover:text-gold transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-cream/30" />
              <span className="text-cream/50">Products</span>
              <ChevronRight className="w-3 h-3 text-cream/30" />
              <span className="text-gold font-semibold">{category.name}</span>
            </nav>

            {/* Badge */}
            {category.badge && (
              <div className="inline-flex items-center gap-2 mb-6 opacity-0 animate-fade-in-up animation-delay-100">
                <span className="text-[10px] font-semibold uppercase px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 tracking-[0.15em]">
                  {category.badge}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-cream leading-[1.15] max-w-3xl mb-6 opacity-0 animate-fade-in-up animation-delay-200">
              {category.name}
            </h1>

            {/* Description */}
            <p className="text-cream/60 text-base md:text-lg leading-relaxed max-w-2xl opacity-0 animate-fade-in-up animation-delay-300">
              {category.heroDesc}
            </p>

            {/* Stats bar */}
            <div className="flex items-center gap-6 mt-10 opacity-0 animate-fade-in-up animation-delay-400">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-gold" />
                <span className="text-[12px] text-cream/50 tracking-wider uppercase">
                  {category.subcategories.length}{" "}
                  {category.subcategories.length === 1 ? "Category" : "Categories"}
                </span>
              </div>
              <div className="w-px h-4 bg-cream/15" />
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-gold" />
                <span className="text-[12px] text-cream/50 tracking-wider uppercase">
                  {category.subcategories.reduce((acc, sc) => acc + sc.items.length, 0)} Segments
                </span>
              </div>
              <div className="w-px h-4 bg-cream/15" />
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-gold" />
                <span className="text-[12px] text-cream/50 tracking-wider uppercase">
                  Click any item to enquire
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Subcategory Sections ─── */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <div className="flex flex-col gap-16 md:gap-20">
              {category.subcategories.map((group, gi) => (
                <div
                  key={group.groupTitle}
                  ref={(el) => { sectionsRef.current[gi] = el; }}
                  className="reveal"
                  style={{ transitionDelay: `${gi * 100}ms` }}
                >
                  {/* Group Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-1 h-8 rounded-full bg-gradient-to-b from-gold to-gold/20" />
                    <div>
                      <h2 className="font-playfair text-2xl md:text-3xl text-ink leading-tight">
                        {group.groupTitle}
                      </h2>
                      <p className="text-ink-soft text-sm mt-1">
                        {group.items.length} specialized segments — click to enquire
                      </p>
                    </div>
                  </div>

                  {/* Items Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {group.items.map((item, ii) => {
                      const hasChildren = "children" in item && item.children;

                      if (hasChildren) {
                        // Parent with subdivision (e.g., Oncology)
                        return (
                          <div
                            key={item.name}
                            className="sm:col-span-2 reveal-scale"
                            style={{ transitionDelay: `${(gi * 100) + (ii * 50)}ms` }}
                          >
                            <div className="group relative p-5 rounded-xl border border-emerald/10 bg-white hover:border-gold/40 hover:shadow-[0_8px_30px_rgba(201,150,59,0.08)] transition-all duration-300">
                              {/* Parent header */}
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald flex items-center justify-center shrink-0">
                                  <GitBranch className="w-4.5 h-4.5 text-gold" />
                                </div>
                                <div>
                                  <h3 className="text-[15px] font-semibold text-ink group-hover:text-emerald transition-colors">
                                    {item.name}
                                  </h3>
                                  <p className="text-[11px] text-ink-soft">
                                    {item.children!.length} sub-specialties
                                  </p>
                                </div>
                              </div>

                              {/* Children list — each links to enquiry */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {item.children!.map((child) => (
                                  <Link
                                    key={child.name}
                                    href={buildEnquiryUrl(category.name, group.groupTitle, child.name)}
                                    className="flex items-center gap-2.5 py-2 px-3 rounded-lg bg-cream/80 border border-transparent hover:border-gold/25 hover:bg-gold-pale/30 transition-all duration-200 group/child"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 group-hover/child:scale-150 transition-transform" />
                                    <span className="text-[13px] text-ink-mid font-medium group-hover/child:text-emerald transition-colors flex-1">
                                      {child.name}
                                    </span>
                                    <ArrowRight className="w-3 h-3 text-gold/0 group-hover/child:text-gold transition-all duration-200" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      }

                      // Regular item card — links to enquiry
                      return (
                        <div
                          key={item.name}
                          className="reveal-scale"
                          style={{ transitionDelay: `${(gi * 100) + (ii * 50)}ms` }}
                        >
                          <Link
                            href={buildEnquiryUrl(category.name, group.groupTitle, item.name)}
                            className="group relative h-full p-4 rounded-xl border border-emerald/8 bg-white hover:border-blue-500/40 hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)] transition-all duration-300 flex items-center gap-3"
                          >
                            <div className="w-2 h-2 rounded-full bg-blue-600/60 group-hover:bg-blue-600 group-hover:scale-125 transition-all duration-300 shrink-0" />
                            <h3 className="text-[14px] font-semibold text-ink group-hover:text-blue-600 transition-colors leading-snug flex-1">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-1 text-blue-600/0 group-hover:text-blue-600 transition-all duration-300 shrink-0">
                              <span className="text-[9px] font-bold uppercase tracking-wider hidden sm:inline">Enquire</span>
                              <ArrowRight className="w-3.5 h-3.5" />
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
        <section className="py-16 md:py-20 bg-emerald">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12 reveal">
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold font-semibold mb-3">
                Explore More
              </p>
              <h2 className="font-playfair text-2xl md:text-3xl text-cream">
                Other Product Categories
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRODUCT_CATEGORY_DETAILS.filter((c) => c.slug !== slug).map(
                (cat, i) => (
                  <Link
                    key={cat.slug}
                    href={`/products/${cat.slug}`}
                    className="reveal-scale group relative p-5 rounded-xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] hover:border-blue-400/40 transition-all duration-300"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[14px] font-semibold text-cream group-hover:text-blue-400 transition-colors leading-snug pr-2">
                        {cat.name}
                      </h3>
                      {cat.badge && (
                        <span className="text-[8px] font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30 shrink-0 whitespace-nowrap">
                          {cat.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-cream/40 group-hover:text-cream/60 transition-colors line-clamp-2 leading-relaxed">
                      {cat.shortDesc}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-blue-400/0 group-hover:text-blue-400 text-[10px] font-semibold uppercase tracking-wider transition-all duration-300">
                      View Details
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </Link>
                )
              )}
            </div>

            {/* Back to home */}
            <div className="text-center mt-12 reveal">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-[12px] tracking-[0.15em] uppercase transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
