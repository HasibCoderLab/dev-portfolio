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
    

         <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 mt-4 md:mt-8 px-4 w-full`}>
      {/* Main Conteiner justify-center 100% */}
      <div className={`max-w-7xl mx-auto flex items-center justify-center lg:justify-between transition-all duration-300 ${
        isScrolled ? 'px-4' : 'px-0'
      }`}>
        
        {/* Left Side Spacer - just Desktop */}
        <div className="hidden lg:block w-[180px]"></div>

        {/* Center Pill - Main Focus on Mobile  */}
        <div className={`flex items-center gap-3 p-2 rounded-full border border-white/10 backdrop-blur-2xl transition-all duration-500 mx-auto lg:mx-0 ${
          isScrolled ? 'bg-black/70 shadow-2xl shadow-primary/20 scale-105' : 'bg-white/5'
        }`}>
          
          {/* Logo Section */}
          <motion.div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 pl-4 pr-6 py-2 border-r border-white/10 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-all duration-300 shadow-inner">
              <img 
                src={PERSONAL_INFO.icon} 
                alt="Logo" 
                className="w-9 h-9 object-contain"
              />
            </div>
            <span className="text-white font-black tracking-tighter text-base">
              HASIB<span> 😊</span>
            </span>
          </motion.div>

          {/* Desktop Links */}
          <div className='hidden md:flex items-center px-4 gap-1'>
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative cursor-pointer px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-full ${
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

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 text-white hover:bg-white/5 rounded-full transition-colors"
          >
            {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>

        {/* Right Side: Hire Me Button */}
        <div className="hidden lg:block w-[180px] text-right">
          <button
            onClick={() => handleNavClick('contact')}
            className="inline-flex cursor-pointer items-center gap-3 px-8 py-3.5 bg-primary text-black text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-[0_10px_30px_rgba(var(--primary-rgb),0.4)] active:scale-95"
          >
            HIRE ME
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="md:hidden mt-6 bg-black/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-3xl mx-auto max-w-sm"
          >
            <div className="p-8 space-y-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`block w-full text-center text-sm font-black uppercase tracking-widest py-4 px-6 rounded-2xl transition-all ${
                    activeSection === link.id ? "text-primary bg-primary/10 scale-105" : "text-gray-400 hover:bg-white/5"
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