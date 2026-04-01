/**
 * Skills.jsx — Industry-level animated Skills section
 * Path: src/components/sections/Skills.jsx
 *
 * Dependencies: motion/react | lucide-react | react-icons
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
import { Cpu, Layers, Zap, Database, Wrench, ChevronRight } from "lucide-react";
import { skills } from "../../data/skills";

/* ─────────────────────────────────────────────
   CATEGORY CONFIG
───────────────────────────────────────────── */
const CATEGORIES = [
    {
        name: "Frontend Development",
        icon: Layers,
        accent: "#8DFF69",
        desc: "Pixel-perfect UIs with modern frameworks",
    },
    {
        name: "Backend & APIs",
        icon: Zap,
        accent: "#61DAFB",
        desc: "Robust server-side logic & REST / GraphQL",
    },
    {
        name: "Database",
        icon: Database,
        accent: "#A78BFA",
        desc: "Structured & unstructured data at scale",
    },
    {
        name: "Tools",
        icon: Wrench,
        accent: "#F472B6",
        desc: "DevOps, version control & productivity",
    },
];

const LEVEL_CONFIG = {
    Expert:       { pct: 95, color: "#8DFF69",  label: "Expert"       },
    Advanced:     { pct: 85, color: "#61DAFB",  label: "Advanced"     },
    Intermediate: { pct: 65, color: "#A78BFA",  label: "Intermediate" },
    Basic:        { pct: 45, color: "#F59E0B",  label: "Basic"        },
};

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
            animate={{ scale: [1, 1.7, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
        />
        {children}
    </motion.span>
);

/* ─────────────────────────────────────────────
   SKILL ROW
───────────────────────────────────────────── */
const SkillRow = ({ skill, index, inView, accent }) => {
    const [hovered, setHovered] = useState(false);
    const Icon = skill.icon;
    const cfg  = LEVEL_CONFIG[skill.level] || LEVEL_CONFIG.Basic;
    const barColor = skill.color || accent;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.06 * index, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="group relative rounded-2xl p-4 transition-all duration-300"
            style={{
                background: hovered ? `${barColor}08` : "transparent",
                border: hovered
                    ? `1px solid ${barColor}30`
                    : "1px solid transparent",
            }}
        >
            <div className="flex items-center gap-4 mb-3">
                {/* Icon */}
                <motion.div
                    className="relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                        background: `${barColor}12`,
                        border: `1px solid ${barColor}25`,
                    }}
                    animate={hovered ? { rotate: [0, -6, 6, 0] } : { rotate: 0 }}
                    transition={{ duration: 0.35 }}
                >
                    <Icon size={24} style={{ color: barColor }} />
                    {/* Glow */}
                    <AnimatePresence>
                        {hovered && (
                            <motion.div
                                className="absolute inset-0 rounded-xl"
                                style={{
                                    background: `radial-gradient(circle, ${barColor}25 0%, transparent 70%)`,
                                    filter: "blur(4px)",
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Name + experience */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                        <h4 className="text-sm font-bold text-white leading-tight truncate">
                            {skill.name}
                        </h4>
                        {/* Level badge */}
                        <span
                            className="flex-shrink-0 ml-2 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider"
                            style={{
                                background: `${cfg.color}18`,
                                color: cfg.color,
                                border: `1px solid ${cfg.color}35`,
                            }}
                        >
              {cfg.label}
            </span>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-600">
                        {skill.experiences || "2+ yrs"}
                    </p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="relative">
                <div
                    className="h-[5px] w-full rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                >
                    <motion.div
                        className="h-full rounded-full relative overflow-hidden"
                        style={{
                            background: `linear-gradient(90deg, ${barColor}99, ${barColor})`,
                        }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${cfg.pct}%` } : { width: 0 }}
                        transition={{
                            delay: 0.1 * index + 0.2,
                            duration: 1.1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        {/* shimmer */}
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                background:
                                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
                            }}
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{
                                duration: 1.8,
                                delay: 0.1 * index + 1.2,
                                repeat: Infinity,
                                repeatDelay: 3,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.div>
                </div>


            </div>
        </motion.div>
    );
};

/* ─────────────────────────────────────────────
   CATEGORY CARD
───────────────────────────────────────────── */
const CategoryCard = ({ cat, index, globalInView }) => {
    const cardRef = useRef(null);
    const inView  = useInView(cardRef, { once: false, margin: "-10% 0px -10% 0px" });
    const [expanded, setExpanded] = useState(true);

    const catSkills = skills.filter((s) => s.category === cat.name);
    const Icon = cat.icon;
    const avgPct =
        catSkills.length
            ? Math.round(
                catSkills.reduce(
                    (sum, s) => sum + (LEVEL_CONFIG[s.level]?.pct || 40),
                    0
                ) / catSkills.length
            )
            : 0;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{
                delay: index * 0.1,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="relative rounded-3xl overflow-hidden"
            style={{
                background: "rgba(255,255,255,0.02)",
                border: `1px solid rgba(255,255,255,0.07)`,
                backdropFilter: "blur(14px)",
            }}
            whileHover={{ borderColor: `${cat.accent}35` }}
        >
            {/* top gradient bar */}
            <motion.div
                className="h-[2px] w-full"
                style={{
                    background: `linear-gradient(90deg, ${cat.accent}, ${cat.accent}44, transparent)`,
                }}
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
            />

            {/* corner glow */}
            <div
                className="absolute top-0 left-0 w-48 h-48 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at top left, ${cat.accent}10 0%, transparent 60%)`,
                }}
            />

            {/* ── Card Header ── */}
            <div className="p-6 pb-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <motion.div
                            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: `${cat.accent}15`, border: `1px solid ${cat.accent}30` }}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Icon style={{ color: cat.accent, width: 20, height: 20 }} />
                        </motion.div>
                        <div>
                            <h3 className="text-base font-extrabold text-white leading-tight">
                                {cat.name}
                            </h3>
                            <p className="text-[11px] text-gray-500 mt-0.5">{cat.desc}</p>
                        </div>
                    </div>

                    {/* skill count badge */}
                    <div
                        className="flex-shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                        style={{
                            background: `${cat.accent}15`,
                            color: cat.accent,
                            border: `1px solid ${cat.accent}30`,
                        }}
                    >
                        {catSkills.length} skills
                    </div>
                </div>

                {/* skill count pills */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                    {catSkills.map((s, i) => (
                        <motion.span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded-md font-medium"
                            style={{
                                background: `${s.color || cat.accent}12`,
                                color: s.color || cat.accent,
                                border: `1px solid ${s.color || cat.accent}25`,
                            }}
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.05 * i + 0.4 }}
                        >
                            {s.name}
                        </motion.span>
                    ))}
                </div>
            </div>

            {/* divider */}
            <div
                className="mx-6 h-px"
                style={{ background: "rgba(255,255,255,0.05)" }}
            />

            {/* ── Skill rows ── */}
            <div className="p-6 pt-4 space-y-1">
                {catSkills.map((skill, i) => (
                    <SkillRow
                        key={skill.id || i}
                        skill={skill}
                        index={i}
                        inView={inView}
                        accent={cat.accent}
                    />
                ))}
            </div>
        </motion.div>
    );
};

