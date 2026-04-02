import React, { useState, useRef, useEffect } from "react";
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
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Send,
  MessageSquare,
  Zap,
  CheckCircle,
  AlertCircle,
  Phone,
} from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../../utils/constants";

/* ══════════════════════════════════════════
   MAGNETIC WRAPPER
══════════════════════════════════════════ */
const Magnetic = ({ children, strength = 0.25 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
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
   FLOATING PARTICLES
══════════════════════════════════════════ */
const FloatingParticle = ({ i }) => {
  const colors = ["#8DFF69", "#61DAFB", "#A78BFA", "#F472B6"];
  const color = colors[i % colors.length];
  const size = (i % 3) + 2;
  const left = (i * 17 + 5) % 100;
  const duration = 8 + (i % 8);
  const delay = (i * 0.7) % 6;
  return (
      <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: size, height: size,
            left: `${left}%`, bottom: -10,
            background: color,
            boxShadow: `0 0 ${size * 3}px ${color}`,
          }}
          animate={{ y: [0, -(400 + (i % 300))], opacity: [0, 0.9, 0.5, 0], scale: [0, 1, 0.7, 0] }}
          transition={{ duration, delay, repeat: Infinity, ease: "easeOut" }}
      />
  );
};

/* ══════════════════════════════════════════
   ANIMATED INPUT FIELD
══════════════════════════════════════════ */
const AnimatedInput = ({ label, name, type = "text", value, onChange, placeholder, isTextarea }) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;
  const Tag = isTextarea ? "textarea" : "input";
  return (
      <motion.div className="relative group" animate={{ y: 0, opacity: 1 }}>
        {/* Glow border on focus */}
        <motion.div
            className="absolute -inset-[1px] rounded-2xl pointer-events-none"
            animate={{
              opacity: focused ? 1 : 0,
              background: focused
                  ? "linear-gradient(135deg, rgba(141,255,105,0.4), rgba(97,218,251,0.3), rgba(167,139,250,0.2))"
                  : "transparent",
            }}
            transition={{ duration: 0.3 }}
            style={{ zIndex: 0, filter: "blur(1px)" }}
        />
        <div
            className="relative z-10"
            style={{
              background: focused ? "rgba(141,255,105,0.03)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${focused ? "rgba(141,255,105,0.3)" : "rgba(255,255,255,0.08)"}`,
              borderRadius: 16,
              transition: "all 0.3s ease",
            }}
        >
          {/* Floating label */}
          <motion.label
              className="absolute left-5 pointer-events-none font-semibold text-xs uppercase tracking-widest"
              animate={{
                top: focused || hasValue ? 10 : "50%",
                y: focused || hasValue ? 0 : (isTextarea ? -40 : "-50%"),
                fontSize: focused || hasValue ? "9px" : "11px",
                color: focused ? "#8DFF69" : "rgba(156,163,175,0.6)",
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
          >
            {label}
          </motion.label>
          <Tag
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              rows={isTextarea ? 5 : undefined}
              className="w-full bg-transparent text-white outline-none resize-none font-medium"
              style={{
                padding: focused || hasValue ? "28px 20px 14px" : "20px",
                transition: "padding 0.25s ease",
              }}
              placeholder={focused && !hasValue ? placeholder : ""}
          />
        </div>
        {/* Scan line on focus */}
        <AnimatePresence>
          {focused && (
              <motion.div
                  className="absolute left-5 right-5 h-[1px] pointer-events-none"
                  style={{ bottom: 12, background: "linear-gradient(90deg, transparent, #8DFF69, transparent)" }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 0.6 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
              />
          )}
        </AnimatePresence>
      </motion.div>
  );
};

/* ══════════════════════════════════════════
   SOCIAL LINK ITEM
══════════════════════════════════════════ */
const SocialItem = ({ href, Icon, label, color, delay }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  return (
      <motion.a
          ref={ref}
          href={href} target="_blank" rel="noopener noreferrer"
          className="relative flex flex-col items-center gap-2 group"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.8 }}
          transition={{ delay, type: "spring", stiffness: 250 }}
          whileHover={{ y: -8 }}
          whileTap={{ scale: 0.88 }}
      >
        <motion.div
            className="w-12 h-12 rounded-2xl flex items-center justify-center relative overflow-hidden"
            animate={{
              background: hovered ? `${color}22` : "rgba(255,255,255,0.04)",
              borderColor: hovered ? color : "rgba(255,255,255,0.08)",
              boxShadow: hovered ? `0 0 20px ${color}55, 0 0 40px ${color}22` : "none",
            }}
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {hovered && (
                <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: `${color}15` }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
            )}
          </AnimatePresence>
          <Icon className="w-5 h-5 relative z-10" style={{ color: hovered ? color : "rgba(156,163,175,1)" }} />
        </motion.div>
        <motion.span
            className="text-[9px] font-black uppercase tracking-widest"
            animate={{ color: hovered ? color : "rgba(107,114,128,1)", opacity: hovered ? 1 : 0.6 }}
            transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
      </motion.a>
  );
};

