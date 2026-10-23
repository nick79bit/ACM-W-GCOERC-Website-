import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  eventGallery1,
  eventGallery2,
  eventGallery3,
  eventGallery4,
  eventGallery5,
} from "../assets/events";

export const galleryItems = [
  {
    id: "milestone-2026",
    title: "Annual Chapter Convocation & 2026 Milestone",
    subtitle: "Faculty, Mentors & Chapter Members celebrating another milestone year",
    category: "Flagship Celebrations",
    badge: "Milestone 2026",
    venue: "Main Auditorium, GCOERC",
    image: eventGallery1,
    orientation: "landscape",
    aspect: "aspect-[4/3]",
    sizeClass: "w-[240px] sm:w-[280px] md:w-[320px] lg:w-[340px]",
    // Parallax configuration:
    depthX: 24,
    depthY: 20,
    baseRotate: -1.5,
    tilt: 7,
    desktopPos: { left: "50%", top: "54%", translate: "-50%, -50%" },
    floatDuration: 5.5,
  },
  {
    id: "inauguration",
    title: "GCOERC ACM-W Student Chapter Inauguration",
    subtitle: "Official rollout empowering women in technology with dignitaries on stage",
    category: "Chapter Milestones",
    badge: "Inauguration Ceremony",
    venue: "Seminar Hall & Stage",
    image: eventGallery3,
    orientation: "landscape",
    aspect: "aspect-[16/10]",
    sizeClass: "w-[200px] sm:w-[240px] md:w-[270px] lg:w-[300px]",
    depthX: 42,
    depthY: 30,
    baseRotate: -4,
    tilt: 11,
    desktopPos: { left: "18%", top: "30%", translate: "-50%, -50%" },
    floatDuration: 4.8,
  },
  {
    id: "innovation-award",
    title: "Project Exhibition & Innovation Accolade",
    subtitle: "Students presenting engineering project & receiving honor of excellence",
    category: "Hackathons & Contests",
    badge: "Innovation Award",
    venue: "Innovation Expo Center",
    image: eventGallery2,
    orientation: "portrait",
    aspect: "aspect-[3/4]",
    sizeClass: "w-[170px] sm:w-[200px] md:w-[220px] lg:w-[240px]",
    depthX: 48,
    depthY: 34,
    baseRotate: 4.5,
    tilt: 12,
    desktopPos: { left: "82%", top: "34%", translate: "-50%, -50%" },
    floatDuration: 5.2,
  },
  {
    id: "river-cleanliness",
    title: "Godavari Ghat Cleanliness & Nirmalya Collection",
    subtitle: "Eco-friendly festival river conservation drive by student volunteers",
    category: "Community Outreach",
    badge: "River Conservation",
    venue: "Godavari River Ghats, Nashik",
    image: eventGallery5,
    orientation: "landscape",
    aspect: "aspect-[4/3]",
    sizeClass: "w-[200px] sm:w-[230px] md:w-[260px] lg:w-[290px]",
    depthX: 36,
    depthY: 28,
    baseRotate: 3,
    tilt: 9,
    desktopPos: { left: "22%", top: "74%", translate: "-50%, -50%" },
    floatDuration: 6.0,
  },
  {
    id: "tree-plantation",
    title: "Tree Plantation & Sustainability Drive",
    subtitle: "Green campus initiative and environmental conservation at Khambale",
    category: "Community Outreach",
    badge: "Eco-Drive",
    venue: "Khambale, Maharashtra",
    image: eventGallery4,
    orientation: "landscape",
    aspect: "aspect-[4/3]",
    sizeClass: "w-[200px] sm:w-[230px] md:w-[260px] lg:w-[290px]",
    depthX: 38,
    depthY: 26,
    baseRotate: -3.5,
    tilt: 10,
    desktopPos: { left: "78%", top: "72%", translate: "-50%, -50%" },
    floatDuration: 4.4,
  },
];

