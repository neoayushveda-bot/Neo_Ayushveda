"use client";

import React, { useState } from "react";
import { 
  Map, 
  MapArc, 
  MapMarker, 
  MarkerContent, 
  MarkerLabel 
} from "../ui/mapcn-map-arc";

const exportDestinations = [
  // Africa
  { name: "Nairobi", lng: 36.8219, lat: -1.2921, region: "Africa", compliance: "PPB Certified" },
  { name: "Lagos", lng: 3.3792, lat: 6.5244, region: "Africa", compliance: "NAFDAC Registered" },
  { name: "Cairo", lng: 31.2357, lat: 30.0444, region: "Africa", compliance: "EDA Approved" },
  // Asia Pacific
  { name: "Manila", lng: 120.9842, lat: 14.5995, region: "Asia Pacific", compliance: "FDA Compliant" },
  { name: "Jakarta", lng: 106.8456, lat: -6.2088, region: "Asia Pacific", compliance: "BPOM Registered" },
  { name: "Ho Chi Minh City", lng: 106.6297, lat: 10.8231, region: "Asia Pacific", compliance: "DAV Approved" },
  { name: "Colombo", lng: 79.8612, lat: 6.9271, region: "Asia Pacific", compliance: "NMRA Certified" },
  // Middle East
  { name: "Dubai", lng: 55.2708, lat: 25.2048, region: "Middle East", compliance: "MOHAP Registered" },
  { name: "Riyadh", lng: 46.6753, lat: 24.7136, region: "Middle East", compliance: "SFDA Registered" },
  { name: "Doha", lng: 51.5310, lat: 25.2854, region: "Middle East", compliance: "MOPH Compliant" },
  // Europe
  { name: "Frankfurt", lng: 8.6821, lat: 50.1109, region: "Europe", compliance: "BfArM / EMA Ready" },
  { name: "London", lng: -0.1278, lat: 51.5074, region: "Europe", compliance: "MHRA Compliant" },
  // Americas
  { name: "New York", lng: -74.0060, lat: 40.7128, region: "Americas", compliance: "FDA Dossier Support" },
  { name: "São Paulo", lng: -46.6333, lat: -23.5505, region: "Americas", compliance: "ANVISA Compliant" },
  // Central Asia
  { name: "Almaty", lng: 76.8512, lat: 43.2220, region: "Central Asia", compliance: "NDDA Registered" },
  { name: "Tashkent", lng: 69.2401, lat: 41.2995, region: "Central Asia", compliance: "Gulyamov Approved" },
];

const arcs = exportDestinations.map((dest) => ({
  id: dest.name,
  from: [78.4867, 17.3850] as [number, number], // Hyderabad
  to: [dest.lng, dest.lat] as [number, number],
  region: dest.region,
  compliance: dest.compliance,
}));

