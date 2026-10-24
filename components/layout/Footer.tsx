"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaEnvelope,
  FaPhoneVolume,
  FaLocationDot,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa6";

const SOCIAL_LINKS = [
  {
    name: "X",
    fullName: "X (formerly Twitter)",
    href: "https://x.com/NeoLifeSciences",
    icon: FaXTwitter,
    hoverBg: "hover:bg-black hover:border-slate-500",
    ariaLabel: "Follow Neo Life Sciences on X",
  },
  {
    name: "LinkedIn",
    fullName: "LinkedIn",
    href: "https://www.linkedin.com/company/neo-life-sciences/?viewAsMember=true",
    icon: FaLinkedinIn,
    hoverBg: "hover:bg-[#0A66C2] hover:border-[#0A66C2]",
    ariaLabel: "Connect with Neo Life Sciences on LinkedIn",
  },
  {
    name: "Instagram",
    fullName: "Instagram",
    href: "https://www.instagram.com/neolifesciencepvt.ltd?dlrf=MXVqZ2F6dDlhcXEyNQ==",
    icon: FaInstagram,
    hoverBg: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-pink-500",
    ariaLabel: "Follow Neo Life Sciences on Instagram",
  },
  {
    name: "Facebook",
    fullName: "Facebook",
    href: "https://www.facebook.com/NeoLifeSciencesPL",
    icon: FaFacebookF,
    hoverBg: "hover:bg-[#1877F2] hover:border-[#1877F2]",
    ariaLabel: "Follow Neo Life Sciences on Facebook",
  },
];

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  const scrollTo = (id: string) => {
    if (!isHomePage) {
      router.push(`/#${id}`);
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

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 font-sans">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 lg:py-20">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-slate-800">

          {/* Column 1 - Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="flex items-center">
              <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm inline-flex items-center">
                <Image
                  src="/images/Logo.png"
                  alt="Neo Life Sciences Logo"
                  width={150}
                  height={44}
                  loading="lazy"
                  className="h-11 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              NEO LIFE SCIENCES PVT LTD is an international pharmaceutical trading and B2B export enterprise sourcing WHO-GMP, PIC/S, EU GMP, US FDA and other SRAs certified generics, medical devices, APIs, and standardized herbal formulations from India to 50+ regulated markets worldwide.
            </p>

          </div>

          {/* Column 2 - Products (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-100 mb-4 pb-2 border-b border-slate-800">
              Product Portfolio
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {[
                { label: "Finished Pharmaceutical & Healthcare Products", href: "/products/finished-pharmaceutical-healthcare-products" },
                { label: "Active Pharmaceutical Ingredients (APIs)", href: "/products/active-pharmaceutical-ingredients" },
                { label: "Medical Devices & Diagnostics", href: "/products/medical-devices-diagnostics" },
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
                  className="text-slate-400 hover:text-sky-400 text-left transition-colors cursor-pointer"
                >
                  Executive Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("exports")}
                  className="text-slate-400 hover:text-sky-400 text-left transition-colors cursor-pointer"
                >
                  Global Trade Routes
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("certifications")}
                  className="text-slate-400 hover:text-sky-400 text-left transition-colors cursor-pointer"
                >
                  Accreditation Matrix
                </button>
              </li>
              <li>
                <Link
                  href="/media"
                  className="text-slate-400 hover:text-sky-400 text-left transition-colors cursor-pointer"
                >
                  Event & Media (iPHEX 2026)
                </Link>
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

              <div className="flex items-center gap-2.5 pt-2 border-t border-slate-800 text-xs whitespace-nowrap">
                <FaPhoneVolume className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <a href="tel:+914035247813" className="hover:text-sky-400 transition-colors whitespace-nowrap">
                    040-35247813
                  </a>
                  <span className="text-slate-500">/</span>
                  <a href="tel:+918712443610" className="hover:text-sky-400 transition-colors whitespace-nowrap">
                    +91 87124 43610
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs">
                <FaEnvelope className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a href="mailto:info@neolspharma.com" className="hover:text-sky-400 transition-colors">
                  info@neolspharma.com
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
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 NEO LIFE SCIENCES PVT LTD. All rights reserved. (Formerly Neo Ayushveda Pvt Ltd).
          </div>

          {/* Bottom Bar Social Media Links */}
          <div className="flex items-center gap-2.5">
            <span className="text-slate-500 text-[11px] font-mono uppercase tracking-wider hidden lg:inline">
              Follow:
            </span>
            {SOCIAL_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                  title={item.fullName}
                  className={`w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white ${item.hoverBg} transition-all duration-200 hover:scale-110 active:scale-95`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              );
            })}
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
