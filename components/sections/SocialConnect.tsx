"use client";

import React from "react";
import {
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

export const SOCIAL_CHANNELS = [
  {
    name: "X",
    displayName: "X (Twitter)",
    handle: "@NeoLifeSciences",
    href: "https://x.com/NeoLifeSciences",
    icon: FaXTwitter,
    ariaLabel: "Follow Neo Life Sciences on X",
    iconBg: "bg-black text-white",
    hoverBorder: "hover:border-slate-800",
    hoverShadow: "hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)]",
    actionText: "Follow",
  },
  {
    name: "LinkedIn",
    displayName: "LinkedIn",
    handle: "Neo Life Sciences",
    href: "https://www.linkedin.com/company/neo-life-sciences/?viewAsMember=true",
    icon: FaLinkedinIn,
    ariaLabel: "Connect with Neo Life Sciences on LinkedIn",
    iconBg: "bg-[#0A66C2] text-white",
    hoverBorder: "hover:border-[#0A66C2]",
    hoverShadow: "hover:shadow-[0_10px_24px_rgba(10,102,194,0.18)]",
    actionText: "Connect",
  },
  {
    name: "Instagram",
    displayName: "Instagram",
    handle: "@neolifesciencepvt.ltd",
    href: "https://www.instagram.com/neolifesciencepvt.ltd?dlrf=MXVqZ2F6dDlhcXEyNQ==",
    icon: FaInstagram,
    ariaLabel: "Follow Neo Life Sciences on Instagram",
    iconBg: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white",
    hoverBorder: "hover:border-[#dc2743]",
    hoverShadow: "hover:shadow-[0_10px_24px_rgba(220,39,67,0.2)]",
    actionText: "Follow",
  },
  {
    name: "Facebook",
    displayName: "Facebook",
    handle: "Neo Life Sciences",
    href: "https://www.facebook.com/NeoLifeSciencesPL",
    icon: FaFacebookF,
    ariaLabel: "Follow Neo Life Sciences on Facebook",
    iconBg: "bg-[#1877F2] text-white",
    hoverBorder: "hover:border-[#1877F2]",
    hoverShadow: "hover:shadow-[0_10px_24px_rgba(24,119,242,0.18)]",
    actionText: "Follow",
  },
];

export default function SocialConnect() {
  return (
    <div className="mt-12 pt-10 border-t border-slate-200/90 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200/80 rounded-full px-3 py-1 mb-2">
            <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.16em] uppercase text-sky-800 font-semibold">
              OFFICIAL CHANNELS
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
            Connect With Us
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg md:text-right leading-relaxed font-sans">
          Follow Neo Life Sciences on our verified social networks for international pharmaceutical trade insights, global tender updates, and regulatory announcements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SOCIAL_CHANNELS.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.ariaLabel}
              className={`bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center justify-between gap-3.5 transition-all duration-200 hover:-translate-y-1 shadow-2xs ${item.hoverBorder} ${item.hoverShadow} group`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors truncate font-sans">
                    {item.displayName}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 truncate">
                    {item.handle}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 group-hover:text-sky-600 transition-colors shrink-0">
                <span className="hidden sm:inline font-semibold">{item.actionText}</span>
                <FaArrowUpRightFromSquare className="w-3.5 h-3.5" />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
