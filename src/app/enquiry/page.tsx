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
  Sparkles,
} from "lucide-react";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";

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

        {/* ─── Enquiry Form Section ─── */}
        <section className="py-16 md:py-24">
          <div className="max-w-[900px] mx-auto px-6 md:px-12">
            <div className="reveal">
              <div className="bg-white border border-emerald/10 p-8 md:p-10 shadow-2xl relative">
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
                  <div className="bg-emerald/5 border border-gold/30 text-emerald p-6 mb-8 flex items-start gap-3 animate-fade-in-up">
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
                  <div className="bg-red-500/10 border border-red-500/30 text-red-600 p-6 mb-8 flex items-start gap-3 animate-fade-in-up text-xs leading-relaxed">
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
                        className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/30 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-full"
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
                        className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/30 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-full"
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
                        className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/30 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-full"
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
                          className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-3 py-3 text-[15px] text-ink focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-24 shrink-0"
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
                          className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/30 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 flex-grow"
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
                      className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/30 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-full"
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
                        className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-full"
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
                        className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-200 w-full"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
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
                      <div className="border border-gold/30 bg-gold-pale/20 px-4 py-3 text-[15px] text-ink flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gold" />
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
                            className={`px-3.5 py-1.5 text-[11px] tracking-wide uppercase font-semibold transition-all duration-200 border rounded-sm ${
                              isSelected
                                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                : "border-slate-300 bg-white/70 text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50"
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
                    <label
                      htmlFor="message"
                      className="text-[11px] tracking-[0.12em] uppercase text-ink/40 mb-2.5 font-semibold"
                    >
                      Message or Specific Requirements
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Share exact dosage configurations, therapeutic volume demands, and compliance requirements..."
                      className="border border-emerald/15 bg-[#FAF7F2]/50 focus:bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/30 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-all duration-200 w-full resize-y min-h-[120px]"
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
                      className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-8 py-4 text-[12px] tracking-[0.2em] uppercase font-semibold transition-all duration-200 w-full flex items-center justify-center gap-3 shadow-[0_4px_18px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_24px_rgba(37,99,235,0.45)] disabled:opacity-50 disabled:cursor-not-allowed rounded-sm hover:-translate-y-0.5"
                    >
                      {formSubmitting ? "TRANSMITTING..." : "SEND ENQUIRY"}{" "}
                      {!formSubmitting && <ArrowRight size={14} />}
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

            {/* Back link */}
            <div className="text-center mt-10 reveal">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-[12px] tracking-[0.15em] uppercase transition-colors"
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
