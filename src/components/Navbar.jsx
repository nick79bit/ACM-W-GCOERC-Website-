import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (nav) => {
    setActive(nav.title);
    if (location.pathname === "/") {
      const el = document.getElementById(nav.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${nav.id}`);
    }
  };

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-30 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-primary/95 backdrop-blur-md shadow-md border-b border-slate-200/60 dark:border-slate-800/60"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-3'
          onClick={() => {
            setActive("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src={logo}
            alt='ACM-W GCOERC Logo'
            className='h-10 sm:h-11 w-auto object-contain dark:bg-white/95 dark:p-1 dark:rounded-lg dark:shadow-sm transition-all duration-300'
          />
          <p className='text-slate-900 dark:text-white text-[16px] sm:text-[18px] font-bold cursor-pointer flex items-center whitespace-nowrap'>
            ACM-W &nbsp;
            <span className='sm:inline hidden text-slate-500 dark:text-secondary font-normal'>| GCOERC</span>
          </p>
        </Link>

        <div className='hidden md:flex items-center gap-5 lg:gap-8'>
          <ul className='list-none flex flex-row gap-5 lg:gap-7 items-center'>
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title
                    ? "text-[#1591DC] dark:text-white font-semibold"
                    : "text-slate-600 dark:text-secondary"
                } hover:text-[#1591DC] dark:hover:text-white text-[15px] lg:text-[17px] font-medium cursor-pointer transition-colors`}
                onClick={() => handleNavClick(nav)}
              >
                <span>{nav.title}</span>
              </li>
            ))}
          </ul>

          {/* Natural, broad Events button */}
          <Link
            to='/events'
            className={`px-6 py-2 rounded-xl text-[14px] lg:text-[15px] font-semibold tracking-wide whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] ${
              location.pathname.startsWith('/events')
                ? 'bg-gradient-to-r from-[#2C5EAD] to-[#1591DC] text-white ring-2 ring-[#1591DC]/50 shadow-[#1591DC]/20'
                : 'bg-gradient-to-r from-[#2C5EAD] to-[#1591DC] hover:from-[#1591DC] hover:to-[#2C5EAD] text-white'
            }`}
          >
            <span>Events</span>
            <svg
              className='w-3.5 h-3.5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2.2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </Link>

          <button
            id='theme-toggle-btn'
            type='button'
            onClick={toggleTheme}
            className='w-10 h-10 rounded-full flex items-center justify-center bg-slate-200/80 hover:bg-slate-300/80 dark:bg-tertiary dark:hover:bg-[#162d4e] transition-all duration-300 border border-slate-300/70 dark:border-slate-700/60 shadow-sm focus:outline-none cursor-pointer'
            aria-label='Toggle theme'
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? (
              <svg
                className='w-5 h-5 text-amber-400 transition-transform duration-300 hover:rotate-45'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
                  clipRule='evenodd'
                />
              </svg>
            ) : (
              <svg
                className='w-5 h-5 text-[#2C5EAD] transition-transform duration-300 hover:-rotate-12'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu and theme toggle */}
        <div className='md:hidden flex flex-1 justify-end items-center gap-3'>
          <button
            type='button'
            onClick={toggleTheme}
            className='w-9 h-9 rounded-full flex items-center justify-center bg-slate-200/80 dark:bg-tertiary border border-slate-300/70 dark:border-slate-700/60 shadow-sm cursor-pointer'
            aria-label='Toggle theme'
          >
            {theme === "dark" ? (
              <svg className='w-4 h-4 text-amber-400' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
                  clipRule='evenodd'
                />
              </svg>
            ) : (
              <svg className='w-4 h-4 text-[#2C5EAD]' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
              </svg>
            )}
          </button>

          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain cursor-pointer'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-white/95 dark:black-gradient border border-slate-200 dark:border-none shadow-xl absolute top-20 right-0 mx-4 my-2 min-w-[190px] z-30 rounded-2xl flex-col gap-4`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4 w-full'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title
                      ? "text-[#1591DC] dark:text-white"
                      : "text-slate-700 dark:text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(false);
                    handleNavClick(nav);
                  }}
                >
                  <span>{nav.title}</span>
                </li>
              ))}
              <li className='w-full pt-3 border-t border-slate-200 dark:border-slate-800'>
                <Link
                  to='/events'
                  onClick={() => setToggle(false)}
                  className='w-full py-2.5 px-5 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#2C5EAD] to-[#1591DC] text-white shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95'
                >
                  <span>Events</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