/* ─────────────────────────────────────────────
   FLOATING SKILL COUNTER BANNER
───────────────────────────────────────────── */
const SkillBanner = ({ inView }) => {
    const total   = skills.length;
    const experts = skills.filter((s) => s.level === "Expert").length;

    const items = [
        { label: "Technologies",    value: `${total}+`,   color: "#8DFF69" },
        { label: "Expert Level",    value: `${experts}`,  color: "#61DAFB" },
        { label: "Years Learning",  value: "2+",           color: "#A78BFA" },
        { label: "Projects Built",  value: "80+",          color: "#F472B6" },
    ];

    return (
        <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    className="relative rounded-2xl p-4 text-center overflow-hidden group"
                    style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    whileHover={{
                        scale: 1.04,
                        borderColor: `${item.color}45`,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                    <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
                        style={{
                            background: `radial-gradient(circle at center, ${item.color}10 0%, transparent 70%)`,
                        }}
                    />
                    <div
                        className="text-2xl font-black font-mono mb-1"
                        style={{
                            background: `linear-gradient(135deg, ${item.color}, #fff)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        {item.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">
                        {item.label}
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const Skills = () => {
    const sectionRef = useRef(null);
    const headerRef  = useRef(null);
    const bannerRef  = useRef(null);

    const headerInView = useInView(headerRef, { once: false, margin: "-15% 0px -15% 0px" });
    const bannerInView = useInView(bannerRef, { once: false, margin: "-10% 0px -10% 0px" });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const parallaxY  = useTransform(scrollYProgress, [0, 1], [40, -40]);
    const springY    = useSpring(parallaxY, { stiffness: 60, damping: 20 });

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="relative py-28 overflow-hidden"
        >
            {/* ── Section-specific ambient glows (layered on top of SiteBackground) ── */}
            <motion.div
                className="absolute top-[-80px] right-[-80px] w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(141,255,105,0.08) 0%, transparent 70%)",
                    zIndex: 0,
                }}
                animate={{ scale: [1, 1.14, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[-80px] left-[-60px] w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)",
                    zIndex: 0,
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
            <motion.div
                className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(97,218,251,0.05) 0%, transparent 70%)",
                    zIndex: 0,
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* ── decorative lines ── */}
            <div
                className="absolute top-0 left-0 w-px h-40 pointer-events-none"
                style={{ background: "linear-gradient(180deg, rgba(141,255,105,0.25), transparent)", zIndex: 1 }}
            />
            <div
                className="absolute bottom-0 right-0 w-px h-40 pointer-events-none"
                style={{ background: "linear-gradient(0deg, rgba(167,139,250,0.2), transparent)", zIndex: 1 }}
            />

            {/* ── diagonal accent line ── */}
            <motion.div
                className="absolute top-1/2 left-0 w-full h-px pointer-events-none"
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(141,255,105,0.04), transparent)",
                    y: springY,
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* ══════════ HEADER ══════════ */}
                <motion.div
                    ref={headerRef}
                    className="text-center mb-14 space-y-5"
                    initial={{ opacity: 0, y: 40 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <SectionLabel>My Expertise</SectionLabel>

                    <h2
                        className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
                        style={{ lineHeight: 1.1 }}
                    >
                        <span className="text-white">Skills &</span>{" "}
                        <span
                            style={{
                                background:
                                    "linear-gradient(135deg, #8DFF69 0%, #61DAFB 50%, #A78BFA 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
              Technologies
            </span>
                    </h2>

                    <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
                        A curated set of tools I've mastered to build{" "}
                        <span className="text-[#8DFF69] font-semibold">fast</span>,{" "}
                        <span className="text-[#61DAFB] font-semibold">scalable</span>, and{" "}
                        <span className="text-[#A78BFA] font-semibold">beautiful</span> products.
                    </p>

                    {/* animated gradient divider */}
                    <motion.div
                        className="h-px w-28 mx-auto rounded-full"
                        style={{
                            background: "linear-gradient(90deg, #8DFF69, #61DAFB, #A78BFA)",
                        }}
                        initial={{ scaleX: 0 }}
                        animate={headerInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                    />
                </motion.div>

                {/* ══════════ BANNER STATS ══════════ */}
                <div ref={bannerRef}>
                    <SkillBanner inView={bannerInView} />
                </div>

                {/* ══════════ CATEGORIES GRID ══════════ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {CATEGORIES.map((cat, i) => (
                        <CategoryCard key={cat.name} cat={cat} index={i} />
                    ))}
                </div>

                {/* ══════════ BOTTOM MARQUEE STRIP ══════════ */}
                <motion.div
                    className="mt-16 overflow-hidden relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* fade edges */}
                    <div
                        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                        style={{ background: "linear-gradient(90deg, #030712, transparent)" }}
                    />
                    <div
                        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                        style={{ background: "linear-gradient(270deg, #030712, transparent)" }}
                    />

                    <motion.div
                        className="flex gap-4 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                    >
                        {[...skills, ...skills].map((skill, i) => {
                            const Icon = skill.icon;
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-full flex-shrink-0"
                                    style={{
                                        background: "rgba(255,255,255,0.025)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                    }}
                                >
                                    <Icon style={{ color: skill.color, width: 16, height: 16 }} />
                                    <span className="text-xs font-semibold text-gray-300 whitespace-nowrap">
                    {skill.name}
                  </span>
                                </div>
                            );
                        })}
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

export default Skills;