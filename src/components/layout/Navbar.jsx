import React, { useEffect, useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'motion/react';
import { Menu, X, ArrowRight, Zap } from 'lucide-react';
import { scrollToSection, useScrollspy } from '../../hooks/useScrollSpy.js';
import { NAV_LINKS, PERSONAL_INFO } from '../../utils/constants.js';

/* ══════════════════════════════════════════
   MAGNETIC BUTTON — follows cursor on hover
══════════════════════════════════════════ */
const MagneticButton = ({ children, strength = 0.3, className = '', style = {}, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 350, damping: 25 });
  const springY = useSpring(y, { stiffness: 350, damping: 25 });

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
      <motion.div
          ref={ref}
          style={{ x: springX, y: springY, ...style }}
          className={className}
          onMouseMove={handleMouse}
          onMouseLeave={handleLeave}
          onClick={onClick}
      >
        {children}
      </motion.div>
  );
};

/* ══════════════════════════════════════════
   GLITCH TEXT — CSS glitch effect on hover
══════════════════════════════════════════ */
const GlitchText = ({ text, active, color = '#8DFF69' }) => {
  return (
      <span
          className="relative inline-block"
          style={{
            '--glitch-color': color,
          }}
      >
      {text}
        {active && (
            <>
          <span
              className="absolute inset-0 pointer-events-none"
              style={{
                color,
                clipPath: 'polygon(0 25%, 100% 25%, 100% 50%, 0 50%)',
                transform: 'translate(-2px, -1px)',
                opacity: 0.7,
                animation: 'glitch1 0.4s infinite linear',
              }}
              aria-hidden="true"
          >
            {text}
          </span>
              <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    color: '#61DAFB',
                    clipPath: 'polygon(0 65%, 100% 65%, 100% 80%, 0 80%)',
                    transform: 'translate(2px, 1px)',
                    opacity: 0.5,
                    animation: 'glitch2 0.4s infinite linear',
                  }}
                  aria-hidden="true"
              >
            {text}
          </span>
            </>
        )}
    </span>
  );
};

/* ══════════════════════════════════════════
   PARTICLE BURST — on nav link click
══════════════════════════════════════════ */
const ParticleBurst = ({ trigger }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!trigger) return;
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      angle: (i / 8) * 360,
      color: i % 2 === 0 ? '#8DFF69' : '#61DAFB',
    }));
    setParticles(newParticles);
    const t = setTimeout(() => setParticles([]), 700);
    return () => clearTimeout(t);
  }, [trigger]);

  return (
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        <AnimatePresence>
          {particles.map((p) => (
              <motion.div
                  key={p.id}
                  className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ background: p.color, boxShadow: `0 0 6px ${p.color}` }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((p.angle * Math.PI) / 180) * 30,
                    y: Math.sin((p.angle * Math.PI) / 180) * 30,
                    opacity: 0,
                    scale: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
              />
          ))}
        </AnimatePresence>
      </div>
  );
};

/* ══════════════════════════════════════════
   SCROLL VELOCITY INDICATOR — thin line
══════════════════════════════════════════ */
const ScrollProgressBar = ({ scrollYProgress }) => {
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
      <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full origin-left"
          style={{
            scaleX,
            background: 'linear-gradient(90deg, #8DFF69, #61DAFB, #A78BFA, #F472B6)',
            boxShadow: '0 0 8px rgba(141,255,105,0.6)',
          }}
      />
  );
};

