import React, { useEffect, useState } from 'react'
import { Code, Menu, X } from "lucide-react"
import { scrollToSection, useScrollspy } from "../../hooks/useScrollSpy.js";
import { NAV_LINKS, PERSONAL_INFO } from "../../utils/constants.js"


const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollspy(NAV_LINKS.map(link => link.id));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false)
  }
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-1000 w-full py-4 transition-all duration-300 ${isScrolled
        ? 'bg-black/30 backdrop-blur-lg'
        : 'bg-transparent'
        }`}
      style={{ transform: 'translate3d(0, 0, 0)' }}
    >
      <div className='max-w-330 mx-auto px-5'>
        <div className='flex items-center justify-between'>

          {/*  {logo } */}
          <div className="flex items-center   gap-4">

            <Code className="w-6 h-6 text-primary" />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-2xl font-bold bg-linear-to-r from-primary via-primary/50 to-primary/30 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              aria-label="home"
            >
              {PERSONAL_INFO.name.split(' ')[1]}
            </button>
          </div>
          {/* DESKTOP Navigation */}
          <nav className='hidden md:flex items-center gap-7'>
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-base font-medium transition-all duration-300 ${activeSection === link.id
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                  }`}
              >
                {link.label}
              </button>
            ))}

          </nav>
          {/* CAT Button */}

          <div className="hidden md:flex items-center gap-2">

            <button
              onClick={() => handleNavClick('contact')}
           className="px-7 py-3.5 bg-white text-[#212121] font-medium text-base rounded-[17px] border border-white hover:bg-white/90 transition-all duration-300"

            >Hire Me
            </button>
          </div>
          {/* Mobile Menu */}
          <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className=""
              aria-label="menu"
            >
              {isMenuOpen ? <X className='' /> :  <Menu className='' />}
            </button>
        </div>
      </div>
    </nav>
  )
}


export default Navbar;
