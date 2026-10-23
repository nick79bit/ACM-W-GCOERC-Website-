import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

// LinkedIn SVG icon
const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MemberCard = ({ index, name, role, image, linkedin_link }) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.15, 0.65)}>
      <Tilt
        options={{ max: 20, scale: 1.02, speed: 400 }}
        className="bg-white dark:bg-tertiary border border-slate-200/80 dark:border-white/5 shadow-lg dark:shadow-card rounded-2xl p-5 w-[220px] flex flex-col items-center transition-colors duration-300"
      >
        {/* Photo container */}
        <div className="w-full h-[200px] rounded-xl bg-slate-100 dark:bg-[#1d1d35] flex flex-col items-center justify-center mb-4 overflow-hidden shadow-sm">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 opacity-40">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-14 h-14 text-[#1591DC]"
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

        {/* Name — big font */}
        <h3 className="text-slate-900 dark:text-white font-bold text-[18px] text-center leading-tight">
          {name}
        </h3>

        {/* Role — small font */}
        <p className="mt-1 text-[#1591DC] text-[12px] font-medium text-center tracking-wide uppercase">
          {role}
        </p>

        {/* LinkedIn button */}
        <a
          href={linkedin_link}
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex items-center gap-2 bg-[#1591DC] hover:bg-[#2C5EAD] text-white text-[12px] font-semibold px-4 py-1.5 rounded-full transition-colors duration-200"
        >
          <LinkedInIcon />
          LinkedIn
        </a>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>The people behind ACM-W</p>
        <h2 className={`${styles.sectionHeadText}`}>Our Team.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-slate-600 dark:text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Meet the dedicated student leaders driving innovation, inclusion, and
          impact at ACM-W GCOERC Nashik.
        </motion.p>
      </div>

      <div className="mt-16 flex flex-wrap justify-center gap-6">
        {projects.map((member, index) => (
          <MemberCard key={`member-${index}`} index={index} {...member} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "team");
