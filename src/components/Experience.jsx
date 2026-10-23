import React, { useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion, useScroll } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { useTheme } from "../context/ThemeContext";

/* ── Single Timeline Event Card ──────────────────────────────── */
const EventCard = ({
  id,
  categoryId,
  category,
  title,
  date,
  description,
  image,
  number,
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const handleCardClick = () => {
    navigate("/events");
  };

  return (
    <VerticalTimelineElement
      onTimelineElementClick={handleCardClick}
      contentStyle={{
        background: isDark ? "#0f1f38" : "#ffffff",
        color: isDark ? "#fff" : "#0f172a",
        boxShadow: isDark
          ? "0 10px 25px -5px rgba(0,0,0,0.3)"
          : "0 10px 25px -5px rgba(0,0,0,0.08)",
        border: isDark ? "1px solid #1e3a5f" : "1px solid #e2e8f0",
        padding: "0",
        overflow: "hidden",
        borderRadius: "16px",
        cursor: "pointer",
      }}
      contentArrowStyle={{
        borderRight: isDark ? "7px solid #0f1f38" : "7px solid #ffffff",
      }}
      date={date}
      iconStyle={{
        background: "#1591DC",
        boxShadow: "0 0 0 4px #2C5EAD, 0 0 0 9px rgba(21,145,220,0.22)",
        color: "#fff",
        fontSize: "18px",
        fontWeight: "800",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      icon={
        /* ── numbered dot: 1, 2, 3... ── */
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: "800",
            color: "#ffffff",
            fontFamily: "Poppins, sans-serif",
            userSelect: "none",
          }}
        >
          {number}
        </div>
      }
    >
      {/* ── Photo placeholder ── */}
      <div
        onClick={handleCardClick}
        className="w-full h-[180px] bg-gradient-to-br from-[#C4E2F5]/60 to-[#1591DC]/20 dark:from-[#1d1d35] dark:to-[#2C5EAD]/20 flex items-center justify-center border-b-2 border-dashed border-[#1591DC]/25 overflow-hidden group cursor-pointer"
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-35 group-hover:opacity-75 transition-opacity">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-[#1591DC]"
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
            <span className="text-[11px] text-[#1591DC] font-medium tracking-wide">
              Event Photo • Click to Explore
            </span>
          </div>
        )}
      </div>

      {/* ── Text ── */}
      <div onClick={handleCardClick} className="px-5 py-4 cursor-pointer">
        {/* Category tag */}
        {category && (
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#1591DC] dark:text-[#C4E2F5] mb-1">
            {category}
          </span>
        )}
        {/* Event name — big font */}
        <h3 className="text-slate-900 dark:text-white font-bold text-[22px] leading-snug hover:text-[#1591DC] transition-colors">
          {title}
        </h3>
        {/* Description — small font */}
        <p className="mt-2 text-slate-500 dark:text-secondary text-[13px] leading-relaxed">
          {description}
        </p>

        {/* Action Prompt */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#1591DC] dark:text-[#C4E2F5] hover:text-[#2C5EAD] transition-colors">
          <span>Explore Category &amp; Events</span>
          <span className="flex items-center gap-1 font-bold">
            View All →
          </span>
        </div>
      </div>
    </VerticalTimelineElement>
  );
};

/* ── Experience / Events section ──────────────────────────────── */
const Experience = () => {
  const timelineRef = useRef(null);

  /* Scroll progress within the timeline container */
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 35%"],
  });

  useEffect(() => {
    const updateProgress = (latest) => {
      if (timelineRef.current) {
        const pct = Math.min(100, Math.max(0, latest * 100));
        timelineRef.current.style.setProperty("--scroll-fill", `${pct}%`);
      }
    };

    updateProgress(scrollYProgress.get());
    const unsubscribe = scrollYProgress.on("change", updateProgress);
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0 }}
        className="text-center"
      >
        <p className={`${styles.sectionSubText}`}>What we have done so far</p>
        <h2 className={`${styles.sectionHeadText}`}>Highlights.</h2>
        <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-secondary max-w-xl mx-auto">
          Click any event card below to open the complete category-wise events
          directory and view in-depth details.
        </p>
      </motion.div>

      {/* ── Timeline container: --scroll-fill drives the blue vertical line ── */}
      <div ref={timelineRef} className="mt-16 timeline-wrapper">
        <VerticalTimeline>
          {experiences.map((event, index) => (
            <EventCard
              key={`event-${index}`}
              number={index + 1}
              {...event}
            />
          ))}
        </VerticalTimeline>
      </div>

      {/* ── Direct Link to Category Events Page ── */}
      <div className="mt-12 text-center">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-[#2C5EAD] to-[#1591DC] hover:from-[#1591DC] hover:to-[#2C5EAD] text-white shadow-lg shadow-[#1591DC]/30 hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <span>Explore All Events Category-Wise</span>
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
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
