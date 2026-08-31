"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaXmark, FaChevronDown, FaArrowRight, FaShieldHalved } from "react-icons/fa6";
import { PRODUCT_CATEGORIES } from "./productCategories";

const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Leadership", id: "leadership" },
  { label: "Products", id: "products" },
  { label: "Exports", id: "exports" },
  { label: "Why Us", id: "whyus" },
  { label: "Contact", id: "contact" },
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
      setScrolled(window.scrollY > 40);
      
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
    handleScroll();
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
    }, 180);
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setProductsHovered(false);

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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 h-20 flex items-center bg-white/95 backdrop-blur-md border-b font-sans ${
          scrolled
            ? "border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.06)]"
            : "border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
        }`}
      >
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 flex justify-between items-center relative">
          
          {/* Logo */}
          <Link 
            href="/"
            className="flex items-center shrink-0 cursor-pointer hover:opacity-95 transition-opacity"
          >
            <img 
              src="/images/neo-logo.png" 
              alt="Neo Life Sciences Logo" 
              className="h-14 md:h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-7">
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
                        className={`text-[13px] font-medium tracking-wide transition-colors duration-150 py-1 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 rounded-sm ${
                          activeSection === item.id || productsHovered
                            ? "text-sky-600 font-semibold"
                            : "text-slate-700 hover:text-sky-600"
                        }`}
                      >
                        {item.label}
                        <FaChevronDown 
                          className={`w-3 h-3 transition-transform duration-150 ${
                            productsHovered ? "rotate-180 text-sky-600" : "text-slate-400"
                          }`} 
                        />
                        {(activeSection === item.id || productsHovered) && (
                          <span className="absolute bottom-1.5 left-0 w-full h-[2px] bg-sky-600 rounded-full" />
                        )}
                      </button>

                      {/* Desktop Products Dropdown Menu */}
                      <div
                        id="products-mega-menu"
                        role="menu"
                        aria-label="Products Categories"
                        className={`absolute top-[calc(100%+2px)] left-1/2 -translate-x-1/2 w-[340px] bg-white rounded-xl shadow-[0_16px_40px_rgba(15,23,42,0.12)] border border-slate-200/80 overflow-hidden transition-all duration-150 transform origin-top z-50 p-2.5 ${
                          productsHovered
                            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                        }`}
                      >
                        <div className="px-3 py-2 border-b border-slate-100 mb-1 flex items-center justify-between">
                          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                            Therapeutic Categories
                          </span>
                          <span className="text-[10px] font-mono text-sky-600 bg-sky-50 px-2 py-0.5 rounded">
                            WHO-GMP
                          </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          {PRODUCT_CATEGORIES.map((cat) => (
                            <Link
                              key={cat.href}
                              href={cat.href}
                              role="menuitem"
                              tabIndex={productsHovered ? 0 : -1}
                              onClick={() => setProductsHovered(false)}
                              className="group block px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors duration-150 focus-visible:outline-none focus-visible:bg-slate-50"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[13px] font-medium text-slate-800 group-hover:text-sky-600 transition-colors leading-snug">
                                  {cat.name}
                                </span>
                                <FaArrowRight className="w-3 h-3 text-slate-300 group-hover:text-sky-600 transition-colors shrink-0 ml-2" />
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-100 px-3 py-1.5 bg-slate-50/80 rounded-lg flex items-center justify-between">
                          <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
                            <FaShieldHalved className="w-3.5 h-3.5 text-[#7CB800]" /> CTD Dossier Support
                          </span>
                          <Link href="/enquiry" className="text-[11px] font-semibold text-sky-600 hover:underline flex items-center gap-1">
                            <span>Enquire</span>
                            <FaArrowRight className="w-2.5 h-2.5" />
                          </Link>
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className={`text-[13px] font-medium tracking-wide transition-colors duration-150 relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 rounded-sm ${
                        activeSection === item.id
                          ? "text-sky-600 font-semibold"
                          : "text-slate-700 hover:text-sky-600"
                      }`}
                    >
                      {item.label}
                      {activeSection === item.id && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-sky-600 rounded-full" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Enquire Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => scrollTo("contact")}
              className="bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white text-[12px] tracking-wider uppercase px-5 py-2.5 font-semibold rounded-md shadow-sm hover:shadow-md transition-transform duration-150 ease-out active:scale-[0.96] hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>Enquire Now</span>
              <FaArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-slate-800 hover:text-sky-600 focus:outline-none p-2 rounded-md hover:bg-slate-100 transition-colors active:scale-[0.96]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <FaXmark className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 bg-white/98 backdrop-blur-xl z-40 lg:hidden flex flex-col justify-between px-6 pt-24 pb-8 transition-all duration-300 ease-in-out font-sans ${
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <nav className="w-full max-w-sm mx-auto overflow-y-auto py-4">
          <ul className="flex flex-col gap-3 text-center">
            {NAV_ITEMS.map((item) => {
              const isProducts = item.id === "products";

              if (isProducts) {
                return (
                  <li key={item.id} className="w-full">
                    <button
                      onClick={() => setProductsMobileOpen(!productsMobileOpen)}
                      aria-expanded={productsMobileOpen}
                      className={`text-[16px] font-medium text-slate-800 hover:text-sky-600 transition-colors py-2 flex items-center justify-center gap-2 w-full active:scale-[0.96] ${
                        activeSection === item.id || productsMobileOpen ? "text-sky-600 font-semibold" : ""
                      }`}
                    >
                      {item.label}
                      <FaChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          productsMobileOpen ? "rotate-180 text-sky-600" : "text-slate-400"
                        }`}
                      />
                    </button>

                    {/* Mobile Accordion Dropdown */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        productsMobileOpen ? "max-h-[600px] mt-2 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="flex flex-col gap-1 p-3 border border-slate-200 bg-slate-50 rounded-xl text-left">
                        {PRODUCT_CATEGORIES.map((cat) => (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setProductsMobileOpen(false);
                            }}
                            className="text-[14px] text-slate-700 hover:text-sky-600 hover:bg-white rounded-lg px-3 py-2 text-left font-medium transition-colors border-b border-slate-200/50 last:border-b-0 active:scale-[0.96]"
                          >
                            {cat.name}
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
                    className={`text-[16px] font-medium text-slate-800 hover:text-sky-600 transition-colors py-2 block w-full active:scale-[0.96] ${
                      activeSection === item.id ? "text-sky-600 font-semibold" : ""
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="w-full max-w-sm mx-auto pt-4 border-t border-slate-200">
          <button
            onClick={() => scrollTo("contact")}
            className="w-full bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white py-3.5 text-[13px] tracking-wider uppercase transition-transform duration-150 ease-out active:scale-[0.96] font-semibold shadow-md rounded-md flex items-center justify-center gap-2"
          >
            <span>Enquire Now</span>
            <FaArrowRight className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center justify-center gap-3 text-xs text-slate-500 font-mono mt-4">
            <span>040-35247813</span>
            <span>•</span>
            <span>Hyderabad, India</span>
          </div>
        </div>
      </div>
    </>
  );
}
