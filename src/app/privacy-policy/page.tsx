"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  FaShieldHalved,
  FaLock,
  FaFileLines,
  FaGlobe,
  FaDatabase,
  FaUserCheck,
  FaScaleBalanced,
  FaEnvelope,
  FaPhoneVolume,
  FaLocationDot,
  FaChevronRight,
  FaTriangleExclamation,
  FaEye,
  FaServer,
  FaShareNodes,
} from "react-icons/fa6";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";

export default function PrivacyPolicyPage() {
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

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const sections = [
    {
      id: "introduction",
      icon: FaShieldHalved,
      title: "1. Introduction & Scope",
      content: (
        <>
          <p>
            NEO LIFE SCIENCES PVT LTD (&ldquo;Neo Life Sciences&rdquo;, &ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is a specialist B2B pharmaceutical trading and international export enterprise registered in Hyderabad, Telangana, India. We are dedicated to respecting and protecting the privacy, commercial confidentiality, and personal data of our corporate clients, healthcare distributors, authorized importers, and website visitors.
          </p>
          <p className="mt-3">
            This Privacy Policy sets out the principles and practices governing our collection, storage, processing, transfer, and disclosure of information obtained through our official website (<span className="text-sky-600 font-semibold font-mono">neolspharma.com</span>), electronic correspondence, procurement forms, and associated B2B communication channels.
          </p>
        </>
      ),
    },
    {
      id: "information-collected",
      icon: FaDatabase,
      title: "2. Information We Collect",
      content: (
        <>
          <p>
            As an international B2B pharmaceutical trading firm, we primarily collect information required to evaluate, formulate, and execute international commercial transactions and regulatory clearances. This includes:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-600">
            <li>
              <strong className="text-slate-900 font-semibold">Corporate & Representative Identifiers:</strong> Name, corporate email address, business telephone/WhatsApp numbers, job title, company name, corporate address, and registered destination country.
            </li>
            <li>
              <strong className="text-slate-900 font-semibold">Sourcing & Commercial Specifications:</strong> Inquired pharmaceutical categories, therapeutic volumes, target dosage forms, private label requirements, and destination Ministry of Health (MOH) import criteria.
            </li>
            <li>
              <strong className="text-slate-900 font-semibold">Regulatory Documentation Data:</strong> Common Technical Document (CTD) dossier requests, Certificate of Analysis (COA) specifications, Certificate of Pharmaceutical Product (COPP) requirements, and import license details.
            </li>
            <li>
              <strong className="text-slate-900 font-semibold">Technical & Analytical Data:</strong> IP address, browser type, device information, referring URLs, and engagement metrics collected via standard web server logs and analytical cookies.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "confidentiality-dossiers",
      icon: FaLock,
      title: "3. Commercial Confidentiality & Regulatory Dossiers",
      content: (
        <>
          <p>
            We recognize the highly confidential and sensitive nature of pharmaceutical procurement, product dossiers, proprietary formulations, and competitive pricing schedules.
          </p>
          <p className="mt-3">
            All proprietary technical documentation—including Drug Master Files (DMF), stability study records, manufacturing site master files, and client-specific packaging designs—is handled under strict non-disclosure obligations and accessible solely by accredited regulatory affairs specialists and authorized logistics personnel.
          </p>
        </>
      ),
    },
    {
      id: "legal-bases",
      icon: FaScaleBalanced,
      title: "4. Legal Bases for Processing Data",
      content: (
        <>
          <p>We process your personal and corporate data under the following legitimate legal grounds:</p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-600">
            <li>
              <strong className="text-slate-900 font-semibold">Performance of a Contract or Pre-Contractual Steps:</strong> Processing quotes, verifying purchase orders, preparing shipping manifests, and managing B2B account relations.
            </li>
            <li>
              <strong className="text-slate-900 font-semibold">Statutory & Regulatory Obligations:</strong> Compliance with Indian pharmaceutical export regulations, Directorate General of Foreign Trade (DGFT) rules, customs declarations, and international drug safety reporting requirements.
            </li>
            <li>
              <strong className="text-slate-900 font-semibold">Legitimate Business Interests:</strong> Preventing fraud, enhancing website security, evaluating service performance, and maintaining commercial records.
            </li>
            <li>
              <strong className="text-slate-900 font-semibold">Explicit Consent:</strong> Where you have provided direct consent for specific transactional or informational updates.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "how-we-use",
      icon: FaFileLines,
      title: "5. How We Use Your Information",
      content: (
        <>
          <p>Information collected by Neo Life Sciences is utilized exclusively for:</p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-600">
            <li>Reviewing and responding to B2B sourcing inquiries within our 24–48 hour service standard.</li>
            <li>Compiling regulatory dossier packages (CTD/ACTD formats) and coordinating Certificate of Origin / COA verifications.</li>
            <li>Facilitating international cold-chain freight, customs documentation, and logistics dispatch.</li>
            <li>Conducting supplier qualification, batch quality control, and pre-shipment inspections.</li>
            <li>Fulfilling statutory tax, export clearance, and audit record-keeping obligations.</li>
          </ul>
        </>
      ),
    },
    {
      id: "third-party-sharing",
      icon: FaShareNodes,
      title: "6. Disclosure & Third-Party Sharing",
      content: (
        <>
          <p>
            <strong className="text-slate-900 font-semibold">We do not sell, lease, rent, or trade your corporate or personal information to any third parties for marketing purposes.</strong>
          </p>
          <p className="mt-3">
            We only disclose relevant data to trusted partners strictly necessary for executing your pharmaceutical sourcing and export transactions:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-600">
            <li>
              <strong className="text-slate-900 font-semibold">Licensed Manufacturing Partners:</strong> WHO-GMP/ISO certified manufacturing laboratories contracted to supply your ordered batches, bound by strict confidentiality agreements.
            </li>
            <li>
              <strong className="text-slate-900 font-semibold">Logistics & Cold-Chain Carriers:</strong> Accredited international air/sea freight forwarding agents and customs clearing brokers handling physical transit.
            </li>
            <li>
              <strong className="text-slate-900 font-semibold">Government & Regulatory Authorities:</strong> Indian customs authorities, DGFT, destination Ministries of Health, and law enforcement agencies when mandated by statutory law.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "international-transfers",
      icon: FaGlobe,
      title: "7. Cross-Border International Data Transfers",
      content: (
        <p>
          As an enterprise exporting to over 50 countries, your data may be transferred to and processed in countries outside your jurisdiction. We take all reasonable administrative, technical, and contractual measures to ensure that your data receives an adequate level of protection irrespective of where it is processed, adhering to internationally recognized standards including the Indian Digital Personal Data Protection Act (DPDP) and EU General Data Protection Regulation (GDPR) standards where applicable.
        </p>
      ),
    },
    {
      id: "data-security",
      icon: FaServer,
      title: "8. Data Security & Retention Protocols",
      content: (
        <>
          <p>
            We implement comprehensive technical and organizational safeguards—including SSL/TLS 256-bit encryption for data in transit, firewalled server infrastructure, encrypted database storage, and role-based access controls—to protect against unauthorized access, loss, alteration, or misuse.
          </p>
          <p className="mt-3">
            Commercial and transaction records are retained for the duration required to fulfill contractual obligations, comply with pharmaceutical regulatory retention periods (e.g., batch traceability timelines), and meet statutory Indian tax and export record-keeping mandates.
          </p>
        </>
      ),
    },
    {
      id: "cookies-tracking",
      icon: FaEye,
      title: "9. Cookies & Analytical Technologies",
      content: (
        <p>
          Our website uses essential technical cookies necessary for core website operation, security, and session management. We may also use privacy-respecting analytics tools to measure traffic trends, popular product categories, and site performance. You may configure your web browser to block or alert you about cookies; however, certain site features may have reduced functionality.
        </p>
      ),
    },
    {
      id: "user-rights",
      icon: FaUserCheck,
      title: "10. Your Rights & Data Choices",
      content: (
        <>
          <p>Depending on your jurisdiction, you hold specific legal rights concerning your personal data:</p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-600">
            <li><strong className="text-slate-900 font-semibold">Right to Access:</strong> Request confirmation of whether we process your data and obtain a copy.</li>
            <li><strong className="text-slate-900 font-semibold">Right to Rectification:</strong> Request correction of inaccurate or incomplete corporate/personal information.</li>
            <li><strong className="text-slate-900 font-semibold">Right to Erasure:</strong> Request deletion of your data where continued retention is not mandated by pharmaceutical or statutory export laws.</li>
            <li><strong className="text-slate-900 font-semibold">Right to Restrict or Object:</strong> Restrict or object to specific processing activities.</li>
            <li><strong className="text-slate-900 font-semibold">Withdrawal of Consent:</strong> Withdraw previously given consent for commercial communications at any time.</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, please contact our Data Privacy Desk at{" "}
            <a href="mailto:contact@neolspharma.com" className="text-sky-600 font-semibold hover:underline font-mono">
              contact@neolspharma.com
            </a>.
          </p>
        </>
      ),
    },
    {
      id: "disclaimer",
      icon: FaTriangleExclamation,
      title: "11. Regulatory & Medical Disclaimer",
      content: (
        <p>
          Neo Life Sciences is a B2B trading and export entity. Information on this website is intended solely for qualified commercial entities, institutional buyers, and licensed importers. We do not provide clinical medical advice, diagnose health conditions, or sell prescription drugs directly to individual consumers or patients.
        </p>
      ),
    },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white text-slate-900 font-sans">
        {/* ─── Hero Section ─── */}
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-28 pb-16 md:pt-36 md:pb-20 text-slate-900 overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 grid-texture opacity-50 pointer-events-none" />

          <div className="relative max-w-[1280px] mx-auto px-6 md:px-12">
            <nav className="flex items-center gap-2 text-xs tracking-wider uppercase mb-6 opacity-0 animate-fade-in-up font-mono">
              <Link href="/" className="text-slate-500 hover:text-sky-600 transition-colors">
                Home
              </Link>
              <FaChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-sky-600 font-bold">Privacy Policy</span>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200/80 rounded-full px-3.5 py-1 mb-4 opacity-0 animate-fade-in-up">
                <span className="w-2 h-2 rounded-full bg-[#7CB800] animate-pulse" />
                <span className="text-sky-800 font-mono text-[11px] tracking-[0.16em] uppercase font-semibold">
                  LEGAL & DATA PROTECTION
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.12] text-slate-900 tracking-tight opacity-0 animate-fade-in-up animation-delay-100">
                Privacy Policy & Data Governance
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-5 opacity-0 animate-fade-in-up animation-delay-200">
                At NEO LIFE SCIENCES PVT LTD, we hold commercial confidentiality,
                regulatory compliance, and customer privacy to the highest global
                pharmaceutical standards.
              </p>

              <div className="flex items-center gap-4 mt-6 text-xs text-slate-500 font-mono opacity-0 animate-fade-in-up animation-delay-300">
                <span>Last Updated: August 2026</span>
                <span>•</span>
                <span>Version 2.4</span>
                <span>•</span>
                <span className="text-sky-600 font-semibold">B2B Trade Compliant</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Main Content Grid ─── */}
        <section className="py-16 md:py-24 bg-slate-50/50">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Quick Navigation Sticky Sidebar (4 cols) */}
              <aside className="lg:col-span-4 sticky top-28 hidden lg:block">
                <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                    Table of Contents
                  </h3>
                  <nav className="space-y-1">
                    {sections.map((sec) => (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        className="block text-xs font-medium text-slate-600 hover:text-sky-600 hover:bg-sky-50 px-3 py-2 rounded-md transition-colors"
                      >
                        {sec.title}
                      </a>
                    ))}
                    <a
                      href="#contact-privacy"
                      className="block text-xs font-medium text-slate-600 hover:text-sky-600 hover:bg-sky-50 px-3 py-2 rounded-md transition-colors"
                    >
                      12. Contact & Data Officer
                    </a>
                  </nav>

                  <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-6 rounded-b-xl">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-sky-600 font-bold block mb-1">
                      SOURCING SUPPORT
                    </span>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      Have questions regarding trade compliance or dossier submission?
                    </p>
                    <Link
                      href="/enquiry"
                      className="block w-full text-center bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white text-xs tracking-wider uppercase font-semibold py-2.5 rounded-md transition-transform duration-150 ease-out active:scale-[0.96] shadow-sm"
                    >
                      Contact Trade Desk
                    </Link>
                  </div>
                </div>
              </aside>

              {/* Policy Body (8 cols) */}
              <div className="lg:col-span-8 space-y-8">
                {sections.map((sec) => {
                  const IconComponent = sec.icon;
                  return (
                    <article
                      key={sec.id}
                      id={sec.id}
                      className="bg-white border border-slate-200 p-8 md:p-10 shadow-sm rounded-xl reveal scroll-mt-28"
                    >
                      <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-100">
                        <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
                          <IconComponent size={20} />
                        </div>
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                          {sec.title}
                        </h2>
                      </div>
                      <div className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        {sec.content}
                      </div>
                    </article>
                  );
                })}

                {/* Section 12: Contact Details */}
                <article
                  id="contact-privacy"
                  className="bg-slate-900 text-slate-100 border border-slate-800 p-8 md:p-10 shadow-xl rounded-xl reveal scroll-mt-28"
                >
                  <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-800">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 text-sky-400 flex items-center justify-center shrink-0 border border-slate-700">
                      <FaEnvelope className="w-5 h-5" />
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      12. Data Protection Officer & Inquiries
                    </h2>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    For any questions, requests for data access, deletion inquiries,
                    or concerns regarding this Privacy Policy and our commercial data
                    protection practices, please contact our designated Data Protection Officer:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <FaEnvelope className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                        <div>
                          <span className="text-[10px] font-mono tracking-wider uppercase text-sky-400 block font-semibold">
                            Official Email
                          </span>
                          <a
                            href="mailto:contact@neolspharma.com"
                            className="text-sm text-white hover:text-sky-400 transition-colors font-medium"
                          >
                            contact@neolspharma.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <FaPhoneVolume className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                        <div>
                          <span className="text-[10px] font-mono tracking-wider uppercase text-sky-400 block font-semibold">
                            Phone / Desk
                          </span>
                          <a
                            href="tel:+914035247813"
                            className="text-sm text-white hover:text-sky-400 transition-colors font-medium block"
                          >
                            040-35247813
                          </a>
                          <a
                            href="tel:+918712443610"
                            className="text-sm text-white hover:text-sky-400 transition-colors font-medium block"
                          >
                            +91 87124 43610
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaLocationDot className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                      <div>
                        <span className="text-[10px] font-mono tracking-wider uppercase text-sky-400 block font-semibold">
                          Registered Office
                        </span>
                        <address className="text-xs text-slate-300 not-italic leading-relaxed">
                          NEO LIFE SCIENCES PVT LTD<br />
                          201-2nd Floor, Above ICICI Bank,<br />
                          Plot 13/A/B Lane 12, MLA Colony,<br />
                          Banjara Hills, Hyderabad – 500034,<br />
                          Telangana, India
                        </address>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
