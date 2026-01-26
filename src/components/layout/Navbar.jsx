import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Menu, X, ArrowRight } from "lucide-react";
import { scrollToSection, useScrollspy } from "../../hooks/useScrollSpy.js";
import { NAV_LINKS, PERSONAL_INFO } from "../../utils/constants.js";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollspy(NAV_LINKS.map(link => link.id));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    // 'mt-6' diye upore gap deya hoyeche jate floating lage
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 mt-4 md:mt-6 px-4`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 ${
        isScrolled ? 'px-2' : 'px-0'
      }`}>
        
        {/* Left Side: Empty/Spacer for balance (Desktop) */}
        <div className="hidden lg:block w-[150px]"></div>

        {/* Center: Integrated Logo & Navigation */}
        <div className={`flex items-center gap-2 p-1.5 rounded-full border border-white/10 backdrop-blur-xl transition-all duration-500 ${
          isScrolled ? 'bg-black/60 shadow-2xl shadow-primary/10' : 'bg-white/5'
        }`}>
          
          {/* Logo integrated inside the pill */}
          <motion.div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 pl-3 pr-4 py-1.5 border-r border-white/10 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
              <Code className="w-4 h-4 text-primary group-hover:text-white" />
            </div>
            <span className="text-white font-bold tracking-tight text-sm">
              {PERSONAL_INFO.name.split(' ')[1].toUpperCase()}
            </span>
          </motion.div>

          {/* Desktop Links */}
          <div className='hidden md:flex items-center '>
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-4 py-2 text-xs font-bold transition-all duration-300 rounded-full ${
                  activeSection === link.id ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 border border-white/5 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle (Inside pill) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMenuOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
          </button>
        </div>

        {/* Right Side: Hire Me Button */}
        <div className="hidden lg:block w-[150px] text-right">
          <button
            onClick={() => handleNavClick('contact')}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-black text-xs font-black rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] active:scale-95"
          >
            HIRE ME
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="md:hidden mt-4 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-3xl"
          >
            <div className="p-6 space-y-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`block w-full text-left text-sm font-bold py-3 px-4 rounded-xl ${
                    activeSection === link.id ? "text-primary bg-primary/10" : "text-gray-400 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;