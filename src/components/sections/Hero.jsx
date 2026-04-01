import React, { useRef, useEffect, useState } from "react";
import profileImg from "../../assets/images/Hasib-Hasan.png";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useInView,
    AnimatePresence,
} from "motion/react";
import Typewriter from "typewriter-effect";
import {
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiNodedotjs,
    SiMongodb,
} from "react-icons/si";
import { STATS } from "../../utils/constants";
import { scrollToSection } from "../../hooks/useScrollSpy";

/* ─────────────────────────────────────────────
   Floating particle component
───────────────────────────────────────────── */
const Particle = ({ index }) => {
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const duration = Math.random() * 10 + 8;
    const delay = Math.random() * 5;

    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                width: size,
                height: size,
                left: `${x}%`,
                bottom: "-10px",
                background:
                    index % 3 === 0
                        ? "rgba(141,255,105,0.7)"
                        : index % 3 === 1
                            ? "rgba(100,200,255,0.5)"
                            : "rgba(200,100,255,0.5)",
                boxShadow:
                    index % 3 === 0
                        ? "0 0 6px rgba(141,255,105,0.8)"
                        : index % 3 === 1
                            ? "0 0 6px rgba(100,200,255,0.6)"
                            : "0 0 6px rgba(200,100,255,0.6)",
            }}
            animate={{
                y: [0, -(600 + Math.random() * 400)],
                x: [0, (Math.random() - 0.5) * 100],
                opacity: [0, 0.8, 0.6, 0],
                scale: [0, 1, 0.8, 0],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeOut",
            }}
        />
    );
};

/* ─────────────────────────────────────────────
   Animated grid lines background
───────────────────────────────────────────── */
const GridBackground = () => (
    <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ opacity: 0.03 }}
    >
        <div
            style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `
          linear-gradient(rgba(141,255,105,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(141,255,105,1) 1px, transparent 1px)
        `,
                backgroundSize: "60px 60px",
                maskImage:
                    "radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%)",
            }}
        />
    </div>
);

/* ─────────────────────────────────────────────
   Orbiting ring
───────────────────────────────────────────── */
const OrbitRing = ({ radius, duration, reverse, children, dotColor }) => (
    <motion.div
        className="absolute inset-0 m-auto rounded-full border border-dashed"
        style={{
            width: radius * 2,
            height: radius * 2,
            borderColor: "rgba(141,255,105,0.15)",
            top: "50%",
            left: "50%",
            marginTop: -radius,
            marginLeft: -radius,
        }}
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
        <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
                width: 8,
                height: 8,
                background: dotColor || "#8DFF69",
                boxShadow: `0 0 10px ${dotColor || "#8DFF69"}`,
            }}
        />
    </motion.div>
);

