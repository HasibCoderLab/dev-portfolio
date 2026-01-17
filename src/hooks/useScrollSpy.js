import { useEffect, useState } from 'react';

/**
 * Custom hook to track active section based on scroll
 * @param {string[]} sectionIds - Array of section ids to track
 * @param {number} offset - Offset from top to consider a section active
 * @returns {string} activeSection - Currently active section id
 */
export const useScrollspy = (sectionIds, offset = 0) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      let currentSection = '';

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPosition >= sectionTop) {
            currentSection = sectionIds[i];
            break; // stop at the first matching section from bottom to top
          }
        }
      }

      // Default to 'home' if no section matched (top of page)
      if (!currentSection && sectionIds.includes('home')) {
        currentSection = 'home';
      }

      setActiveSection(currentSection);
    };

    handleScroll(); // set initial active section
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
};

/**
 * Smooth scroll to a section
 * @param {string} sectionId - ID of the section to scroll to
 * @param {number} offset - Offset from top
 */
export const scrollToSection = (sectionId, offset = 80) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const top = section.offsetTop - offset;
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }
};
