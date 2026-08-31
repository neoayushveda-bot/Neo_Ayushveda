"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaShieldHalved,
  FaScaleBalanced,
  FaGlobe,
  FaHandshake,
  FaStethoscope,
  FaFileContract,
  FaCertificate,
  FaPlaneDeparture,
  FaArrowRight,
  FaChevronRight
} from "react-icons/fa6";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";

export default function AboutPage() {
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
      <main className="min-h-screen bg-white text-slate-900 font-sans">
        {/* ─── Hero Section ─── */}
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-28 pb-16 md:pt-36 md:pb-24 text-slate-900 overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 grid-texture opacity-50 pointer-events-none" />

          <div className="relative max-w-[1280px] mx-auto px-6 md:px-12">
            <nav className="flex items-center gap-2 text-xs tracking-wider uppercase mb-6 opacity-0 animate-fade-in-up font-mono">
              <Link href="/" className="text-slate-500 hover:text-sky-600 transition-colors">
                Home
              </Link>
              <FaChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-sky-600 font-bold">About Enterprise</span>
            </nav>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200/80 rounded-full px-3.5 py-1 mb-4 opacity-0 animate-fade-in-up">
                <span className="w-2 h-2 rounded-full bg-[#7CB800] animate-pulse" />
                <span className="text-sky-800 font-mono text-[11px] tracking-[0.16em] uppercase font-semibold">
                  ABOUT NEO LIFE SCIENCES
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.12] text-slate-900 tracking-tight opacity-0 animate-fade-in-up animation-delay-100">
                Connecting International Markets <br />
                <span className="italic text-sky-600 font-normal">With High Quality & Reliable Pharmaceutical Solutions.</span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-5 opacity-0 animate-fade-in-up animation-delay-200 max-w-3xl">
                Neo Life Sciences Pvt Ltd is a Hyderabad, India -based pharmaceutical merchant exporter, sourcing and supplying APIs, Finished Pharmaceutical, Specialty & Complex Therapeutics, Injectables & Hospital Products, Vaccines & Biologics, Nutraceuticals & Dietary Supplements, Medical Devices & Diagnostics, Dermatology, Personal Care & Cosmeceuticals, from certified Indian manufacturers to global markets.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Company Overview ─── */}
        <section className="bg-white py-20 sm:py-28 relative overflow-hidden border-b border-slate-100">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            <div className="lg:col-span-5 reveal">
              <span className="text-sky-600 font-mono text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
                WHO WE ARE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-slate-900 mb-6">
                Building Reliable Healthcare Supply Partnerships Worldwide
              </h2>
              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
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

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1 - Cold Chain Logistics */}
              <div className="border border-slate-200 bg-white rounded-xl overflow-hidden hover:border-sky-500 hover:shadow-md transition-all duration-200 group reveal">
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
              <div className="border border-slate-200 bg-white rounded-xl overflow-hidden hover:border-sky-500 hover:shadow-md transition-all duration-200 group flex flex-col justify-between reveal delay-100">
                <div>
                  <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                    <Image
                      src="/images/audited_partner_facility.jpg"
                      alt="WHO-GMP Audited Cleanroom Pharmaceutical Manufacturing Facility"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-sm text-sky-400 font-mono text-[9px] uppercase font-bold px-2.5 py-0.5 rounded flex items-center gap-1.5">
                      <FaCertificate className="w-3 h-3" />
                      <span>100% Certified Sourcing</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-slate-900 mb-1.5">Audited Partner Network</h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Contracting exclusively with globally audited manufacturers, implementing batch isolation and origin traceability.
                    </p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 font-mono text-[11px] text-slate-500">
                    WHO-GMP & PIC/S Certified
                  </div>
                </div>
              </div>

              {/* Card 3 - CTD Regulatory Dossiers */}
              <div className="border border-slate-200 bg-white rounded-xl overflow-hidden hover:border-sky-500 hover:shadow-md transition-all duration-200 group flex flex-col justify-between reveal delay-200">
                <div>
                  <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                    <Image
                      src="/images/regulatory_dossier_lab.jpg"
                      alt="Pharmaceutical CTD Dossier and Regulatory Affairs Compliance Lab"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-sm text-sky-400 font-mono text-[9px] uppercase font-bold px-2.5 py-0.5 rounded flex items-center gap-1.5">
                      <FaFileContract className="w-3 h-3" />
                      <span>Regulatory Affairs</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-slate-900 mb-1.5">CTD / ACTD Dossiers</h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Technical dossier compilation, MOH permit coordination, and COA/COO documentation for swift market entry.
                    </p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 font-mono text-[11px] text-slate-500">
                    US FDA CTD & EU GMP Ready
                  </div>
                </div>
              </div>

              {/* Card 4 - Medical Devices */}
              <div className="border border-slate-200 bg-white rounded-xl p-5 hover:border-sky-500 hover:shadow-md transition-all duration-200 group flex flex-col justify-between reveal delay-300">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    <FaStethoscope className="w-5 h-5" />
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-sky-600 font-semibold mb-1">
                    CE & ISO 13485
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">Medical Devices & Diagnostics</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    CE and ISO 13485 certified surgical instruments, diagnostics, consumables, and healthcare disposables.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 font-mono text-[11px] text-slate-500">
                  Global MOH Regulatory Alignment
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ─── Leadership Section ─── */}
        <section className="bg-slate-900 py-20 sm:py-28 text-slate-100 relative overflow-hidden border-b border-slate-800">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <div className="reveal mb-14">
              <span className="text-sky-400 font-mono text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
                EXECUTIVE LEADERSHIP
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
                Guided by Experience & Governance
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-950 p-8 sm:p-12 rounded-2xl border border-slate-800 shadow-xl">
              <div className="lg:col-span-4 reveal">
                <div className="aspect-[3/4] bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center shadow-lg">
                  <Image
                    src="/images/Founder.jpeg"
                    alt="Anil Kumar Eravathri - Managing Director"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-top outline outline-1 -outline-offset-1 outline-white/10"
                    priority
                  />
                  <div className="absolute top-4 left-4 bg-sky-600 text-white font-mono text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1.5 rounded shadow-md z-10">
                    Managing Director
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 reveal">
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                  Anil Kumar Eravathri
                </h3>
                <p className="text-sm font-semibold text-[#A4D73B] mt-1 uppercase tracking-wider font-mono">
                  Founder & Managing Director, NEO LIFE SCIENCES PVT LTD
                </p>
                <div className="w-12 h-0.5 bg-[#7CB800] my-5" />
                <div className="space-y-4 text-slate-300 text-base leading-relaxed">
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

                <div className="flex flex-wrap gap-2 mt-6">
                  {[
                    "INTERNATIONAL BUSINESS",
                    "FORMER MLA & GOVT. WHIP",
                    "CHAIRMAN, TGMDC",
                    "HEALTHCARE ENTREPRENEUR",
                  ].map((pill, idx) => (
                    <span
                      key={idx}
                      className="border border-slate-700 text-slate-300 font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 font-semibold bg-slate-900 rounded"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Core Values ─── */}
        <section className="bg-white py-20 sm:py-28 relative overflow-hidden border-b border-slate-100">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <div className="text-center mb-16 reveal">
              <span className="text-sky-600 font-mono text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
                WHAT WE STAND FOR
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-slate-900">
                Building Reliable Healthcare Supply Partnerships Worldwide
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: FaShieldHalved,
                  title: "Quality",
                  desc: "Connecting global healthcare markets with trusted Indian manufacturers and quality-assured products.",
                },
                {
                  icon: FaScaleBalanced,
                  title: "Compliance",
                  desc: "Supporting international market requirements through reliable sourcing and regulatory solutions.",
                },
                {
                  icon: FaGlobe,
                  title: "Access",
                  desc: "Creating seamless access to a broad range of Indian pharmaceutical and healthcare capabilities.",
                },
                {
                  icon: FaHandshake,
                  title: "Partnerships",
                  desc: "Building lasting business relationships through integrity, reliability, and excellence.",
                },
              ].map((value, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 bg-slate-50/50 p-7 rounded-xl hover:bg-white hover:border-sky-500 hover:shadow-md transition-all duration-200 group reveal"
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <div className="w-11 h-11 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center mb-5 group-hover:bg-sky-600 transition-colors text-sky-600 group-hover:text-white">
                    <value.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Operational Protocol ─── */}
        <section className="bg-slate-50 py-20 sm:py-28 relative overflow-hidden border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <div className="text-center mb-16 reveal">
              <span className="text-sky-600 font-mono text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
                HOW WE OPERATE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-slate-900">
                From Enquiry to Delivery
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                {
                  num: "01",
                  title: "Sourcing Enquiry",
                  desc: "Submit product requirements, target country, and volume needs.",
                },
                {
                  num: "02",
                  title: "Regulatory Review",
                  desc: "We assess compliance and prepare a customized quotation.",
                },
                {
                  num: "03",
                  title: "Dossier & Permits",
                  desc: "Compilation of CTD dossiers, import permits, GMP certificates, and COAs.",
                },
                {
                  num: "04",
                  title: "Quality Control",
                  desc: "Rigorous batch document review, analysis, and packaging verification.",
                },
                {
                  num: "05",
                  title: "Global Delivery",
                  desc: "Cold-chain freight coordination, customs clearance, and document delivery.",
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 reveal"
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <span className="font-mono text-2xl font-bold text-sky-600 block leading-none mb-3">
                    {step.num}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Verified Metrics ─── */}
        <section className="bg-white py-16 border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center reveal">
              {[
                { value: "50+", label: "Export Markets" },
                { value: "WHO-GMP", label: "Certified Sourcing" },
                { value: "10", label: "Product Groups" },
                { value: "24–48h", label: "Response Time" },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono tracking-wider uppercase text-slate-500 mt-1 font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA Section ─── */}
        <section className="bg-slate-50 py-20 sm:py-28">
          <div className="max-w-[800px] mx-auto px-6 md:px-12 text-center reveal">
            <span className="text-sky-600 font-mono text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
              READY TO SOURCE?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-slate-900 mb-6">
              Start Your Pharmaceutical Sourcing Journey Today
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              Whether you need WHO-GMP generics, specialty therapeutics, medical devices, or
              Ayurvedic formulations — our team is ready to assist with complete regulatory
              and logistics support.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/enquiry"
                className="bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white px-8 py-3.5 text-xs tracking-wider uppercase font-semibold transition-transform duration-150 ease-out active:scale-[0.96] shadow-md w-full sm:w-auto text-center rounded-md hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
              >
                <span>Submit Sourcing Enquiry</span>
                <FaArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/"
                className="border border-slate-300 bg-white hover:bg-slate-50 hover:border-sky-500 hover:text-sky-600 text-slate-700 px-8 py-3.5 text-xs tracking-wider uppercase font-semibold transition-transform duration-150 ease-out active:scale-[0.96] w-full sm:w-auto text-center rounded-md"
              >
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