/* ─────────────────────────────────────────────
   TECH icon with tooltip
───────────────────────────────────────────── */
const TechIcon = ({ Icon, label, color, idx }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <motion.div
            className="relative flex flex-col items-center cursor-pointer"
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + idx * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.3, y: -8 }}
            whileTap={{ scale: 0.9 }}
        >
            <motion.div
                className="w-9 h-9 flex items-center justify-center rounded-xl"
                style={{ background: hovered ? `${color}22` : "transparent" }}
                animate={{ boxShadow: hovered ? `0 0 20px ${color}88` : "none" }}
            >
                <Icon style={{ color, width: "100%", height: "100%" }} />
            </motion.div>
            <AnimatePresence>
                {hovered && (
                    <motion.span
                        className="absolute -top-8 text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap"
                        style={{ background: color, color: "#000" }}
                        initial={{ opacity: 0, y: 4, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.8 }}
                    >
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const techStack = [
    { Icon: SiReact, label: "React", color: "#61DAFB" },
    { Icon: SiNextdotjs, label: "Next.js", color: "#ffffff" },
    { Icon: SiTailwindcss, label: "Tailwind", color: "#38BDF8" },
    { Icon: SiNodedotjs, label: "Node.js", color: "#8DFF69" },
    { Icon: SiMongodb, label: "MongoDB", color: "#47A248" },
];

/* ─────────────────────────────────────────────
   MAIN HERO
───────────────────────────────────────────── */
const Hero = () => {
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const statsRef = useRef(null);

    const isInView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    // Parallax transforms
    const yLeft = useTransform(scrollYProgress, [0, 1], [0, -180]);
    const yRight = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
    const rotateLeft = useTransform(scrollYProgress, [0, 1], [0, -8]);
    const rotateRight = useTransform(scrollYProgress, [0, 1], [0, 6]);

    const springY = useSpring(yLeft, { stiffness: 100, damping: 30 });
    const springScale = useSpring(scale, { stiffness: 80, damping: 25 });

    // Particles
    const particles = Array.from({ length: 25 }, (_, i) => i);

    // Stagger variants
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
        exit: { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
        exit: {
            opacity: 0,
            y: -50,
            filter: "blur(8px)",
            transition: { duration: 0.4, ease: "easeIn" },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.85, rotateY: 15, filter: "blur(20px)" },
        visible: {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            filter: "blur(0px)",
            transition: { duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            rotateY: -10,
            filter: "blur(15px)",
            transition: { duration: 0.45, ease: "easeIn" },
        },
    };

    const statVariants = {
        hidden: { opacity: 0, scale: 0.7, y: 20 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { delay: 0.7 + i * 0.1, duration: 0.5, ease: "backOut" },
        }),
        exit: (i) => ({
            opacity: 0,
            scale: 0.8,
            y: 10,
            transition: { delay: i * 0.05, duration: 0.3 },
        }),
    };

    return (
        <section
            id="home"
            ref={sectionRef}
            className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-0"
        >
            {/* ── Grid Background ── */}
            <GridBackground />

            {/* ── Particles ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((i) => (
                    <Particle key={i} index={i} />
                ))}
            </div>

            {/* ── Section-specific ambient glows (layered on top of SiteBackground) ── */}
            <motion.div
                className="absolute top-[-60px] left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(141,255,105,0.09) 0%, transparent 70%)",
                    zIndex: 0,
                }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-0 right-1/4 w-[550px] h-[550px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(97,218,251,0.07) 0%, transparent 70%)",
                    zIndex: 0,
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.75, 0.4] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
                className="absolute top-1/2 left-[-100px] w-[450px] h-[450px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)",
                    zIndex: 0,
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
            <motion.div
                className="absolute bottom-1/4 right-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(244,114,182,0.05) 0%, transparent 70%)",
                    zIndex: 0,
                }}
                animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.5, 0.25] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            {/* ── MAIN CONTENT ── */}
            <motion.div
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
                style={{ opacity, scale: springScale }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* ──────── LEFT COLUMN ──────── */}
                    <motion.div
                        ref={leftRef}
                        style={{ y: springY, rotate: rotateLeft }}
                    >
                        <AnimatePresence mode="wait">
                            {isInView && (
                                <motion.div
                                    key="left-content"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="space-y-8"
                                >
                                    {/* Badge */}
                                    <motion.div variants={itemVariants}>
                                        <motion.span
                                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                                            style={{
                                                background: "rgba(141,255,105,0.08)",
                                                border: "1px solid rgba(141,255,105,0.25)",
                                                color: "#8DFF69",
                                            }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <motion.span
                                                className="w-2 h-2 rounded-full bg-[#8DFF69]"
                                                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            />
                                            Available for work
                                        </motion.span>
                                    </motion.div>

                                    {/* Name */}
                                    <motion.div variants={itemVariants} className="space-y-3">
                                        <motion.h1
                                            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, #8DFF69 0%, #61DAFB 40%, #A78BFA 80%, #F472B6 100%)",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                                backgroundClip: "text",
                                            }}
                                        >
                                            Hasib
                                            <br />
                                            Hasan
                                        </motion.h1>

                                        <motion.div
                                            className="h-1 rounded-full"
                                            style={{
                                                background:
                                                    "linear-gradient(90deg, #8DFF69, #61DAFB, #A78BFA)",
                                                width: 0,
                                            }}
                                            animate={isInView ? { width: "60%" } : { width: 0 }}
                                            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                                        />
                                    </motion.div>

                                    {/* "I'm a" + Typewriter */}
                                    <motion.div variants={itemVariants} className="space-y-1">
                                        <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
                                            And I am a
                                        </p>
                                        <div
                                            className="text-3xl md:text-4xl font-bold text-white min-h-[56px] flex items-center"
                                            style={{ letterSpacing: "-0.02em" }}
                                        >
                                            <span className="text-[#8DFF69] mr-2">&lt;</span>
                                            <Typewriter
                                                options={{
                                                    strings: [
                                                        "Web Developer",
                                                        "React Developer",
                                                        "MERN Stack Dev",
                                                        "Next.js Developer",
                                                    ],
                                                    autoStart: true,
                                                    loop: true,
                                                    delay: 50,
                                                    deleteSpeed: 30,
                                                }}
                                            />
                                            <span className="text-[#8DFF69] ml-1">/&gt;</span>
                                        </div>
                                    </motion.div>

                                    {/* Description */}
                                    <motion.p
                                        variants={itemVariants}
                                        className="text-base text-gray-400 max-w-[460px] leading-relaxed"
                                    >
                                        Building modern, scalable web applications with cutting-edge
                                        technologies. Turning ideas into{" "}
                                        <span className="text-[#8DFF69] font-semibold">
                      pixel-perfect
                    </span>{" "}
                                        digital experiences.
                                    </motion.p>

                                    {/* CTA Buttons */}
                                    <motion.div
                                        variants={itemVariants}
                                        className="flex flex-wrap gap-3 pt-2"
                                    >
                                        <motion.button
                                            onClick={() => scrollToSection("contact")}
                                            className="relative inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm text-black overflow-hidden"
                                            style={{ background: "#8DFF69" }}
                                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(141,255,105,0.5)" }}
                                            whileTap={{ scale: 0.96 }}
                                        >
                                            <motion.span
                                                className="absolute inset-0 bg-white"
                                                initial={{ x: "-100%" }}
                                                whileHover={{ x: "100%" }}
                                                transition={{ duration: 0.4 }}
                                                style={{ opacity: 0.2 }}
                                            />
                                            Get in Touch
                                            <motion.span
                                                animate={{ x: [0, 4, 0] }}
                                                transition={{ duration: 1.2, repeat: Infinity }}
                                            >
                                                →
                                            </motion.span>
                                        </motion.button>

                                        <motion.button
                                            onClick={() => scrollToSection("projects")}
                                            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm text-white"
                                            style={{
                                                border: "1px solid rgba(141,255,105,0.3)",
                                                background: "rgba(141,255,105,0.05)",
                                            }}
                                            whileHover={{
                                                scale: 1.05,
                                                borderColor: "rgba(141,255,105,0.7)",
                                                background: "rgba(141,255,105,0.1)",
                                            }}
                                            whileTap={{ scale: 0.96 }}
                                        >
                                            View Work
                                        </motion.button>
                                    </motion.div>

                                    {/* Stats */}
                                    <motion.div
                                        variants={itemVariants}
                                        className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4"
                                    >
                                        {STATS.map((stat, i) => (
                                            <motion.div
                                                key={i}
                                                custom={i}
                                                variants={statVariants}
                                                className="relative p-4 rounded-2xl text-center overflow-hidden group cursor-default"
                                                style={{
                                                    background: "rgba(255,255,255,0.02)",
                                                    border: "1px solid rgba(255,255,255,0.05)",
                                                    backdropFilter: "blur(10px)",
                                                }}
                                                whileHover={{
                                                    scale: 1.05,
                                                    borderColor: "rgba(141,255,105,0.3)",
                                                    background: "rgba(141,255,105,0.04)",
                                                }}
                                            >
                                                {/* Glow on hover */}
                                                <motion.div
                                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    style={{
                                                        background:
                                                            "radial-gradient(circle at center, rgba(141,255,105,0.06) 0%, transparent 70%)",
                                                    }}
                                                />
                                                <div
                                                    className="text-2xl md:text-3xl font-extrabold mb-1 font-mono"
                                                    style={{
                                                        background:
                                                            "linear-gradient(135deg, #8DFF69, #61DAFB)",
                                                        WebkitBackgroundClip: "text",
                                                        WebkitTextFillColor: "transparent",
                                                    }}
                                                >
                                                    {stat.value}
                                                </div>
                                                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
                                                    {stat.label}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* ──────── RIGHT COLUMN ──────── */}
                    <motion.div
                        ref={rightRef}
                        style={{ y: yRight, rotate: rotateRight }}
                        className="relative flex justify-center lg:justify-end mt-12 lg:mt-0"
                    >
                        <AnimatePresence mode="wait">
                            {isInView && (
                                <motion.div
                                    key="right-content"
                                    variants={imageVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="relative"
                                    style={{ perspective: 1000 }}
                                >
                                    {/* Orbit rings */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <OrbitRing
                                            radius={240}
                                            duration={20}
                                            dotColor="#8DFF69"
                                        />
                                        <OrbitRing
                                            radius={280}
                                            duration={30}
                                            reverse
                                            dotColor="#61DAFB"
                                        />
                                        <OrbitRing
                                            radius={320}
                                            duration={40}
                                            dotColor="#A78BFA"
                                        />
                                    </div>

                                    {/* Main image card */}
                                    <motion.div
                                        className="relative group"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    >
                                        {/* Animated border glow */}
                                        <motion.div
                                            className="absolute -inset-1 rounded-3xl"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, #8DFF69, #61DAFB, #A78BFA, #8DFF69)",
                                                backgroundSize: "300% 300%",
                                            }}
                                            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        >
                                            <div
                                                className="absolute inset-0 rounded-3xl"
                                                style={{
                                                    filter: "blur(15px)",
                                                    opacity: 0.4,
                                                    background: "inherit",
                                                }}
                                            />
                                        </motion.div>

                                        <div
                                            className="relative overflow-hidden rounded-3xl max-w-[400px]"
                                            style={{
                                                background: "rgba(255,255,255,0.03)",
                                                border: "1px solid rgba(255,255,255,0.08)",
                                                padding: "8px",
                                                backdropFilter: "blur(12px)",
                                            }}
                                        >
                                            <div className="rounded-2xl overflow-hidden aspect-square">
                                                <motion.img
                                                    src={profileImg}
                                                    alt="Hasib Hasan"
                                                    className="w-full h-full object-cover"
                                                    whileHover={{ scale: 1.08 }}
                                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                                />
                                            </div>

                                            {/* Tech Stack bar */}
                                            <motion.div
                                                className="absolute bottom-6 left-1/2 z-20 w-[90%]"
                                                style={{ transform: "translateX(-50%)" }}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 1.0, duration: 0.6 }}
                                            >
                                                <div
                                                    className="flex items-center justify-around rounded-2xl p-3"
                                                    style={{
                                                        background: "rgba(0,0,0,0.75)",
                                                        backdropFilter: "blur(20px)",
                                                        border: "1px solid rgba(255,255,255,0.08)",
                                                    }}
                                                >
                                                    {techStack.map((tech, idx) => (
                                                        <TechIcon key={idx} {...tech} idx={idx} />
                                                    ))}
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>

                                    {/* Floating badge — Experience */}
                                    <motion.div
                                        className="absolute -left-8 top-12 rounded-2xl px-4 py-3 hidden lg:block"
                                        style={{
                                            background: "rgba(10,10,20,0.85)",
                                            border: "1px solid rgba(141,255,105,0.25)",
                                            backdropFilter: "blur(16px)",
                                        }}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.3, duration: 0.6 }}
                                        whileHover={{ scale: 1.05, borderColor: "rgba(141,255,105,0.5)" }}
                                    >
                                        <div
                                            className="text-2xl font-extrabold font-mono"
                                            style={{ color: "#8DFF69" }}
                                        >
                                            2+
                                        </div>
                                        <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-0.5">
                                            Years Exp.
                                        </div>
                                    </motion.div>

                                    {/* Floating badge — Projects */}
                                    <motion.div
                                        className="absolute -right-6 bottom-24 rounded-2xl px-4 py-3 hidden lg:block"
                                        style={{
                                            background: "rgba(10,10,20,0.85)",
                                            border: "1px solid rgba(97,218,251,0.25)",
                                            backdropFilter: "blur(16px)",
                                        }}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.5, duration: 0.6 }}
                                        whileHover={{ scale: 1.05, borderColor: "rgba(97,218,251,0.5)" }}
                                    >
                                        <div
                                            className="text-2xl font-extrabold font-mono"
                                            style={{ color: "#61DAFB" }}
                                        >
                                            20+
                                        </div>
                                        <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-0.5">
                                            Projects
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.div>

            {/* ── Scroll Indicator ── */}
            <AnimatePresence>
                {isInView && (
                    <motion.div
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: 2, duration: 0.6 }}
                    >
            <span className="text-[10px] uppercase tracking-widest text-gray-600">
              Scroll
            </span>
                        <motion.div
                            className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1"
                            style={{ borderColor: "rgba(141,255,105,0.3)" }}
                        >
                            <motion.div
                                className="w-1 h-2 rounded-full bg-[#8DFF69]"
                                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Hero;