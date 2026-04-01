/**
 * About.jsx — Industry-level animated About section
 * Path: src/components/sections/About.jsx
 *
 * Dependencies (already in your package.json):
 *   motion/react  |  react-icons/si  |  lucide-react
 */

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "motion/react";
import {
  SiReact, SiNextdotjs, SiTypescript,
  SiTailwindcss, SiNodedotjs, SiMongodb,
  SiJavascript, SiGit, SiVercel,
} from "react-icons/si";
import {
  Download, Code2, Braces, Gauge, ShieldCheck,
  ArrowUpRight, Terminal, Layers, Cpu,
} from "lucide-react";
import { PERSONAL_INFO, ABOUT_STATS } from "../../utils/constants";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const techStack = [
  { name: "React.js",   Icon: SiReact,      color: "#61DAFB", level: 92 },
  { name: "Next.js",    Icon: SiNextdotjs,  color: "#FFFFFF", level: 88 },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6", level: 80 },
  { name: "Tailwind",   Icon: SiTailwindcss,color: "#38B2AC", level: 95 },
  { name: "Node.js",    Icon: SiNodedotjs,  color: "#8DFF69", level: 78 },
  { name: "MongoDB",    Icon: SiMongodb,    color: "#47A248", level: 75 },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", level: 90 },
  { name: "Git",        Icon: SiGit,        color: "#F05032", level: 85 },
  { name: "Vercel",     Icon: SiVercel,     color: "#FFFFFF", level: 88 },
];

const pillars = [
  {
    icon: Code2,
    title: "Expertise",
    text: "Building fast, scalable web applications with modern architectures and best practices.",
    color: "#8DFF69",
    gradient: "from-[#8DFF69]/10 to-transparent",
  },
  {
    icon: Braces,
    title: "Clean Code",
    text: "Readable, maintainable, and well-documented code that scales with your business.",
    color: "#61DAFB",
    gradient: "from-[#61DAFB]/10 to-transparent",
  },
  {
    icon: Gauge,
    title: "Performance",
    text: "Pixel-perfect UIs optimised for Core Web Vitals — fast load, smooth interaction.",
    color: "#A78BFA",
    gradient: "from-[#A78BFA]/10 to-transparent",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    text: "Stable, tested code with long-term support and zero-compromise quality assurance.",
    color: "#F472B6",
    gradient: "from-[#F472B6]/10 to-transparent",
  },
];

/* ─────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────── */
const SectionLabel = ({ children }) => (
    <motion.span
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.25em]"
        style={{
          background: "rgba(141,255,105,0.07)",
          border: "1px solid rgba(141,255,105,0.2)",
          color: "#8DFF69",
        }}
    >
      <motion.span
          className="w-1.5 h-1.5 rounded-full bg-[#8DFF69]"
          animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
      />
      {children}
    </motion.span>
);

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
const Counter = ({ value, inView }) => {
  const num   = parseInt(value);
  const suffix = value.replace(/[0-9]/g, "");
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(num / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setDisplay(num); clearInterval(timer); }
      else setDisplay(start);
    }, 35);
    return () => clearInterval(timer);
  }, [inView, num]);

  return <>{display}{suffix}</>;
};

