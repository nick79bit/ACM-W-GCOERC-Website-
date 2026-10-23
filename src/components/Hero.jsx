import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import groupPhoto from "../assets/group_photo.jpg";

/**
 * ── HERO BACKGROUND PICTURE ──────────────────────────────────────────
 * To add your horizontal group picture at the background:
 * 1. Place your image in `src/assets/` (e.g. `src/assets/group_photo.jpg`)
 * 2. Import it: `import myPhoto from "../assets/group_photo.jpg";`
 * 3. Assign: `const heroBackgroundImage = myPhoto;`
 *
 * When set to `null`, a clean horizontal background space placeholder
 * is displayed without any picture shown.
 */
const heroBackgroundImage = groupPhoto;

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      <div className="absolute inset-0 top-[80px] z-0 overflow-hidden pointer-events-none select-none">
        {heroBackgroundImage ? (
          /* Actual background picture (semi-transparent) */
          <div className="relative w-full h-full">
            <img
              src={heroBackgroundImage}
              alt="ACM-W Background"
              className="w-full h-full object-cover object-top opacity-40 dark:opacity-45 filter brightness-95 contrast-105"
            />
            {/* Subtle bottom fade into next section */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:to-primary" />
          </div>
        ) : (
          /* Dedicated horizontal background space placeholder (no picture shown) */
          <div className="w-full h-full flex items-center justify-center p-6 sm:p-12">
            <div className="relative w-full max-w-6xl h-[65%] mt-16 rounded-3xl border-2 border-dashed border-[#1591DC]/25 bg-blue-50/10 dark:bg-white/[0.015] backdrop-blur-[2px]">
              {/* Subtle corner indicator for photo placement */}
              <div className="absolute bottom-4 right-6 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1591DC]/10 border border-[#1591DC]/20 opacity-70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-[#1591DC]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 4.5h18A1.5 1.5 0 0122.5 6v12A1.5 1.5 0 0121 19.5H3A1.5 1.5 0 011.5 18V6A1.5 1.5 0 013 4.5z"
                  />
                </svg>
                <span className="text-[11px] font-semibold text-[#1591DC] dark:text-[#C4E2F5] tracking-wide">
                  Background Photo Space
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── 2. Top Foreground Content (GCOERC ACM Women's Chapter) ── */}
      <div
        className={`absolute inset-0 top-[110px] sm:top-[125px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10 pointer-events-auto`}
      >
        {/* Blue dot & gradient line indicator */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#1591DC] shadow-md shadow-[#1591DC]/40" />
          <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-[#1591DC] to-transparent" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText}`}>
            GCOERC ACM <span className="text-[#1591DC]">Women's Chapter</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 max-w-3xl`}>
            Empowering Women in Technology and Innovation{" "}
            <br className="sm:block hidden" />
            <span className="text-[12px] sm:text-[14px] lg:text-[16px] font-normal opacity-80 leading-relaxed block mt-1">
              ACM-W is a student-led technical community dedicated to empowering
              students through innovation, leadership, teamwork, workshops,
              hackathons, networking and career development.
            </span>
          </p>
        </div>
      </div>

      {/* ── 3. Scroll Down Loop Indicator ── */}
      <div className="absolute xs:bottom-8 bottom-6 w-full flex justify-center items-center z-10">
        <a href="#about" aria-label="Scroll to About section">
          <div className="w-[30px] h-[52px] rounded-3xl border-2 border-slate-400 dark:border-secondary flex justify-center items-start p-1.5 transition-colors">
            <motion.div
              animate={{ y: [0, 18, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-2.5 h-2.5 rounded-full bg-[#1591DC] mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
