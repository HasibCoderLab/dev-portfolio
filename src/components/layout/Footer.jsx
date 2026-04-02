import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "motion/react";
import {
  Github, Linkedin, Twitter, Facebook, Instagram, Youtube,
  Mail, MapPin, Heart, ExternalLink, Clock, ArrowUp, Code2,
} from "lucide-react";
import { PERSONAL_INFO, NAV_LINKS } from "../../utils/constants";

/* ══════════════════════════════════════════
   SOCIAL LINKS
══════════════════════════════════════════ */
const SOCIALS = [
  { key: "github",    href: "https://github.com/HasibCoderLab",          Icon: Github,    label: "GitHub",    color: "#e2e8f0" },
  { key: "linkedin",  href: "https://www.linkedin.com/in/coderhasibh",   Icon: Linkedin,  label: "LinkedIn",  color: "#0A66C2" },
  { key: "twitter",   href: "https://x.com/coderhasibh",                 Icon: Twitter,   label: "Twitter",   color: "#1DA1F2" },
  { key: "facebook",  href: "https://www.facebook.com/coderhasibh/",     Icon: Facebook,  label: "Facebook",  color: "#1877F2" },
  { key: "instagram", href: "https://www.instagram.com/coderhasibh/",    Icon: Instagram, label: "Instagram", color: "#E1306C" },
  { key: "youtube",   href: "https://www.youtube.com/@CodeFusionary",    Icon: Youtube,   label: "YouTube",   color: "#FF0000" },
];

/* ══════════════════════════════════════════
   MAGNETIC
══════════════════════════════════════════ */
const Magnetic = ({ children, strength = 0.3 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 22 });
  const sy = useSpring(y, { stiffness: 300, damping: 22 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  return (
      <motion.div ref={ref} style={{ x: sx, y: sy }}
                  onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }}>
        {children}
      </motion.div>
  );
};

/* ══════════════════════════════════════════
   LIVE CLOCK
══════════════════════════════════════════ */
const LiveClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  const h = time.getHours(); const m = time.getMinutes(); const s = time.getSeconds();
  const ampm = h >= 12 ? "PM" : "AM";
  const f12 = (n) => String(n % 12 || 12).padStart(2, "0");
  const pad = (n) => String(n).padStart(2, "0");
  return (
      <div className="flex items-center gap-1">
        <motion.span key={`h${h}`} className="font-mono font-black text-white text-sm" initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{f12(h)}</motion.span>
        <motion.span className="text-[#8DFF69] font-black text-sm" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>:</motion.span>
        <motion.span key={`m${m}`} className="font-mono font-black text-white text-sm" initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{pad(m)}</motion.span>
        <motion.span className="text-[#8DFF69] font-black text-sm" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}>:</motion.span>
        <motion.span key={s} className="font-mono font-black text-[#8DFF69] text-sm" initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.12 }}>{pad(s)}</motion.span>
        <span className="text-[9px] font-black text-gray-500 ml-1">{ampm}</span>
      </div>
  );
};

/* ══════════════════════════════════════════
   SOCIAL ICON
══════════════════════════════════════════ */
const SocialIcon = ({ href, Icon, label, color, index }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  return (
      <motion.a ref={ref} href={href} target="_blank" rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5"
                onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
                initial={{ opacity: 0, y: 28, scale: 0.6 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.6 }}
                transition={{ delay: 0.05 + index * 0.07, type: "spring", stiffness: 260 }}
                whileHover={{ y: -7 }} whileTap={{ scale: 0.82 }}
      >
        <Magnetic strength={0.45}>
          <motion.div
              className="relative w-11 h-11 rounded-2xl flex items-center justify-center overflow-hidden"
              animate={{
                background: hovered ? `${color}1A` : "rgba(255,255,255,0.04)",
                borderColor: hovered ? `${color}70` : "rgba(255,255,255,0.08)",
                boxShadow: hovered ? `0 0 22px ${color}55, 0 0 44px ${color}18` : "none",
              }}
              style={{ border: "1px solid rgba(255,255,255,0.08)" }} transition={{ duration: 0.28 }}
          >
            <AnimatePresence>
              {hovered && (
                  <motion.div className="absolute inset-0 rounded-2xl" style={{ background: `${color}12` }}
                              initial={{ scale: 0, opacity: 1 }} animate={{ scale: 2.8, opacity: 0 }} transition={{ duration: 0.55 }} />
              )}
            </AnimatePresence>
            <Icon style={{ width: 18, height: 18, color: hovered ? color : "rgba(156,163,175,1)", transition: "color 0.22s", position: "relative", zIndex: 10 }} />
          </motion.div>
        </Magnetic>
        <motion.span className="text-[8px] font-black uppercase tracking-widest"
                     animate={{ color: hovered ? color : "rgba(75,85,99,1)", opacity: hovered ? 1 : 0.65 }} transition={{ duration: 0.2 }}
        >{label}</motion.span>
      </motion.a>
  );
};

