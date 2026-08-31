"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaShieldHalved,
  FaScaleBalanced,
  FaGlobe,
  FaHandshake,
  FaCircleCheck,
  FaFileContract,
  FaPlaneDeparture,
  FaFlask,
  FaPills,
  FaSyringe,
  FaStethoscope,
  FaLeaf,
  FaBoltLightning,
  FaClock,
  FaEnvelope,
  FaPhoneVolume,
  FaWhatsapp,
  FaLocationDot,
  FaArrowRight,
  FaChevronRight,
  FaBoxesPacking,
  FaTruckFast,
  FaCertificate,
  FaAward,
  FaCheck,
  FaXmark
} from "react-icons/fa6";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { WorldMap } from "../../components/ui/world-map";

// Regional export pathways originating from Hyderabad HQ (17.3850° N, 78.4867° E)
const heroMapDots = [
  {
    start: { lat: 17.3850, lng: 78.4867, label: "Hyderabad, India" },
    end: { lat: 51.5074, lng: -0.1278, label: "Western Europe" },
  },
  {
    start: { lat: 17.3850, lng: 78.4867, label: "Hyderabad, India" },
    end: { lat: 40.7128, lng: -74.0060, label: "North America" },
  },
  {
    start: { lat: 17.3850, lng: 78.4867, label: "Hyderabad, India" },
    end: { lat: 35.6762, lng: 139.6503, label: "East Asia" },
  },
  {
    start: { lat: 17.3850, lng: 78.4867, label: "Hyderabad, India" },
    end: { lat: 52.5200, lng: 13.4050, label: "Central Europe" },
  },
  {
    start: { lat: 17.3850, lng: 78.4867, label: "Hyderabad, India" },
    end: { lat: 25.2048, lng: 55.2708, label: "Middle East & GCC" },
  },
  {
    start: { lat: 17.3850, lng: 78.4867, label: "Hyderabad, India" },
    end: { lat: 1.3521, lng: 103.8198, label: "Southeast Asia" },
  },
  {
    start: { lat: 17.3850, lng: 78.4867, label: "Hyderabad, India" },
    end: { lat: -1.2921, lng: 36.8219, label: "East Africa" },
  },
  {
    start: { lat: 17.3850, lng: 78.4867, label: "Hyderabad, India" },
    end: { lat: 30.0444, lng: 31.2357, label: "North Africa" },
  },
  {
    start: { lat: 17.3850, lng: 78.4867, label: "Hyderabad, India" },
    end: { lat: -15.7975, lng: -47.8919, label: "Latin America" },
  },
  {
    start: { lat: 17.3850, lng: 78.4867, label: "Hyderabad, India" },
    end: { lat: 24.7136, lng: 46.6753, label: "Middle East" },
  },
  {
    start: { lat: 17.3850, lng: 78.4867, label: "Hyderabad, India" },
    end: { lat: 14.5995, lng: 120.9842, label: "Asia Pacific" },
  },
  {
    start: { lat: 17.3850, lng: 78.4867, label: "Hyderabad, India" },
    end: { lat: 6.5244, lng: 3.3792, label: "West Africa" },
  },
  {
    start: { lat: 17.3850, lng: 78.4867, label: "Hyderabad, India" },
    end: { lat: 41.2995, lng: 69.2401, label: "Central Asia & CIS" },
  },
  {
    start: { lat: 17.3850, lng: 78.4867, label: "Hyderabad, India" },
    end: { lat: -35.2809, lng: 149.1300, label: "Oceania" },
  },
];