/* ══════════════════════════════════════════
   LOGO — animated on hover
══════════════════════════════════════════ */
const AnimatedLogo = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);
  const letters = 'HASIB'.split('');

  return (
      <MagneticButton
          strength={0.4}
          className="flex items-center gap-3 pl-4 pr-6 py-2 border-r border-white/10 cursor-pointer group"
          onClick={onClick}
      >
        <div
            className="relative w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              background: hovered
                  ? 'linear-gradient(135deg, rgba(141,255,105,0.3), rgba(97,218,251,0.2))'
                  : 'rgba(141,255,105,0.15)',
              border: hovered ? '1px solid rgba(141,255,105,0.5)' : '1px solid rgba(141,255,105,0.2)',
              transition: 'all 0.3s ease',
              boxShadow: hovered ? '0 0 20px rgba(141,255,105,0.4), inset 0 0 20px rgba(141,255,105,0.1)' : 'none',
            }}
        >
          {/* Ripple on hover */}
          <AnimatePresence>
            {hovered && (
                <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{ background: 'rgba(141,255,105,0.1)' }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
            )}
          </AnimatePresence>
          <img src={PERSONAL_INFO.icon} alt="Logo" className="w-9 h-9 object-contain relative z-10" />
        </div>

        {/* Staggered letter animation */}
        <div className="flex items-center gap-[1px]">
          {letters.map((letter, i) => (
              <motion.span
                  key={i}
                  className="text-white font-black tracking-tighter text-base"
                  whileHover={{ y: -4, color: '#8DFF69' }}
                  transition={{ delay: i * 0.04, type: 'spring', stiffness: 400 }}
              >
                {letter}
              </motion.span>
          ))}
          <motion.span
              className="ml-1 text-base"
              animate={{ rotate: hovered ? [0, 15, -10, 0] : 0 }}
              transition={{ duration: 0.5 }}
          >
            😊
          </motion.span>
        </div>
      </MagneticButton>
  );
};

/* ══════════════════════════════════════════
   NAV LINK — full animation suite
══════════════════════════════════════════ */
const NavLink = ({ link, isActive, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked((c) => !c);
    onClick(link.id);
  };

  return (
      <motion.button
          onClick={handleClick}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className="relative cursor-pointer px-5 py-2.5 text-xs font-black uppercase tracking-widest rounded-full overflow-visible"
          style={{ color: isActive ? '#fff' : hovered ? '#fff' : 'rgba(156,163,175,1)' }}
          whileTap={{ scale: 0.92 }}
      >
        {/* Active pill with spring layout */}
        {isActive && (
            <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(141,255,105,0.25)',
                  boxShadow: '0 0 20px rgba(141,255,105,0.15), inset 0 0 15px rgba(141,255,105,0.05)',
                }}
                transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
            />
        )}

        {/* Hover underline */}
        <motion.div
            className="absolute bottom-1 left-1/2 h-[2px] rounded-full"
            style={{
              background: 'linear-gradient(90deg, #8DFF69, #61DAFB)',
              x: '-50%',
            }}
            animate={{ width: hovered && !isActive ? '60%' : '0%' }}
            transition={{ duration: 0.3 }}
        />

        {/* Particle burst */}
        <ParticleBurst trigger={clicked} />

        {/* Hover glow */}
        <AnimatePresence>
          {hovered && (
              <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(141,255,105,0.08) 0%, transparent 70%)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
              />
          )}
        </AnimatePresence>

        <span className="relative z-10">
        <GlitchText text={link.label} active={isActive} />
      </span>

        {/* Active dot */}
        {isActive && (
            <motion.span
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#8DFF69]"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.4, 1] }}
                transition={{ duration: 0.4 }}
                style={{ boxShadow: '0 0 6px #8DFF69' }}
            />
        )}
      </motion.button>
  );
};

