import React, { useEffect, useState } from 'react'
import {Code,Menu,X} from "lucide-react"
import { useScrollspy } from "../../hooks/useScrollSpy";
import {NAV_LINKS ,PERSONAL_INFO } from "../../utils/constants"
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

  const handleNavClick = (sectionId) =>{
    scrollToSection(sectionId);
    setIsMenuOpen(false)
  }

  return (
    <div className="Navbar">Navbar</div>
  )
}

export default Navbar;