/* ══════════════════════════════════════════
   NAV LINK
══════════════════════════════════════════ */
const FooterNavLink = ({ link, index }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  return (
      <motion.li ref={ref}
                 initial={{ opacity: 0, x: -22 }}
                 animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -22 }}
                 transition={{ delay: index * 0.06, type: "spring", stiffness: 220 }}
      >
        <motion.a href={`#${link.id}`} className="flex items-center gap-2 text-sm font-semibold"
                  onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
                  animate={{ color: hovered ? "#8DFF69" : "rgba(107,114,128,1)" }}
                  whileHover={{ x: 7 }} transition={{ duration: 0.18 }}
        >
          <motion.span className="w-1.5 h-1.5 rounded-full"
                       animate={{ background: hovered ? "#8DFF69" : "rgba(107,114,128,0.4)", scale: hovered ? 1.6 : 1, boxShadow: hovered ? "0 0 7px #8DFF69" : "none" }}
                       transition={{ duration: 0.18 }} />
          {link.label}
          <motion.div animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -5 }} transition={{ duration: 0.18 }}>
            <ExternalLink style={{ width: 12, height: 12, color: "#8DFF69" }} />
          </motion.div>
        </motion.a>
      </motion.li>
  );
};

/* ══════════════════════════════════════════
   SCROLL TO TOP
══════════════════════════════════════════ */
const ScrollToTopBtn = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 350);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
      <AnimatePresence>
        {visible && (
            <Magnetic strength={0.55}>
              <motion.button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
                  className="relative w-11 h-11 rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer"
                  style={{
                    background: hovered ? "linear-gradient(135deg,#8DFF69,#61DAFB)" : "rgba(141,255,105,0.08)",
                    border: "1px solid rgba(141,255,105,0.28)",
                  }}
                  initial={{ opacity: 0, scale: 0, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0, rotate: 90 }}
                  whileHover={{ scale: 1.12, boxShadow: "0 0 26px rgba(141,255,105,0.42)" }}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: "spring", stiffness: 320 }}
              >
                <AnimatePresence>
                  {hovered && (
                      <motion.div className="absolute inset-0 rounded-2xl" style={{ background: "rgba(255,255,255,0.12)" }}
                                  initial={{ scale: 0, opacity: 1 }} animate={{ scale: 2.2, opacity: 0 }} transition={{ duration: 0.45 }} />
                  )}
                </AnimatePresence>
                <motion.div animate={{ y: hovered ? -2 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 8, repeat: hovered ? Infinity : 0, repeatType: "reverse" }}>
                  <ArrowUp style={{ width: 18, height: 18, color: hovered ? "#000" : "#8DFF69" }} />
                </motion.div>
              </motion.button>
            </Magnetic>
        )}
      </AnimatePresence>
  );
};

