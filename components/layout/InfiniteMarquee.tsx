"use client";

import React from "react";
import { Calendar, ShieldCheck, FileCheck, MapPin } from "lucide-react";

export default function InfiniteMarquee() {
  const marqueeItems = [
    {
      type: "event",
      label: "MEET US AT iPHEX 2026",
      detail: "7th – 9th Sept 2026 | Hall 3, Stall 3FC-07",
      highlight: true,
    },
    {
      type: "badge",
      label: "REGULATORY COMPLIANCE",
      detail: "WHO-GMP • EU-GMP • US FDA • PIC/S Certified Sourcing",
    },
    {
      type: "service",
      label: "CTD DOSSIERS & EXPORTS",
      detail: "Product Registration & International Trade Documentation",
    },
    {
      type: "portfolio",
      label: "SPECIALIST PORTFOLIO",
      detail: "APIs • Finished Formulations (Oral) • Injectables • Branded Generics • Ayush • Medical Devices",
    },
    {
      type: "entity",
      label: "NEO LIFE SCIENCES PVT. LTD.",
      detail: "(Formerly Neo Ayushveda Pvt Ltd) — Sourcing & Export Partner",
    },
  ];

  return (
    <div className="w-full bg-emerald py-3.5 overflow-hidden border-y border-gold/20 relative z-20 shadow-lg font-jakarta">
      <div className="animate-marquee select-none flex items-center gap-6">
        {[...Array(4)].map((_, loopIdx) => (
          <React.Fragment key={loopIdx}>
            {marqueeItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 shrink-0 px-2">
                {item.highlight ? (
                  <div className="flex items-center gap-2 bg-gold/20 border border-gold/40 px-3.5 py-1 rounded-full text-gold">
                    <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span className="text-[11px] font-extrabold tracking-wider uppercase text-gold">
                      {item.label}:
                    </span>
                    <span className="text-[11px] font-bold text-white">
                      {item.detail}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-cream/80">
                    <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-gold">
                      {item.label}:
                    </span>
                    <span className="text-[11px] font-medium text-cream/75">
                      {item.detail}
                    </span>
                  </div>
                )}
                <span className="text-gold/30 text-[10px] ml-3">◆</span>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
