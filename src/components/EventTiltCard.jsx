import React, { useState, useRef } from "react";
import Tilt from "react-tilt";
import { useNavigate } from "react-router-dom";

/**
 * 3D Tilt Card with Dynamic Glow
 * Interactive card with cursor-tracking dynamic radial glow and 3D tilt physics.
 */
const EventTiltCard = ({ event }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Tilt
      options={{
        max: 15,
        scale: 1.025,
        speed: 450,
      }}
      className="w-full h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate(`/events/${event.id}`)}
        className="group relative w-full h-full rounded-2xl cursor-pointer select-none transition-all duration-300"
      >
        {/* ── Dynamic Ambient Aura Glow (Behind Card) ── */}
        <div
          className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#1591DC]/40 via-[#2C5EAD]/30 to-[#C4E2F5]/40 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none"
        />

        {/* ── Dynamic Cursor-Following Radial Glow ── */}
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: isHovered
              ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(21, 145, 220, 0.5), transparent 75%)`
              : "none",
          }}
        />

        {/* ── Main Card Body ── */}
        <div className="relative z-10 w-full h-full bg-white dark:bg-[#0f1f38] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-[#1e3a5f] group-hover:border-[#1591DC]/70 shadow-sm group-hover:shadow-[0_20px_45px_rgba(21,145,220,0.25)] flex flex-col justify-between transition-all duration-300">
          
          {/* Subtle cursor shine reflection on card surface */}
          <div
            className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: isHovered
                ? `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.12), transparent 75%)`
                : "none",
            }}
          />

          {/* ── Top Photo Area ── */}
          <div className="relative w-full h-[200px] bg-gradient-to-br from-[#C4E2F5]/50 to-[#1591DC]/20 dark:from-[#11223b] dark:to-[#2C5EAD]/20 flex items-center justify-center border-b border-slate-200/60 dark:border-[#1e3a5f]/80 overflow-hidden">
            {event.image ? (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover object-[center_35%] group-hover:scale-108 transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 opacity-40 group-hover:opacity-75 transition-opacity duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-[#1591DC]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 4.5h18A1.5 1.5 0 0122.5 6v12A1.5 1.5 0 0121 19.5H3A1.5 1.5 0 011.5 18V6A1.5 1.5 0 013 4.5z"
                  />
                </svg>
                <span className="text-[11px] text-[#1591DC] font-medium tracking-wide">
                  Event Photo Placeholder
                </span>
              </div>
            )}

            {/* Subtle dark gradient overlay on photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Badges */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#1591DC] text-white shadow-sm border border-white/20">
                {event.badge || "ACM-W"}
              </span>
            </div>
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/65 backdrop-blur-md text-white border border-white/10">
                {event.date}
              </span>
            </div>
          </div>

          {/* ── Content Details ── */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#1591DC] transition-colors duration-200 leading-snug line-clamp-2">
                {event.title}
              </h3>
              <p className="mt-2.5 text-slate-500 dark:text-secondary text-xs sm:text-[13px] leading-relaxed line-clamp-3">
                {event.shortDescription}
              </p>

              {/* Metadata Pills */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-200/50 dark:border-slate-700/50">
                  📍 {event.venue?.split(",")[0] || "GCOERC"}
                </span>
                {event.attendees && (
                  <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-200/50 dark:border-slate-700/50">
                    👥 {event.attendees}
                  </span>
                )}
              </div>
            </div>

            {/* ── Interactive CTA Bar ── */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#1591DC] dark:text-[#C4E2F5] group-hover:text-[#2C5EAD] dark:group-hover:text-white transition-colors duration-200">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1591DC] group-hover:scale-150 transition-transform duration-300"></span>
                <span>Click to view details</span>
              </span>
              <span className="inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-200">
                Details
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default EventTiltCard;
