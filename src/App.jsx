import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Works,
  StarsCanvas,
  Footer,
  Chatbot,
} from "./components";
import { EventsPage, EventDetailPage } from "./pages";

// Helper component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

// Main Single-Page Home View
const HomePage = () => {
  return (
    <div className='relative z-0 bg-slate-50 text-slate-900 dark:bg-primary dark:text-white transition-colors duration-300 min-h-screen'>
      <div className='relative'>
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <Works />
      <div className='relative z-0'>
        <Contact />
        <StarsCanvas />
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/events/:eventId' element={<EventDetailPage />} />
      </Routes>
      <Chatbot />
    </BrowserRouter>
  );
};

export default App;
