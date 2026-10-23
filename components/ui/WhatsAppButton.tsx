"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa6";

const WHATSAPP_URL =
  "https://wa.me/8712443607?text=Hi,%20I%20would%20like%20to%20enquire%20about%20";

export default function WhatsAppButton() {
  return (
    <aside aria-label="WhatsApp Quick Contact">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Neo Life Sciences on WhatsApp"
        className="fixed bottom-6 right-6 z-50 group flex items-center focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 rounded-full"
      >
        {/* Subtle breathing ripple */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none"
          aria-hidden="true"
        />

        {/* Floating WhatsApp Action Button */}
        <div className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/40 transition-all duration-300 group-hover:scale-110 active:scale-95 border-2 border-white/20">
          <FaWhatsapp className="w-8 h-8 drop-shadow-sm" />
        </div>

        {/* Hover Tooltip Card (positioned to the left of the button) */}
        <div
          role="tooltip"
          className="pointer-events-none absolute right-full mr-3.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-1 group-hover:translate-x-0 hidden sm:flex items-center gap-2 px-3.5 py-2 bg-slate-900/95 text-white text-xs font-medium rounded-xl shadow-2xl border border-slate-700/80 whitespace-nowrap backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>Quick Enquiry on WhatsApp</span>
          {/* Tooltip arrow pointing right towards the button */}
          <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 border-r border-t border-slate-700/80 transform rotate-45" />
        </div>
      </a>
    </aside>
  );
}