export default function Home() {
  const displayedProducts = productsList;

  // Reveal animations scroll hook
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.08 }
    );

    const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // iPHEX 2026 Popup State
  const [showIphexPopup, setShowIphexPopup] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("iphex_popup_shown")) {
      const timer = setTimeout(() => {
        setShowIphexPopup(true);
        sessionStorage.setItem("iphex_popup_shown", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (showIphexPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showIphexPopup]);

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [phoneCode, setPhoneCode] = useState("+91");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    country: "United Arab Emirates (UAE)",
    category: "Pharmaceutical Generics",
    message: ""
  });

  const countryCodes = [
    { code: "+971", label: "AE" },
    { code: "+55", label: "BR" },
    { code: "+49", label: "DE" },
    { code: "+20", label: "EG" },
    { code: "+44", label: "GB" },
    { code: "+62", label: "ID" },
    { code: "+91", label: "IN" },
    { code: "+254", label: "KE" },
    { code: "+7", label: "KZ" },
    { code: "+94", label: "LK" },
    { code: "+234", label: "NG" },
    { code: "+63", label: "PH" },
    { code: "+974", label: "QA" },
    { code: "+966", label: "SA" },
    { code: "+1", label: "US" },
    { code: "+998", label: "UZ" },
    { code: "+84", label: "VN" },
    { code: "+27", label: "ZA" },
  ];

  // Chip Select State
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const docOptions = [
    "CTD Dossier",
    "GMP Certificate",
    "COA / COO",
    "Import Permit Assistance",
    "DMF Filing",
    "Halal Certificate",
    "CE Mark",
    "AYUSH Certificate"
  ];

  const handleDocToggle = (doc: string) => {
    if (selectedDocs.includes(doc)) {
      setSelectedDocs(selectedDocs.filter(item => item !== doc));
    } else {
      setSelectedDocs([...selectedDocs, doc]);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError("");
    setFormSubmitted(false);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          phone: `${phoneCode} ${formData.phone}`,
          selectedDocs,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to transmit enquiry.");
      }

      setFormSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        country: "United Arab Emirates (UAE)",
        category: "Pharmaceutical Generics",
        message: ""
      });
      setSelectedDocs([]);
      setTimeout(() => setFormSubmitted(false), 8000);
    } catch (error: any) {
      setFormError(error.message || "An unexpected network error occurred. Please verify your connection.");
    } finally {
      setFormSubmitting(false);
    }
  };

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
    <>
      <Header />

      {/* iPHEX 2026 Exhibition Popup Modal */}
      {showIphexPopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
          onClick={() => setShowIphexPopup(false)}
        >
          <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm animate-fade-in-up" style={{ animationDuration: '0.25s' }} />

          <div
            className="relative z-10 max-w-[440px] w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-[0_25px_80px_rgba(15,23,42,0.4)] animate-fade-in-up bg-white p-2.5 border border-slate-200"
            style={{ animationDuration: '0.35s', animationDelay: '0.05s' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowIphexPopup(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center text-slate-700 hover:bg-white hover:scale-105 transition-transform duration-150 ease-out active:scale-[0.96] border border-slate-200"
              aria-label="Close popup"
            >
              <FaXmark className="w-4 h-4" />
            </button>

            <Image
              src="/images/iphex_2026_poster.jpg"
              alt="iPHEX 2026 Exhibition Invitation — Neo Life Sciences Pvt. Ltd."
              width={420}
              height={630}
              style={{ width: "100%", height: "auto" }}
              className="w-full h-auto rounded-xl outline outline-1 -outline-offset-1 outline-black/10"
              priority
              unoptimized
            />
          </div>
        </div>
      )}

      {/* ─── Hero Section (Dr. Reddy's Inspired Clean Layout + Interactive Hyderabad Globe) ─── */}
      <section id="hero" className="relative pt-24 pb-14 sm:pb-18 lg:pt-32 lg:pb-24 bg-gradient-to-b from-slate-50/80 via-white to-white overflow-hidden font-sans border-b border-slate-200/80">
        <div className="absolute inset-0 grid-texture opacity-40 pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          
          {/* Top Hero Text */}
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10 lg:mb-12">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200/80 rounded-full px-3.5 py-1 mb-5 shadow-sm opacity-0 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-[#7CB800] animate-pulse" />
              <span className="text-sky-800 font-mono text-[10px] sm:text-[11px] tracking-[0.16em] uppercase font-semibold">
                INTERNATIONAL PHARMACEUTICAL EXPORTERS
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-serif text-[32px] sm:text-[44px] md:text-[52px] lg:text-[58px] font-bold text-slate-900 leading-[1.14] tracking-tight opacity-0 animate-fade-in-up animation-delay-100">
              One Stop Solution For All Your Health Care Imports <br />
              <span className="italic text-sky-600 font-normal">From India To The World.</span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-[14px] sm:text-[16px] leading-relaxed mt-5 max-w-3xl mx-auto opacity-0 animate-fade-in-up animation-delay-200">
              Hyderabad, India-based B2B pharmaceutical exporter sourcing WHO-GMP, EU-GMP, US-FDA, PIC/S, other SRAs certified APIs Finished Pharmaceutical Formulations, Speciality and Complex therapeutics, Injectables and Hospital Products, Vaccines and Biologics, Nutraceuticals and dietary supplements, Medical devices and Diagnostics, Dermatology, Personal care and Cosmeceuticals.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-7 opacity-0 animate-fade-in-up animation-delay-300">
              <button
                onClick={() => scrollTo("contact")}
                className="bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white ps-7 pe-6 py-3.5 text-xs tracking-[0.14em] uppercase font-semibold rounded-md shadow-md hover:shadow-lg transition-transform duration-150 ease-out active:scale-[0.96] flex items-center justify-center gap-2 hover:-translate-y-0.5 w-full sm:w-auto text-center"
              >
                <span>Start Sourcing Enquiry</span>
                <FaArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollTo("products")}
                className="border border-slate-300 bg-white hover:bg-slate-50 hover:border-sky-500 hover:text-sky-600 text-slate-700 px-7 py-3.5 text-xs tracking-[0.14em] uppercase font-semibold rounded-md shadow-sm transition-transform duration-150 ease-out active:scale-[0.96] w-full sm:w-auto text-center"
              >
                Browse Product Directory
              </button>
            </div>
          </div>

          {/* Interactive World Map (Connecting Global Regional Corridors from Hyderabad HQ, India) */}
          <div className="relative w-full max-w-5xl mx-auto opacity-0 animate-fade-in-up animation-delay-400">
            <WorldMap
              dots={heroMapDots}
              lineColor="#003A95"
              className="w-full"
            />

            {/* Regulatory Excellence & Global Coverage Bar Under Map */}
            <div className="mt-6 bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
              <div className="flex items-center gap-4 shrink-0 justify-center md:justify-start">
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0 shadow-sm">
                  <FaGlobe className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">50+</div>
                  <div className="text-[11px] font-mono tracking-wider uppercase text-slate-500 font-semibold">Export Markets Worldwide</div>
                </div>
              </div>

              <div className="w-full md:w-px h-px md:h-10 bg-slate-200" />

              <div className="flex-1 w-full">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2.5 text-center md:text-left">
                  Certified Manufacturing network with regulatory excellence across:
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 font-mono text-[10px] sm:text-[11px]">
                  {[
                    "WHO-GMP",
                    "EU-GMP",
                    "US-FDA",
                    "PIC/S",
                    "HALAL & KOSHER",
                    "MHRA",
                    "OTHER SRAs",
                    "ISO 9001:2015",
                    "ISO 13485"
                  ].map((body, bIdx) => (
                    <span
                      key={bIdx}
                      className="bg-slate-100/90 border border-slate-200/90 text-slate-800 font-bold px-2.5 py-1 rounded shadow-xs"
                    >
                      {body}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Trust Ticker (Marquee - Portfolio & Therapeutic Categories) ─── */}
      <div className="w-full bg-slate-50 py-3.5 overflow-hidden border-b border-slate-200 relative z-10 font-mono">
        <div className="animate-marquee select-none flex items-center">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-xs tracking-[0.16em] uppercase text-slate-600 font-semibold flex items-center">
              PHARMACEUTICAL GENERICS (RX)
              <span className="mx-4 text-[#7CB800]">◆</span>
              ACTIVE PHARMACEUTICAL INGREDIENTS (APIS)
              <span className="mx-4 text-[#7CB800]">◆</span>
              SPECIALTY & COMPLEX THERAPEUTICS
              <span className="mx-4 text-[#7CB800]">◆</span>
              INJECTABLES & HOSPITAL PRODUCTS
              <span className="mx-4 text-[#7CB800]">◆</span>
              VACCINES & BIOLOGICS
              <span className="mx-4 text-[#7CB800]">◆</span>
              NUTRACEUTICALS & DIETARY SUPPLEMENTS
              <span className="mx-4 text-[#7CB800]">◆</span>
              MEDICAL DEVICES & DIAGNOSTICS
              <span className="mx-4 text-[#7CB800]">◆</span>
              DERMATOLOGY, PERSONAL CARE & COSMECEUTICALS
              <span className="mx-4 text-[#7CB800]">◆</span>
              CLASSICAL AYURVEDIC MEDICINES
              <span className="mx-4 text-[#7CB800]">◆</span>
              WHO-GMP CERTIFIED SOURCING
              <span className="mx-4 text-[#7CB800]">◆</span>
              EU-GMP & US-FDA COMPLIANT
              <span className="mx-4 text-[#7CB800]">◆</span>
              PIC/S & SRAs SOURCING
              <span className="mx-4 text-[#7CB800]">◆</span>
              ISO 9001 & ISO 13485
              <span className="mx-4 text-[#7CB800]">◆</span>
              GLOBAL EXPORTS (50+ MARKETS)
              <span className="mx-4 text-[#7CB800]">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── About Section (Merchant Exporter & Sourcing Partnerships) ─── */}
      <section id="about" className="bg-white py-16 sm:py-24 lg:py-28 relative overflow-hidden font-sans border-b border-slate-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-14">
            <div className="lg:col-span-6 reveal">
              <span className="text-sky-600 font-mono text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
                ABOUT THE ENTERPRISE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900 mb-5">
                Connecting International markets with High Quality and reliable pharmaceutical solutions from India
              </h2>
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Neo Life Sciences Pvt Ltd is a Hyderabad, India -based pharmaceutical merchant exporter, sourcing and supplying APIs, Finished Pharmaceutical, Specialty & Complex Therapeutics, Injectables & Hospital Products, Vaccines & Biologics, Nutraceuticals & Dietary Supplements, Medical Devices & Diagnostics, Dermatology, Personal Care & Cosmeceuticals, from certified Indian manufacturers to global markets.
                </p>
                <p>
                  Our Vision is to become a globally trusted pharmaceutical sourcing and export partner, improving access to quality healthcare across international markets.
                </p>
                <p>
                  We collaborate strictly with certified manufacturing laboratories holding WHO-GMP, PICS, EU GMP, US FDA , Other SRAs, ISO 9001:2015, and ISO 13485 accreditations. Every therapeutic batch, device shipment, and standardised extract is fully traceable back to its origin.
                </p>
                <p>
                  Our technical strength lies in our dedicated regulatory affairs department. We coordinate import licensing, MOH permit approvals, and compile complete product registration dossiers in Common Technical Document (CTD) formats to secure market entries swiftly.
                </p>
              </div>
            </div>

            {/* Merchant Exporter Sourcing Model & What We Stand For - 2x2 Bento Grid */}
            <div className="lg:col-span-6 reveal-right">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                {/* 1. Quality */}
                <div className="bg-gradient-to-br from-white to-sky-50/40 border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-sky-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 mb-3.5 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-200 shadow-2xs">
                      <FaShieldHalved className="w-5 h-5" />
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-sky-700 font-semibold mb-1">
                      Pillar 01
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-sky-600 transition-colors">
                      Quality
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Connecting global healthcare markets with trusted Indian manufacturers and quality-assured products.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 font-mono text-[10px] text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7CB800]" />
                    <span>WHO-GMP & CoA Traceability</span>
                  </div>
                </div>

                {/* 2. Compliance */}
                <div className="bg-gradient-to-br from-white to-sky-50/40 border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-sky-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 mb-3.5 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-200 shadow-2xs">
                      <FaScaleBalanced className="w-5 h-5" />
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-sky-700 font-semibold mb-1">
                      Pillar 02
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-sky-600 transition-colors">
                      Compliance
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Supporting international market requirements through reliable sourcing and regulatory solutions.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 font-mono text-[10px] text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    <span>CTD & ACTD Dossiers</span>
                  </div>
                </div>

                {/* 3. Access */}
                <div className="bg-gradient-to-br from-white to-sky-50/40 border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-sky-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 mb-3.5 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-200 shadow-2xs">
                      <FaGlobe className="w-5 h-5" />
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-sky-700 font-semibold mb-1">
                      Pillar 03
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-sky-600 transition-colors">
                      Access
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Creating seamless access to a broad range of Indian pharmaceutical and healthcare capabilities.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 font-mono text-[10px] text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>50+ Global Markets</span>
                  </div>
                </div>

                {/* 4. Partnerships */}
                <div className="bg-gradient-to-br from-white to-sky-50/40 border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-sky-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 mb-3.5 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-200 shadow-2xs">
                      <FaHandshake className="w-5 h-5" />
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-sky-700 font-semibold mb-1">
                      Pillar 04
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-sky-600 transition-colors">
                      Partnerships
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Building lasting business relationships through integrity, reliability, and excellence.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 font-mono text-[10px] text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7CB800]" />
                    <span>B2B Institutional Trade</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Real Life-Sciences Capability Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            
            {/* Card 1 - Cold Chain Logistics */}
            <div className="border border-slate-200 bg-white rounded-xl overflow-hidden hover:shadow-md hover:border-sky-500 transition-all duration-200 group reveal">
              <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                <Image
                  src="/images/logistics_cold_chain.jpg"
                  alt="International Pharmaceutical Cold Chain Air Freight Logistics"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-sm text-sky-400 font-mono text-[9px] uppercase font-bold px-2.5 py-0.5 rounded flex items-center gap-1.5">
                  <FaPlaneDeparture className="w-3 h-3" />
                  <span>Cold-Chain Freight</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-slate-900 mb-1.5">Global Air & Sea Logistics</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Temperature-controlled containers and real-time data loggers ensuring cold-chain integrity across international shipping routes.
                </p>
              </div>
            </div>

            {/* Card 2 - 100% Certified Sourcing */}
            <div className="border border-slate-200 bg-white rounded-xl p-5 sm:p-6 hover:shadow-md hover:border-sky-500 transition-all duration-200 group flex flex-col justify-between reveal delay-100">
              <div>
                <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-4">
                  <FaCertificate className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-sky-600 font-semibold mb-1">
                  100% CERTIFIED SOURCING
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">Audited Partner Network</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  We contract exclusively with globally audited manufacturers holding WHO-GMP, PIC/S, and EU-GMP accreditations with complete batch traceability.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 font-mono text-xs text-slate-500 flex items-center gap-1.5">
                <FaCircleCheck className="w-3.5 h-3.5 text-[#7CB800]" />
                <span>Batch Isolation & CoA Verified</span>
              </div>
            </div>

            {/* Card 3 - CTD Regulatory Dossiers */}
            <div className="border border-slate-200 bg-white rounded-xl overflow-hidden hover:shadow-md hover:border-sky-500 transition-all duration-200 group p-5 sm:p-6 flex flex-col justify-between reveal delay-200">
              <div>
                <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-4">
                  <FaFileContract className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-sky-600 font-semibold mb-1">
                  REGULATORY AFFAIRS
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">CTD / ACTD Dossier Compilation</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Technical dossier filing, stability documentation, and MOH permit coordination to accelerate international market registration.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 font-mono text-xs text-slate-500 flex items-center gap-1.5">
                <FaShieldHalved className="w-3.5 h-3.5 text-[#7CB800]" />
                <span>US FDA CTD & EU GMP Ready</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── Leadership Section ─── */}
      <section id="leadership" className="bg-slate-900 py-16 sm:py-24 text-slate-100 relative overflow-hidden font-sans border-b border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">

          <div className="reveal mb-12">
            <span className="text-sky-400 font-mono text-xs font-semibold tracking-[0.2em] uppercase block mb-2">
              EXECUTIVE LEADERSHIP
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Guided by Experience & Governance
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-slate-950 p-6 sm:p-10 rounded-2xl border border-slate-800 shadow-xl">

            {/* Portrait Frame (4 cols) */}
            <div className="lg:col-span-4 reveal-left">
              <div className="aspect-[3/4] max-w-[320px] mx-auto lg:max-w-none bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center shadow-lg">
                <Image
                  src="/images/Founder.jpeg"
                  alt="Anil Kumar Eravathri - Managing Director"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-top outline outline-1 -outline-offset-1 outline-white/10"
                  priority
                />

                <div className="absolute top-3.5 left-3.5 bg-sky-600 text-white font-mono text-[9px] font-bold tracking-[0.16em] uppercase px-3 py-1 rounded shadow-md z-10">
                  Managing Director
                </div>
              </div>
            </div>

            {/* Profile Bio (8 cols) */}
            <div className="lg:col-span-8 reveal">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                Anil Kumar Eravathri
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#A4D73B] mt-1 uppercase tracking-wider font-mono">
                Founder & Managing Director, NEO LIFE SCIENCES PVT LTD
              </p>

              <div className="w-12 h-0.5 bg-[#7CB800] my-4" />

              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Prior to founding Neo Life Sciences, Mr. Eravathri spent over a decade running a successful IT staffing enterprise in the US, building deep expertise in cross-border business development, logistics, and international compliance.
                </p>
                <p>
                  A former Member of the Legislative Assembly (MLA) of Andhra Pradesh and Government Whip, his background provides unique policy insight, governance experience, and strong institutional relationships across India&apos;s industrial sectors.
                </p>
                <p>
                  Currently serving as the Chairman of the Telangana Mineral Development Corporation (TGMDC), he coordinates direct policy interfaces and possesses a strong grasp of regulatory standards for healthcare devices, manufacturing, and trade logistics.
                </p>
              </div>

              {/* Achievement Pills */}
              <div className="flex flex-wrap gap-2 mt-5">
                {[
                  "INTERNATIONAL BUSINESS",
                  "FORMER MLA & GOVT. WHIP",
                  "CHAIRMAN, TGMDC",
                  "HEALTHCARE ENTREPRENEUR"
                ].map((pill, idx) => (
                  <span
                    key={idx}
                    className="border border-slate-700 text-slate-300 font-mono text-[9px] sm:text-[10px] tracking-wider uppercase px-2.5 py-1 font-semibold bg-slate-900 rounded"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── Product Portfolio Section (6-Card Grid) ─── */}
      <section id="products" className="bg-white pt-10 pb-8 sm:pt-14 sm:pb-10 relative overflow-hidden font-sans border-b border-slate-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">

          <div className="mb-8 reveal flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-sky-600 font-mono text-xs font-semibold tracking-[0.2em] uppercase block mb-2">
                PRODUCT DIRECTORY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-slate-900">
                What We Source & Export
              </h2>
            </div>
            <Link
              href="/enquiry"
              className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-600 hover:text-sky-700 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <span>Request Custom Batch RFQ</span>
              <FaArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* 6-Card Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedProducts.map((product, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 hover:border-sky-500 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-200 group flex flex-col justify-between min-h-[300px] sm:min-h-[320px] relative overflow-hidden reveal"
                style={{ transitionDelay: `${(idx % 3) * 80}ms` }}
              >
                {/* Background image preview */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity">
                  <Image
                    src={product.bgImage}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="relative z-10">
                  {/* Top card metadata */}
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-slate-300 group-hover:text-sky-600 transition-colors leading-none">
                      {product.num}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase text-sky-700 bg-sky-50 border border-sky-200/60 px-2.5 py-1 rounded font-semibold">
                      {product.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                    {product.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {product.desc}
                  </p>
                </div>

                {/* Tag list */}
                <div className="flex flex-wrap gap-1.5 mt-5 relative z-10 pt-4 border-t border-slate-100">
                  {product.tags && Array.isArray(product.tags) && product.tags.map((tag: string, tagIdx: number) => (
                    <span
                      key={tagIdx}
                      className="text-[9px] sm:text-[10px] font-mono tracking-wide uppercase bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Certification Badges Section ─── */}
      <section id="certifications" className="bg-slate-50 py-8 sm:py-10 border-b border-slate-200 font-sans">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">

          <div className="text-center mb-6 reveal">
            <span className="text-sky-600 font-mono text-xs font-semibold tracking-[0.2em] uppercase block mb-2">
              COMPLIANCE & STANDARDS
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              International Accreditation & Quality Frameworks
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2.5">
            {[
              "WHO-GMP",
              "EU-GMP",
              "ISO 9001 & 13485",
              "AYUSH CERTIFIED",
              "DRUG LICENCE",
              "FOOD LICENCE",
              "CE CERTIFIED",
              "HALAL & KOSHER",
              "US FDA CTD"
            ].map((cert, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-lg p-4 text-center flex flex-col items-center justify-center hover:bg-sky-50 hover:border-sky-300 transition-colors duration-200 reveal shadow-sm"
                style={{ transitionDelay: `${(idx % 9) * 50}ms` }}
              >
                <FaCertificate className="w-5 h-5 text-[#7CB800] mb-1.5 mx-auto" />
                <span className="text-[11px] font-mono tracking-wider uppercase font-bold text-slate-800">
                  {cert}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Sourcing Process Workflow ─── */}
      <section className="bg-white py-16 sm:py-24 relative overflow-hidden font-sans border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">

          <div className="mb-12 text-center max-w-2xl mx-auto reveal">
            <span className="text-sky-600 font-mono text-xs font-semibold tracking-[0.2em] uppercase block mb-2">
              HOW WE WORK
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-slate-900">
              From Enquiry to Delivery
            </h2>
            <p className="text-slate-600 mt-2 text-xs sm:text-sm">
              We guide pharmaceutical procurement cycles with complete accountability at every milestone.
            </p>
          </div>

          {/* Step list */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:bg-white transition-all flex flex-col justify-between group relative reveal" style={{ transitionDelay: `${idx * 80}ms` }}>
                <div>
                  <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 font-mono font-bold flex items-center justify-center text-xs border border-sky-100 group-hover:bg-sky-600 group-hover:text-white transition-colors mb-3">
                    {step.num}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {step.desc}
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-3">
                  <ul className="text-[11px] text-slate-500 space-y-1 font-mono">
                    {step.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-1.5">
                        <FaCircleCheck className="w-3 h-3 text-[#7CB800] shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Why Us Section ─── */}
      <section id="whyus" className="bg-slate-50 py-16 sm:py-24 relative overflow-hidden font-sans border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">

          <div className="mb-12 text-center max-w-2xl mx-auto reveal">
            <span className="text-sky-600 font-mono text-xs font-semibold tracking-[0.2em] uppercase block mb-2">
              OUR DIFFERENTIATORS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-slate-900">
              Why Global Buyers Choose Neo Life Sciences
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

            {/* Card 1 */}
            <div className="border border-slate-200 bg-white p-6 rounded-xl hover:border-sky-500 hover:shadow-md transition-all duration-200 reveal delay-100">
              <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-4">
                <FaScaleBalanced className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">Regulatory Precision</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Every export shipment includes WHO-GMP certificates, COA, COO, and technical dossiers compiled strictly in CTD format.
              </p>
            </div>

            {/* Card 2 */}
            <div className="border border-slate-200 bg-white p-6 rounded-xl hover:border-sky-500 hover:shadow-md transition-all duration-200 reveal delay-200">
              <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-4">
                <FaShieldHalved className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">100% Certified Sourcing</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                We contract exclusively with globally audited manufacturers, implementing full batch isolation and traceability for maximum quality control.
              </p>
            </div>

            {/* Card 3 */}
            <div className="border border-slate-200 bg-white p-6 rounded-xl hover:border-sky-500 hover:shadow-md transition-all duration-200 reveal delay-300">
              <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-4">
                <FaBoltLightning className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">Velocity & Transparency</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Get pricing quotations within 48 business hours and track dossier and shipping status transparently with a dedicated trade manager.
              </p>
            </div>

            {/* Card 4 */}
            <div className="border border-slate-200 bg-white p-6 rounded-xl hover:border-sky-500 hover:shadow-md transition-all duration-200 reveal delay-400">
              <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-4">
                <FaClock className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">On-Time Delivery</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Temperature-tracked cold chain logistics and direct customs clearance to guarantee prompt, uninterrupted B2B supply lines.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ─── B2B Sourcing Desk & Contact Section ─── */}
      <section id="contact" className="bg-white py-16 sm:py-24 relative overflow-hidden font-sans">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">

          <div className="mb-12 reveal">
            <span className="text-sky-600 font-mono text-xs font-semibold tracking-[0.2em] uppercase block mb-2">
              ACQUISITIONS & LOGISTICS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-slate-900">
              Start Your Sourcing Enquiry
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

            {/* Left Panel - Corporate Info (2 cols) */}
            <div className="lg:col-span-2 reveal-left">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/95 via-sky-50/40 to-slate-50/90 backdrop-blur-xl border border-sky-200/80 p-6 sm:p-8 shadow-[0_16px_36px_rgba(2,132,199,0.06),0_1px_2px_rgba(0,0,0,0.04)] space-y-6">
                
                {/* Subtle Ambient Decorative Light blooms */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-sky-400/15 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#7CB800]/15 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute inset-0 grid-texture opacity-40 pointer-events-none" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-sky-100/70 border border-sky-200 rounded-full px-3 py-1 mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#7CB800] animate-pulse" />
                    <span className="text-[10px] font-mono tracking-[0.16em] uppercase text-sky-900 font-semibold">
                      DIRECT SOURCING DESK
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 leading-tight">
                    Corporate Headquarters
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Direct export & regulatory coordination from Hyderabad, India.
                  </p>
                </div>

                {/* Contact Items in Clean Glass Cards */}
                <div className="space-y-3 relative z-10">

                  <div className="flex gap-3.5 items-start p-3 sm:p-3.5 rounded-xl bg-white/90 hover:bg-white border border-slate-200/80 hover:border-sky-400/60 hover:shadow-[0_4px_16px_rgba(2,132,199,0.08)] transition-all duration-200 group">
                    <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 shrink-0 mt-0.5 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-200 shadow-2xs">
                      <FaEnvelope className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-sky-700 font-semibold mb-0.5">Email Sourcing</span>
                      <a href="mailto:contact@neoayushveda.com" className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-sky-600 transition-colors">
                        contact@neoayushveda.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start p-3 sm:p-3.5 rounded-xl bg-white/90 hover:bg-white border border-slate-200/80 hover:border-sky-400/60 hover:shadow-[0_4px_16px_rgba(2,132,199,0.08)] transition-all duration-200 group">
                    <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 shrink-0 mt-0.5 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-200 shadow-2xs">
                      <FaPhoneVolume className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-sky-700 font-semibold mb-0.5">Corporate Phone</span>
                      <div className="flex flex-wrap gap-x-2 text-xs sm:text-sm font-semibold text-slate-900">
                        <a href="tel:+914035247813" className="hover:text-sky-600 transition-colors">
                          040-35247813
                        </a>
                        <span className="text-slate-400">/</span>
                        <a href="tel:+918712443610" className="hover:text-sky-600 transition-colors">
                          +91 87124 43610
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start p-3 sm:p-3.5 rounded-xl bg-white/90 hover:bg-white border border-slate-200/80 hover:border-sky-400/60 hover:shadow-[0_4px_16px_rgba(2,132,199,0.08)] transition-all duration-200 group">
                    <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 shrink-0 mt-0.5 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-200 shadow-2xs">
                      <FaWhatsapp className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-sky-700 font-semibold mb-0.5">WhatsApp Brokerage</span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-900">
                        Available on Request
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start p-3 sm:p-3.5 rounded-xl bg-white/90 hover:bg-white border border-slate-200/80 hover:border-sky-400/60 hover:shadow-[0_4px_16px_rgba(2,132,199,0.08)] transition-all duration-200 group">
                    <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 shrink-0 mt-0.5 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-200 shadow-2xs">
                      <FaLocationDot className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-sky-700 font-semibold mb-0.5">Registered Office Address</span>
                      <address className="text-xs text-slate-700 not-italic leading-relaxed font-mono">
                        <strong className="text-slate-900 font-sans font-bold block text-xs">NEO LIFE SCIENCES PVT LTD</strong>
                        201-2nd Floor, Above ICICI Bank,<br />
                        Plot 13/A/B Lane 12, MLA Colony,<br />
                        Banjara Hills, Hyderabad – 500034,<br />
                        Telangana, India
                      </address>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start p-3 sm:p-3.5 rounded-xl bg-white/90 hover:bg-white border border-slate-200/80 hover:border-sky-400/60 hover:shadow-[0_4px_16px_rgba(2,132,199,0.08)] transition-all duration-200 group">
                    <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 shrink-0 mt-0.5 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-200 shadow-2xs">
                      <FaClock className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-sky-700 font-semibold mb-0.5">Business Hours</span>
                      <span className="text-xs text-slate-700 font-mono">
                        Monday – Saturday: 9:00 AM – 6:00 PM IST
                      </span>
                    </div>
                  </div>

                </div>

                {/* Regulatory Tags */}
                <div className="border-t border-slate-200/80 pt-5 mt-5 relative z-10">
                  <h4 className="text-[10px] font-mono tracking-[0.16em] uppercase text-slate-500 mb-2.5 font-semibold">
                    REGULATORY DOCUMENTATION SUPPORTED
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "CTD Dossier",
                      "GMP Certificate",
                      "COA / COO",
                      "Import Permits",
                      "DMF Files"
                    ].map((doc, idx) => (
                      <span
                        key={idx}
                        className="border border-sky-200/90 bg-white text-slate-800 font-mono text-[10px] uppercase px-2.5 py-1 font-semibold rounded-md shadow-2xs hover:border-sky-500 hover:text-sky-700 transition-colors"
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Right Panel - Enquiry Form (3 cols) */}
            <div className="lg:col-span-3 reveal-right">
              <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm relative">

                {formSubmitted && (
                  <div className="bg-sky-50 border border-sky-300 text-sky-900 p-4 rounded-lg mb-5 flex items-start gap-3 animate-fade-in text-sm">
                    <FaShieldHalved className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold uppercase tracking-wider text-sky-900 font-mono text-xs">ENQUIRY TRANSMITTED</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Thank you for your B2B sourcing enquiry. Our regulatory and logistics desks will analyze your specifications and respond within 24–48 business hours with an initial draft schedule.
                      </p>
                    </div>
                  </div>
                )}

                {formError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-5 flex items-start gap-3 animate-fade-in text-xs leading-relaxed">
                    <div>
                      <h4 className="font-bold uppercase tracking-wider text-red-800 font-mono">TRANSMISSION FAILED</h4>
                      <p className="mt-1">{formError}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4">

                  {/* Row 1 - Names */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="flex flex-col">
                      <label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">First Name</label>
                      <input
                        id="firstName"
                        type="text"
                        required
                        placeholder="e.g. John"
                        className="border border-slate-300 bg-white px-3 py-2.5 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:ring-1 focus:ring-sky-600 focus:outline-none transition-all w-full"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">Last Name</label>
                      <input
                        id="lastName"
                        type="text"
                        required
                        placeholder="e.g. Doe"
                        className="border border-slate-300 bg-white px-3 py-2.5 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:ring-1 focus:ring-sky-600 focus:outline-none transition-all w-full"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Row 2 - Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="e.g. buyer@clinicaltrade.com"
                        className="border border-slate-300 bg-white px-3 py-2.5 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:ring-1 focus:ring-sky-600 focus:outline-none transition-all w-full"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">Phone / WhatsApp</label>
                      <div className="flex gap-2 items-center">
                        <select
                          className="border border-slate-300 bg-white px-2 py-2.5 rounded-md text-sm text-slate-900 focus:border-sky-600 focus:outline-none w-24 shrink-0 font-mono"
                          value={phoneCode}
                          onChange={(e) => setPhoneCode(e.target.value)}
                        >
                          {countryCodes.map((c, i) => (
                            <option key={i} value={c.code}>
                              {c.label} ({c.code})
                            </option>
                          ))}
                        </select>
                        <input
                          id="phone"
                          type="tel"
                          required
                          placeholder="e.g. 9032550436"
                          className="border border-slate-300 bg-white px-3 py-2.5 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:ring-1 focus:ring-sky-600 focus:outline-none transition-all flex-grow"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3 - Company */}
                  <div className="flex flex-col">
                    <label htmlFor="company" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">Company Name</label>
                    <input
                      id="company"
                      type="text"
                      required
                      placeholder="e.g. Global Pharma Logistics Ltd"
                      className="border border-slate-300 bg-white px-3 py-2.5 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:ring-1 focus:ring-sky-600 focus:outline-none transition-all w-full"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  {/* Row 4 - Dropdowns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="flex flex-col">
                      <label htmlFor="country" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">Destination Country</label>
                      <select
                        id="country"
                        className="border border-slate-300 bg-white px-3 py-2.5 rounded-md text-sm text-slate-900 focus:border-sky-600 focus:outline-none w-full"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      >
                        {countriesList.map((c, i) => (
                          <option key={i} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="category" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">Product Category</label>
                      <select
                        id="category"
                        className="border border-slate-300 bg-white px-3 py-2.5 rounded-md text-sm text-slate-900 focus:border-sky-600 focus:outline-none w-full"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        {[
                          "APIs", "Ayurvedic Medicines", "Bulk Drugs / RSM",
                          "Cosmeceuticals", "Herbal Nutraceuticals", "Medical Devices",
                          "Multiple Categories", "Pharmaceutical Generics", "Specialty Therapeutics",
                          "Other"
                        ].map((cat, i) => (
                          <option key={i} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 5 - Documentation Chips */}
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 block">
                      Required Documentation (Select all that apply)
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {docOptions.map((doc, idx) => {
                        const isSelected = selectedDocs.includes(doc);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleDocToggle(doc)}
                            className={`px-3 py-1.5 text-[11px] font-semibold tracking-wide uppercase rounded transition-transform duration-150 ease-out active:scale-[0.96] border ${
                              isSelected
                                ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                                : "border-slate-300 bg-white text-slate-700 hover:border-sky-500 hover:text-sky-600 hover:bg-sky-50/50"
                            }`}
                          >
                            {doc}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 6 - Message */}
                  <div className="flex flex-col">
                    <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">Message or Specific Requirements</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder="Share exact dosage configurations, therapeutic volume demands, and compliance requirements..."
                      className="border border-slate-300 bg-white px-3 py-2.5 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:ring-1 focus:ring-sky-600 focus:outline-none transition-all w-full resize-y min-h-[85px]"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white ps-8 pe-7 py-3.5 text-xs tracking-[0.16em] uppercase font-semibold rounded-md transition-transform duration-150 ease-out active:scale-[0.96] w-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                    >
                      <span>{formSubmitting ? "TRANSMITTING..." : "SEND ENQUIRY"}</span>
                      {!formSubmitting && <FaArrowRight className="w-3.5 h-3.5" />}
                    </button>
                    <p className="text-[11px] text-slate-500 text-center mt-2.5">
                      We typically respond within 24–48 business hours. All enquiries are treated with strict commercial confidentiality.
                    </p>
                  </div>

                </form>
              </div>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

// Static Data Structures
const productsList = [
  {
    num: "01",
    category: "DMF Filed",
    title: "APIs",
    desc: "Active Pharmaceutical Ingredients (APIs) and intermediates sourced from US FDA-inspected and WHO-GMP certified plants with comprehensive DMF filings.",
    tags: ["Active Ingredients", "DMF Files", "RSM Intermediates"],
    bgImage: "/images/prod_apis.png"
  },
  {
    num: "02",
    category: "Rx / OTC",
    title: "Finished Formulations (Oral)",
    desc: "WHO-GMP certified oral dosage forms including tablets, capsules, syrups, suspensions, and dry powders across all major therapeutic segments.",
    tags: ["Tablets", "Capsules", "Syrups", "Suspensions"],
    bgImage: "/images/prod_generics_rx.png"
  },
  {
    num: "03",
    category: "Specialty Rx",
    title: "Injectables",
    desc: "Critical care injectables, vials, ampoules, pre-filled syringes, and lyophilized products processed in aseptic cleanroom environments.",
    tags: ["Vials", "Ampoules", "Pre-Filled Syringes", "Critical Care"],
    bgImage: "/images/prod_injectables.png"
  },
  {
    num: "04",
    category: "Branded",
    title: "Specialty & Branded Generics",
    desc: "High-value branded generics and specialty therapeutics across oncology, cardiovascular, CNS, diabetes, and HIV/AIDS categories.",
    tags: ["Oncology", "Cardiovascular", "CNS", "Diabetes"],
    bgImage: "/images/prod_generics_otc.png"
  },
  {
    num: "05",
    category: "AYUSH / Health",
    title: "Nutraceuticals & Ayush Supplements",
    desc: "Premium nutraceuticals, vitamins, minerals, herbal supplements, and AYUSH-certified Ayurvedic formulations for global wellness markets.",
    tags: ["Vitamins", "Ayurvedic", "Herbal Supplements"],
    bgImage: "/images/prod_nutraceuticals.png"
  },
  {
    num: "06",
    category: "Class II & III",
    title: "Medical Devices",
    desc: "CE, ISO 13485, and FDA-ready surgical instruments, diagnostics, hospital consumables, and healthcare disposables.",
    tags: ["Diagnostics", "Surgical Disposables", "Consumables"],
    bgImage: "/images/prod_devices.png"
  }
];

const workflowSteps = [
  {
    num: "01",
    title: "Initial Enquiry",
    desc: "Share your product list, target country, required volume, and any known regulatory requirements.",
    details: [
      "Submit specification sheet",
      "Assign dedicated trader",
      "Confirm target market criteria"
    ]
  },
  {
    num: "02",
    title: "Regulatory Review",
    desc: "Our regulatory affairs team assesses country-specific compliance needs and delivers a quotation.",
    details: [
      "Evaluate import conditions",
      "Validate manufacturer status",
      "Draft initial commercial quote"
    ]
  },
  {
    num: "03",
    title: "Dossier & Permits",
    desc: "We prepare import permits, registration dossiers in CTD format, GMP certs, and COAs.",
    details: [
      "Compile CTD dossier packs",
      "Request embassy legalizations",
      "Coordinate permit clearance"
    ]
  },
  {
    num: "04",
    title: "Supplier QC Check",
    desc: "Verify GMP status, conduct batch documentation review, and confirm analytical testing.",
    details: [
      "Review CoA batch metrics",
      "Witness physical packing",
      "Verify label translations"
    ]
  },
  {
    num: "05",
    title: "Shipment & Delivery",
    desc: "Coordinate cold-chain freight (air/sea), handle customs clearance, and deliver complete docs.",
    details: [
      "Configure temperature tracking",
      "File customs export manifests",
      "Deliver courier documents pack"
    ]
  }
];

const countriesList = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia",
  "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates (UAE)", "United Kingdom (UK)", "United States of America (USA)", "Uruguay", "Uzbekistan",
  "Vanuatu", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe",
  "Other"
];