/* ══════════════════════════════════════════
   CONTACT INFO CARD
══════════════════════════════════════════ */
const InfoCard = ({ Icon, title, value, href, color = "#8DFF69", delay }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  const El = href ? "a" : "div";
  const elProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};
  return (
      <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ delay, type: "spring", stiffness: 200 }}
      >
        <El
            {...elProps}
            className="flex items-center gap-4 group cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
          <motion.div
              className="relative w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0"
              animate={{
                background: hovered ? `${color}20` : "rgba(255,255,255,0.03)",
                borderColor: hovered ? `${color}50` : "rgba(255,255,255,0.08)",
                boxShadow: hovered ? `0 0 25px ${color}40` : "none",
              }}
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              transition={{ duration: 0.3 }}
          >
            <AnimatePresence>
              {hovered && (
                  <motion.div
                      className="absolute inset-0"
                      style={{ background: `${color}10` }}
                      initial={{ scale: 0, opacity: 1, borderRadius: "50%" }}
                      animate={{ scale: 2, opacity: 0, borderRadius: "0%" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                  />
              )}
            </AnimatePresence>
            <motion.div animate={{ rotate: hovered ? 15 : 0, scale: hovered ? 1.2 : 1 }}>
              <Icon className="w-5 h-5 relative z-10" style={{ color }} />
            </motion.div>
          </motion.div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] font-black mb-1" style={{ color: "rgba(107,114,128,1)" }}>
              {title}
            </p>
            <motion.p
                className="font-bold text-sm"
                animate={{ color: hovered ? color : "#ffffff" }}
                transition={{ duration: 0.2 }}
            >
              {value}
            </motion.p>
          </div>
        </El>
      </motion.div>
  );
};

