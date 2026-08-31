"use client";

import React from "react";
import Link from "next/link";
import { FaEnvelope, FaPhoneVolume, FaLocationDot, FaShieldHalved } from "react-icons/fa6";

export default function Footer() {
  const scrollTo = (id: string) => {
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

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 font-sans">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 lg:py-20">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-slate-800">
          
          {/* Column 1 - Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="flex items-center">
              <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm inline-flex items-center">
                <img
                  src="/images/Logo.png"
                  alt="Neo Life Sciences Logo"
                  className="h-11 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              NEO LIFE SCIENCES PVT LTD is an international pharmaceutical trading and B2B export enterprise sourcing WHO-GMP( PIC/S, EU GMP, US FDA and other SRAs) certified generics, medical devices, APIs, and standardized herbal formulations from India to 50+ regulated markets worldwide.
            </p>
            <div className="flex items-center gap-2 pt-1 font-mono text-[11px] text-[#A4D73B]">
              <FaShieldHalved className="w-4 h-4 text-[#7CB800]" />
              <span>WHO-GMP • ISO 9001:2015 • CTD Compliant</span>
            </div>
          </div>

          {/* Column 2 - Products (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-100 mb-4 pb-2 border-b border-slate-800">
              Product Portfolio
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {[
                { label: "Pharmaceutical Generics (Rx)", href: "/products/finished-pharmaceutical-healthcare-products" },
                { label: "Specialty Therapeutics", href: "/products/finished-pharmaceutical-healthcare-products" },
                { label: "Active Ingredients (APIs)", href: "/products/active-pharmaceutical-ingredients" },
                { label: "Medical Devices & Diagnostics", href: "/products/medical-devices-diagnostics" },
                { label: "Classical Ayurvedic Medicines", href: "/products/finished-pharmaceutical-healthcare-products" },
                { label: "Herbal Nutraceuticals", href: "/products/finished-pharmaceutical-healthcare-products" },
                { label: "Clinical Cosmeceuticals", href: "/products/finished-pharmaceutical-healthcare-products" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Corporate & Services (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-100 mb-4 pb-2 border-b border-slate-800">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-sky-400 transition-colors">
                  About Enterprise
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("leadership")}
                  className="text-slate-400 hover:text-sky-400 text-left transition-colors"
                >
                  Executive Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("exports")}
                  className="text-slate-400 hover:text-sky-400 text-left transition-colors"
                >
                  Global Trade Routes
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("certifications")}
                  className="text-slate-400 hover:text-sky-400 text-left transition-colors"
                >
                  Accreditation Matrix
                </button>
              </li>
              <li>
                <Link href="/enquiry" className="text-slate-400 hover:text-sky-400 transition-colors">
                  Procurement Desk
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-slate-400 hover:text-sky-400 transition-colors">
                  Privacy Policy & Data
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Registered Office (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-100 mb-4 pb-2 border-b border-slate-800">
              Registered Office
            </h4>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <FaLocationDot className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                <address className="not-italic leading-relaxed text-xs font-mono">
                  <strong className="text-slate-200 block text-xs font-heading font-bold">NEO LIFE SCIENCES PVT LTD</strong>
                  201-2nd Floor, Above ICICI Bank,<br />
                  Plot 13/A/B Lane 12, MLA Colony,<br />
                  Banjara Hills, Hyderabad – 500034,<br />
                  Telangana, India
                </address>
              </div>

              <div className="flex items-center gap-2.5 pt-2 border-t border-slate-800 text-xs">
                <FaPhoneVolume className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a href="tel:+914035247813" className="hover:text-sky-400 transition-colors">
                  040-35247813
                </a>
                <span>/</span>
                <a href="tel:+918712443610" className="hover:text-sky-400 transition-colors">
                  +91 87124 43610
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-xs">
                <FaEnvelope className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a href="mailto:contact@neoayushveda.com" className="hover:text-sky-400 transition-colors">
                  contact@neoayushveda.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory Disclaimer Banner */}
        <div className="py-6 border-b border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          <p>
            <strong className="text-slate-300">REGULATORY & B2B TRADING DISCLAIMER:</strong> NEO LIFE SCIENCES PVT LTD is a specialist B2B pharmaceutical sourcing and international export company registered in Hyderabad, India. Products displayed on this portal are offered strictly for wholesale institutional procurement, licensed distributors, and international healthcare tenders. All export transactions are supported by certified CoAs, applicable manufacturer certifications, and CTD dossiers aligned with the requirements of the destination country’s Ministry of Health and relevant regulatory authorities.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 NEO LIFE SCIENCES PVT LTD. All rights reserved. (Formerly Neo Ayushveda Pvt Ltd).
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/privacy-policy" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/enquiry" className="hover:text-slate-200 transition-colors">
              Sourcing Terms
            </Link>
            <span>•</span>
            <a
              href="https://creat8rlabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-sky-400 transition-colors"
            >
              Designed by creat8rlabs
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
