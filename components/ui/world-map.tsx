"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  className?: string;
}

interface DestinationPin {
  x: number;
  y: number;
  label?: string;
}

export function WorldMap({
  dots = [],
  lineColor = "#003A95",
  className = "",
}: MapProps) {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  // SVG grid dimensions for height 80 (width is 158)
  const svgWidth = 158;
  const svgHeight = 80;

  // Initialize DottedMap with high-density diagonal grid
  const { mapPoints, originPin, destPins } = useMemo(() => {
    const map = new DottedMap({ height: 80, grid: "diagonal" });
    const rawPoints = map.getPoints();

    const originRaw = dots[0]
      ? map.getPin({ lat: dots[0].start.lat, lng: dots[0].start.lng })
      : null;

    const origin: { x: number; y: number } = originRaw
      ? { x: originRaw.x, y: originRaw.y }
      : { x: 115.5, y: 39.84 };

    const destinations: DestinationPin[] = [];
    for (const d of dots) {
      const pin = map.getPin({ lat: d.end.lat, lng: d.end.lng });
      if (pin) {
        destinations.push({
          x: pin.x,
          y: pin.y,
          label: d.end.label,
        });
      }
    }

    return {
      mapPoints: rawPoints,
      originPin: origin,
      destPins: destinations,
    };
  }, [dots]);

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    // Calculate arc height based on distance
    const dist = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
    const curveOffset = Math.min(Math.max(dist * 0.22, 6), 18);
    const midY = Math.min(start.y, end.y) - curveOffset;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div
      className={`w-full bg-gradient-to-b from-slate-50/90 via-white to-white rounded-2xl relative font-sans overflow-hidden border border-slate-200/90 shadow-[0_8px_30px_rgba(15,23,42,0.06)] p-2.5 sm:p-4 ${className}`}
    >
      {/* Top Mobile-Optimized Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 px-2 pt-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7CB800] animate-pulse shrink-0" />
          <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
            Origin Hub: Hyderabad, Telangana, India
          </span>
          <span className="text-[10px] font-mono text-slate-400 hidden md:inline">
            (17.38° N, 78.48° E)
          </span>
        </div>
        <div className="inline-flex items-center gap-1.5 self-start sm:self-auto bg-sky-50 border border-sky-200/80 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold text-sky-700">
          <span className="w-1.5 h-1.5 rounded-full bg-[#003A95]" />
          <span>Active B2B Export Corridors</span>
        </div>
      </div>

      {/* Unified Vector Map */}
      <div className="relative w-full aspect-[158/80]">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full select-none"
          style={{ shapeRendering: "geometricPrecision" }}
        >
          <defs>
            <linearGradient id="pharma-route-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#003A95" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#003A95" stopOpacity="0.90" />
              <stop offset="100%" stopColor="#7CB800" stopOpacity="0.6" />
            </linearGradient>
            <clipPath id="neo-logo-circle-clip">
              <circle cx={originPin.x} cy={originPin.y} r="1.6" />
            </clipPath>
          </defs>

          {/* Dotted Map Base Layer */}
          <g className="map-dots-layer">
            {mapPoints.map((point, index) => (
              <circle
                key={`dot-${index}`}
                cx={point.x}
                cy={point.y}
                r="0.26"
                className="fill-slate-300/80"
              />
            ))}
          </g>

          {/* Animated Connecting Bezier Arcs from Hyderabad */}
          <g className="routes-layer">
            {destPins.map((dest, i) => (
              <motion.path
                key={`arc-${i}`}
                d={createCurvedPath(originPin, dest)}
                fill="none"
                stroke="url(#pharma-route-grad)"
                strokeWidth="0.35"
                strokeDasharray="0.8 0.6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.85 }}
                transition={{
                  duration: 1.2,
                  delay: 0.1 + 0.06 * i,
                  ease: "easeOut",
                }}
              />
            ))}
          </g>

          {/* Destination Nodes */}
          <g className="destinations-layer">
            {destPins.map((dest, i) => {
              const isHovered = hoveredPoint === dest.label;
              return (
                <g
                  key={`dest-node-${i}`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(dest.label || null)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  {/* Pulsing ring */}
                  <circle
                    cx={dest.x}
                    cy={dest.y}
                    r="0.6"
                    fill="#003A95"
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      from="0.6"
                      to="2.2"
                      dur="2.4s"
                      begin={`${(i * 0.15) % 2}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.6"
                      to="0"
                      dur="2.4s"
                      begin={`${(i * 0.15) % 2}s`}
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Core Node */}
                  <circle
                    cx={dest.x}
                    cy={dest.y}
                    r={isHovered ? "0.9" : "0.55"}
                    fill={isHovered ? "#002D75" : "#003A95"}
                  />
                </g>
              );
            })}
          </g>

          {/* Central Origin Node: Hyderabad, India with Neo Logo Circle */}
          <g key="origin-hyderabad-node">
            {/* Outward Radar Waves */}
            <circle
              cx={originPin.x}
              cy={originPin.y}
              r="1.4"
              fill="#7CB800"
              opacity="0.6"
            >
              <animate
                attributeName="r"
                from="1.4"
                to="4.8"
                dur="2.2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.6"
                to="0"
                dur="2.2s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Circular White Badge with Blue Border */}
            <circle
              cx={originPin.x}
              cy={originPin.y}
              r="1.6"
              fill="#ffffff"
              stroke="#003A95"
              strokeWidth="0.3"
            />

            {/* Embedded Neo Logo clipped to circle */}
            <image
              href="/images/neo-logo.png"
              x={originPin.x - 1.3}
              y={originPin.y - 0.9}
              width="2.6"
              height="1.8"
              preserveAspectRatio="xMidYMid meet"
              clipPath="url(#neo-logo-circle-clip)"
            />

            {/* Subtle Outer Green Ring */}
            <circle
              cx={originPin.x}
              cy={originPin.y}
              r="1.6"
              fill="none"
              stroke="#7CB800"
              strokeWidth="0.15"
              strokeDasharray="0.6 0.3"
            />

            {/* Prominent Badge */}
            <g transform={`translate(${originPin.x}, ${originPin.y + 2.3})`}>
              <rect
                x="-12"
                y="0"
                width="24"
                height="3.6"
                rx="0.8"
                fill="#00183E"
              />
              <text
                x="0"
                y="2.5"
                textAnchor="middle"
                className="fill-[#A4D73B] text-[1.8px] font-mono font-bold tracking-wider uppercase select-none pointer-events-none"
              >
                ★ HYDERABAD, INDIA
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Bottom Sub-Caption on Mobile */}
      <div className="mt-2 text-center sm:text-left px-2 text-[10px] text-slate-500 font-mono flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2">
        <span>Exporting to 50+ sovereign healthcare markets across Europe, Americas, Middle East, Africa & Asia-Pacific.</span>
        <span className="text-[#003A95] font-semibold">WHO-GMP & CTD Ready</span>
      </div>
    </div>
  );
}
