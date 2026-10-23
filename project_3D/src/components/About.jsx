import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

import nitaThakare from "../assets/nita_thakare.jpg";

/* ── Faculty data — fill in names, designations & image paths ── */
const faculties = [
  {
    name: "Mrs.Gauri Puranik ",
    designation: "ACM-W Faculty Advisor",
    image: null,
  },

  {
    name: "Dr. Nita Thakare",
    designation: "Head of Department",
    image: nitaThakare,
  },
  {
    name: "Dr.Sweety Jachak",
    designation: "ACM Faculty Sponsor",
    image: null,
  },
  {
    name: "Dr. Nita Thakare",
    designation: "Head of Department",
    image: nitaThakare,
  },
];

/* ── Faculty Card ─────────────────────────────────────────────── */
const FacultyCard = ({ index, name, designation, image }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.3, 0.75)}
    className="flex-1 min-w-[260px] max-w-[320px]"
  >
    <Tilt options={{ max: 15, scale: 1.02, speed: 400 }}>
      <div className="bg-white dark:bg-tertiary border border-slate-200/80 dark:border-white/5 shadow-lg dark:shadow-card rounded-2xl overflow-hidden transition-colors duration-300">

        {/* Photo area */}
        <div className="w-full h-[220px] bg-gradient-to-br from-[#C4E2F5]/60 to-[#1591DC]/20 dark:from-[#1d1d35] dark:to-[#2C5EAD]/20 flex items-center justify-center border-b-2 border-dashed border-[#1591DC]/25 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 opacity-30">
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
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <span className="text-[11px] text-[#1591DC] font-medium tracking-wide">
                Photo
              </span>
            </div>
          )}
        </div>

        {/* Text area */}
        <div className="px-5 py-4 text-center">
          {/* Name — big font */}
          <h3 className="text-slate-900 dark:text-white font-bold text-[20px] leading-snug">
            {name}
          </h3>

          {/* Designation — small font */}
          <p className="mt-2 text-slate-500 dark:text-secondary text-[13px] leading-relaxed">
            {designation}
          </p>
        </div>
      </div>
    </Tilt>
  </motion.div>
);

/* ── About section ────────────────────────────────────────────── */
const About = () => {
  return (
    <>
      {/* Overview heading */}
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>About ACM-W</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      {/* Overview text */}
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-slate-600 dark:text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        ACM-W GCOERC Nashik is the Women's Chapter of the Association for
        Computing Machinery that inspires students to become future innovators,
        leaders and changemakers.{" "}
        <span className="text-[14px] opacity-80">
          Through technical, non-technical and social events, industry
          interaction, workshops and career counseling, ACM-W bridges the gap
          between classroom learning and industry expectations.
        </span>
      </motion.p>

      {/* ── Our Faculties heading ── */}
      <motion.div
        variants={fadeIn("", "", 0.2, 1)}
        className="mt-20 text-center"
      >
        <p className={styles.sectionSubText}>Mentors &amp; Guides</p>
        <h2 className={styles.sectionHeadText}>Our Faculties.</h2>
      </motion.div>

      {/* Faculty cards */}
      <div className="mt-10 flex flex-wrap justify-center gap-8">
        {faculties.map((faculty, index) => (
          <FacultyCard key={faculty.name} index={index} {...faculty} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
