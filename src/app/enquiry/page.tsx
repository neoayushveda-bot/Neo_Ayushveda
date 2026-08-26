"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  ArrowRight,
  ChevronRight,
  Sparkles,
  FileCheck2,
  AlertCircle
} from "lucide-react";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";

function EnquiryContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const groupParam = searchParams.get("group") || "";
  const productParam = searchParams.get("product") || "";

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
    category: categoryParam || "Pharmaceutical Generics",
    message: productParam
      ? `Enquiry for: ${productParam}${groupParam ? ` (${groupParam})` : ""}`
      : "",
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

  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
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
          productContext: productParam ? { product: productParam, group: groupParam } : undefined,
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
        message: "",
      });
      setSelectedDocs([]);
      setTimeout(() => setFormSubmitted(false), 8000);
    } catch (error: any) {
      setFormError(
        error.message ||
          "An unexpected network error occurred. Please verify your connection."
      );
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      {/* ─── Hero Section ─── */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-28 pb-16 md:pt-36 md:pb-24 text-slate-900 overflow-hidden border-b border-slate-200/80">
        <div className="absolute inset-0 grid-texture opacity-50 pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto px-6 md:px-12">
          <nav className="flex items-center gap-2 text-xs tracking-wider uppercase mb-6 opacity-0 animate-fade-in-up font-mono">
            <Link href="/" className="text-slate-500 hover:text-sky-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-sky-600 font-bold">B2B Sourcing Enquiry</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200/80 rounded-full px-3.5 py-1 mb-4 opacity-0 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-[#7CB800] animate-pulse" />
              <span className="text-sky-800 font-mono text-[11px] tracking-[0.16em] uppercase font-semibold">
                ACQUISITIONS & LOGISTICS DESK
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.12] text-slate-900 tracking-tight opacity-0 animate-fade-in-up animation-delay-100">
              Start Your B2B Sourcing Enquiry
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-5 opacity-0 animate-fade-in-up animation-delay-200 max-w-2xl">
              Connect directly with our international trade and regulatory affairs team.
              We assess country-specific MOH compliance and provide preliminary quotation
              schedules within 24–48 business hours.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Main Form Grid ─── */}
      <section className="py-16 md:py-24 bg-slate-50/50">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            
            {/* Left Panel - Corporate Info (2 cols) */}
            <div className="lg:col-span-2">
              <div className="bg-slate-900 text-slate-100 p-8 rounded-2xl shadow-xl space-y-6 border border-slate-800 sticky top-28">
                <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono mb-2">
                  Corporate Headquarters
                </h3>

                <div className="space-y-5 text-sm">
                  <div className="flex gap-3.5 items-start">
                    <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                      <Mail size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-sky-400 font-semibold mb-0.5">Email Sourcing</span>
                      <a href="mailto:contact@neoayushveda.com" className="text-sm font-semibold text-white hover:text-sky-400 transition-colors">
                        contact@neoayushveda.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                      <Phone size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-sky-400 font-semibold mb-0.5">Corporate Phone</span>
                      <a href="tel:+914035247813" className="text-sm font-semibold text-white hover:text-sky-400 transition-colors">
                        040-35247813
                      </a>
                      <a href="tel:+918712443610" className="text-sm font-semibold text-white hover:text-sky-400 transition-colors">
                        +91 87124 43610
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                      <MessageCircle size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-sky-400 font-semibold mb-0.5">WhatsApp Brokerage</span>
                      <span className="text-sm font-semibold text-white">
                        Available on Request
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                      <MapPin size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-sky-400 font-semibold mb-0.5">Registered Office Address</span>
                      <address className="text-xs text-slate-300 not-italic leading-relaxed">
                        201-2nd Floor, Above ICICI Bank,<br />
                        Plot 13/A/B Lane 12, MLA Colony,<br />
                        Banjara Hills, Hyderabad – 500034,<br />
                        Telangana, India
                      </address>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                      <Clock size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-sky-400 font-semibold mb-0.5">Business Hours</span>
                      <span className="text-xs text-slate-300 font-mono">
                        Monday – Saturday: 9:00 AM – 6:00 PM IST
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-5 mt-5">
                  <h4 className="text-[10px] font-mono tracking-[0.16em] uppercase text-sky-400 mb-2.5 font-semibold">
                    REGULATORY COMPLIANCE STANDARDS
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "WHO-GMP",
                      "EU-GMP",
                      "ISO 9001 & 13485",
                      "AYUSH",
                      "CE Certified",
                      "US FDA CTD"
                    ].map((doc, idx) => (
                      <span
                        key={idx}
                        className="border border-slate-700 bg-slate-800 text-slate-300 font-mono text-[10px] uppercase px-2.5 py-1 font-semibold rounded"
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Form (3 cols) */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-2xl shadow-xl">
                {formSubmitted && (
                  <div className="bg-sky-50 border border-sky-300 text-sky-900 p-5 rounded-lg mb-6 flex items-start gap-3 animate-fade-in text-sm">
                    <ShieldCheck size={20} className="text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold uppercase tracking-wider text-sky-900 font-mono">ENQUIRY TRANSMITTED</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Thank you for your B2B sourcing enquiry. Our regulatory and logistics desks will analyze your specifications and respond within 24–48 business hours with an initial draft schedule.
                      </p>
                    </div>
                  </div>
                )}

                {formError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-5 rounded-lg mb-6 flex items-start gap-3 animate-fade-in text-xs leading-relaxed">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold uppercase tracking-wider text-red-800 font-mono">TRANSMISSION FAILED</h4>
                      <p className="mt-1">{formError}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Pre-filled product badge */}
                  {productParam && (
                    <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-xl mb-4 flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
                      <div className="text-xs">
                        <span className="text-slate-500 font-mono uppercase text-[10px] block">Selected Sourcing Segment</span>
                        <strong className="text-sky-900 font-bold">{productParam}</strong>
                        {groupParam && <span className="text-slate-600 ml-1">({groupParam})</span>}
                      </div>
                    </div>
                  )}

                  {/* Row 1 - Names */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">First Name</label>
                      <input
                        id="firstName"
                        type="text"
                        required
                        placeholder="e.g. John"
                        className="border border-slate-300 bg-white px-3.5 py-2.5 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:ring-1 focus:ring-sky-600 focus:outline-none transition-all w-full"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Last Name</label>
                      <input
                        id="lastName"
                        type="text"
                        required
                        placeholder="e.g. Doe"
                        className="border border-slate-300 bg-white px-3.5 py-2.5 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:ring-1 focus:ring-sky-600 focus:outline-none transition-all w-full"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Row 2 - Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="e.g. buyer@clinicaltrade.com"
                        className="border border-slate-300 bg-white px-3.5 py-2.5 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:ring-1 focus:ring-sky-600 focus:outline-none transition-all w-full"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Phone / WhatsApp</label>
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
                          className="border border-slate-300 bg-white px-3.5 py-2.5 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:ring-1 focus:ring-sky-600 focus:outline-none transition-all flex-grow"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3 - Company */}
                  <div className="flex flex-col">
                    <label htmlFor="company" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Company Name</label>
                    <input
                      id="company"
                      type="text"
                      required
                      placeholder="e.g. Global Pharma Logistics Ltd"
                      className="border border-slate-300 bg-white px-3.5 py-2.5 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:ring-1 focus:ring-sky-600 focus:outline-none transition-all w-full"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  {/* Row 4 - Dropdowns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="country" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Destination Country</label>
                      <select
                        id="country"
                        className="border border-slate-300 bg-white px-3.5 py-2.5 rounded-md text-sm text-slate-900 focus:border-sky-600 focus:outline-none w-full"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      >
                        {countriesList.map((c, i) => (
                          <option key={i} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="category" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Product Category</label>
                      <select
                        id="category"
                        className="border border-slate-300 bg-white px-3.5 py-2.5 rounded-md text-sm text-slate-900 focus:border-sky-600 focus:outline-none w-full"
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
                    <div className="flex flex-wrap gap-2">
                      {docOptions.map((doc, idx) => {
                        const isSelected = selectedDocs.includes(doc);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleDocToggle(doc)}
                            className={`px-3 py-1.5 text-xs font-semibold tracking-wide uppercase rounded transition-transform duration-150 ease-out active:scale-[0.96] border ${
                              isSelected
                                ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                                : "border-slate-300 bg-slate-50 text-slate-700 hover:border-sky-500 hover:text-sky-600 hover:bg-sky-50/50"
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
                    <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Message or Specific Requirements</label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Share exact dosage configurations, therapeutic volume demands, and compliance requirements..."
                      className="border border-slate-300 bg-white px-3.5 py-2.5 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:ring-1 focus:ring-sky-600 focus:outline-none transition-all w-full resize-y min-h-[110px]"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white ps-8 pe-7 py-3.5 text-xs tracking-[0.16em] uppercase font-semibold rounded-md transition-transform duration-150 ease-out active:scale-[0.96] w-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                    >
                      {formSubmitting ? "TRANSMITTING..." : "SEND ENQUIRY"} {!formSubmitting && <ArrowRight size={15} />}
                    </button>
                    <p className="text-xs text-slate-500 text-center mt-3">
                      We typically respond within 24–48 business hours. All enquiries are treated with strict commercial confidentiality.
                    </p>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

export default function EnquiryPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-slate-400 font-mono text-xs">
          Loading Procurement Desk...
        </div>
      }>
        <EnquiryContent />
      </Suspense>
      <Footer />
    </>
  );
}

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
