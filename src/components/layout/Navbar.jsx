import React, { useEffect, useState } from 'react'
import { Code, Menu, X } from "lucide-react"
import { scrollToSection, useScrollspy } from "../../hooks/useScrollSpy.js";
import { NAV_LINKS, PERSONAL_INFO } from "../../utils/constants.js"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollspy(NAV_LINKS.map(link => link.id));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full py-4 transition-all duration-300 ${isScrolled
        ? 'bg-black/30 backdrop-blur-lg border-b border-white/10'
        : 'bg-transparent'
        }`}
    >
      <div className='max-w-7xl mx-auto px-5'>
        <div className='flex items-center justify-between'>

          {/* Logo */}
          <div className="flex items-center gap-4">
            <Code className="w-6 h-6 text-primary" />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-2xl font-bold bg-linear-to-r from-primary via-primary/50 to-primary/30 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              {PERSONAL_INFO.name.split(' ')[1]}
            </button>
          </div>

          {/* Desktop Links */}
          <div className='hidden md:flex items-center gap-6'>
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`
                  relative px-4 py-2 font-medium text-base transition-all duration-300
                  rounded-full
                  ${activeSection === link.id
                    ? "text-white bg-primary/20 border-b-2 border-primary"
                    : "text-white/70 hover:text-white hover:bg-primary/10"}
                `}
              >
                {link.label}
                {/* Glow effect */}
                <span
                  className={`
                    absolute inset-0 rounded-full opacity-0
                    ${activeSection === link.id
                      ? "bg-primary/20 animate-glow"
                      : "group-hover:opacity-30 bg-primary/10"}
                  `}
                />
              </button>
            ))}
          </div>

          {/* Hire Me Button */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => handleNavClick('contact')}
              className="px-7 py-3.5 bg-primary/30 text-white font-medium text-base rounded-full border border-primary hover:bg-primary/90 transition-all duration-300"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-white/80 transition-colors"
          >
            {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className='bg-black/95 backdrop-blur-lg border-t border-white/10 px-5 py-6 space-y-3'>
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`
                block w-full text-left px-4 py-3 font-medium transition-all duration-300 rounded-full
                ${activeSection === link.id
                  ? "text-white bg-primary/20 border-b-2 border-cyan-400"
                  : "text-white/70 hover:text-white hover:bg-primary/10"}
              `}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => handleNavClick('contact')}
            className='w-full px-7 py-3.5 bg-primary/20 text-white font-medium text-base rounded-full border border-primary hover:bg-primary/90 duration-300 mt-2'
          >
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
