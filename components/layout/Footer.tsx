"use client";

import React from "react";

export default function Footer() {
  const scrollTo = (id: string) => {
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

  return (
    <footer className="bg-emerald border-t border-gold/20 text-cream">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 lg:py-24">
        {/* Top Bar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1 - Brand */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center">
              <div className="bg-white px-4 py-2.5 rounded-lg shadow-sm border border-white/10">
                <img
                  src="/images/Logo.png"
                  alt="Neo Life Sciences Logo"
                  className="h-16 md:h-[68px] w-auto object-contain"
                />
              </div>
            </div>
            <p className="font-playfair italic text-cream/50 text-[18px] leading-relaxed">
              "Healing Traditions.<br />Modern Technology."
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cream/40 hover:text-gold hover:bg-gold/10 hover:border-gold/30 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cream/40 hover:text-gold hover:bg-gold/10 hover:border-gold/30 transition-all duration-300"
                aria-label="Twitter/X"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - PRODUCTS */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-gold/80 mb-6 font-semibold">
              PRODUCTS
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                "Pharmaceutical Generics",
                "Medical Devices",
                "Ayurvedic Medicines",
                "Herbal Nutraceuticals",
                "Cosmeceuticals",
                "Bulk Drugs & RSM",
                "Active Ingredients"
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollTo("products")}
                    className="text-[13px] text-cream/45 hover:text-cream/80 text-left transition-colors duration-200"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - SERVICES */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-gold/80 mb-6 font-semibold">
              SERVICES
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                "B2B Sourcing",
                "Export Documentation",
                "Regulatory Affairs Support",
                "Private Labelling",
                "Contract Sourcing",
                "Dossier Preparation"
              ].map((link, idx) => (
                <li key={idx} className="text-[13px] text-cream/45 cursor-default hover:text-cream/80 transition-colors duration-200">
                  {link}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - COMPANY */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-gold/80 mb-6 font-semibold">
              COMPANY
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "About Us", id: "about" },
                { label: "Leadership", id: "leadership" },
                { label: "Global Reach", id: "exports" },
                { label: "Certifications", id: "certifications" },
                { label: "Why Choose Us", id: "whyus" },
                { label: "Enquiry Form", id: "contact" }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-[13px] text-cream/45 hover:text-cream/80 text-left transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Regulatory Compliance Badges Bar */}
        <div className="border-t border-white/10 pt-8 pb-8 flex flex-col md:flex-row items-center justify-between gap-6 font-jakarta">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold block mb-2">
              REGULATORY COMPLIANCE STANDARDS
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {["WHO-GMP", "EU-GMP", "US FDA", "PIC/S", "OTHER SRIs"].map((badge, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-bold px-3 py-1 rounded bg-white/5 border border-gold/30 text-gold tracking-wider uppercase"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="text-right md:text-right max-w-md">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold block mb-1">
              CORPORATE HEAD OFFICE
            </span>
            <p className="text-[11px] text-cream/60 leading-relaxed font-inter">
              Neo Life Sciences Pvt. Ltd. (Formerly Neo Ayushveda Pvt Ltd)<br />
              201-2nd Floor, Above ICICI Bank, Plot 13/A/B Lane 12, MLA Colony, Road No. 12, Banjara Hills, Hyderabad – 500034, Telangana, India
            </p>
          </div>
        </div>

        {/* Disclaimer / Notice */}
        <div className="border-t border-white/10 pt-6 pb-4 mb-8">
          <p className="text-[11px] text-cream/35 leading-relaxed max-w-4xl">
            <span className="font-semibold text-gold/60 uppercase tracking-wider block mb-1">Regulatory & Medical Disclaimer</span>
            Statements made on this website have not been evaluated by the Food and Drug Administration (FDA) or local health ministries. Products showcased are manufactured by licensed third-party manufacturers holding valid WHO-GMP, ISO, or AYUSH certifications. Sourced therapeutics, generics, and devices are intended for distribution to qualified importers and registered healthcare buyers only. We do not provide clinical advice or sell directly to individual consumers.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-cream/30">
          <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
            <span>© {new Date().getFullYear()} NEO LIFE SCIENCES PVT LTD. All rights reserved.</span>
            <span className="text-white/10 hidden md:inline">|</span>
            <span>
              Designed by&nbsp;
              <a
                href="https://www.creat8rlabs.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/50 hover:text-gold transition-colors font-semibold"
              >
                Creat8r Labs
              </a>
            </span>
          </div>
          <span className="tracking-wide">
            Made in India <span className="mx-1.5 text-gold/30">◆</span> Trusted Worldwide <span className="mx-1.5 text-gold/30">◆</span> Registered: Hyderabad, Telangana
          </span>
        </div>
      </div>
    </footer>
  );
}
