import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { eventCategories, allEvents } from "../constants/eventsData";
import { Navbar, Footer, FloatingImageGallery, EventTiltCard } from "../components";
import { useTheme } from "../context/ThemeContext";

const EventsPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on mount or if hash present scroll to category
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Show all event categories
  const displayedCategories = eventCategories;

  return (
    <div className="relative z-0 bg-slate-50 text-slate-900 dark:bg-primary dark:text-white transition-colors duration-300 min-h-screen">
      {/* ── Fixed Website Navbar ── */}
      <Navbar />

      {/* ── Top Hero Section with Mouse-Reactive Floating Image Gallery ── */}
      <section className="relative w-full pt-16 flex flex-col justify-between overflow-hidden">
        {/* Navigation Breadcrumb */}
        <div className="relative z-30 pt-6 px-6 sm:px-12 max-w-7xl mx-auto w-full flex items-center justify-start flex-wrap gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-secondary">
            <Link
              to="/"
              className="hover:text-[#1591DC] transition-colors flex items-center gap-1.5 font-medium bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/60 shadow-xs"
            >
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
            <span>/</span>
            <span className="text-[#1591DC] dark:text-[#C4E2F5] font-semibold bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200/60 dark:border-slate-800/60">
              Events Directory
            </span>
          </div>
        </div>

        {/* ── Mouse-Reactive Floating Image Gallery Component ── */}
        <FloatingImageGallery />
      </section>

      {/* ── Category-wise Events Sections ── */}
      <div id="events-list" className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 pt-10 pb-24 space-y-20">
        {displayedCategories.map((category) => {
          const catEvents = allEvents.filter(
            (event) => event.categoryId === category.id
          );

          if (catEvents.length === 0) return null;

          return (
            <section
              key={category.id}
              id={`cat-${category.id}`}
              className="scroll-mt-32"
            >
              {/* Category Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-start gap-3">
                  <span className="text-3xl p-2.5 rounded-2xl bg-blue-100/70 dark:bg-[#1591DC]/15 border border-[#1591DC]/20">
                    {category.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        {category.title}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#1591DC]/15 text-[#1591DC] dark:text-[#C4E2F5]">
                        {catEvents.length}{" "}
                        {catEvents.length === 1 ? "Event" : "Events"}
                      </span>
                    </div>
                    <p className="mt-1 text-slate-500 dark:text-secondary text-xs sm:text-sm max-w-2xl leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid of Event Cards in this Category: 3D Tilt Card with Dynamic Glow */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {catEvents.map((event) => (
                  <EventTiltCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* ── Fixed Footer matching the main website ── */}
      <Footer />
    </div>
  );
};

export default EventsPage;