/* ══════════════════════════════════════════
   HIRE ME BUTTON — premium CTA
══════════════════════════════════════════ */
const HireMeButton = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
      <MagneticButton strength={0.5}>
        <motion.button
            onClick={onClick}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-black text-xs font-black uppercase tracking-widest overflow-hidden cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #8DFF69 0%, #61DAFB 100%)',
              boxShadow: hovered
                  ? '0 15px 40px rgba(141,255,105,0.5), 0 0 0 1px rgba(141,255,105,0.3)'
                  : '0 8px 25px rgba(141,255,105,0.3)',
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {/* Shimmer sweep */}
          <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                x: '-200%',
              }}
              animate={{ x: hovered ? '200%' : '-200%' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
          />

          {/* Pulse ring */}
          <AnimatePresence>
            {hovered && (
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#8DFF69]"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                />
            )}
          </AnimatePresence>

          <motion.span
              animate={{ letterSpacing: hovered ? '0.15em' : '0.1em' }}
              transition={{ duration: 0.3 }}
              className="relative z-10 flex items-center gap-2"
          >
            <Zap className="w-3.5 h-3.5" />
            HIRE ME
          </motion.span>

          <motion.div
              className="relative z-10"
              animate={{ x: hovered ? 4 : 0, rotate: hovered ? 45 : 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </MagneticButton>
  );
};

/* ══════════════════════════════════════════
   MOBILE MENU — full-screen overlay
══════════════════════════════════════════ */
const MobileMenu = ({ isOpen, links, activeSection, onNavClick }) => {
  return (
      <AnimatePresence>
        {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                  className="fixed inset-0 z-[90]"
                  style={{ backdropFilter: 'blur(20px)', background: 'rgba(3,7,18,0.85)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
              />

              {/* Menu panel */}
              <motion.div
                  className="fixed top-24 left-4 right-4 z-[95] rounded-[2.5rem] overflow-hidden"
                  style={{
                    background: 'rgba(10,10,20,0.95)',
                    border: '1px solid rgba(141,255,105,0.15)',
                    backdropFilter: 'blur(30px)',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(141,255,105,0.1), inset 0 0 80px rgba(141,255,105,0.02)',
                  }}
                  initial={{ opacity: 0, y: -30, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              >
                {/* Top glow line */}
                <div
                    className="h-[2px] w-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #8DFF69, #61DAFB, #A78BFA, transparent)',
                    }}
                />

                <div className="p-8 space-y-2">
                  {links.map((link, i) => {
                    const isActive = activeSection === link.id;
                    return (
                        <motion.button
                            key={link.id}
                            onClick={() => onNavClick(link.id)}
                            className="relative block w-full text-left text-sm font-black uppercase tracking-widest py-4 px-6 rounded-2xl overflow-hidden group"
                            style={{
                              color: isActive ? '#8DFF69' : 'rgba(156,163,175,1)',
                              background: isActive ? 'rgba(141,255,105,0.06)' : 'transparent',
                              border: isActive ? '1px solid rgba(141,255,105,0.2)' : '1px solid transparent',
                            }}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ delay: i * 0.07, type: 'spring', stiffness: 300 }}
                            whileHover={{
                              x: 8,
                              color: '#fff',
                              backgroundColor: 'rgba(141,255,105,0.05)',
                              borderColor: 'rgba(141,255,105,0.15)',
                            }}
                            whileTap={{ scale: 0.97 }}
                        >
                          {/* Hover sweep */}
                          <motion.div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100"
                              style={{
                                background: 'linear-gradient(90deg, rgba(141,255,105,0.05), transparent)',
                              }}
                              transition={{ duration: 0.3 }}
                          />

                          <span className="relative z-10 flex items-center justify-between">
                      <span>{link.label}</span>
                            {isActive && (
                                <motion.span
                                    layoutId="mobileActive"
                                    className="w-2 h-2 rounded-full bg-[#8DFF69]"
                                    style={{ boxShadow: '0 0 8px #8DFF69' }}
                                />
                            )}
                    </span>
                        </motion.button>
                    );
                  })}

                  {/* Mobile CTA */}
                  <motion.div
                      className="pt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: links.length * 0.07 + 0.1 }}
                  >
                    <button
                        onClick={() => onNavClick('contact')}
                        className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-black"
                        style={{
                          background: 'linear-gradient(135deg, #8DFF69, #61DAFB)',
                          boxShadow: '0 8px 25px rgba(141,255,105,0.3)',
                        }}
                    >
                      Hire Me ⚡
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </>
        )}
      </AnimatePresence>
  );
};

/* ══════════════════════════════════════════
   MAIN NAVBAR
══════════════════════════════════════════ */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollDir, setScrollDir] = useState('up');
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const activeSection = useScrollspy(NAV_LINKS.map((l) => l.id));

  const { scrollY, scrollYProgress } = useScroll();

  // Scroll direction + hide on scroll down
  useEffect(() => {
    return scrollY.onChange((current) => {
      const prev = lastScrollY.current;
      const diff = current - prev;

      if (Math.abs(diff) < 5) return;

      if (diff > 0 && current > 100) {
        setScrollDir('down');
        setHidden(true);
      } else {
        setScrollDir('up');
        setHidden(false);
      }

      lastScrollY.current = current;
    });
  }, [scrollY]);

  // Scrolled state for pill styling
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    return scrollY.onChange((v) => setIsScrolled(v > 30));
  }, [scrollY]);

  const handleNavClick = (id) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  // Navbar Y animation — slides up when hidden, down when shown
  const navY = useSpring(hidden ? -120 : 0, { stiffness: 200, damping: 30 });

  return (
      <>
        {/* ── CSS for glitch & animations ── */}
        <style>{`
        @keyframes glitch1 {
          0%   { transform: translate(-2px, -1px) skewX(-1deg); }
          25%  { transform: translate(2px, 1px) skewX(1deg); }
          50%  { transform: translate(-1px, 2px) skewX(-0.5deg); }
          75%  { transform: translate(1px, -1px) skewX(0.5deg); }
          100% { transform: translate(-2px, -1px) skewX(-1deg); }
        }
        @keyframes glitch2 {
          0%   { transform: translate(2px, 1px) skewX(1deg); }
          25%  { transform: translate(-2px, -1px) skewX(-1deg); }
          50%  { transform: translate(1px, -2px) skewX(0.5deg); }
          75%  { transform: translate(-1px, 1px) skewX(-0.5deg); }
          100% { transform: translate(2px, 1px) skewX(1deg); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>

        <motion.nav
            className="fixed top-0 left-0 right-0 z-[100] px-4 mt-4 md:mt-8 w-full"
            style={{ y: navY }}
            animate={{ opacity: hidden ? 0.4 : 1 }}
            transition={{ opacity: { duration: 0.3 } }}
        >
          <motion.div
              className="max-w-7xl mx-auto flex items-center justify-center lg:justify-between"
          >
            {/* Left Spacer */}
            <div className="hidden lg:block w-[180px]" />

            {/* ── Center Pill ── */}
            <motion.div
                className="relative flex items-center gap-3 p-2 rounded-full border mx-auto lg:mx-0 overflow-hidden"
                animate={{
                  borderColor: isScrolled ? 'rgba(141,255,105,0.2)' : 'rgba(255,255,255,0.1)',
                  backgroundColor: isScrolled ? 'rgba(3,7,18,0.85)' : 'rgba(255,255,255,0.04)',
                  boxShadow: isScrolled
                      ? '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(141,255,105,0.1), inset 0 0 40px rgba(141,255,105,0.03)'
                      : 'none',
                }}
                transition={{ duration: 0.4 }}
                style={{ backdropFilter: 'blur(24px)' }}
            >
              {/* Animated border gradient when scrolled */}
              <AnimatePresence>
                {isScrolled && (
                    <motion.div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                          background:
                              'linear-gradient(90deg, transparent, rgba(141,255,105,0.03), rgba(97,218,251,0.03), transparent)',
                        }}
                    />
                )}
              </AnimatePresence>

              {/* Scroll Progress Bar inside pill */}
              <ScrollProgressBar scrollYProgress={scrollYProgress} />

              {/* Logo */}
              <AnimatedLogo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

              {/* Desktop Links */}
              <div className="hidden md:flex items-center px-4 gap-1">
                {NAV_LINKS.map((link) => (
                    <NavLink
                        key={link.id}
                        link={link}
                        isActive={activeSection === link.id}
                        onClick={handleNavClick}
                    />
                ))}
              </div>

              {/* Mobile Toggle */}
              <MagneticButton strength={0.5} className="md:hidden">
                <motion.button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-3 text-white rounded-full transition-colors"
                    style={{ background: isMenuOpen ? 'rgba(141,255,105,0.1)' : 'transparent' }}
                    whileTap={{ scale: 0.85 }}
                    whileHover={{ background: 'rgba(141,255,105,0.08)' }}
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                          <X className="w-6 h-6 text-[#8DFF69]" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                          <Menu className="w-6 h-6" />
                        </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </MagneticButton>
            </motion.div>

            {/* Right: Hire Me */}
            <div className="hidden lg:flex w-[180px] justify-end">
              <HireMeButton onClick={() => handleNavClick('contact')} />
            </div>
          </motion.div>
        </motion.nav>

        {/* Mobile Menu */}
        <MobileMenu
            isOpen={isMenuOpen}
            links={NAV_LINKS}
            activeSection={activeSection}
            onNavClick={handleNavClick}
        />
      </>
  );
};

export default Navbar;