"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "ABOUT", id: "about" },
  { label: "LEADERSHIP", id: "leadership" },
  { label: "PRODUCTS", id: "products" },
  { label: "EXPORTS", id: "exports" },
  { label: "WHY US", id: "whyus" },
  { label: "CONTACT", id: "contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
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
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer bg-white px-3 py-1.5 rounded-md shadow-sm border border-white/20 hover:scale-[1.02] transition-transform duration-200" 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img 
              src="/images/Logo.png" 
              alt="Neo Logo" 
              className="h-10 md:h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
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
              ))}
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
        <nav className="w-full max-w-sm">
          <ul className="flex flex-col gap-6 text-center">
            {NAV_ITEMS.map((item) => (
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
            ))}
            <li className="mt-8">
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
