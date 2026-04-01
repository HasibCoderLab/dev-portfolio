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
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Heart,
  ExternalLink,
  Clock,
  ArrowUp,
  Code2,
  Zap,
  Star,
} from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS, NAV_LINKS } from "../../utils/constants";

/* ══════════════════════════════════════════
   MAGNETIC WRAPPER
══════════════════════════════════════════ */
const Magnetic = ({ children, strength = 0.3 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 22 });
  const sy = useSpring(y, { stiffness: 300, damping: 22 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
      <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave}>
        {children}
      </motion.div>
  );
};

/* ══════════════════════════════════════════
   LIVE CLOCK
══════════════════════════════════════════ */
const LiveClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();
  const ampm = h >= 12 ? "PM" : "AM";
  const fmt = (n) => String(n % 12 || 12).padStart(2, "0");
  const fmtS = (n) => String(n).padStart(2, "0");

  return (
      <div className="flex items-center gap-2">
        <motion.span
            key={h}
            className="font-mono font-black text-white text-sm"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
        >
          {fmt(h)}
        </motion.span>
        <motion.span
            className="text-[#8DFF69] font-black"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
        >
          :
        </motion.span>
        <motion.span
            key={m}
            className="font-mono font-black text-white text-sm"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
        >
          {fmtS(m)}
        </motion.span>
        <motion.span
            className="text-[#8DFF69] font-black"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
        >
          :
        </motion.span>
        <motion.span
            key={s}
            className="font-mono font-black text-[#8DFF69] text-sm"
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.15 }}
        >
          {fmtS(s)}
        </motion.span>
        <span className="text-[10px] font-black text-gray-500 ml-1">{ampm}</span>
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
      <motion.a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group flex flex-col items-center gap-1.5"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          initial={{ opacity: 0, y: 30, scale: 0.7 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.7 }}
          transition={{ delay: 0.1 + index * 0.08, type: "spring", stiffness: 250 }}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.85 }}
      >
        <Magnetic strength={0.4}>
          <motion.div
              className="relative w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden"
              animate={{
                background: hovered ? `${color}18` : "rgba(255,255,255,0.04)",
                borderColor: hovered ? `${color}60` : "rgba(255,255,255,0.08)",
                boxShadow: hovered ? `0 0 25px ${color}50, 0 0 50px ${color}20` : "none",
              }}
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              transition={{ duration: 0.3 }}
          >
            {/* Ripple */}
            <AnimatePresence>
              {hovered && (
                  <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{ background: `${color}12` }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                  />
              )}
            </AnimatePresence>
            <Icon
                className="w-5 h-5 relative z-10 transition-all duration-300"
                style={{ color: hovered ? color : "rgba(156,163,175,1)" }}
            />
          </motion.div>
        </Magnetic>

        <motion.span
            className="text-[8px] font-black uppercase tracking-widest"
            animate={{ color: hovered ? color : "rgba(75,85,99,1)", opacity: hovered ? 1 : 0.7 }}
            transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
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
      <motion.li
          ref={ref}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: index * 0.07, type: "spring", stiffness: 200 }}
      >
        <motion.a
            href={`#${link.id}`}
            className="flex items-center gap-2 text-sm font-semibold group"
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            animate={{ color: hovered ? "#8DFF69" : "rgba(107,114,128,1)" }}
            transition={{ duration: 0.2 }}
            whileHover={{ x: 6 }}
        >
          <motion.span
              className="w-1.5 h-1.5 rounded-full"
              animate={{
                background: hovered ? "#8DFF69" : "rgba(107,114,128,0.5)",
                scale: hovered ? 1.5 : 1,
                boxShadow: hovered ? "0 0 6px #8DFF69" : "none",
              }}
              transition={{ duration: 0.2 }}
          />
          {link.label}
          <motion.div
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
              transition={{ duration: 0.2 }}
          >
            <ExternalLink className="w-3 h-3" style={{ color: "#8DFF69" }} />
          </motion.div>
        </motion.a>
      </motion.li>
  );
};

/* ══════════════════════════════════════════
   SCROLL TO TOP BUTTON
══════════════════════════════════════════ */
const ScrollToTopBtn = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
      <AnimatePresence>
        {visible && (
            <Magnetic strength={0.5}>
              <motion.button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  onHoverStart={() => setHovered(true)}
                  onHoverEnd={() => setHovered(false)}
                  className="relative w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer"
                  style={{
                    background: hovered
                        ? "linear-gradient(135deg, #8DFF69, #61DAFB)"
                        : "rgba(141,255,105,0.1)",
                    border: "1px solid rgba(141,255,105,0.3)",
                  }}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0, y: 20 }}
                  whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(141,255,105,0.4)" }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
              >
                <AnimatePresence>
                  {hovered && (
                      <motion.div
                          className="absolute inset-0 rounded-2xl"
                          style={{ background: "rgba(255,255,255,0.1)" }}
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                      />
                  )}
                </AnimatePresence>
                <motion.div
                    animate={{ y: hovered ? -3 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10, repeat: hovered ? Infinity : 0, repeatType: "reverse" }}
                >
                  <ArrowUp className="w-5 h-5" style={{ color: hovered ? "#000" : "#8DFF69" }} />
                </motion.div>
              </motion.button>
            </Magnetic>
        )}
      </AnimatePresence>
  );
};