/* ─────────────────────────────────────────────
   TECH CARD with progress bar
───────────────────────────────────────────── */
const TechCard = ({ name, Icon, color, level, index, inView }) => {
  const [hovered, setHovered] = useState(false);

  return (
      <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.05 * index, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className="relative rounded-2xl p-5 flex flex-col gap-4 overflow-hidden cursor-default"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: hovered
                ? `1px solid ${color}55`
                : "1px solid rgba(255,255,255,0.06)",
            transition: "border 0.3s",
          }}
          whileHover={{ y: -6, scale: 1.03 }}
      >
        {/* Glow */}
        <AnimatePresence>
          {hovered && (
              <motion.div
                  className="absolute inset-0 rounded-2xl -z-0"
                  style={{ background: `radial-gradient(circle at 50% 80%, ${color}18 0%, transparent 70%)` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
              />
          )}
        </AnimatePresence>

        <div className="relative z-10 flex items-center justify-between">
          <motion.div
              className="w-10 h-10 flex items-center justify-center rounded-xl"
              style={{ background: `${color}15` }}
              animate={hovered ? { rotate: [0, -8, 8, 0] } : {}}
              transition={{ duration: 0.4 }}
          >
            <Icon style={{ color, width: 22, height: 22 }} />
          </motion.div>
          <span className="text-xs font-bold font-mono" style={{ color }}>
          {level}%
        </span>
        </div>

        <div className="relative z-10">
          <p className="text-sm font-semibold text-white mb-2">{name}</p>
          {/* Progress bar */}
          <div
              className="h-1 rounded-full w-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${level}%` } : { width: 0 }}
                transition={{ delay: 0.1 * index + 0.3, duration: 0.9, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>
  );
};

/* ─────────────────────────────────────────────
   PILLAR CARD
───────────────────────────────────────────── */
const PillarCard = ({ icon: Icon, title, text, color, gradient, index, inView }) => {
  const [hovered, setHovered] = useState(false);

  return (
      <motion.div
          initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className="relative rounded-2xl p-6 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: hovered ? `1px solid ${color}50` : "1px solid rgba(255,255,255,0.06)",
            transition: "border 0.3s",
            backdropFilter: "blur(12px)",
          }}
          whileHover={{ scale: 1.02, y: -4 }}
      >
        {/* top accent line */}
        <motion.div
            className="absolute top-0 left-0 h-[2px] rounded-full"
            style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
            initial={{ width: 0 }}
            animate={hovered ? { width: "100%" } : { width: "30%" }}
            transition={{ duration: 0.4 }}
        />

        {/* bg gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100`} />

        <div className="relative z-10 flex items-start gap-4">
          <motion.div
              className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: `${color}15` }}
              animate={hovered ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.5 }}
          >
            <Icon style={{ color, width: 20, height: 20 }} />
          </motion.div>
          <div>
            <h4 className="font-bold text-white mb-1.5 text-base">{title}</h4>
            <p className="text-sm text-gray-400 leading-relaxed">{text}</p>
          </div>
        </div>
      </motion.div>
  );
};

/* ─────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────── */
const StatCard = ({ stat, index, inView }) => {
  const colors = ["#8DFF69", "#61DAFB", "#A78BFA"];
  const color  = colors[index % colors.length];

  return (
      <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative group rounded-3xl p-8 text-center overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(12px)",
          }}
          whileHover={{ scale: 1.04, borderColor: `${color}55` }}
      >
        {/* top sweep line */}
        <motion.div
            className="absolute top-0 left-0 h-[2px] w-full"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
            initial={{ x: "-100%" }}
            whileInView={{ x: "100%" }}
            transition={{ duration: 1.2, delay: index * 0.2, ease: "easeInOut" }}
            viewport={{ once: true }}
        />

        {/* corner glow */}
        <div
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `radial-gradient(circle, ${color}30 0%, transparent 70%)` }}
        />

        <div
            className="text-4xl md:text-5xl font-black mb-2 font-mono"
            style={{
              background: `linear-gradient(135deg, ${color}, #fff)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
        >
          <Counter value={stat.value} inView={inView} />
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-gray-500 font-semibold">
          {stat.label}
        </p>
      </motion.div>
  );
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const About = () => {
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const bioRef      = useRef(null);
  const techRef     = useRef(null);
  const statsRef    = useRef(null);

  const headerInView = useInView(headerRef, { once: false, margin: "-15% 0px -15% 0px" });
  const bioInView    = useInView(bioRef,    { once: false, margin: "-10% 0px -10% 0px" });
  const techInView   = useInView(techRef,   { once: false, margin: "-10% 0px -10% 0px" });
  const statsInView  = useInView(statsRef,  { once: false, margin: "-10% 0px -10% 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY  = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const springParY = useSpring(parallaxY, { stiffness: 60, damping: 20 });

  /* terminal lines for the bio card */
  const terminalLines = [
    { cmd: "whoami",    out: "Hasib Hasan — Frontend & Full-Stack Dev" },
    { cmd: "location",  out: "Rajshahi, Bangladesh 🇧🇩" },
    { cmd: "status",    out: "Available for freelance & full-time 🟢" },
    { cmd: "focus",     out: "React · Next.js · TypeScript · Node.js" },
  ];

  return (
      <section
          id="about"
          ref={sectionRef}
          className="relative py-28 overflow-hidden"
      >
        {/* ── Section-specific ambient glows (layered on top of SiteBackground) ── */}
        <motion.div
            className="absolute top-[-100px] left-[-100px] w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(141,255,105,0.07) 0%, transparent 70%)",
              zIndex: 0,
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute bottom-[-80px] right-[-80px] w-[550px] h-[550px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(97,218,251,0.07) 0%, transparent 70%)",
              zIndex: 0,
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 70%)",
              zIndex: 0,
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />

        {/* ── decorative corner lines ── */}
        <div
            className="absolute top-0 left-0 w-px h-48 pointer-events-none"
            style={{ background: "linear-gradient(180deg, rgba(141,255,105,0.3), transparent)", zIndex: 1 }}
        />
        <div
            className="absolute top-0 right-0 w-px h-48 pointer-events-none"
            style={{ background: "linear-gradient(180deg, rgba(97,218,251,0.2), transparent)", zIndex: 1 }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* ══════════ HEADER ══════════ */}
          <motion.div
              ref={headerRef}
              className="text-center mb-20 space-y-5"
              initial={{ opacity: 0, y: 40 }}
              animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel>About Me</SectionLabel>

            <h2
                className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
                style={{ lineHeight: 1.1 }}
            >
              <span className="text-white">Passion Drives</span>{" "}
              <span
                  style={{
                    background: "linear-gradient(135deg, #8DFF69 0%, #61DAFB 60%, #A78BFA 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
              >
              Purpose
            </span>
            </h2>

            <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
              I craft digital experiences that sit at the intersection of{" "}
              <span className="text-[#8DFF69] font-semibold">performance</span>,{" "}
              <span className="text-[#61DAFB] font-semibold">elegance</span>, and{" "}
              <span className="text-[#A78BFA] font-semibold">precision</span>.
            </p>

            {/* divider */}
            <motion.div
                className="h-px w-24 mx-auto rounded-full"
                style={{ background: "linear-gradient(90deg, #8DFF69, #61DAFB, #A78BFA)" }}
                initial={{ scaleX: 0 }}
                animate={headerInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            />
          </motion.div>

          {/* ══════════ BIO + PILLARS ══════════ */}
          <div
              ref={bioRef}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
          >
            {/* ── Bio card (terminal style) ── */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={bioInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px)",
                }}
            >
              {/* Terminal top bar */}
              <div
                  className="flex items-center gap-2 px-5 py-3.5"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.3)" }}
              >
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <span className="w-3 h-3 rounded-full bg-[#8DFF69]/70" />
                <span className="ml-3 text-xs text-gray-500 font-mono">hasib@portfolio ~ % info</span>
              </div>

              <div className="p-7 space-y-6">
                {/* Terminal quick-info */}
                <div className="space-y-2 font-mono text-sm">
                  {terminalLines.map((line, i) => (
                      <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={bioInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.15 * i + 0.2, duration: 0.4 }}
                          className="flex gap-3"
                      >
                        <span className="text-[#8DFF69]">$</span>
                        <span className="text-gray-500">{line.cmd}</span>
                        <span className="text-gray-300 ml-1">{line.out}</span>
                      </motion.div>
                  ))}
                </div>

                {/* divider */}
                <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }} />

                {/* Bio paragraphs */}
                <div className="space-y-4">
                  {PERSONAL_INFO.bio.map((para, i) => (
                      <motion.p
                          key={i}
                          className="text-gray-400 text-sm leading-relaxed"
                          initial={{ opacity: 0 }}
                          animate={bioInView ? { opacity: 1 } : {}}
                          transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
                      >
                        {i === 0 && (
                            <span className="text-[#8DFF69] font-semibold">{"› "}</span>
                        )}
                        {para}
                      </motion.p>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                    onClick={() => window.open(PERSONAL_INFO.resume, "_blank")}
                    className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-sm relative overflow-hidden"
                    style={{
                      background: "rgba(141,255,105,0.08)",
                      border: "1px solid rgba(141,255,105,0.3)",
                      color: "#8DFF69",
                    }}
                    whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(141,255,105,0.2)" }}
                    whileTap={{ scale: 0.97 }}
                >
                  {/* shimmer */}
                  <motion.span
                      className="absolute inset-0 rounded-full"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(141,255,105,0.12), transparent)" }}
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                  />
                  <Download className="w-4 h-4" />
                  Download Résumé
                  <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>

            {/* ── Pillars grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((p, i) => (
                  <PillarCard key={i} {...p} index={i} inView={bioInView} />
              ))}
            </div>
          </div>

          {/* ══════════ TECH STACK ══════════ */}
          <div ref={techRef} className="mb-20">
            <motion.div
                className="text-center mb-10 space-y-3"
                initial={{ opacity: 0, y: 30 }}
                animate={techInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3">
                <motion.div
                    className="h-px flex-1 max-w-[80px]"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(141,255,105,0.3))" }}
                    initial={{ scaleX: 0 }}
                    animate={techInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.5 }}
                />
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
                <Cpu className="w-3.5 h-3.5 text-[#8DFF69]" />
                Tech Stack & Expertise
              </span>
                <motion.div
                    className="h-px flex-1 max-w-[80px]"
                    style={{ background: "linear-gradient(90deg, rgba(141,255,105,0.3), transparent)" }}
                    initial={{ scaleX: 0 }}
                    animate={techInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-gray-600 text-sm">The tools I use to bring ideas to life</p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3 w-full">
              {/* First 6 full cards, last 3 compact on lg */}
              {techStack.map((t, i) => (
                  <div key={i} className={i < 6 ? "lg:col-span-3 sm:col-span-1" : "lg:col-span-3"}>
                    <TechCard {...t} index={i} inView={techInView} />
                  </div>
              ))}
            </div>
          </div>

          {/* ══════════ STATS ══════════ */}
          <div ref={statsRef}>
            <motion.div
                className="text-center mb-10"
                initial={{ opacity: 0 }}
                animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-600 flex items-center justify-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#61DAFB]" />
              By The Numbers
            </span>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {ABOUT_STATS.map((stat, i) => (
                  <StatCard key={i} stat={stat} index={i} inView={statsInView} />
              ))}
            </div>
          </div>

        </div>
      </section>
  );
};

export default About;