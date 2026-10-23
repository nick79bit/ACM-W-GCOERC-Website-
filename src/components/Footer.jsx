import React from "react";
import { logo } from "../assets";

/* ── small helpers ────────────────────────────────────────────── */
const ColHeading = ({ children }) => (
  <h4 className="text-[#1591DC] font-bold text-[16px] mb-4 tracking-wide">
    {children}
  </h4>
);

const FooterLink = ({ href = "#", children }) => (
  <li>
    <a
      href={href}
      className="flex items-center gap-2 text-slate-400 hover:text-[#1591DC] text-[14px] transition-colors duration-200"
    >
      <span className="text-[#1591DC] text-[10px]">›</span>
      {children}
    </a>
  </li>
);

/* ── social icon wrappers ─────────────────────────────────────── */
const SocialBtn = ({ href = "#", children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="w-9 h-9 rounded-full border border-[#1591DC]/40 flex items-center justify-center text-slate-400 hover:text-[#1591DC] hover:border-[#1591DC] transition-all duration-200"
  >
    {children}
  </a>
);

/* ── SVG icons ────────────────────────────────────────────────── */
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const PinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#1591DC] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.013 3.713-5.04 3.713-8.627a8 8 0 10-16 0c0 3.588 1.769 6.615 3.713 8.627a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.144.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);

/* ── main Footer ──────────────────────────────────────────────── */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#05061a] border-t border-[#1591DC]/10">
      {/* main grid */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* ── col 1: logo + about ── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="ACM-W logo" className="w-14 h-14 object-contain" />
            <div className="leading-tight">
              <p className="text-[#1591DC] font-extrabold text-[13px] tracking-wide">
                Association for<br />Computing Machinery
              </p>
              <p className="text-slate-400 text-[11px] mt-0.5">Student Chapter</p>
            </div>
          </div>
          <p className="text-slate-400 text-[13px] leading-relaxed mt-2">
            Association for Computing Machinery Student Chapter at Guru Gobind Singh
            College of Engineering and Research Centre, Nashik.
          </p>
        </div>

        {/* ── col 2: quick links ── */}
        <div>
          <ColHeading>Quick Links</ColHeading>
          <ul className="flex flex-col gap-3">
            <FooterLink href="https://india.acm.org">ACM India</FooterLink>
            <FooterLink href="https://dl.acm.org">ACM Digital Library</FooterLink>
            <FooterLink href="https://technews.acm.org">ACM TechNews</FooterLink>
            <FooterLink href="https://xrds.acm.org">ACM XRDS</FooterLink>
            <FooterLink href="https://services.acm.org/public/qj/quickjoin/qj_control.cfm?promo=PWEBTOP&form_type=Student">Student Membership</FooterLink>
            <FooterLink href="https://www.acm.org/chapters/professional-chapters">Professional Chapters</FooterLink>
          </ul>
        </div>

        {/* ── col 3: explore ── */}
        <div>
          <ColHeading>Explore</ColHeading>
          <ul className="flex flex-col gap-3">
            <FooterLink href="#hero">Home</FooterLink>
            <FooterLink href="#about">About Us</FooterLink>
            <FooterLink href="#work">Events</FooterLink>
            <FooterLink href="#ourteam">Our Team</FooterLink>
            <FooterLink href="#contact">Join Chapter</FooterLink>
            <FooterLink href="https://gcoerc.acm.org">ACM</FooterLink>
          </ul>
        </div>

        {/* ── col 4: connect + location ── */}
        <div className="flex flex-col gap-6">
          <div>
            <ColHeading>Connect With Us</ColHeading>
            <div className="flex gap-3">
              <SocialBtn href="mailto:gcoercacm@gmail.com">
                <EmailIcon />
              </SocialBtn>
              <SocialBtn href="#">
                <InstagramIcon />
              </SocialBtn>
              <SocialBtn href="#">
                <LinkedInIcon />
              </SocialBtn>
            </div>
          </div>

          <div>
            <ColHeading>Chapter Location</ColHeading>
            <div className="flex gap-2">
              <PinIcon />
              <p className="text-slate-400 text-[13px] leading-relaxed">
                Guru Gobind Singh College of Engineering and Research Center,
                Khalsa Educational Complex, Guru Gobind Singh Marg,
                Wadala-Pathardi Road, Indira Nagar Annexe, Nashik – 422 009
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── bottom bar ── */}
      <div className="border-t border-[#1591DC]/10 py-5 text-center">
        <p className="text-slate-500 text-[13px]">
          © {year} GCOERC ACM Student Chapter | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
