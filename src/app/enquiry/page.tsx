"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Send,
  FileText,
  Pill,
  Calendar,
  MapPin,
  Building2,
  CheckCircle2,
  Award,
  Phone,
  Mail,
  Globe,
} from "lucide-react";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import InfiniteMarquee from "../../../components/layout/InfiniteMarquee";

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

const docOptions = [
  "CTD Dossier",
  "GMP Certificate",
  "COA / COO",
  "Import Permit Assistance",
  "DMF Filing",
  "Halal Certificate",
  "CE Mark",
  "AYUSH Certificate",
];

const categoryOptions = [
  "Finished Pharmaceutical & Healthcare Products",
  "Active Pharmaceutical Ingredients (APIs)",
  "Medical Devices & Diagnostics",
  "Other",
];

function EnquiryFormContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const productParam = searchParams.get("product") || "";
  const groupParam = searchParams.get("group") || "";

  // Determine initial category selection
  const getInitialCategory = () => {
    if (categoryParam) {
      const match = categoryOptions.find(
        (c) => c.toLowerCase() === categoryParam.toLowerCase()
      );
      if (match) return match;
    }
    return categoryOptions[0];
  };

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [phoneCode, setPhoneCode] = useState("+91");
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    country: "United Arab Emirates (UAE)",
    category: getInitialCategory(),
    message: productParam
      ? `I am interested in ${productParam}${groupParam ? ` (${groupParam})` : ""}. Please provide detailed pricing, MOQ, and regulatory documentation.`
      : "",
  });

  const handleDocToggle = (doc: string) => {
    if (selectedDocs.includes(doc)) {
      setSelectedDocs(selectedDocs.filter((item) => item !== doc));
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
          productEnquiry: productParam || undefined,
          productGroup: groupParam || undefined,
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
        category: getInitialCategory(),
        message: "",
      });
      setSelectedDocs([]);
      setPhoneCode("+91");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    } finally {
      setFormSubmitting(false);
    }
  };

  // Scroll-reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const reveals = document.querySelectorAll(".reveal, .reveal-scale");
    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* ─── Hero Section ─── */}
        <section className="relative bg-emerald pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(244,239,235,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(244,239,235,0.15) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* Gradient glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-soft/30 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-[1280px] mx-auto px-6 md:px-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase mb-8 opacity-0 animate-fade-in-up">
              <Link
                href="/"
                className="text-cream/50 hover:text-gold transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-cream/30" />
              {categoryParam && (
                <>
                  <span className="text-cream/50">Products</span>
                  <ChevronRight className="w-3 h-3 text-cream/30" />
                </>
              )}
              <span className="text-gold font-semibold">Enquiry</span>
            </nav>

            {/* Context Badge */}
            {productParam && (
              <div className="inline-flex items-center gap-2 mb-6 opacity-0 animate-fade-in-up animation-delay-100">
                <span className="text-[10px] font-semibold uppercase px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 tracking-[0.15em] flex items-center gap-1.5">
                  <FileText className="w-3 h-3" />
                  Product Enquiry
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-cream leading-[1.15] max-w-3xl mb-6 opacity-0 animate-fade-in-up animation-delay-200">
              {productParam
                ? `Enquire About ${productParam}`
                : "Submit Your Sourcing Enquiry"}
            </h1>

            {/* Description */}
            <p className="text-cream/60 text-base md:text-lg leading-relaxed max-w-2xl opacity-0 animate-fade-in-up animation-delay-300">
              {productParam
                ? `Complete the form below to receive detailed pricing, regulatory documentation, and supply terms for ${productParam}${groupParam ? ` under ${groupParam}` : ""}.`
                : "Fill in the form below with your requirements and our regulatory and logistics desks will respond within 24–48 business hours."}
            </p>

            {/* Context chips */}
            {(categoryParam || productParam || groupParam) && (
              <div className="flex flex-wrap items-center gap-3 mt-8 opacity-0 animate-fade-in-up animation-delay-400">
                {categoryParam && (
                  <span className="text-[11px] text-cream/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                    <span className="text-cream/40 mr-1">Category:</span>
                    <span className="text-gold font-semibold">{categoryParam}</span>
                  </span>
                )}
                {groupParam && (
                  <span className="text-[11px] text-cream/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                    <span className="text-cream/40 mr-1">Group:</span>
                    <span className="text-gold font-semibold">{groupParam}</span>
                  </span>
                )}
                {productParam && (
                  <span className="text-[11px] text-cream/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                    <span className="text-cream/40 mr-1">Product:</span>
                    <span className="text-gold font-semibold">{productParam}</span>
                  </span>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ─── Infinite Marquee Ticker ─── */}
        <InfiniteMarquee />

        {/* ─── Enquiry Form Section ─── */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column (Form) - 7 cols */}
              <div className="lg:col-span-7 reveal">
                <div className="bg-white border border-emerald/10 p-8 md:p-10 shadow-2xl relative rounded-xl">
                  {/* Decorative corner */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold/20 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold/20 pointer-events-none" />

                  {/* Form Header */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-emerald flex items-center justify-center">
                      <Send className="w-4.5 h-4.5 text-gold" />
                    </div>
                    <div>
                      <h2 className="font-playfair text-xl text-ink">
                        Sourcing Enquiry Form
                      </h2>
                      <p className="text-[11px] text-ink-soft tracking-wide">
                        All fields marked are required • Response within 24–48 hrs
                      </p>
                    </div>
                  </div>

                  {formSubmitted && (
                    <div className="bg-emerald/5 border border-gold/30 text-emerald p-6 mb-8 flex items-start gap-3 animate-fade-in-up rounded-lg">
                      <ShieldCheck
                        size={20}
                        className="text-gold shrink-0 mt-0.5"
                      />
                      <div>
                        <h4 className="text-sm font-semibold tracking-wide uppercase text-emerald">
                          ENQUIRY TRANSMITTED
                        </h4>
                        <p className="text-xs text-ink-soft mt-1 leading-relaxed">
                          Thank you for your B2B sourcing enquiry. Our regulatory
                          and logistics desks will analyze your specifications and
                          respond within 24–48 business hours with an initial
                          draft schedule.
                        </p>
                      </div>
                    </div>
                  )}

                  {formError && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-600 p-6 mb-8 flex items-start gap-3 animate-fade-in-up text-xs leading-relaxed rounded-lg">
                      <div>
                        <h4 className="text-sm font-semibold tracking-wide uppercase text-red-700">
                          TRANSMISSION FAILED
                        </h4>
                        <p className="mt-1">{formError}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    {/* Row 1 - Names */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label
                          htmlFor="firstName"
                          className="text-[11px] tracking-[0.12em] uppercase text-ink/40 mb-2.5 font-semibold"
                        >
                          First Name
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          required
                          placeholder="e.g. John"
                          className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/30 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-full rounded-md"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="lastName"
                          className="text-[11px] tracking-[0.12em] uppercase text-ink/40 mb-2.5 font-semibold"
                        >
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          required
                          placeholder="e.g. Doe"
                          className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/30 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-full rounded-md"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* Row 2 - Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label
                          htmlFor="email"
                          className="text-[11px] tracking-[0.12em] uppercase text-ink/40 mb-2.5 font-semibold"
                        >
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="e.g. buyer@clinicaltrade.com"
                          className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/30 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-full rounded-md"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="phone"
                          className="text-[11px] tracking-[0.12em] uppercase text-ink/40 mb-2.5 font-semibold"
                        >
                          Phone / WhatsApp
                        </label>
                        <div className="flex gap-2 items-center">
                          <select
                            className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-3 py-3 text-[15px] text-ink focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-24 shrink-0 rounded-md"
                            value={phoneCode}
                            onChange={(e) => setPhoneCode(e.target.value)}
                          >
                            {countryCodes.map((c, i) => (
                              <option
                                key={i}
                                value={c.code}
                                className="text-ink bg-cream"
                              >
                                {c.label} ({c.code})
                              </option>
                            ))}
                          </select>
                          <input
                            id="phone"
                            type="tel"
                            required
                            placeholder="e.g. 9032550436"
                            className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/30 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 flex-grow rounded-md"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 3 - Company */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="company"
                        className="text-[11px] tracking-[0.12em] uppercase text-ink/40 mb-2.5 font-semibold"
                      >
                        Company Name
                      </label>
                      <input
                        id="company"
                        type="text"
                        required
                        placeholder="e.g. Global Pharma Logistics Ltd"
                        className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/30 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-full rounded-md"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                      />
                    </div>

                    {/* Row 4 - Dropdowns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label
                          htmlFor="country"
                          className="text-[11px] tracking-[0.12em] uppercase text-ink/40 mb-2.5 font-semibold"
                        >
                          Destination Country
                        </label>
                        <select
                          id="country"
                          className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-full rounded-md"
                          value={formData.country}
                          onChange={(e) =>
                            setFormData({ ...formData, country: e.target.value })
                          }
                        >
                          {countriesList.map((c, i) => (
                            <option
                              key={i}
                              value={c}
                              className="text-ink bg-cream"
                            >
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="category"
                          className="text-[11px] tracking-[0.12em] uppercase text-ink/40 mb-2.5 font-semibold"
                        >
                          Product Category
                        </label>
                        <select
                          id="category"
                          className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-full rounded-md"
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              category: e.target.value,
                            })
                          }
                        >
                          {categoryOptions.map((cat, i) => (
                            <option
                              key={i}
                              value={cat}
                              className="text-ink bg-cream"
                            >
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Product context (read-only display if pre-filled) */}
                    {productParam && (
                      <div className="flex flex-col">
                        <span className="text-[11px] tracking-[0.12em] uppercase text-ink/40 mb-2.5 font-semibold">
                          Product / Segment
                        </span>
                        <div className="border border-gold/30 bg-gold-pale/20 px-4 py-3 text-[15px] text-ink flex items-center gap-2 rounded-md">
                          <Pill className="w-4 h-4 text-gold" />
                          <span className="font-semibold">{productParam}</span>
                          {groupParam && (
                            <span className="text-ink-soft text-sm ml-1">
                              — {groupParam}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

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
                              className={`px-3 py-1 rounded-md text-[10px] tracking-wide uppercase font-bold transition-colors border font-montserrat ${
                                isSelected
                                  ? "bg-gold text-emerald border-gold"
                                  : "border-emerald/15 text-ink-mid bg-cream/50 hover:border-gold"
                              }`}
                            >
                              {doc}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="message"
                        className="text-[11px] tracking-[0.12em] uppercase text-ink/40 mb-2.5 font-semibold"
                      >
                        Enquiry Specifications / Dosage Demands
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        placeholder="Share exact dosage configurations, therapeutic volume demands, and compliance requirements..."
                        className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/30 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-full resize-y min-h-[120px] rounded-md"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={formSubmitting}
                        className="bg-gold hover:bg-gold-light text-emerald font-montserrat font-bold px-8 py-4 text-[12px] tracking-[0.18em] uppercase transition-all duration-200 w-full flex items-center justify-center gap-3 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-lg active:scale-98"
                      >
                        {formSubmitting ? "TRANSMITTING..." : "SUBMIT SOURCING ENQUIRY"}{" "}
                        {!formSubmitting && <ArrowRight size={15} />}
                      </button>
                      <p className="text-[10px] text-ink/35 text-center mt-4 font-jakarta tracking-wide">
                        We typically respond within 24–48 business hours. All
                        enquiries are treated with strict commercial
                        confidentiality.
                      </p>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Column (iPHEX 2026 Event & Regulatory Sidebar) - 5 cols */}
              <div className="lg:col-span-5 space-y-6 reveal">
                
                {/* iPHEX 2026 Poster Event Card */}
                <div className="bg-emerald border border-gold/30 p-7 rounded-xl text-cream shadow-xl relative overflow-hidden font-montserrat">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] px-2.5 py-1 rounded bg-gold/20 text-gold border border-gold/40">
                      EXPO INVITATION
                    </span>
                    <span className="text-[10px] text-cream/60 uppercase tracking-wider font-semibold">
                      iPHEX 2026
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white leading-snug mb-2">
                    Meet Us at iPHEX 2026
                  </h3>
                  <p className="text-cream/70 text-xs font-inter leading-relaxed mb-5">
                    Neo Life Sciences Pvt. Ltd. (Formerly Neo Ayushveda Pvt Ltd) cordially invites all international healthcare delegates, regulatory trade partners, and buyers to meet our leadership team.
                  </p>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-3 font-montserrat mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-gold/20 border border-gold/40 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                        <div className="text-[9px] text-gold uppercase tracking-wider font-bold">Event Dates</div>
                        <div className="text-xs font-bold text-white">7th to 9th September 2026</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 border-t border-white/10 pt-3">
                      <div className="w-8 h-8 rounded-md bg-gold/20 border border-gold/40 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                        <div className="text-[9px] text-gold uppercase tracking-wider font-bold">Stall Location</div>
                        <div className="text-xs font-bold text-white">Hall No. 3 | Stall No. 3FC-07</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-cream/50 italic font-inter">
                    "Delivering Healthcare Beyond Borders"
                  </div>
                </div>

                {/* Regulatory Compliance Standards */}
                <div className="bg-white border border-emerald/10 p-6 rounded-xl shadow-md font-montserrat">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-ink">
                      Regulatory Compliance Standards
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["WHO-GMP", "EU-GMP", "US FDA", "PIC/S", "OTHER SRIs"].map((badge, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold px-2.5 py-1 rounded bg-emerald/5 text-emerald border border-emerald/15 tracking-wide"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-ink-soft font-inter leading-relaxed">
                    Sourced therapeutics & medical devices are manufactured strictly under certified WHO-GMP, EU-GMP, and US FDA compliant facilities with complete CTD dossier support.
                  </p>
                </div>

                {/* Corporate Head Office Info */}
                <div className="bg-cream/60 border border-emerald/10 p-6 rounded-xl shadow-sm font-montserrat">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-4 h-4 text-gold" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-ink">
                      Corporate Head Office
                    </h4>
                  </div>
                  <p className="text-xs text-ink-mid font-inter leading-relaxed mb-3">
                    <strong>Neo Life Sciences Pvt. Ltd.</strong><br />
                    <span className="text-ink-soft text-[11px]">(Formerly Neo Ayushveda Pvt Ltd)</span><br />
                    201-2nd Floor, Above ICICI Bank, Plot 13/A/B Lane 12, MLA Colony, Road No. 12, Banjara Hills, Hyderabad – 500034, Telangana, India
                  </p>
                  <div className="pt-3 border-t border-emerald/10 flex flex-col gap-1.5 text-xs text-ink-mid font-inter">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>Corporate Phone: 040-35247813</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>info@neolspharma.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>www.neolspharma.com</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Back link */}
            <div className="text-center mt-12 reveal">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-bold text-[12px] tracking-[0.15em] uppercase transition-colors font-montserrat"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function EnquiryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <span className="text-ink-soft text-sm uppercase tracking-widest animate-pulse">
            Loading Enquiry Form...
          </span>
        </div>
      }
    >
      <EnquiryFormContent />
    </Suspense>
  );
}
