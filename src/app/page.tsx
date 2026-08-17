"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Sparkles,
  Pill,
  Stethoscope,
  Leaf,
  Globe,
  ShieldCheck,
  Scale,
  Zap,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  ArrowRight,
  ChevronRight,
  Compass
} from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

// Loader Skeleton for MapLibre
function MapSkeleton() {
  return (
    <div className="h-[520px] w-full bg-[#0E2218] animate-pulse flex items-center justify-center">
      <span className="text-gold/40 text-xs uppercase tracking-widest animate-pulse">Initializing Vector Map...</span>
    </div>
  );
}

// Lazy Load Map Section (Client Side Only)
const GlobalReach = dynamic(() => import("../../components/sections/GlobalReach"), {
  ssr: false,
  loading: () => <MapSkeleton />
});

export default function Home() {
  const [displayedProducts, setDisplayedProducts] = useState<any[]>(productsList);

  // Dynamic Product Sourcing from Database API
  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (data?.products && data.products.length > 0) {
          setDisplayedProducts(data.products);
        }
      })
      .catch(() => {});
  }, []);

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
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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

      {/* Hero Section */}
      <section id="hero" className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-20">

        {/* Left Panel */}
        <div className="bg-emerald text-cream flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

          <div className="relative z-10">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center opacity-0 animate-fade-in-up">
              <span className="inline-block w-6 h-px bg-gold mr-3" />
              <span className="text-gold text-[10px] tracking-[0.22em] uppercase font-semibold">
                INTERNATIONAL PHARMACEUTICAL TRADERS & EXPORTERS
              </span>
            </div>

            {/* H1 Heading */}
            <h1 className="font-playfair text-[48px] md:text-[64px] font-bold leading-[1.05] tracking-[-0.02em] text-white opacity-0 animate-fade-in-up animation-delay-100">
              Precision Pharma <br />
              <span className="text-gold font-normal italic">From India To The World.</span>
            </h1>

            {/* Body Description */}
            <p className="text-cream/65 text-[17px] leading-relaxed mt-6 mb-10 max-w-lg opacity-0 animate-fade-in-up animation-delay-200">
              NEO LIFE SCIENCES PVT LTD is a specialist pharmaceutical trader and exporter, sourcing WHO-GMP certified generics, medical devices and herbal formulations from India's finest certified manufacturers — delivering them to regulated healthcare markets across every continent.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-up animation-delay-300">
              <button
                onClick={() => scrollTo("contact")}
                className="bg-gold text-emerald px-7 py-4 text-[12px] tracking-[0.15em] uppercase font-semibold hover:bg-gold-light transition-colors duration-200 shadow-[0_4px_20px_rgba(201,150,59,0.15)]"
              >
                Start Sourcing Enquiry
              </button>
              <button
                onClick={() => scrollTo("products")}
                className="border border-cream/30 text-cream px-7 py-4 text-[12px] tracking-[0.15em] uppercase hover:border-cream/60 hover:bg-white/5 transition-all duration-200"
              >
                Browse Portfolio
              </button>
            </div>

            {/* Trust Stats Row */}
            <div className="mt-16 border-t border-cream/10 pt-10 grid grid-cols-3 gap-6 opacity-0 animate-fade-in-up animation-delay-400">
              <div>
                <div className="text-[22px] font-semibold text-cream">50+</div>
                <div className="text-[11px] tracking-[0.1em] uppercase text-cream/40 mt-1">Export Markets</div>
              </div>
              <div className="border-l border-cream/10 pl-6">
                <div className="text-[22px] font-semibold text-cream">WHO-GMP</div>
                <div className="text-[11px] tracking-[0.1em] uppercase text-cream/40 mt-1">Certified Sourcing</div>
              </div>
              <div className="border-l border-cream/10 pl-6">
                <div className="text-[22px] font-semibold text-cream">10</div>
                <div className="text-[11px] tracking-[0.1em] uppercase text-cream/40 mt-1">Product Groups</div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-cream grid-texture flex items-center justify-center py-20 relative overflow-hidden border-t lg:border-t-0 lg:border-l border-emerald/5 min-h-[600px] px-6 lg:px-12">

          {/* Layered Image Frame */}
          <div className="relative w-full max-w-[420px] aspect-[4/5] shadow-[0_30px_100px_rgba(10,26,18,0.12)] group opacity-0 animate-fade-in-right animation-delay-200">

            {/* Decorative background gold frame offset */}
            <div className="absolute inset-0 border border-gold/40 translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />

            {/* Outer border of main image container */}
            <div className="absolute inset-0 bg-white p-3 border border-emerald/5">
              <div className="relative w-full h-full overflow-hidden bg-[#0A1A12]">
                {/* Main Image */}
                <Image
                  src="/images/hero_pharma_botanical.png"
                  alt="Neo Life Sciences Premium Pharmaceutical Sourcing"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover transition-transform duration-[1000ms] group-hover:scale-105"
                  priority
                />

                {/* Subtle dark green vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Overlaid floating glass brand badge */}
            <div className="absolute -left-6 bottom-12 hidden sm:block opacity-0 animate-fade-in-left animation-delay-400">
              <div className="animate-float bg-white/80 backdrop-blur-md border border-emerald/10 p-5 shadow-[0_15px_40px_rgba(10,26,18,0.08)] max-w-[180px]">
                <div className="w-8 h-8 rounded-full border border-gold/60 flex items-center justify-center mb-2.5">
                  <span className="text-gold text-[10px] font-semibold tracking-wider font-playfair italic">N</span>
                </div>
                <p className="text-[8px] tracking-[0.2em] uppercase text-ink-soft mb-0.5 font-jakarta">ESTABLISHED</p>
                <h4 className="text-[12px] font-bold text-ink tracking-wide uppercase leading-none mb-1 font-jakarta">HYDERABAD</h4>
                <p className="text-[9px] text-ink-soft leading-normal font-jakarta">Global Sourcing Hub</p>
              </div>
            </div>

            {/* Animated decorative ring behind the top right of the card */}
            <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full border border-dashed border-gold/30 animate-[spin_40s_linear_infinite] pointer-events-none" />
          </div>

        </div>
      </section>

      {/* Trust Ticker (Marquee) */}
      <div className="w-full bg-emerald py-5 overflow-hidden border-t border-b border-gold/10 relative z-10 shadow-md">
        <div className="animate-marquee select-none flex items-center">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-[10px] tracking-[0.2em] uppercase text-gold/60 font-semibold flex items-center">
              PHARMACEUTICAL GENERICS
              <span className="mx-4 text-gold/30">◆</span>
              MEDICAL DEVICES
              <span className="mx-4 text-gold/30">◆</span>
              WHO-GMP CERTIFIED
              <span className="mx-4 text-gold/30">◆</span>
              CE COMPLIANT
              <span className="mx-4 text-gold/30">◆</span>
              AYURVEDIC MEDICINES
              <span className="mx-4 text-gold/30">◆</span>
              HERBAL NUTRACEUTICALS
              <span className="mx-4 text-gold/30">◆</span>
              COSMECEUTICALS
              <span className="mx-4 text-gold/30">◆</span>
              GLOBAL EXPORTS
              <span className="mx-4 text-gold/30">◆</span>
              PRIVATE LABEL
              <span className="mx-4 text-gold/30">◆</span>
              CONTRACT SOURCING
              <span className="mx-4 text-gold/30">◆</span>
              US FDA DOSSIER SUPPORT
              <span className="mx-4 text-gold/30">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="bg-cream py-28 md:py-36 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left Column: Context */}
          <div className="reveal">
            <span className="text-gold text-[11px] font-medium tracking-[0.22em] uppercase block mb-3">
              ABOUT THE COMPANY
            </span>
            <h2 className="font-playfair text-[40px] md:text-[44px] font-normal leading-tight text-ink mb-8">
              Pharmaceutical Excellence With Ayurvedic Roots
            </h2>
            <div className="space-y-6 text-ink-mid text-[17px] leading-relaxed">
              <p>
                Neo Life Sciences is a specialist B2B pharmaceutical trading and global export partner based out of India's healthcare innovation hub, Hyderabad. Rather than operating raw manufacturing assets, we act as a streamlined sourcing catalyst for regulated international markets.
              </p>
              <p>
                We collaborate strictly with certified manufacturing laboratories holding WHO-GMP, ISO 9001:2015, and ISO 13485 accreditations. Every therapeutic batch, device shipment, and standardized extract is fully traceable back to its origin.
              </p>
              <p>
                Our technical strength lies in our dedicated regulatory affairs department. We coordinate import licensing, MOH permit approvals, and compile complete product registration dossiers in Common Technical Document (CTD) formats to secure market entries swiftly.
              </p>
            </div>

          </div>

          {/* Right Column: Capabilities Card Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Card 1 */}
            <div className="border border-emerald/10 bg-white/40 backdrop-blur-xs p-8 hover:border-gold/30 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 reveal delay-100">
              <div className="w-12 h-12 rounded-full bg-emerald/5 flex items-center justify-center mb-6 group-hover:bg-gold-pale transition-colors duration-300 text-gold">
                <Pill size={24} />
              </div>
              <h3 className="text-[18px] font-semibold text-ink tracking-wide mb-3">Pharma Trading</h3>
              <p className="text-ink-soft text-[14px] leading-relaxed">
                Sourcing WHO-GMP generic formulations, oncology products, and custom injectables from certified facilities.
              </p>
            </div>

            {/* Card 2 */}
            <div className="border border-emerald/10 bg-white/40 backdrop-blur-xs p-8 hover:border-gold/30 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 reveal delay-200">
              <div className="w-12 h-12 rounded-full bg-emerald/5 flex items-center justify-center mb-6 group-hover:bg-gold-pale transition-colors duration-300 text-gold">
                <Stethoscope size={24} />
              </div>
              <h3 className="text-[18px] font-semibold text-ink tracking-wide mb-3">Medical Devices</h3>
              <p className="text-ink-soft text-[14px] leading-relaxed">
                CE and ISO 13485 compliant clinical diagnostics, surgical equipment, and rehabilitation hardware.
              </p>
            </div>

            {/* Card 3 */}
            <div className="border border-emerald/10 bg-white/40 backdrop-blur-xs p-8 hover:border-gold/30 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 reveal delay-300">
              <div className="w-12 h-12 rounded-full bg-emerald/5 flex items-center justify-center mb-6 group-hover:bg-gold-pale transition-colors duration-300 text-gold">
                <Leaf size={24} />
              </div>
              <h3 className="text-[18px] font-semibold text-ink tracking-wide mb-3">Herbal & Ayurveda</h3>
              <p className="text-ink-soft text-[14px] leading-relaxed">
                AYUSH-certified classical organic extracts, dietary nutraceuticals, and functional wellness cosmetics.
              </p>
            </div>

            {/* Card 4 */}
            <div className="border border-emerald/10 bg-white/40 backdrop-blur-xs p-8 hover:border-gold/30 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 reveal delay-400">
              <div className="w-12 h-12 rounded-full bg-emerald/5 flex items-center justify-center mb-6 group-hover:bg-gold-pale transition-colors duration-300 text-gold">
                <Globe size={24} />
              </div>
              <h3 className="text-[18px] font-semibold text-ink tracking-wide mb-3">Global Exports</h3>
              <p className="text-ink-soft text-[14px] leading-relaxed">
                Cold-chain air cargo and shipping logistics with complex customs clearing and dossier registration support.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="bg-[#0A1A12] py-28 md:py-36 text-cream relative overflow-hidden">
        {/* Subtle decorative background vector */}
        <div className="absolute right-[-10%] top-[-10%] w-[50%] h-[50%] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-6 md:px-12">

          <div className="reveal">
            <span className="text-gold text-[11px] font-medium tracking-[0.22em] uppercase block mb-3">
              EXECUTIVE LEADERSHIP
            </span>
            <h2 className="font-playfair text-[40px] md:text-[44px] font-normal leading-tight text-white mb-16">
              Guided by Experience & Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Avatar Frame (col-span-4) */}
            <div className="lg:col-span-4 reveal-left">
              <div className="aspect-[3/4] bg-[#122A1C] border border-white/10 relative overflow-hidden flex items-center justify-center shadow-2xl">
                {/* Visual texture lines */}
                <div className="absolute inset-0 bg-radial-gradient opacity-10" />

                {/* Main Image */}
                <Image
                  src="/images/Founder.jpeg"
                  alt="Anil Kumar Eravathri - Managing Director"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-top"
                  priority
                />

                {/* Director Badge */}
                <div className="absolute top-4 left-4 bg-gold text-emerald text-[9px] font-semibold tracking-[0.2em] uppercase px-3.5 py-1.5 shadow-md z-10">
                  Managing Director
                </div>
              </div>
            </div>

            {/* Profile Bio (col-span-8) */}
            <div className="lg:col-span-8 reveal">
              <h3 className="font-playfair text-[32px] md:text-[36px] font-bold text-white leading-none">
                Anil Kumar Eravathri
              </h3>
              <p className="text-[14px] font-medium text-gold/70 mt-2 font-jakarta tracking-wider uppercase">
                Founder & Managing Director, NEO LIFE SCIENCES PVT LTD
              </p>

              <div className="w-12 h-px bg-gold/40 my-6" />

              <div className="space-y-6 text-cream/70 text-[16px] leading-relaxed max-w-2xl font-jakarta">
                <p>
                  Prior to founding Neo Life Sciences, Mr. Eravathri spent over a decade running a successful IT staffing enterprise in the United States, building deep organizational expertise in cross-border business development, corporate logistics, and international regulatory compliance.
                </p>
                <p>
                  A prominent public figure, he is a former Member of the Legislative Assembly (MLA) of Andhra Pradesh and served as Government Whip. This background brings a unique combination of administrative policy insight, governance experience, and strong institutional relationships across India's industrial sectors.
                </p>
                <p>
                  Currently serving as the Chairman of the Telangana  Mineral Development Corporation (TGMDC), Mr. Eravathri coordinates direct policy interfaces and possesses an unparalleled grasp of regulatory standards for healthcare devices, clinical manufacturing, and trade logistics.
                </p>
              </div>

              {/* Achievement Pills */}
              <div className="flex flex-wrap gap-2.5 mt-8 max-w-2xl">
                {[
                  "INTERNATIONAL BUSINESS",
                  "FORMER MLA & GOVT. WHIP",
                  "CHAIRMAN, TGMDC",
                  "HEALTHCARE ENTREPRENEUR"
                ].map((pill, idx) => (
                  <span
                    key={idx}
                    className="border border-white/15 text-cream/60 text-[10px] tracking-[0.15em] uppercase px-4 py-1.5 font-semibold bg-white/[0.02] hover:border-gold/30 hover:text-gold transition-colors duration-300"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Product Portfolio Section (10-Card Numbered Grid) */}
      <section id="products" className="bg-cream py-28 md:py-36 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">

          <div className="mb-20 reveal">
            <span className="text-gold text-[11px] font-medium tracking-[0.22em] uppercase block mb-3">
              PRODUCT PORTFOLIO
            </span>
            <h2 className="font-playfair text-[40px] md:text-[44px] font-normal leading-tight text-ink">
              What We Source & Export
            </h2>
          </div>

          {/* Numbered Grid (Gap-px style border) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-emerald/10 border border-emerald/10 shadow-xl">
            {displayedProducts.map((product, idx) => (
              <div
                key={idx}
                className="bg-cream p-8 hover:bg-white hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(10,26,18,0.06)] transition-all duration-300 group flex flex-col justify-between min-h-[320px] relative overflow-hidden reveal"
                style={{ transitionDelay: `${(idx % 5) * 100}ms` }}
              >
                {/* Background Image Container */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <Image
                    src={product.bgImage}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-5 group-hover:opacity-15 transition-all duration-700 scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cream/20 via-transparent to-transparent z-10" />
                </div>

                <div className="relative z-10">
                  {/* Top card metadata */}
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="font-playfair text-[44px] font-bold text-ink/10 group-hover:text-gold/20 transition-colors duration-300 leading-none">
                      {product.num}
                    </span>
                    <span className="text-[9px] tracking-[0.18em] uppercase text-gold font-semibold">
                      {product.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[17px] font-semibold text-ink mb-3 group-hover:text-emerald transition-colors duration-300">
                    {product.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-[14px] text-ink-soft leading-relaxed">
                    {product.desc}
                  </p>
                </div>

                {/* Tag list */}
                <div className="flex flex-wrap gap-1 mt-6 relative z-10">
                  {product.tags && Array.isArray(product.tags) && product.tags.map((tag: string, tagIdx: number) => (
                    <span
                      key={tagIdx}
                      className="text-[9px] tracking-[0.1em] uppercase bg-emerald/[0.06] text-emerald px-2 py-1 font-semibold border border-emerald/10 transition-all duration-300 group-hover:bg-emerald group-hover:text-gold group-hover:border-gold/25"
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

      {/* Global Reach / Map Section */}
      <GlobalReach />

      {/* Certification Badges Section */}
      <section id="certifications" className="bg-cream py-16 border-b border-emerald/10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-px bg-emerald/10 border border-emerald/10 shadow-sm">
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
                className="bg-cream px-6 py-10 text-center flex flex-col items-center justify-center hover:bg-gold-pale transition-colors duration-300 reveal"
                style={{ transitionDelay: `${(idx % 9) * 80}ms` }}
              >
                <ShieldCheck size={24} className="text-ink/30 mb-3 mx-auto" />
                <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-ink/75">
                  {cert}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Sourcing Process Workflow */}
      <section className="bg-[#FAF7F2] py-28 md:py-36 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">

          <div className="mb-20 text-center max-w-2xl mx-auto reveal">
            <span className="text-gold text-[11px] font-medium tracking-[0.22em] uppercase block mb-3">
              HOW WE WORK
            </span>
            <h2 className="font-playfair text-[40px] md:text-[44px] font-normal leading-tight text-ink">
              From Enquiry to Delivery
            </h2>
            <p className="text-ink-soft mt-3 text-sm">
              We guide pharmaceutical procurement cycles with complete accountability at every milestone.
            </p>
          </div>

          {/* Stepper container */}
          <div className="relative mt-16">
            {/* Connecting line on desktop */}
            <div className="hidden lg:block absolute top-6 left-12 right-12 h-px bg-emerald/10 z-0" />

            {/* Step list */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 relative z-10">
              {workflowSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left group relative reveal" style={{ transitionDelay: `${idx * 150}ms` }}>

                  {/* Circle Step */}
                  <div className="w-12 h-12 rounded-full border border-emerald/10 bg-white flex items-center justify-center shadow-md group-hover:border-gold group-hover:bg-gold-pale transition-all duration-300">
                    <span className="font-playfair text-gold font-bold text-lg italic">
                      {step.num}
                    </span>
                  </div>

                  {/* Details */}
                  <h3 className="text-[15px] font-semibold text-ink mt-6 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-ink-soft leading-relaxed max-w-[240px] lg:max-w-none">
                    {step.desc}
                  </p>

                  {/* Tooltip detail box */}
                  <div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none absolute left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 bottom-[105%] w-60 bg-emerald text-cream p-4 shadow-xl z-20 transition-all duration-300 border border-gold/20">
                    <span className="text-gold text-[8px] font-semibold tracking-wider block mb-1.5 uppercase">MILESTONE SPECIFICS</span>
                    <ul className="text-[11px] text-cream/70 leading-relaxed space-y-1.5 list-disc pl-3 font-jakarta">
                      {step.details.map((detail, dIdx) => (
                        <li key={dIdx}>{detail}</li>
                      ))}
                    </ul>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Why Us Section */}
      <section id="whyus" className="bg-[#0A1A12] py-28 md:py-36 text-cream relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">

          <div className="mb-20 text-center max-w-2xl mx-auto reveal">
            <span className="text-gold text-[11px] font-medium tracking-[0.22em] uppercase block mb-3">
              OUR DIFFERENTIATORS
            </span>
            <h2 className="font-playfair text-[40px] md:text-[44px] font-normal leading-tight text-white">
              Why Global Buyers Choose Neo Life Sciences
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Card 1 */}
            <div className="border border-white/10 p-8 hover:border-gold/30 hover:bg-white/[0.02] transition-colors duration-300 reveal delay-100">
              <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold mb-6">
                <Scale size={20} />
              </div>
              <h3 className="text-[18px] font-semibold text-white tracking-wide mb-3">Regulatory Precision</h3>
              <p className="text-cream/60 text-[14px] leading-relaxed">
                We don't just source — we document. Every export shipment includes WHO-GMP certs, Certificate of Analysis (COA), Certificate of Origin (COO), and dossiers compiled strictly in CTD format.
              </p>
            </div>

            {/* Card 2 */}
            <div className="border border-white/10 p-8 hover:border-gold/30 hover:bg-white/[0.02] transition-colors duration-300 reveal delay-200">
              <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold mb-6">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-[18px] font-semibold text-white tracking-wide mb-3">100% Certified Sourcing</h3>
              <p className="text-cream/60 text-[14px] leading-relaxed">
                We contract exclusively with licensed manufacturers audited by global bodies. We implement complete batch isolation and traceability to prevent quality bottlenecks.
              </p>
            </div>

            {/* Card 3 */}
            <div className="border border-white/10 p-8 hover:border-gold/30 hover:bg-white/[0.02] transition-colors duration-300 reveal delay-300">
              <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold mb-6">
                <Zap size={20} />
              </div>
              <h3 className="text-[18px] font-semibold text-white tracking-wide mb-3">Velocity & Transparency</h3>
              <p className="text-cream/60 text-[14px] leading-relaxed">
                Get pricing quotations within 48 business hours. Track regulatory dossier status and shipping configurations transparently via a dedicated international trade manager.
              </p>
            </div>

            {/* Card 4 */}
            <div className="border border-white/10 p-8 hover:border-gold/30 hover:bg-white/[0.02] transition-colors duration-300 reveal delay-400">
              <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold mb-6">
                <Clock size={20} />
              </div>
              <h3 className="text-[18px] font-semibold text-white tracking-wide mb-3">On-Time Delivery</h3>
              <p className="text-cream/60 text-[14px] leading-relaxed">
                Streamlined global logistics with temperature-tracked cold chain support and direct customs clearance to guarantee prompt, uninterrupted B2B supply lines.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* B2B Lead Capture & Contact Section */}
      <section id="contact" className="bg-cream py-28 md:py-36 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">

          <div className="mb-16 reveal">
            <span className="text-gold text-[11px] font-medium tracking-[0.22em] uppercase block mb-3">
              ACQUISITIONS & LOGISTICS
            </span>
            <h2 className="font-playfair text-[40px] md:text-[44px] font-normal leading-tight text-ink">
              Start Your Sourcing Enquiry
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

            {/* Left Panel - Corporate Info (col-span-2) */}
            <div className="lg:col-span-2 reveal-left">
              <div className="bg-emerald text-cream p-8 md:p-10 shadow-2xl relative overflow-hidden space-y-8 border border-white/5">

                {/* Contact Items */}
                <div className="space-y-6">

                  <div className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gold shrink-0 mt-1">
                      <Mail size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] tracking-wider uppercase text-gold/60 font-semibold mb-0.5">Email Sourcing</span>
                      <a href="mailto:contact@neoayushveda.com" className="text-[15px] font-semibold text-white hover:text-gold transition-colors">
                        contact@neoayushveda.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gold shrink-0 mt-1">
                      <Phone size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] tracking-wider uppercase text-gold/60 font-semibold mb-0.5">Corporate Phone</span>
                      <a href="tel:+914035247813" className="text-[15px] font-semibold text-white hover:text-gold transition-colors">
                        040-35247813
                      </a>
                      <a href="tel:+918712443610" className="text-[15px] font-semibold text-white hover:text-gold transition-colors">
                        +91 87124 43610
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gold shrink-0 mt-1">
                      <MessageCircle size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] tracking-wider uppercase text-gold/60 font-semibold mb-0.5">WhatsApp Brokerage</span>
                      <span className="text-[15px] font-semibold text-white">
                        Available on Request
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gold shrink-0 mt-1">
                      <MapPin size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] tracking-wider uppercase text-gold/60 font-semibold mb-0.5">Registered Office Address</span>
                      <address className="text-[14px] text-cream/70 not-italic leading-relaxed">
                        201-2nd Floor, Above ICICI Bank,<br />
                        Plot 13/A/B Lane 12, MLA Colony,<br />
                        Banjara Hills, Hyderabad – 500034,<br />
                        Telangana, India
                      </address>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gold shrink-0 mt-1">
                      <Clock size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] tracking-wider uppercase text-gold/60 font-semibold mb-0.5">Business Hours</span>
                      <span className="text-[14px] text-cream/70">
                        Monday – Saturday: 9:00 AM – 6:00 PM IST
                      </span>
                    </div>
                  </div>

                </div>

                {/* Regulatory Tags inside Dark Card */}
                <div className="border-t border-white/10 pt-8 mt-8">
                  <h4 className="text-[9px] tracking-[0.2em] uppercase text-gold/70 mb-4 font-semibold">
                    REGULATORY DOCUMENTATION SUPPORTED
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "CTD Dossier",
                      "GMP Certificate",
                      "COA / COO",
                      "Import Permits",
                      "DMF Files"
                    ].map((doc, idx) => (
                      <span
                        key={idx}
                        className="border border-white/15 bg-white/[0.02] text-cream/50 text-[10px] tracking-wide uppercase px-3 py-1 font-semibold"
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Right Panel - Enquiry Form (col-span-3) */}
            <div className="lg:col-span-3 reveal-right">
              <div className="bg-white border border-emerald/10 p-8 md:p-10 shadow-2xl relative">

                {formSubmitted && (
                  <div className="bg-emerald/5 border border-gold/30 text-emerald p-6 mb-8 flex items-start gap-3 animate-fade-in">
                    <ShieldCheck size={20} className="text-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold tracking-wide uppercase text-emerald">ENQUIRY TRANSMITTED</h4>
                      <p className="text-xs text-ink-soft mt-1 leading-relaxed">
                        Thank you for your B2B sourcing enquiry. Our regulatory and logistics desks will analyze your specifications and respond within 24–48 business hours with an initial draft schedule.
                      </p>
                    </div>
                  </div>
                )}

                {formError && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-600 p-6 mb-8 flex items-start gap-3 animate-fade-in text-xs leading-relaxed">
                    <div>
                      <h4 className="text-sm font-semibold tracking-wide uppercase text-red-700">TRANSMISSION FAILED</h4>
                      <p className="mt-1">
                        {formError}
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-6">

                  {/* Row 1 - Names */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="firstName" className="text-[11px] tracking-[0.12em] uppercase text-ink/40 mb-2.5 font-semibold">First Name</label>
                      <input
                        id="firstName"
                        type="text"
                        required
                        placeholder="e.g. John"
                        className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/30 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-full"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="lastName" className="text-[11px] tracking-[0.12em] uppercase text-ink/40 mb-2.5 font-semibold">Last Name</label>
                      <input
                        id="lastName"
                        type="text"
                        required
                        placeholder="e.g. Doe"
                        className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/30 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-full"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Row 2 - Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-[11px] tracking-[0.12em] uppercase text-ink/40 mb-2.5 font-semibold">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="e.g. buyer@clinicaltrade.com"
                        className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/30 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-full"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="phone" className="text-[11px] tracking-[0.12em] uppercase text-ink/40 mb-2.5 font-semibold">Phone / WhatsApp</label>
                      <div className="flex gap-2 items-center">
                        <select
                          className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-3 py-3 text-[15px] text-ink focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-24 shrink-0"
                          value={phoneCode}
                          onChange={(e) => setPhoneCode(e.target.value)}
                        >
                          {countryCodes.map((c, i) => (
                            <option key={i} value={c.code} className="text-ink bg-cream">
                              {c.label} ({c.code})
                            </option>
                          ))}
                        </select>
                        <input
                          id="phone"
                          type="tel"
                          required
                          placeholder="e.g. 9032550436"
                          className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/30 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 flex-grow"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3 - Company */}
                  <div className="flex flex-col">
                    <label htmlFor="company" className="text-[11px] tracking-[0.12em] uppercase text-ink/40 mb-2.5 font-semibold">Company Name</label>
                    <input
                      id="company"
                      type="text"
                      required
                      placeholder="e.g. Global Pharma Logistics Ltd"
                      className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/30 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-full"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  {/* Row 4 - Dropdowns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="country" className="text-[11px] tracking-[0.12em] uppercase text-ink/40 mb-2.5 font-semibold">Destination Country</label>
                      <select
                        id="country"
                        className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-full"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      >
                        {countriesList.map((c, i) => (
                          <option key={i} value={c} className="text-ink bg-cream">{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="category" className="text-[11px] tracking-[0.12em] uppercase text-ink/40 mb-2.5 font-semibold">Product Category</label>
                      <select
                        id="category"
                        className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-full"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        {[
                          "APIs", "Ayurvedic Medicines", "Bulk Drugs / RSM",
                          "Cosmeceuticals", "Herbal Nutraceuticals", "Medical Devices",
                          "Multiple Categories", "Pharmaceutical Generics", "Specialty Therapeutics",
                          "Other"
                        ].map((cat, i) => (
                          <option key={i} value={cat} className="text-ink bg-cream">{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 5 - Documentation Chips */}
                  <div className="flex flex-col">
                    <span className="text-[11px] tracking-[0.12em] uppercase text-ink/40 mb-3 font-semibold block">
                      Required Documentation (Select all that apply)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {docOptions.map((doc, idx) => {
                        const isSelected = selectedDocs.includes(doc);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleDocToggle(doc)}
                            className={`px-3 py-1.5 text-[10px] tracking-wide uppercase font-semibold transition-all duration-200 border ${isSelected
                              ? "bg-emerald text-cream border-emerald"
                              : "border-ink/15 text-ink/50 hover:border-gold hover:text-gold"
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
                    <label htmlFor="message" className="text-[11px] tracking-[0.12em] uppercase text-ink/40 mb-2.5 font-semibold">Message or Health Goal</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder="Share exact dosage configurations, therapeutic volume demands, and compliance requirements..."
                      className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/30 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-full resize-y min-h-[100px]"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="bg-emerald text-gold px-8 py-4 text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-emerald-soft transition-colors w-full flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formSubmitting ? "TRANSMITTING..." : "SEND ENQUIRY"} {!formSubmitting && <ArrowRight size={14} />}
                    </button>
                    <p className="text-[10px] text-ink/35 text-center mt-4 font-jakarta tracking-wide">
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
    category: "Rx / OTC",
    title: "Pharmaceutical Generics (Rx)",
    desc: "Sourcing prescription generic medicines across all major therapeutic categories (HIV/AIDS therapeutics, oncology, cardiovascular, CNS) from WHO-GMP certified facilities.",
    tags: ["Tablets", "Capsules", "HIV/AIDS Care", "Dossiers"],
    bgImage: "/images/prod_generics_rx.png"
  },
  {
    num: "02",
    category: "Rx / OTC",
    title: "Specialty Therapeutics",
    desc: "Exporting therapeutic solutions including oncology treatments, diabetes care, HIV/AIDS, tuberculosis (TB), critical care medicines, cardiovascular care, injectables, vaccines, and daily nutraceuticals.",
    tags: [
      "Oncology",
      "Diabetes Care",
      "HIV/AIDS",
      "Tuberculosis (TB)",
      "Critical Care",
      "Cardiovascular",
      "Injectables",
      "Vaccines",
      "Nutraceuticals"
    ],
    bgImage: "/images/prod_generics_otc.png"
  },
  {
    num: "03",
    category: "Standardized",
    title: "Nutraceuticals",
    desc: "Premium daily health supplements, vitamins, multi-minerals, and organic nutrient formulations for international health markets.",
    tags: ["Vitamins", "Minerals", "Daily Care"],
    bgImage: "/images/prod_nutraceuticals.png"
  },
  {
    num: "04",
    category: "Specialty Rx",
    title: "Injectable Vaccines",
    desc: "We found all pharmaceuticals for Anti Diseases, Critical care injectables, vials, pre-filled syringes, and high-safety vaccines processed under strict aseptic cleanroom environments.",
    tags: ["Injectables", "Vaccines", "Critical Care"],
    bgImage: "/images/prod_injectables.png"
  },
  {
    num: "05",
    category: "DMF Filed",
    title: "APIs",
    desc: "Active Pharmaceutical Ingredients, bulk drug actives, and regulatory intermediates sourced from US FDA-inspected manufacturing plants.",
    tags: ["Active Ingredients", "DMF Files", "RSM"],
    bgImage: "/images/prod_apis.png"
  },
  {
    num: "06",
    category: "Class II & III",
    title: "Medical Devices",
    desc: "CE, ISO 13485, and FDA-ready surgical instruments, diagnostic equipment, healthcare disposables, and clinical hardware.",
    tags: ["Diagnostics", "Surgical", "Disposables"],
    bgImage: "/images/prod_devices.png"
  },
  {
    num: "07",
    category: "AYUSH Certified",
    title: "Ayurvedic Medicines",
    desc: "Classical Ayurvedic formulations, natural wellness vatis, churnas, and tailas sourced from licensed AYUSH GMP manufacturers.",
    tags: ["Vatis", "Churnas", "Asavas", "Tailas"],
    bgImage: "/images/prod_ayurvedic.png"
  },
  {
    num: "08",
    category: "Standardized",
    title: "Herbal Nutraceuticals",
    desc: "Standardized organic botanical extracts, phytochemical actives, and custom herbal capsule ingredients with complete batch COAs.",
    tags: ["Ashwagandha", "Turmeric", "Moringa"],
    bgImage: "/images/prod_herbal.png"
  },
  {
    num: "09",
    category: "Halal / Vegan",
    title: "Cosmeceuticals",
    desc: "Dermatologist-recommended skincare, clinical haircare, and personal wellness cosmetics available with Halal or Vegan certifications.",
    tags: ["Skincare", "Haircare", "Medicated"],
    bgImage: "/images/prod_cosmeceuticals.png"
  },
  {
    num: "10",
    category: "Bulk Actives",
    title: "Bulk Drugs",
    desc: "Exporting raw materials, bulk drug formulations, and high-purity chemical substances to global pharmaceutical manufacturers.",
    tags: ["Bulk Actives", "Intermediates", "Raw Materials"],
    bgImage: "/images/prod_bulk_drugs.png"
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
