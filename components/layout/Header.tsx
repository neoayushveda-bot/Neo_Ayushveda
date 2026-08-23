"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight, Layers, Phone, Mail } from "lucide-react";
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
  const [productsMobileOpen, setProductsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const [productsHovered, setProductsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const productsButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      
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
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    }, 180);
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setProductsHovered(false);
    setProductsMobileOpen(false);

    if (!isHomePage) {
      window.location.href = `/#${id}`;
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 flex items-center bg-white/95 backdrop-blur-md border-b border-emerald/10 shadow-sm text-ink font-montserrat">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 flex justify-between items-center relative">
          {/* Logo */}
          <Link 
            href="/"
            className="flex items-center cursor-pointer py-1"
          >
            <img 
              src="/images/Logo.png" 
              alt="Neo Life Sciences Logo" 
              className="h-12 sm:h-14 md:h-[60px] w-auto object-contain transition-all"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:block font-montserrat">
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
                        className={`text-[12px] font-bold tracking-[0.14em] uppercase transition-colors duration-200 py-1 flex items-center gap-1.5 ${
                          activeSection === item.id || productsHovered
                            ? "text-blue-600"
                            : "text-ink/80 hover:text-blue-600"
                        }`}
                      >
                        {item.label}
                        <ChevronDown 
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            productsHovered ? "rotate-180 text-blue-600" : "text-ink/40"
                          }`} 
                        />
                        {(activeSection === item.id || productsHovered) && (
                          <span className="absolute bottom-4 left-0 w-full h-[2.5px] bg-blue-600 rounded-full" />
                        )}
                      </button>

                      {/* Desktop Products Dropdown Menu — Clean White Card Layout matching screenshot */}
                      <div
                        id="products-mega-menu"
                        role="menu"
                        aria-label="Products Categories"
                        className={`absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 w-[340px] bg-white rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-slate-200/80 overflow-hidden transition-all duration-200 transform origin-top z-50 p-4 ${
                          productsHovered
                            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                        }`}
                      >
                        <div className="flex flex-col gap-3 font-jakarta">
                          {PRODUCT_CATEGORIES.map((cat) => (
                            <Link
                              key={cat.href}
                              href={cat.href}
                              role="menuitem"
                              tabIndex={productsHovered ? 0 : -1}
                              onClick={() => setProductsHovered(false)}
                              className="block p-2 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                              <span className="text-[14px] font-semibold text-[#2C3830] hover:text-blue-600 transition-colors leading-snug block">
                                {cat.name}
                              </span>
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
                      className={`text-[12px] font-bold tracking-[0.14em] uppercase transition-colors duration-200 relative py-1 ${
                        activeSection === item.id
                          ? "text-blue-600"
                          : "text-ink/80 hover:text-blue-600"
                      }`}
                    >
                      {item.label}
                      {activeSection === item.id && (
                        <span className="absolute bottom-[-2px] left-0 w-full h-[2.5px] bg-blue-600 rounded-full" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Enquire Button */}
          <div className="hidden lg:block font-montserrat">
            <button
              onClick={() => scrollTo("contact")}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-[11px] tracking-[0.15em] uppercase px-6 py-2.5 rounded-xl font-bold transition-all duration-200 shadow-md hover:shadow-[0_4px_16px_rgba(37,99,235,0.35)] active:scale-95"
            >
              ENQUIRE NOW
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden focus:outline-none p-2 rounded-xl border border-emerald/20 text-emerald bg-white hover:bg-cream transition-colors z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} className="text-emerald font-bold" /> : <Menu size={24} className="text-emerald" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay — Clean White Layout */}
      <div
        className={`fixed inset-0 bg-white text-slate-800 z-40 lg:hidden flex flex-col justify-between px-6 pt-24 pb-8 transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <nav className="w-full max-w-sm mx-auto font-montserrat flex-1 flex flex-col justify-center overflow-y-auto z-10">
          <ul className="flex flex-col gap-2 text-center">
            {NAV_ITEMS.map((item) => {
              const isProducts = item.id === "products";

              if (isProducts) {
                return (
                  <li key={item.id} className="w-full">
                    <button
                      onClick={() => setProductsMobileOpen(!productsMobileOpen)}
                      className={`text-[16px] font-bold tracking-[0.16em] uppercase transition-colors py-3 flex items-center justify-center gap-2 w-full ${
                        activeSection === item.id || productsMobileOpen ? "text-blue-600" : "text-slate-800 hover:text-blue-600"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          productsMobileOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                        }`}
                      />
                    </button>

                    {/* Mobile Products Accordion — Clean White Card Layout matching screenshot */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        productsMobileOpen ? "max-h-[500px] mt-2 mb-4 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="flex flex-col gap-1 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 shadow-sm text-left font-jakarta">
                        {PRODUCT_CATEGORIES.map((cat) => (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setProductsMobileOpen(false);
                            }}
                            className="block p-3 rounded-xl hover:bg-white transition-colors"
                          >
                            <span className="text-[15px] font-semibold text-[#2C3830] hover:text-blue-600 transition-colors leading-snug block">
                              {cat.name}
                            </span>
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
                    className={`text-[16px] font-bold tracking-[0.16em] uppercase transition-colors py-3 block w-full ${
                      activeSection === item.id ? "text-blue-600" : "text-slate-800 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom CTA & Contact in Mobile Menu */}
        <div className="w-full max-w-sm mx-auto pt-6 border-t border-slate-200/80 flex flex-col gap-4 font-montserrat z-10">
          <button
            onClick={() => scrollTo("contact")}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-4 rounded-xl text-[13px] tracking-[0.16em] uppercase font-bold shadow-lg shadow-blue-600/25 transition-all active:scale-98"
          >
            ENQUIRE NOW
          </button>
          <div className="flex items-center justify-center gap-4 text-[12px] text-slate-500 font-inter">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-blue-600" /> 040-35247813
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-blue-600" /> info@neolspharma.com
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