export default function GlobalReach() {
  const [hoveredArc, setHoveredArc] = useState<{ id: string; region: string; compliance: string } | null>(null);

  return (
    <section id="exports" className="bg-emerald py-28 md:py-36 text-cream relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 reveal">
          <span className="text-gold text-[11px] font-medium tracking-[0.22em] uppercase block mb-3">
            GLOBAL REACH & LOGISTICS
          </span>
          <h2 className="font-playfair text-[40px] md:text-[48px] font-normal leading-tight text-white mb-6">
            Pharma Exports to Every Continent
          </h2>
          <p className="text-cream/65 text-[17px] leading-relaxed">
            From our Hyderabad headquarters, we manage pharmaceutical exports to over 50 countries across six continents, navigating region-specific regulatory frameworks.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-[520px] bg-[#0E2218] border border-white/5 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] mb-20">
          <Map
            center={[30, 20]}
            zoom={1.5}
            projection={{ type: "globe" }}
            theme="dark"
            className="h-full w-full"
          >
            <MapArc
              data={arcs}
              curvature={0.2}
              samples={60}
              paint={{
                "line-color": "#7CB800",
                "line-width": 1.2,
                "line-opacity": 0.55,
                "line-dasharray": [3, 3],
              }}
              hoverPaint={{
                "line-color": "#A4D73B",
                "line-width": 2.5,
                "line-opacity": 0.95,
              }}
              interactive={true}
              onHover={(e) => {
                if (e) {
                  setHoveredArc({
                    id: String(e.arc.id),
                    region: String(e.arc.region),
                    compliance: String(e.arc.compliance),
                  });
                } else {
                  setHoveredArc(null);
                }
              }}
            />

            {/* Hub Marker: Hyderabad */}
            <MapMarker longitude={78.4867} latitude={17.3850}>
              <MarkerContent>
                <div className="relative">
                  <div className="w-3.5 h-3.5 rounded-full bg-gold border-2 border-emerald-mid shadow-[0_0_12px_rgba(201,150,59,0.8)]" />
                  <div className="absolute inset-0 rounded-full bg-gold animate-ping opacity-30" />
                </div>
                <MarkerLabel position="bottom" className="text-[10px] font-semibold bg-emerald/90 text-gold px-2.5 py-1 rounded border border-white/10 whitespace-nowrap mt-1 font-jakarta tracking-wider">
                  HYDERABAD HQ
                </MarkerLabel>
              </MarkerContent>
            </MapMarker>

            {/* Destination Markers */}
            {exportDestinations.map((dest) => (
              <MapMarker key={dest.name} longitude={dest.lng} latitude={dest.lat}>
                <MarkerContent>
                  <div className="w-1.5 h-1.5 rounded-full bg-cream/60 border border-white/40 hover:bg-gold hover:border-gold hover:scale-125 transition-transform duration-200" />
                  <MarkerLabel position="top" className="text-[9px] text-cream/50 font-jakarta">
                    {dest.name}
                  </MarkerLabel>
                </MarkerContent>
              </MapMarker>
            ))}
          </Map>

          {/* Floating Indicator for Hovered Route */}
          {hoveredArc && (
            <div className="absolute top-6 left-6 z-10 bg-emerald-mid/95 backdrop-blur-md border border-gold/30 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all max-w-[280px]">
              <span className="text-gold text-[9px] font-semibold tracking-wider block mb-1 uppercase">ACTIVE EXPORT PATHWAY</span>
              <h4 className="text-white text-base font-semibold font-jakarta mb-1">{hoveredArc.id}</h4>
              <p className="text-cream/60 text-xs mb-2">Region: {hoveredArc.region}</p>
              <div className="border-t border-white/10 pt-2">
                <span className="text-[10px] text-gold-light/90 italic font-medium">{hoveredArc.compliance}</span>
              </div>
            </div>
          )}
        </div>

        {/* Geographic Coverage Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pt-6 border-t border-white/10">
          <div className="reveal delay-100">
            <h4 className="text-[10px] tracking-[0.15em] uppercase text-gold/80 mb-3 font-semibold">Africa</h4>
            <ul className="text-[13px] text-cream/50 leading-relaxed space-y-1.5 font-jakarta">
              <li>Kenya</li>
              <li>Nigeria</li>
              <li>Egypt</li>
              <li>South Africa</li>
              <li className="text-gold/40 text-[11px] pt-1">Compliance: NAFDAC, PPB, EAC</li>
            </ul>
          </div>
          
          <div className="reveal delay-200">
            <h4 className="text-[10px] tracking-[0.15em] uppercase text-gold/80 mb-3 font-semibold">Asia Pacific</h4>
            <ul className="text-[13px] text-cream/50 leading-relaxed space-y-1.5 font-jakarta">
              <li>Philippines</li>
              <li>Indonesia</li>
              <li>Vietnam</li>
              <li>Sri Lanka</li>
              <li className="text-gold/40 text-[11px] pt-1">Compliance: FDA, BPOM, NMRA</li>
            </ul>
          </div>

          <div className="reveal delay-300">
            <h4 className="text-[10px] tracking-[0.15em] uppercase text-gold/80 mb-3 font-semibold">Americas</h4>
            <ul className="text-[13px] text-cream/50 leading-relaxed space-y-1.5 font-jakarta">
              <li>United States</li>
              <li>Brazil</li>
              <li>—</li>
              <li>—</li>
              <li className="text-gold/40 text-[11px] pt-1">Compliance: FDA READY, ANVISA</li>
            </ul>
          </div>

          <div className="reveal delay-400">
            <h4 className="text-[10px] tracking-[0.15em] uppercase text-gold/80 mb-3 font-semibold">Europe</h4>
            <ul className="text-[13px] text-cream/50 leading-relaxed space-y-1.5 font-jakarta">
              <li>Germany</li>
              <li>United Kingdom</li>
              <li>—</li>
              <li>—</li>
              <li className="text-gold/40 text-[11px] pt-1">Compliance: EMA, MHRA</li>
            </ul>
          </div>

          <div className="reveal delay-500">
            <h4 className="text-[10px] tracking-[0.15em] uppercase text-gold/80 mb-3 font-semibold">Middle East</h4>
            <ul className="text-[13px] text-cream/50 leading-relaxed space-y-1.5 font-jakarta">
              <li>U.A.E</li>
              <li>Saudi Arabia</li>
              <li>Qatar</li>
              <li>—</li>
              <li className="text-gold/40 text-[11px] pt-1">Compliance: MOHAP, SFDA</li>
            </ul>
          </div>

          <div className="reveal delay-600">
            <h4 className="text-[10px] tracking-[0.15em] uppercase text-gold/80 mb-3 font-semibold">Central Asia</h4>
            <ul className="text-[13px] text-cream/50 leading-relaxed space-y-1.5 font-jakarta">
              <li>Kazakhstan</li>
              <li>Uzbekistan</li>
              <li>—</li>
              <li>—</li>
              <li className="text-gold/40 text-[11px] pt-1">Compliance: NDDA, Gulyamov</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