// Single floating interactive card
const FloatingCard = ({
  item,
  index,
  mouseX,
  mouseY,
  activeHover,
  setActiveHover,
  onSelectPhoto,
}) => {
  const isHovered = activeHover === index;
  const isOtherHovered = activeHover !== null && !isHovered;

  // Parallax motion values based on mouse coordinates (-1 to 1)
  const x = useTransform(mouseX, [-1, 1], [-item.depthX, item.depthX]);
  const y = useTransform(mouseY, [-1, 1], [-item.depthY, item.depthY]);
  const rotX = useTransform(mouseY, [-1, 1], [item.tilt, -item.tilt]);
  const rotY = useTransform(mouseX, [-1, 1], [-item.tilt, item.tilt]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: item.desktopPos.left,
        top: item.desktopPos.top,
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        zIndex: isHovered ? 40 : 10 + index,
      }}
      className={`cursor-pointer select-none transition-all duration-300 ${item.sizeClass}`}
      onMouseEnter={() => setActiveHover(index)}
      onMouseLeave={() => setActiveHover(null)}
      onClick={() => onSelectPhoto(index)}
      whileTap={{ scale: 0.96 }}
    >
      {/* 3D tilt + gentle floating oscillation wrapper */}
      <motion.div
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformPerspective: 1000,
        }}
        animate={{
          y: isHovered ? 0 : [0, -10, 0],
          rotate: isHovered ? 0 : [item.baseRotate, item.baseRotate + 1, item.baseRotate],
        }}
        transition={{
          duration: item.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`group relative rounded-2xl md:rounded-3xl p-1.5 sm:p-2 transition-all duration-500 ${isHovered
            ? "scale-105 shadow-[0_25px_60px_rgba(21,145,220,0.45)] ring-2 ring-[#1591DC]"
            : isOtherHovered
              ? "opacity-75 filter blur-[0.3px] scale-95"
              : "shadow-[0_16px_40px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:shadow-[0_20px_45px_rgba(21,145,220,0.3)]"
          } bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/50 dark:border-white/10`}
      >
        {/* Glow ambient background aura */}
        <div
          className={`absolute -inset-1 rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#1591DC]/40 via-[#2C5EAD]/30 to-[#C4E2F5]/40 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none`}
        />

        {/* Image Frame */}
        <div className={`relative w-full overflow-hidden rounded-xl md:rounded-2xl ${item.aspect} bg-slate-200 dark:bg-slate-800`}>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            loading="eager"
          />

          {/* Vignette / gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

          {/* Top Badge */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
            <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold bg-[#1591DC]/90 backdrop-blur-md text-white shadow-sm border border-white/20">
              {item.badge}
            </span>
            <span className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/90 group-hover:bg-[#1591DC] transition-colors duration-300">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </span>
          </div>

          {/* Bottom Card Title & Subtitle */}
          <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 text-left transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-[10px] text-[#C4E2F5] font-medium tracking-wide uppercase">
              {item.category}
            </p>
            <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1 drop-shadow-sm">
              {item.title}
            </h4>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>Click to expand &amp; inspect</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Fullscreen Lightbox Modal
const PhotoLightbox = ({ selectedIndex, onClose, onNext, onPrev, onSelect }) => {
  if (selectedIndex === null) return null;
  const photo = galleryItems[selectedIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-7 sm:right-7 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors border border-white/20 focus:outline-none"
          aria-label="Close photo preview"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Prev Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-3 sm:left-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors border border-white/20 focus:outline-none"
          aria-label="Previous photo"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-3 sm:right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors border border-white/20 focus:outline-none"
          aria-label="Next photo"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Modal Content Box */}
        <motion.div
          key={photo.id}
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl w-full max-h-[90vh] flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.85)]"
        >
          {/* Main Photo Area */}
          <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden max-h-[64vh]">
            <img
              src={photo.image}
              alt={photo.title}
              className="w-full h-full object-contain max-h-[64vh]"
            />
          </div>

          {/* Details Bar */}
          <div className="p-4 sm:p-6 bg-slate-900/95 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#1591DC] text-white">
                  {photo.badge}
                </span>
                <span className="text-xs text-[#C4E2F5] font-medium">
                  {photo.category}
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-white">
                {photo.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {photo.subtitle} &bull; 📍 {photo.venue}
              </p>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-2 shrink-0">
              {galleryItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(idx)}
                  className={`relative w-12 h-10 sm:w-14 sm:h-11 rounded-lg overflow-hidden border-2 transition-all ${idx === selectedIndex
                      ? "border-[#1591DC] scale-105 shadow-md ring-2 ring-[#1591DC]/50"
                      : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                >
                  <img
                    src={item.image}
                    alt={item.badge}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * Mouse-Reactive Floating Image Gallery
 * Designed for the top Hero area of the Events Page
 */
const FloatingImageGallery = () => {
  const containerRef = useRef(null);
  const [activeHover, setActiveHover] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Framer Motion spring physics for mouse reactive parallax
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 90 };
  const mouseX = useSpring(rawMouseX, springConfig);
  const mouseY = useSpring(rawMouseY, springConfig);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle cursor movement inside container
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    rawMouseX.set(x);
    rawMouseY.set(y);
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
    setActiveHover(null);
  };

  // Lightbox handlers
  const handleNextPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrevPhoto = () => {
    setSelectedPhotoIndex((prev) =>
      prev === 0 ? galleryItems.length - 1 : prev - 1
    );
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden select-none"
    >
      {/* ── Background Cosmic Mesh & Glow Radiance ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#1591DC]/20 via-[#2C5EAD]/15 to-sky-400/10 rounded-full blur-[100px] opacity-75" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-[#1591DC]/15 rounded-full blur-[90px]" />
        <div className="absolute top-20 right-10 w-[350px] h-[350px] bg-[#2C5EAD]/15 rounded-full blur-[90px]" />
      </div>

      {/* ── Top Central Hero Content ── */}
      <div className="relative z-20 pt-24 sm:pt-28 pb-8 px-6 sm:px-12 max-w-5xl mx-auto text-center pointer-events-auto">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white"
        >
          Moments &amp; Memories of{" "}
          <span className="inline-block whitespace-nowrap bg-gradient-to-r from-[#1591DC] via-[#2C5EAD] to-[#60a5fa] bg-clip-text text-transparent">
            ACM-W
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-3.5 text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Explore our milestone ceremonies, project accolades, social drives,
          and student community initiatives through our mouse-reactive floating space.
        </motion.p>
      </div>

      {/* ── Desktop View: 3D Mouse-Reactive Floating Space ── */}
      <div className="relative z-20 w-full hidden lg:block h-[560px] xl:h-[620px] max-w-7xl mx-auto px-4">
        {galleryItems.map((item, index) => (
          <FloatingCard
            key={item.id}
            item={item}
            index={index}
            mouseX={mouseX}
            mouseY={mouseY}
            activeHover={activeHover}
            setActiveHover={setActiveHover}
            onSelectPhoto={(idx) => setSelectedPhotoIndex(idx)}
          />
        ))}

        {/* Center Hint */}
        <div className="absolute left-1/2 bottom-4 -translate-x-1/2 pointer-events-none text-center">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-xs">

          </p>
        </div>
      </div>

      {/* ── Mobile & Tablet View: Smooth Touch-Reactive Horizontal Floating Cards ── */}
      <div className="relative z-20 w-full block lg:hidden pb-10 px-4">
        <div className="flex items-center justify-between px-2 mb-3">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Swipe to explore photos ({galleryItems.length})
          </span>
          <span className="text-xs text-[#1591DC] dark:text-[#C4E2F5] font-medium">
            Tap photo to enlarge
          </span>
        </div>

        {/* Horizontal Scroll Reel */}
        <div className="flex gap-4 overflow-x-auto pb-4 pt-2 px-2 no-scrollbar snap-x snap-mandatory">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedPhotoIndex(index)}
              className="snap-center shrink-0 w-[270px] sm:w-[320px] rounded-2xl overflow-hidden bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-lg cursor-pointer"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#1591DC] text-white">
                  {item.badge}
                </span>
              </div>
              <div className="p-3.5">
                <p className="text-[11px] font-semibold text-[#1591DC] uppercase">
                  {item.category}
                </p>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Fullscreen Lightbox Modal ── */}
      <PhotoLightbox
        selectedIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
        onSelect={(idx) => setSelectedPhotoIndex(idx)}
      />
    </div>
  );
};

export default FloatingImageGallery;
