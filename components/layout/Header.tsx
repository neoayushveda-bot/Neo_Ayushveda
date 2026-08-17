"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight, Sparkles, Layers } from "lucide-react";
import { PRODUCT_CATEGORIES } from "./productCategories";

const NAV_ITEMS = [
  { label: "ABOUT", id: "about" },
  { label: "LEADERSHIP", id: "leadership" },
  { label: "PRODUCTS", id: "products" },
  { label: "EXPORTS", id: "exports" },
  { label: "WHY US", id: "whyus" },
  { label: "CONTACT", id: "contact" },
];

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Mega dropdown state & timers
  const [productsHovered, setProductsHovered] = useState(false);
  const [productsMobileOpen, setProductsMobileOpen] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const productsButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      
      // Scroll spy logic
      const scrollPosition = window.scrollY + 100;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation listener (Escape key to close mega menu)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && productsHovered) {
        setProductsHovered(false);
        productsButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [productsHovered]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setProductsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setProductsHovered(false);
    }, 200); // 200ms grace period bridge
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setProductsHovered(false);

    if (!isHomePage) {
      // Navigate to homepage with hash
      window.location.href = `/#${id}`;
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 flex items-center opacity-0 animate-slide-down ${
          scrolled
            ? "bg-emerald/85 backdrop-blur-[20px] border-b border-white/10 shadow-[0_10px_30px_rgba(10,26,18,0.15)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 flex justify-between items-center relative">
          {/* Logo */}
          <Link 
            href="/"
            className="flex items-center cursor-pointer bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm border border-white/20 hover:scale-[1.02] transition-transform duration-200"
          >
            <img 
              src="/images/Logo.png" 
              alt="Neo Life Sciences Logo" 
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => {
                const isProducts = item.id === "products";

                if (isProducts) {
                  return (
                    <li
                      key={item.id}
                      className="relative py-6"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        ref={productsButtonRef}
                        onClick={() => scrollTo(item.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
                            e.preventDefault();
                            setProductsHovered(!productsHovered);
                          }
                        }}
                        aria-expanded={productsHovered}
                        aria-haspopup="true"
                        aria-controls="products-mega-menu"
                        className={`text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-300 relative py-1 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded-sm ${
                          scrolled
                            ? activeSection === item.id || productsHovered
                              ? "text-gold"
                              : "text-cream/70 hover:text-cream"
                            : activeSection === item.id || productsHovered
                              ? "text-gold border-b border-gold"
                              : "text-cream/70 lg:text-ink/70 hover:text-cream lg:hover:text-ink"
                        }`}
                      >
                        {item.label}
                        <ChevronDown 
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            productsHovered ? "rotate-180 text-gold" : ""
                          }`} 
                        />
                        {scrolled && (activeSection === item.id || productsHovered) && (
                          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold" />
                        )}
                      </button>

                      {/* Desktop Products Mega Dropdown Menu */}
                      <div
                        id="products-mega-menu"
                        role="menu"
                        aria-label="Products Categories Portfolio"
                        className={`absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-[520px] max-w-[calc(100vw-32px)] bg-[#0A1A12]/95 backdrop-blur-2xl border border-gold/25 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] rounded-xl overflow-hidden transition-all duration-300 transform origin-top z-50 ${
                          productsHovered
                            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                        }`}
                      >
                        {/* Mega Menu Top Header Bar */}
                        <div className="flex items-center justify-between px-6 py-3.5 bg-[#122A1C]/90 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-gold" />
                            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-cream/90">
                              PHARMACEUTICAL PORTFOLIO & CATEGORIES
                            </span>
                          </div>
                          <span className="text-[10px] font-medium tracking-wider text-gold px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/20">
                            3 Core Divisions
                          </span>
                        </div>

                        {/* 2-Column Grid Layout */}
                        <div className="grid grid-cols-1 gap-3.5 p-5 bg-gradient-to-b from-[#0A1A12] to-[#07130D]">
                          {PRODUCT_CATEGORIES.map((cat) => (
                            <Link
                              key={cat.href}
                              href={cat.href}
                              role="menuitem"
                              tabIndex={productsHovered ? 0 : -1}
                              onClick={() => setProductsHovered(false)}
                              className="group flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-gold/35 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <h4 className="text-[13px] font-semibold text-cream group-hover:text-gold transition-colors leading-tight truncate">
                                    {cat.name}
                                  </h4>
                                  {cat.badge && (
                                    <span className="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded bg-gold/15 text-gold border border-gold/30 shrink-0">
                                      {cat.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-cream/50 group-hover:text-cream/70 transition-colors line-clamp-2 leading-relaxed">
                                  {cat.shortDesc}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Mega Menu Footer Bar */}
                        <div className="flex items-center justify-end px-6 py-3 bg-[#0A1A12] border-t border-white/10 text-[11px]">
                          <button
                            onClick={() => scrollTo("products")}
                            className="text-gold hover:text-gold-light font-semibold tracking-wider uppercase text-[10px] flex items-center gap-1 transition-colors"
                          >
                            Explore Portfolio Section <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className={`text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-300 relative py-1 ${
                        scrolled
                          ? activeSection === item.id
                            ? "text-gold"
                            : "text-cream/70 hover:text-cream"
                          : activeSection === item.id
                            ? "text-gold border-b border-gold"
                            : "text-cream/70 lg:text-ink/70 hover:text-cream lg:hover:text-ink"
                      }`}
                    >
                      {item.label}
                      {scrolled && activeSection === item.id && (
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Enquire Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollTo("contact")}
              className={`border text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 font-semibold transition-all duration-300 ${
                scrolled
                  ? "border-gold/70 text-gold hover:bg-gold hover:text-emerald"
                  : "border-gold/70 text-gold hover:bg-gold hover:text-emerald lg:border-ink/20 lg:text-ink lg:hover:border-gold lg:hover:bg-gold lg:hover:text-emerald"
              }`}
            >
              ENQUIRE NOW
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gold focus:outline-none p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} className={scrolled ? "text-gold" : "text-gold lg:text-ink"} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-emerald z-40 lg:hidden flex flex-col justify-center items-center px-6 transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <nav className="w-full max-w-sm max-h-[85vh] overflow-y-auto py-8">
          <ul className="flex flex-col gap-5 text-center">
            {NAV_ITEMS.map((item) => {
              const isProducts = item.id === "products";

              if (isProducts) {
                return (
                  <li key={item.id} className="w-full">
                    <button
                      onClick={() => setProductsMobileOpen(!productsMobileOpen)}
                      aria-expanded={productsMobileOpen}
                      className={`text-[16px] font-medium tracking-[0.2em] uppercase text-cream/70 hover:text-gold transition-colors py-2 flex items-center justify-center gap-2 w-full ${
                        activeSection === item.id || productsMobileOpen ? "text-gold font-semibold" : ""
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          productsMobileOpen ? "rotate-180 text-gold" : "text-cream/50"
                        }`}
                      />
                    </button>

                    {/* Mobile Accordion Dropdown */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        productsMobileOpen ? "max-h-[600px] mt-2 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="flex flex-col gap-2 p-3 border-l-2 border-gold/40 bg-black/20 rounded-r-lg text-left">
                        {PRODUCT_CATEGORIES.map((cat) => (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setProductsMobileOpen(false);
                            }}
                            className="text-[13px] text-cream/80 hover:text-gold transition-colors py-2 px-2 text-left flex items-center justify-between border-b border-white/5 last:border-b-0 group"
                          >
                            <span className="font-medium leading-snug group-hover:text-gold">
                              {cat.name}
                            </span>
                            {cat.badge && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-gold/15 text-gold border border-gold/30 shrink-0 ml-2">
                                {cat.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`text-[16px] font-medium tracking-[0.2em] uppercase text-cream/70 hover:text-gold transition-colors py-2 block w-full ${
                      activeSection === item.id ? "text-gold font-semibold" : ""
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
            <li className="mt-6">
              <button
                onClick={() => scrollTo("contact")}
                className="w-full border border-gold/70 text-gold py-3 text-[13px] tracking-[0.2em] uppercase hover:bg-gold hover:text-emerald transition-colors font-semibold"
              >
                ENQUIRE NOW
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <style jsx global>{`
        /* Scrolled text override for top-of-page split screen */
        @media (min-width: 1024px) {
          header:not(.bg-emerald\/85) .scrolled-text-override {
            color: var(--cream) !important;
          }
          /* Left 50% is dark emerald, right 50% is cream. Logo sits at ~10% width, so it is over emerald -> white text */
          /* Nav links sit at center ~50% width, so we want them dark or highly readable */
          header:not(.bg-emerald\/85) nav button {
            color: var(--ink-mid) !important;
          }
          header:not(.bg-emerald\/85) nav button:hover {
            color: var(--ink) !important;
          }
          /* Enquire button is at ~90% width, so it is over cream -> dark border and gold/dark text */
          header:not(.bg-emerald\/85) .hidden.lg\:block > button {
            border-color: rgba(10,26,18,0.2) !important;
            color: var(--emerald) !important;
          }
          header:not(.bg-emerald\/85) .hidden.lg\:block > button:hover {
            border-color: var(--gold) !important;
            background-color: var(--gold) !important;
            color: var(--emerald) !important;
          }
        }
      `}</style>
    </>
  );
}