/* ══════════════════════════════════════════
   MAIN CONTACT SECTION
══════════════════════════════════════════ */
const Contact = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, margin: "-10% 0px -10% 0px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const fadeOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "Please fill in all fields." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({ type: "error", message: "Please enter a valid email." });
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1600));
    setSending(false);
    setStatus({ type: "success", message: "Message sent! I'll get back to you soon 🚀" });
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setStatus({ type: "", message: "" }), 5000);
  };

  const socials = [
    { key: "github",    href: SOCIAL_LINKS.github,    Icon: Github,    label: "GitHub",    color: "#fff"     },
    { key: "linkedin",  href: "https://linkedin.com",  Icon: Linkedin,  label: "LinkedIn",  color: "#0A66C2"  },
    { key: "twitter",   href: "https://twitter.com",   Icon: Twitter,   label: "Twitter",   color: "#1DA1F2"  },
    { key: "facebook",  href: "https://facebook.com",  Icon: Facebook,  label: "Facebook",  color: "#1877F2"  },
    { key: "instagram", href: "https://instagram.com", Icon: Instagram, label: "Instagram", color: "#E1306C"  },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
    exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -30, filter: "blur(6px)", transition: { duration: 0.35 } },
  };

  return (
      <section
          id="contact"
          ref={sectionRef}
          className="relative py-32 overflow-hidden"
      >
        {/* ── Section-specific ambient glows — Hero-র মতো ── */}
        <motion.div
            className="absolute top-[-60px] left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(141,255,105,0.08) 0%, transparent 70%)",
              zIndex: 0,
              y: y1,
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute bottom-0 right-0 w-[550px] h-[550px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(97,218,251,0.07) 0%, transparent 70%)",
              zIndex: 0,
              y: y2,
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.75, 0.4] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 60%)",
              zIndex: 0,
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        <motion.div
            className="absolute top-1/4 right-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(244,114,182,0.05) 0%, transparent 70%)",
              zIndex: 0,
            }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* ── Decorative corner lines ── */}
        <div
            className="absolute top-0 left-0 w-px h-48 pointer-events-none"
            style={{ background: "linear-gradient(180deg, rgba(141,255,105,0.25), transparent)", zIndex: 1 }}
        />
        <div
            className="absolute bottom-0 right-0 w-px h-48 pointer-events-none"
            style={{ background: "linear-gradient(0deg, rgba(97,218,251,0.2), transparent)", zIndex: 1 }}
        />

        {/* ── Particles ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
          {Array.from({ length: 20 }, (_, i) => <FloatingParticle key={i} i={i} />)}
        </div>

        {/* ── Scanline sweep (section-wide) ── */}
        <motion.div
            className="absolute left-0 right-0 h-[1px] pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(141,255,105,0.12), transparent)",
              zIndex: 1,
            }}
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        />

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">

          {/* ── Section Header ── */}
          <AnimatePresence mode="wait">
            {inView && (
                <motion.div
                    key="header"
                    className="text-center max-w-3xl mx-auto mb-20"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                  <motion.div variants={itemVariants} className="flex justify-center mb-6">
                    <motion.span
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]"
                        style={{ background: "rgba(141,255,105,0.07)", border: "1px solid rgba(141,255,105,0.2)", color: "#8DFF69" }}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(141,255,105,0.2)" }}
                    >
                      <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-[#8DFF69]"
                          animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <MessageSquare className="w-3.5 h-3.5" />
                      Get in touch
                    </motion.span>
                  </motion.div>

                  <motion.h2
                      variants={itemVariants}
                      className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
                  >
                    <span className="text-white">Let's </span>
                    <span
                        style={{
                          background: "linear-gradient(135deg, #8DFF69 0%, #61DAFB 50%, #A78BFA 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                    >
                  work
                </span>
                    <span className="text-white"> together</span>
                  </motion.h2>

                  <motion.p variants={itemVariants} className="text-gray-400 text-base leading-relaxed">
                    Have a project in mind? Let's turn your ideas into{" "}
                    <span className="text-[#8DFF69] font-semibold">reality</span>.
                  </motion.p>

                  <motion.div
                      variants={itemVariants}
                      className="mx-auto mt-6 h-px rounded-full"
                      style={{
                        background: "linear-gradient(90deg, transparent, #8DFF69, #61DAFB, transparent)",
                        width: "40%",
                      }}
                  />
                </motion.div>
            )}
          </AnimatePresence>

          {/* ── Two Columns ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* LEFT — Info Card */}
            <AnimatePresence mode="wait">
              {inView && (
                  <motion.div
                      key="left"
                      style={{ rotate: rotate1 }}
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="relative p-1 rounded-3xl overflow-hidden"
                      whileHover={{ scale: 1.01 }}
                  >
                    {/* Animated rotating border */}
                    <motion.div
                        className="absolute -inset-[1px] rounded-3xl pointer-events-none"
                        style={{
                          background: "linear-gradient(135deg, rgba(141,255,105,0.3), rgba(97,218,251,0.2), rgba(167,139,250,0.15), rgba(141,255,105,0.3))",
                          backgroundSize: "300% 300%",
                        }}
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="absolute inset-0 rounded-3xl" style={{ filter: "blur(8px)", opacity: 0.5, background: "inherit" }} />
                    </motion.div>

                    <div
                        className="relative h-full rounded-3xl p-8 space-y-8"
                        style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(20px)" }}
                    >
                      <motion.h3 variants={itemVariants} className="text-2xl font-black text-white">
                        Contact Information
                      </motion.h3>

                      <motion.div variants={itemVariants} className="space-y-6">
                        <InfoCard Icon={Mail}   title="Email"    value={PERSONAL_INFO.email}                    href={`mailto:${PERSONAL_INFO.email}`} color="#8DFF69" delay={0.1} />
                        <InfoCard Icon={MapPin} title="Location" value={PERSONAL_INFO.location || "Rajshahi, Bangladesh"} color="#61DAFB" delay={0.2} />
                      </motion.div>

                      <motion.div
                          variants={itemVariants}
                          className="h-[1px]"
                          style={{ background: "linear-gradient(90deg, transparent, rgba(141,255,105,0.2), transparent)" }}
                      />

                      <motion.div variants={itemVariants}>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 mb-6">
                          Connect with me
                        </p>
                        <div className="flex gap-4 flex-wrap">
                          {socials.map((s, i) => (
                              <SocialItem key={s.key} href={s.href} Icon={s.Icon} label={s.label} color={s.color} delay={i * 0.07} />
                          ))}
                        </div>
                      </motion.div>

                      {/* Availability pulse badge */}
                      <motion.div
                          variants={itemVariants}
                          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                          style={{ background: "rgba(141,255,105,0.05)", border: "1px solid rgba(141,255,105,0.15)" }}
                          animate={{ boxShadow: ["0 0 0px rgba(141,255,105,0)", "0 0 24px rgba(141,255,105,0.12)", "0 0 0px rgba(141,255,105,0)"] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        <div className="relative">
                          <motion.span
                              className="absolute inset-0 rounded-full bg-[#8DFF69]"
                              animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                              transition={{ duration: 1.8, repeat: Infinity }}
                          />
                          <span className="relative w-3 h-3 rounded-full bg-[#8DFF69] block" />
                        </div>
                        <span className="text-xs font-bold text-[#8DFF69]">
                      Available for new projects
                    </span>
                      </motion.div>
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>

            {/* RIGHT — Form */}
            <AnimatePresence mode="wait">
              {inView && (
                  <motion.div
                      key="right"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                  >
                    <form
                        onSubmit={handleSubmit}
                        className="relative p-8 rounded-3xl overflow-hidden"
                        style={{
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          backdropFilter: "blur(20px)",
                        }}
                    >
                      {/* Scanline sweep inside form */}
                      <motion.div
                          className="absolute left-0 right-0 h-[1px] pointer-events-none"
                          style={{ background: "linear-gradient(90deg, transparent, rgba(141,255,105,0.15), transparent)", top: 0 }}
                          animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      />

                      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <AnimatedInput label="Your Name"  name="name"  value={formData.name}    onChange={handleChange} placeholder="Enter your name"  />
                        <AnimatedInput label="Your Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
                      </motion.div>

                      <motion.div variants={itemVariants} className="mb-6">
                        <AnimatedInput label="Message" name="message" value={formData.message} onChange={handleChange} placeholder="How can I help you?" isTextarea />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Magnetic strength={0.2}>
                          <motion.button
                              type="submit"
                              disabled={sending}
                              className="relative w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-black overflow-hidden"
                              style={{
                                background: "linear-gradient(135deg, #8DFF69 0%, #61DAFB 100%)",
                                boxShadow: "0 10px 30px rgba(141,255,105,0.3)",
                              }}
                              whileHover={{ scale: 1.02, boxShadow: "0 15px 40px rgba(141,255,105,0.5)" }}
                              whileTap={{ scale: 0.97 }}
                          >
                            {/* Shimmer */}
                            <motion.div
                                className="absolute inset-0"
                                style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)" }}
                                animate={{ x: ["-200%", "200%"] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <AnimatePresence mode="wait">
                              {sending ? (
                                  <motion.div key="sending" className="flex items-center gap-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                    <motion.div
                                        className="w-4 h-4 rounded-full border-2 border-black border-t-transparent"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                    />
                                    Sending...
                                  </motion.div>
                              ) : (
                                  <motion.div key="send" className="flex items-center gap-2 relative z-10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                    <Zap className="w-4 h-4" />
                                    Send Message
                                    <motion.div animate={{ x: [0, 5, 0], y: [0, -3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                                      <Send className="w-4 h-4" />
                                    </motion.div>
                                  </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        </Magnetic>
                      </motion.div>

                      <AnimatePresence>
                        {status.message && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: "auto" }}
                                exit={{ opacity: 0, y: -10, height: 0 }}
                                className="mt-4 p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold"
                                style={
                                  status.type === "success"
                                      ? { background: "rgba(141,255,105,0.08)", border: "1px solid rgba(141,255,105,0.2)", color: "#8DFF69" }
                                      : { background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444" }
                                }
                            >
                              {status.type === "success"
                                  ? <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                  : <AlertCircle className="w-5 h-5 flex-shrink-0" />
                              }
                              {status.message}
                            </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
  );
};

export default Contact;