/* ══════════════════════════════════════════
   GLOWING DIVIDER
══════════════════════════════════════════ */
const GlowDivider = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

  return (
      <div ref={ref} className="relative my-12 h-[1px] overflow-visible">
        <motion.div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, transparent, rgba(141,255,105,0.15), rgba(97,218,251,0.1), rgba(167,139,250,0.1), rgba(141,255,105,0.15), transparent)" }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
        />
        {/* Moving glow dot */}
        <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{ background: "#8DFF69", boxShadow: "0 0 12px #8DFF69, 0 0 25px rgba(141,255,105,0.5)" }}
            animate={{ left: ["0%", "100%", "0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
  );
};

/* ══════════════════════════════════════════
   FOOTER LOGO
══════════════════════════════════════════ */
const FooterLogo = () => {
  const [hovered, setHovered] = useState(false);
  const letters = "HASIB".split("");

  return (
      <motion.div
          className="flex items-center gap-3 cursor-pointer w-fit"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <motion.div
            className="relative w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden"
            animate={{
              background: hovered ? "rgba(141,255,105,0.2)" : "rgba(141,255,105,0.08)",
              boxShadow: hovered ? "0 0 25px rgba(141,255,105,0.4), inset 0 0 20px rgba(141,255,105,0.1)" : "none",
            }}
            style={{ border: "1px solid rgba(141,255,105,0.2)" }}
            transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {hovered && (
                <motion.div
                    className="absolute inset-0 rounded-2xl bg-[#8DFF69]/10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
            )}
          </AnimatePresence>
          <img src={PERSONAL_INFO.icon} alt="Logo" className="w-9 h-9 object-contain relative z-10" />
        </motion.div>

        <div className="flex">
          {letters.map((l, i) => (
              <motion.span
                  key={i}
                  className="font-black text-2xl tracking-tighter"
                  animate={{ color: hovered ? "#8DFF69" : "#ffffff", y: hovered ? -2 : 0 }}
                  transition={{ delay: i * 0.04, type: "spring", stiffness: 400 }}
              >
                {l}
              </motion.span>
          ))}
          <motion.span
              className="text-xl ml-1"
              animate={{ rotate: hovered ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
          >
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
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -20]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 20]);

  const socials = [
    { key: "github",    href: SOCIAL_LINKS.github || "https://github.com/HasibCoderLab", Icon: Github,    label: "GitHub",    color: "#e2e8f0" },
    { key: "linkedin",  href: "https://linkedin.com",                                     Icon: Linkedin,  label: "LinkedIn",  color: "#0A66C2" },
    { key: "twitter",   href: "https://twitter.com",                                      Icon: Twitter,   label: "Twitter",   color: "#1DA1F2" },
    { key: "facebook",  href: "https://facebook.com",                                     Icon: Facebook,  label: "Facebook",  color: "#1877F2" },
    { key: "instagram", href: "https://instagram.com",                                    Icon: Instagram, label: "Instagram", color: "#E1306C" },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
    exit:   { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const itemVariants = {
    hidden:   { opacity: 0, y: 40, filter: "blur(8px)" },
    visible:  { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit:     { opacity: 0, y: -20, filter: "blur(5px)", transition: { duration: 0.3 } },
  };

  return (
      <footer
          ref={footerRef}
          className="relative overflow-hidden pt-20 pb-10"
          style={{ background: "#030712", borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        {/* CSS */}
        <style>{`
        @keyframes gridMove {
          0%   { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
      `}</style>

        {/* Animated grid bg */}
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.015,
              backgroundImage: "linear-gradient(rgba(141,255,105,1) 1px, transparent 1px), linear-gradient(90deg, rgba(141,255,105,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              animation: "gridMove 4s linear infinite",
            }}
        />

        {/* Parallax blobs */}
        <motion.div
            className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(141,255,105,0.06) 0%, transparent 70%)", y: y1 }}
        />
        <motion.div
            className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(97,218,251,0.05) 0%, transparent 70%)", y: y2 }}
        />

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">

          {/* ── Main Grid ── */}
          <AnimatePresence mode="wait">
            {inView && (
                <motion.div
                    key="footer-main"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="grid grid-cols-1 md:grid-cols-3 gap-12"
                >
                  {/* LEFT — Brand */}
                  <motion.div variants={itemVariants} className="space-y-6">
                    <FooterLogo />

                    <motion.p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                      {PERSONAL_INFO.tagline}
                    </motion.p>

                    <div className="space-y-4">
                      <motion.a
                          href={`mailto:${PERSONAL_INFO.email}`}
                          className="flex items-center gap-3 group w-fit"
                          whileHover={{ x: 4 }}
                      >
                        <motion.div
                            className="p-2 rounded-xl"
                            style={{ background: "rgba(141,255,105,0.08)", border: "1px solid rgba(141,255,105,0.15)" }}
                            whileHover={{ background: "rgba(141,255,105,0.15)", boxShadow: "0 0 15px rgba(141,255,105,0.2)" }}
                        >
                          <Mail className="w-4 h-4 text-[#8DFF69]" />
                        </motion.div>
                        <motion.span
                            className="text-gray-500 text-sm font-medium"
                            whileHover={{ color: "#8DFF69" }}
                        >
                          {PERSONAL_INFO.email}
                        </motion.span>
                      </motion.a>

                      <motion.div className="flex items-center gap-3 w-fit" whileHover={{ x: 4 }}>
                        <div
                            className="p-2 rounded-xl"
                            style={{ background: "rgba(97,218,251,0.08)", border: "1px solid rgba(97,218,251,0.15)" }}
                        >
                          <MapPin className="w-4 h-4 text-[#61DAFB]" />
                        </div>
                        <span className="text-gray-500 text-sm font-medium">{PERSONAL_INFO.location || "Bangladesh"}</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* MIDDLE — Nav Links */}
                  <motion.div variants={itemVariants} className="flex flex-col md:items-center">
                    <div className="w-fit">
                      <motion.h4
                          className="text-white font-black mb-8 text-xs uppercase tracking-[0.2em]"
                          style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        Quick Links
                      </motion.h4>
                      <ul className="space-y-4">
                        {NAV_LINKS.map((link, i) => (
                            <FooterNavLink key={link.id} link={link} index={i} />
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* RIGHT — Social + Clock */}
                  <motion.div variants={itemVariants} className="flex flex-col md:items-end gap-8">
                    <div className="w-full md:text-right">
                      <motion.h4
                          className="text-white font-black mb-8 text-xs uppercase tracking-[0.2em]"
                          style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        Social Connect
                      </motion.h4>
                      <div className="flex gap-4 flex-wrap md:justify-end">
                        {socials.map((s, i) => (
                            <SocialIcon key={s.key} href={s.href} Icon={s.Icon} label={s.label} color={s.color} index={i} />
                        ))}
                      </div>
                    </div>

                    {/* Live Clock */}
                    <motion.div
                        className="flex items-center gap-3 px-5 py-3 rounded-2xl"
                        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                        whileHover={{ borderColor: "rgba(141,255,105,0.2)", background: "rgba(141,255,105,0.02)" }}
                        transition={{ duration: 0.3 }}
                    >
                      <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        <Clock className="w-4 h-4 text-[#8DFF69]" />
                      </motion.div>
                      <LiveClock />
                      <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">BD</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
            )}
          </AnimatePresence>

          {/* ── Glowing Divider ── */}
          <GlowDivider />

          {/* ── Bottom Bar ── */}
          <AnimatePresence mode="wait">
            {inView && (
                <motion.div
                    key="footer-bottom"
                    className="flex flex-col md:flex-row justify-between items-center gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {/* Copyright */}
                  <motion.div className="text-gray-600 text-xs font-medium tracking-wide" whileHover={{ color: "#9ca3af" }}>
                    © {new Date().getFullYear()}{" "}
                    <motion.span className="text-gray-400 font-bold" whileHover={{ color: "#8DFF69" }}>
                      {PERSONAL_INFO.name}
                    </motion.span>
                    . All Rights Reserved.
                  </motion.div>

                  {/* Built with */}
                  <motion.div
                      className="flex items-center gap-2 text-xs text-gray-600"
                  >
                    <span>Built with</span>
                    <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    </motion.div>
                    <span>using</span>
                    <motion.span
                        className="font-black px-2 py-0.5 rounded-lg text-[10px] uppercase tracking-wider"
                        style={{ background: "rgba(141,255,105,0.08)", border: "1px solid rgba(141,255,105,0.15)", color: "#8DFF69" }}
                        whileHover={{ background: "rgba(141,255,105,0.15)", scale: 1.05 }}
                    >
                      <Code2 className="inline w-3 h-3 mr-1" />
                      React & Tailwind
                    </motion.span>
                  </motion.div>

                  {/* Scroll to top */}
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