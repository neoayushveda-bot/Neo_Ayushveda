"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 flex items-center bg-white/95 backdrop-blur-md border-b border-slate-200/80 opacity-0 animate-slide-down ${
          scrolled
            ? "shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            : "shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
        }`}
      >
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 flex justify-between items-center relative">
          {/* Logo */}
          <Link 
            href="/"
            className="flex items-center cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all duration-200 py-1"
          >
            <img 
              src="/images/Logo.png" 
              alt="Neo Life Sciences Logo" 
              className="h-12 sm:h-14 md:h-[60px] w-auto object-contain transition-all"
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
                        className={`text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-200 relative py-1 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm ${
                          activeSection === item.id || productsHovered
                            ? "text-blue-600"
                            : "text-slate-700 hover:text-blue-600"
                        }`}
                      >
                        {item.label}
                        <ChevronDown 
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            productsHovered ? "rotate-180 text-blue-600" : "text-slate-400"
                          }`} 
                        />
                        {(activeSection === item.id || productsHovered) && (
                          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 rounded-full" />
                        )}
                      </button>

                      {/* Desktop Products Dropdown Menu */}
                      <div
                        id="products-mega-menu"
                        role="menu"
                        aria-label="Products Categories"
                        className={`absolute top-[calc(100%+2px)] left-1/2 -translate-x-1/2 w-[280px] bg-white rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden transition-all duration-200 transform origin-top z-50 p-2 ${
                          productsHovered
                            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                        }`}
                      >
                        <div className="py-1 flex flex-col gap-0.5">
                          {PRODUCT_CATEGORIES.map((cat) => (
                            <Link
                              key={cat.href}
                              href={cat.href}
                              role="menuitem"
                              tabIndex={productsHovered ? 0 : -1}
                              onClick={() => setProductsHovered(false)}
                              className="block px-4 py-2.5 text-[13px] font-medium text-slate-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 focus-visible:outline-none focus-visible:bg-blue-50"
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
                      className={`text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-200 relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm ${
                        activeSection === item.id
                          ? "text-blue-600"
                          : "text-slate-700 hover:text-blue-600"
                      }`}
                    >
                      {item.label}
                      {activeSection === item.id && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 rounded-full" />
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
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 font-semibold rounded-sm shadow-sm hover:shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all duration-200 hover:-translate-y-0.5"
            >
              ENQUIRE NOW
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-slate-800 hover:text-blue-600 focus:outline-none p-1.5 rounded-md hover:bg-slate-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white/98 backdrop-blur-xl z-40 lg:hidden flex flex-col justify-center items-center px-6 transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <nav className="w-full max-w-sm max-h-[85vh] overflow-y-auto py-8">
          <ul className="flex flex-col gap-4 text-center">
            {NAV_ITEMS.map((item) => {
              const isProducts = item.id === "products";

              if (isProducts) {
                return (
                  <li key={item.id} className="w-full">
                    <button
                      onClick={() => setProductsMobileOpen(!productsMobileOpen)}
                      aria-expanded={productsMobileOpen}
                      className={`text-[15px] font-semibold tracking-[0.15em] uppercase text-slate-800 hover:text-blue-600 transition-colors py-2 flex items-center justify-center gap-2 w-full ${
                        activeSection === item.id || productsMobileOpen ? "text-blue-600" : ""
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          productsMobileOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                        }`}
                      />
                    </button>

                    {/* Mobile Accordion Dropdown */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        productsMobileOpen ? "max-h-[600px] mt-2 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="flex flex-col gap-1 p-3 border-l-2 border-blue-600 bg-slate-50 rounded-r-lg text-left">
                        {PRODUCT_CATEGORIES.map((cat) => (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setProductsMobileOpen(false);
                            }}
                            className="text-[13px] text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 rounded px-3 py-2 text-left font-medium transition-colors border-b border-slate-200/50 last:border-b-0"
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
                    className={`text-[15px] font-semibold tracking-[0.15em] uppercase text-slate-800 hover:text-blue-600 transition-colors py-2 block w-full ${
                      activeSection === item.id ? "text-blue-600" : ""
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 text-[12px] tracking-[0.18em] uppercase transition-all duration-200 font-semibold shadow-md shadow-blue-600/25 rounded-sm"
              >
                ENQUIRE NOW
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
