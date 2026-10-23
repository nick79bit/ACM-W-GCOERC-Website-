import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { allEvents, eventCategories } from "../constants/eventsData";
import { Navbar, Footer } from "../components";

const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  // Find current event from events data
  const normalizedEventId = decodeURIComponent(eventId || "").toLowerCase();
  const event =
    allEvents.find(
      (e) =>
        e.id === eventId ||
        e.id.toLowerCase() === normalizedEventId ||
        e.id.toLowerCase().replace(/\s+/g, "-") === normalizedEventId.replace(/\s+/g, "-") ||
        (normalizedEventId === "social-activities-drive" && e.id === "tree-plantation-drive") ||
        (normalizedEventId === "post-visarjan-cleanup" && e.id === "post-visarjan-cleanup-drive") ||
        (normalizedEventId === "techspark" && e.id === "TechSpark 2026") ||
        (normalizedEventId === "ai-for-earth" && e.id === "AI for Earth and Sustainability")
    ) || allEvents[0];

  // Find related events in same category (excluding current event)
  const relatedEvents = allEvents
    .filter((e) => e.categoryId === event.categoryId && e.id !== event.id)
    .slice(0, 3);

  // Scroll to top when event detail page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [eventId]);

  // Close image lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative z-0 bg-slate-50 text-slate-900 dark:bg-primary dark:text-white transition-colors duration-300 min-h-screen">
      {/* ── Fixed Website Navbar ── */}
      <Navbar />

      <main className="pt-28 pb-20 sm:pt-36 sm:pb-24 px-6 sm:px-12 max-w-7xl mx-auto">
        {/* ── Breadcrumb & Back Navigation ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-secondary">
            <Link
              to="/"
              className="hover:text-[#1591DC] transition-colors font-medium"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              to="/events"
              className="hover:text-[#1591DC] transition-colors font-medium"
            >
              Events
            </Link>
            <span>/</span>
            <span className="text-[#1591DC] dark:text-[#C4E2F5] font-semibold truncate max-w-[200px] sm:max-w-none">
              {event.title}
            </span>
          </div>

          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-[#0f1f38] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-[#1591DC] hover:text-[#1591DC] transition-all shadow-sm"
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
            Back to All Events
          </Link>
        </div>

        {/* ── Event Title & Header Info ── */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1591DC] text-white">
              {event.categoryTitle}
            </span>
            {event.badge && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2C5EAD]/15 text-[#2C5EAD] dark:text-[#C4E2F5] border border-[#2C5EAD]/30">
                {event.badge}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {event.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-secondary max-w-4xl leading-relaxed">
            {event.shortDescription}
          </p>

          {/* Quick Info Strip */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1.5 bg-white dark:bg-[#0f1f38] px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[#1591DC]">📅</span> {event.date}
            </span>
            <span className="flex items-center gap-1.5 bg-white dark:bg-[#0f1f38] px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[#1591DC]">📍</span> {event.venue}
            </span>
            {event.attendees && (
              <span className="flex items-center gap-1.5 bg-white dark:bg-[#0f1f38] px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-[#1591DC]">👥</span> {event.attendees}
              </span>
            )}
          </div>
        </div>

        {/* ── Main Event Photo Showcase ── */}
        <div className="mt-8 rounded-3xl overflow-hidden border border-slate-200 dark:border-[#1e3a5f] shadow-lg">
          <div className="w-full min-h-[320px] sm:h-[480px] md:h-[560px] bg-slate-950 flex items-center justify-center relative overflow-hidden">
            {event.image ? (
              <>
                {/* Ambient blurred backdrop so wide/tall photos blend seamlessly without empty bars */}
                <img
                  src={event.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-40 scale-110 pointer-events-none"
                  aria-hidden="true"
                />
                {/* Crisp foreground photo preserving entire group and all faces */}
                <img
                  src={event.image}
                  alt={event.title}
                  onClick={() => setSelectedImage(event.image)}
                  className="relative z-10 w-full h-full object-contain max-h-[560px] p-1.5 sm:p-3 cursor-zoom-in"
                />
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 text-center px-4 opacity-50 hover:opacity-80 transition-opacity">
                <div className="p-4 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-sm border border-[#1591DC]/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 text-[#1591DC]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 4.5h18A1.5 1.5 0 0122.5 6v12A1.5 1.5 0 0121 19.5H3A1.5 1.5 0 011.5 18V6A1.5 1.5 0 013 4.5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold text-[#1591DC] dark:text-[#C4E2F5]">
                    Event Main Photo Showcase
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Space reserved for event group photo &amp; banner
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Content Grid: Main Details & Sidebar ── */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Full Event Information (2 spans) */}
          <div className="lg:col-span-2 space-y-12">
            {/* About the Event Section */}
            <section className="bg-white dark:bg-[#0f1f38] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-[#1e3a5f] shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-[#1591DC]">📖</span> About this Event
              </h2>
              <div className="mt-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                <p>{event.fullDescription}</p>
              </div>
            </section>

            {/* Key Highlights & Takeaways */}
            {event.highlights && event.highlights.length > 0 && (
              <section className="bg-white dark:bg-[#0f1f38] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-[#1e3a5f] shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-[#1591DC]"></span> Key Highlights &amp;
                  Outcomes
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-3.5">
                  {event.highlights.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#122440] border border-slate-100 dark:border-slate-800"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#1591DC] text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">

                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}


            {/* Event Glimpses / Moments Photo Gallery */}
            <section className="bg-white dark:bg-[#0f1f38] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-[#1e3a5f] shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-[#1591DC]">📸</span>
                  Moments
                </h2>
                {event.gallery?.filter(Boolean).length > 0 && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#1591DC]/10 text-[#1591DC] dark:bg-[#1591DC]/20 border border-[#1591DC]/30">
                    {event.gallery.filter(Boolean).length} Photos
                  </span>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
                {(event.gallery && event.gallery.length > 0
                  ? event.gallery
                  : [null, null, null]
                ).map((photo, idx) =>
                  photo ? (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage(photo)}
                      className="group relative h-48 sm:h-52 rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1e3a5f] bg-slate-950 cursor-zoom-in shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      {/* Ambient blur background */}
                      <img
                        src={photo}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover filter blur-lg opacity-35 scale-110 pointer-events-none"
                        aria-hidden="true"
                      />
                      {/* Crisp photo */}
                      <img
                        src={photo}
                        alt={`${event.title} Moment ${idx + 1}`}
                        className="relative z-10 w-full h-full object-contain max-h-52 p-1 group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3 pointer-events-none">
                        <span className="text-white text-xs font-medium flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-[#1591DC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                          View Full
                        </span>
                        <span className="text-[11px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-white font-medium">
                          #{idx + 1}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={idx}
                      className="h-44 sm:h-52 rounded-2xl bg-gradient-to-br from-[#C4E2F5]/40 to-[#1591DC]/15 dark:from-[#11223b] dark:to-[#1a365d] border border-dashed border-[#1591DC]/30 flex flex-col items-center justify-center p-2 text-center group hover:border-[#1591DC] transition-colors"
                    >
                      <svg
                        className="w-7 h-7 text-[#1591DC] opacity-50 group-hover:opacity-90 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                        Photo {idx + 1}
                      </span>
                    </div>
                  )
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Quick Snapshot Sidebar (1 span) */}
          <div className="space-y-6">
            {/* Snapshot Card */}
            <div className="bg-white dark:bg-[#0f1f38] p-6 rounded-3xl border border-slate-200 dark:border-[#1e3a5f] shadow-sm sticky top-28">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800">
                📋 Event Snapshot
              </h3>

              <div className="mt-4 space-y-3.5 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[11px] font-semibold uppercase">
                    Category
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    {event.categoryTitle}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[11px] font-semibold uppercase">
                    Date
                  </span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {event.date}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[11px] font-semibold uppercase">
                    Location
                  </span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {event.venue}
                  </span>
                </div>


              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
                <Link
                  to="/events"
                  className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#2C5EAD] to-[#1591DC] hover:from-[#1591DC] hover:to-[#2C5EAD] text-white text-center shadow-md flex items-center justify-center gap-1.5 transition-all"
                >
                  Explore More Events →
                </Link>

                <Link
                  to="/#contact"
                  className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-center flex items-center justify-center gap-1.5 transition-all"
                >
                  Contact ACM-W Team
                </Link>
              </div>
            </div>

            {/* Related Events Card */}
            {relatedEvents.length > 0 && (
              <div className="bg-white dark:bg-[#0f1f38] p-6 rounded-3xl border border-slate-200 dark:border-[#1e3a5f] shadow-sm">
                <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800">
                  More in {event.categoryTitle}
                </h3>
                <div className="mt-4 space-y-3">
                  {relatedEvents.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => navigate(`/events/${rel.id}`)}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#122440] dark:hover:bg-[#162d4e] border border-slate-200 dark:border-slate-800 cursor-pointer transition-colors"
                    >
                      <h5 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-[#1591DC] line-clamp-1">
                        {rel.title}
                      </h5>
                      <span className="text-[11px] text-slate-400 dark:text-slate-400 mt-1 block">
                        📅 {rel.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── High-Resolution Photo Lightbox Modal ── */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50 border border-white/20"
              aria-label="Close image modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div
              className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Event Moment Full"
                className="w-full h-full max-h-[85vh] object-contain rounded-2xl"
              />
            </div>
          </div>
        )}
      </main>

      {/* ── Fixed Footer matching the main website ── */}
      <Footer />
    </div>
  );
};

export default EventDetailPage;