/* ══════════════════════════════════════════
   GLOW DIVIDER
══════════════════════════════════════════ */
const GlowDivider = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  return (
      <div ref={ref} className="relative my-12 h-[1px] overflow-visible">
        <motion.div className="absolute inset-0"
                    style={{ background: "linear-gradient(90deg,transparent,rgba(141,255,105,0.18),rgba(97,218,251,0.12),rgba(167,139,250,0.1),rgba(141,255,105,0.18),transparent)" }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
        />
        <motion.div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                    style={{ background: "#8DFF69", boxShadow: "0 0 10px #8DFF69, 0 0 22px rgba(141,255,105,0.5)" }}
                    animate={{ left: ["0%", "100%", "0%"] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
  );
};

/* ══════════════════════════════════════════
   FOOTER LOGO
══════════════════════════════════════════ */
const FooterLogo = () => {
  const [hovered, setHovered] = useState(false);
  return (
      <motion.div className="flex items-center gap-3 cursor-pointer w-fit"
                  onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <motion.div className="relative w-11 h-11 rounded-2xl flex items-center justify-center overflow-hidden"
                    animate={{
                      background: hovered ? "rgba(141,255,105,0.2)" : "rgba(141,255,105,0.07)",
                      boxShadow: hovered ? "0 0 22px rgba(141,255,105,0.4),inset 0 0 18px rgba(141,255,105,0.1)" : "none",
                    }}
                    style={{ border: "1px solid rgba(141,255,105,0.18)" }} transition={{ duration: 0.28 }}
        >
          <AnimatePresence>
            {hovered && (
                <motion.div className="absolute inset-0 rounded-2xl bg-[#8DFF69]/10"
                            initial={{ scale: 0 }} animate={{ scale: 2.2, opacity: 0 }} transition={{ duration: 0.45 }} />
            )}
          </AnimatePresence>
          <img src={PERSONAL_INFO.icon} alt="Logo" className="w-8 h-8 object-contain relative z-10" />
        </motion.div>
        <div className="flex items-center">
          {"HASIB".split("").map((l, i) => (
              <motion.span key={i} className="font-black text-xl tracking-tighter"
                           animate={{ color: hovered ? "#8DFF69" : "#ffffff", y: hovered ? -2 : 0 }}
                           transition={{ delay: i * 0.035, type: "spring", stiffness: 420 }}
              >{l}</motion.span>
          ))}
          <motion.span className="text-lg ml-1" animate={{ rotate: hovered ? 22 : 0 }} transition={{ type: "spring", stiffness: 280 }}>
            😊
          </motion.span>
        </div>
      </motion.div>
  );
};

/* ══════════════════════════════════════════
   MAIN FOOTER
══════════════════════════════════════════ */
const Footer = () => {
  const footerRef = useRef(null);
  const inView = useInView(footerRef, { once: false, margin: "-5% 0px" });

  const { scrollYProgress } = useScroll({ target: footerRef, offset: ["start end", "end end"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [55, -18]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-38, 18]);
  const y3 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const cV = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
    exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  };
  const iV = {
    hidden:  { opacity: 0, y: 38, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, y: -18, filter: "blur(5px)", transition: { duration: 0.28 } },
  };

  return (
      <footer
          ref={footerRef}
          className="relative overflow-hidden pt-20 pb-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        {/* ── Section-specific ambient glows — Hero-র মতো ── */}
        <motion.div
            className="absolute top-[-40px] left-[-60px] w-[480px] h-[480px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(141,255,105,0.07) 0%, transparent 70%)",
              zIndex: 0,
              y: y1,
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute bottom-0 right-[-40px] w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(97,218,251,0.06) 0%, transparent 70%)",
              zIndex: 0,
              y: y2,
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(167,139,250,0.03) 0%, transparent 70%)",
              zIndex: 0,
              y: y3,
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />

        {/* ── Animated grid ── */}
        <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.015,
              backgroundImage: "linear-gradient(rgba(141,255,105,1) 1px,transparent 1px),linear-gradient(90deg,rgba(141,255,105,1) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
              zIndex: 0,
            }}
            animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        {/* ── Decorative corner lines ── */}
        <div
            className="absolute top-0 left-0 w-px h-32 pointer-events-none"
            style={{ background: "linear-gradient(180deg, rgba(141,255,105,0.2), transparent)", zIndex: 1 }}
        />
        <div
            className="absolute top-0 right-0 w-px h-32 pointer-events-none"
            style={{ background: "linear-gradient(180deg, rgba(97,218,251,0.15), transparent)", zIndex: 1 }}
        />

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <AnimatePresence mode="wait">
            {inView && (
                <motion.div
                    key="main"
                    variants={cV}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="grid grid-cols-1 md:grid-cols-3 gap-12"
                >
                  {/* LEFT */}
                  <motion.div variants={iV} className="space-y-6">
                    <FooterLogo />
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{PERSONAL_INFO.tagline}</p>
                    <div className="space-y-3">
                      <motion.a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-3 w-fit" whileHover={{ x: 4 }}>
                        <motion.div
                            className="p-2 rounded-xl"
                            style={{ background: "rgba(141,255,105,0.07)", border: "1px solid rgba(141,255,105,0.14)" }}
                            whileHover={{ background: "rgba(141,255,105,0.14)", boxShadow: "0 0 14px rgba(141,255,105,0.18)" }}
                        >
                          <Mail className="w-4 h-4 text-[#8DFF69]" />
                        </motion.div>
                        <motion.span className="text-gray-500 text-sm font-medium" whileHover={{ color: "#8DFF69" }}>
                          {PERSONAL_INFO.email}
                        </motion.span>
                      </motion.a>
                      <motion.div className="flex items-center gap-3 w-fit" whileHover={{ x: 4 }}>
                        <div className="p-2 rounded-xl" style={{ background: "rgba(97,218,251,0.07)", border: "1px solid rgba(97,218,251,0.14)" }}>
                          <MapPin className="w-4 h-4 text-[#61DAFB]" />
                        </div>
                        <span className="text-gray-500 text-sm font-medium">{PERSONAL_INFO.location || "Bangladesh"}</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* MIDDLE */}
                  <motion.div variants={iV} className="flex flex-col md:items-center">
                    <div className="w-fit">
                      <p className="font-black mb-7 text-[10px] uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Quick Links
                      </p>
                      <ul className="space-y-4">
                        {NAV_LINKS.map((l, i) => <FooterNavLink key={l.id} link={l} index={i} />)}
                      </ul>
                    </div>
                  </motion.div>

                  {/* RIGHT */}
                  <motion.div variants={iV} className="flex flex-col md:items-end gap-7">
                    <div className="w-full">
                      <p className="font-black mb-7 text-[10px] uppercase tracking-[0.22em] md:text-right" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Social Connect
                      </p>
                      <div className="flex gap-3 flex-wrap md:justify-end">
                        {SOCIALS.map((s, i) => <SocialIcon key={s.key} {...s} index={i} />)}
                      </div>
                    </div>
                    {/* Clock */}
                    <motion.div
                        className="flex items-center gap-3 px-4 py-2.5 rounded-2xl"
                        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                        whileHover={{ borderColor: "rgba(141,255,105,0.2)", background: "rgba(141,255,105,0.02)" }}
                        transition={{ duration: 0.28 }}
                    >
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                        <Clock className="w-4 h-4 text-[#8DFF69]" />
                      </motion.div>
                      <LiveClock />
                      <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">BD</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
            )}
          </AnimatePresence>

          <GlowDivider />

          {/* Bottom bar */}
          <AnimatePresence mode="wait">
            {inView && (
                <motion.div
                    key="bottom"
                    className="flex flex-col md:flex-row justify-between items-center gap-5"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: 0.35, duration: 0.55 }}
                >
                  <motion.div className="text-gray-600 text-xs font-medium tracking-wide" whileHover={{ color: "#9ca3af" }}>
                    © {new Date().getFullYear()}{" "}
                    <motion.span className="text-gray-400 font-bold" whileHover={{ color: "#8DFF69" }}>
                      {PERSONAL_INFO.name}
                    </motion.span>. All Rights Reserved.
                  </motion.div>

                  <motion.div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>Built with</span>
                    <motion.div animate={{ scale: [1, 1.35, 1] }} transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}>
                      <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    </motion.div>
                    <span>using</span>
                    <motion.span
                        className="font-black px-2 py-0.5 rounded-lg text-[10px] uppercase tracking-wider inline-flex items-center gap-1"
                        style={{ background: "rgba(141,255,105,0.07)", border: "1px solid rgba(141,255,105,0.14)", color: "#8DFF69" }}
                        whileHover={{ background: "rgba(141,255,105,0.14)", scale: 1.06 }}
                    >
                      <Code2 className="w-3 h-3" />React & Tailwind
                    </motion.span>
                  </motion.div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Back to top</span>
                    <ScrollToTopBtn />
                  </div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </footer>
  );
};

export default Footer;