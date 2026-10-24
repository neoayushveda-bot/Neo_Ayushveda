"use client";

import React from "react";
import {
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa6";

const SOCIAL_CHANNELS = [
  {
    name: "X",
    href: "https://x.com/NeoLifeSciences",
    icon: FaXTwitter,
    ariaLabel: "Follow Neo Life Sciences on X",
    iconBg: "bg-black text-white",
    hoverBorder: "hover:border-slate-800",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/neo-life-sciences/?viewAsMember=true",
    icon: FaLinkedinIn,
    ariaLabel: "Connect with Neo Life Sciences on LinkedIn",
    iconBg: "bg-[#0A66C2] text-white",
    hoverBorder: "hover:border-[#0A66C2]",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/neolifesciencepvt.ltd?dlrf=MXVqZ2F6dDlhcXEyNQ==",
    icon: FaInstagram,
    ariaLabel: "Follow Neo Life Sciences on Instagram",
    iconBg: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white",
    hoverBorder: "hover:border-pink-500",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/NeoLifeSciencesPL",
    icon: FaFacebookF,
    ariaLabel: "Follow Neo Life Sciences on Facebook",
    iconBg: "bg-[#1877F2] text-white",
    hoverBorder: "hover:border-[#1877F2]",
  },
];

export default function SocialConnect() {
  return (
    <div className="mt-3.5 p-3 sm:px-4 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-wrap items-center justify-between gap-2.5 shadow-2xs">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse" />
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-800">
          Connect With Us:
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {SOCIAL_CHANNELS.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.ariaLabel}
              title={`Neo Life Sciences on ${item.name}`}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 ${item.hoverBorder} transition-all duration-150 hover:-translate-y-0.5 shadow-2xs hover:shadow-xs group`}
            >
              <span
                className={`w-5 h-5 rounded ${item.iconBg} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-150`}
              >
                <Icon className="w-3 h-3" />
              </span>
              <span>{item.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
