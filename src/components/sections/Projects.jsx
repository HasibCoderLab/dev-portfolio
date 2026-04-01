/**
 * Projects.jsx — Industry-level animated Projects section
 * Path: src/components/sections/Projects.jsx
 */

import React, { useState, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "motion/react";
import {
  Briefcase, ChevronLeft, ChevronRight, Target,
  ExternalLink, Github, TrendingUp, ArrowUpRight, Layers,
} from "lucide-react";
import { SiTypescript } from "react-icons/si";
import { FaJsSquare, FaFileCode, FaReact, FaInfinity } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { projects, categories } from "../../data/projects";

/* ─────────────────────────────────────────────
   SECTION LABEL (same as other sections)
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
   CATEGORY ICONS
───────────────────────────────────────────── */
const categoryIcons = {
  All: FaInfinity,
  JavaScript: FaJsSquare,
  TypeScript: SiTypescript,
  Frontend: FaFileCode,
  "Next.js": RiNextjsFill,
  React: FaReact,
};

const categoryColors = {
  All:        "#8DFF69",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  Frontend:   "#61DAFB",
  "Next.js":  "#ffffff",
  React:      "#61DAFB",
};

/* ─────────────────────────────────────────────
   PROJECT CARD — fully animated
───────────────────────────────────────────── */
const ProjectCard = ({ project, isActive, direction }) => {
  const [hovered, setHovered] = useState(false);
  const {
    title, description, image, category,
    technologies, metrics, demoUrl, githubUrl,
  } = project;

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 280 : -280,
      opacity: 0,
      scale: 0.92,
      rotateY: dir > 0 ? 12 : -12,
      filter: "blur(8px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -280 : 280,
      opacity: 0,
      scale: 0.92,
      rotateY: dir > 0 ? -12 : 12,
      filter: "blur(8px)",
      transition: { duration: 0.4, ease: "easeIn" },
    }),
  };

  return (
      <motion.div
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className="w-full max-w-2xl mx-auto"
          style={{ perspective: 1200 }}
      >
        <motion.div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: hovered
                  ? "1px solid rgba(141,255,105,0.35)"
                  : "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
              transition: "border 0.3s",
            }}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* animated top gradient line */}
          <motion.div
              className="absolute top-0 left-0 h-[2px] rounded-full z-10"
              style={{
                background: "linear-gradient(90deg, #8DFF69, #61DAFB, #A78BFA)",
              }}
              initial={{ width: 0 }}
              animate={{ width: hovered ? "100%" : "35%" }}
              transition={{ duration: 0.4 }}
          />

          {/* IMAGE */}
          <div className="relative h-60 overflow-hidden">
            <motion.img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                animate={{ scale: hovered ? 1.08 : 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* overlay */}
            <div
                className="absolute inset-0"
                style={{
                  background:
                      "linear-gradient(to top, rgba(3,7,18,0.95) 0%, rgba(3,7,18,0.5) 50%, rgba(3,7,18,0.1) 100%)",
                }}
            />

            {/* corner glow on hover */}
            <AnimatePresence>
              {hovered && (
                  <motion.div
                      className="absolute inset-0"
                      style={{
                        background:
                            "radial-gradient(circle at 50% 100%, rgba(141,255,105,0.12) 0%, transparent 60%)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                  />
              )}
            </AnimatePresence>

            {/* CATEGORY badge */}
            <motion.div
                className="absolute top-4 left-4"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
            <span
                className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full"
                style={{
                  background: "rgba(0,0,0,0.55)",
                  border: "1px solid rgba(141,255,105,0.25)",
                  color: "#8DFF69",
                  backdropFilter: "blur(8px)",
                }}
            >
              {category}
            </span>
            </motion.div>

            {/* LINKS */}
            <motion.div
                className="absolute bottom-4 right-4 flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
            >
              {demoUrl && (
                  <motion.a
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold"
                      style={{
                        background: "rgba(141,255,105,0.15)",
                        border: "1px solid rgba(141,255,105,0.3)",
                        color: "#8DFF69",
                        backdropFilter: "blur(10px)",
                      }}
                      whileHover={{
                        scale: 1.08,
                        background: "rgba(141,255,105,0.25)",
                        boxShadow: "0 0 16px rgba(141,255,105,0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live
                  </motion.a>
              )}
              {githubUrl && (
                  <motion.a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#fff",
                        backdropFilter: "blur(10px)",
                      }}
                      whileHover={{
                        scale: 1.08,
                        background: "rgba(255,255,255,0.15)",
                      }}
                      whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-3.5 h-3.5" />
                    Code
                  </motion.a>
              )}
            </motion.div>
          </div>

          {/* CONTENT */}
          <div className="p-6 space-y-4">
            {/* title */}
            <motion.h3
                className="text-xl font-extrabold text-white leading-tight"
                animate={{ color: hovered ? "#8DFF69" : "#ffffff" }}
                transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>

            {/* description */}
            <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
              {description}
            </p>

            {/* TECH TAGS */}
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, i) => (
                  <motion.span
                      key={i}
                      className="px-3 py-1 text-[11px] font-semibold rounded-lg"
                      style={{
                        background: "rgba(141,255,105,0.06)",
                        border: "1px solid rgba(141,255,105,0.2)",
                        color: "#8DFF69",
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * i + 0.3 }}
                      whileHover={{
                        scale: 1.08,
                        background: "rgba(141,255,105,0.14)",
                      }}
                  >
                    {tech}
                  </motion.span>
              ))}
            </div>

            {/* METRICS */}
            {metrics && (
                <motion.div
                    className="flex items-center gap-2 pt-3"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                  <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <TrendingUp className="w-4 h-4 text-[#8DFF69]" />
                  </motion.div>
                  <span className="text-sm text-emerald-400 font-medium">{metrics}</span>
                </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
  );
};

/* ─────────────────────────────────────────────
   MAIN PROJECTS SECTION
───────────────────────────────────────────── */
const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const filterRef  = useRef(null);
  const sliderRef  = useRef(null);

  const headerInView = useInView(headerRef, { once: false, margin: "-15% 0px -15% 0px" });
  const filterInView = useInView(filterRef, { once: false, margin: "-10% 0px -10% 0px" });
  const sliderInView = useInView(sliderRef, { once: false, margin: "-10% 0px -10% 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const springY   = useSpring(parallaxY, { stiffness: 60, damping: 20 });

  const filteredProjects =
      activeCategory === "All"
          ? projects
          : projects.filter((p) => p.category === activeCategory);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
        prev === 0 ? filteredProjects.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) =>
        prev === filteredProjects.length - 1 ? 0 : prev + 1
    );
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
    setDirection(1);
  };

  /* stagger variants */
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
    exit:   { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const itemVariants = {
    hidden:   { opacity: 0, y: 30, filter: "blur(6px)" },
    visible:  { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    exit:     { opacity: 0, y: -20, filter: "blur(6px)", transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
      <section
          id="projects"
          ref={sectionRef}
          className="relative py-28 overflow-hidden"
      >
        {/* ── Section-specific ambient glows ── */}
        <motion.div
            className="absolute top-[-60px] right-[-60px] w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(141,255,105,0.07) 0%, transparent 70%)",
              zIndex: 0,
            }}
            animate={{ scale: [1, 1.14, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute bottom-[-60px] left-[-60px] w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(97,218,251,0.06) 0%, transparent 70%)",
              zIndex: 0,
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 70%)",
              zIndex: 0,
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />

        {/* ── decorative corner lines ── */}
        <div
            className="absolute top-0 right-0 w-px h-48 pointer-events-none"
            style={{ background: "linear-gradient(180deg, rgba(141,255,105,0.25), transparent)", zIndex: 1 }}
        />
        <div
            className="absolute bottom-0 left-0 w-px h-48 pointer-events-none"
            style={{ background: "linear-gradient(0deg, rgba(97,218,251,0.2), transparent)", zIndex: 1 }}
        />

        {/* ── parallax diagonal line ── */}
        <motion.div
            className="absolute top-1/3 left-0 w-full h-px pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(141,255,105,0.04), transparent)",
              y: springY,
              zIndex: 0,
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
            <SectionLabel>My Portfolio</SectionLabel>

            <h2
                className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
                style={{ lineHeight: 1.1 }}
            >
              <span className="text-white">Featured</span>{" "}
              <span
                  style={{
                    background: "linear-gradient(135deg, #8DFF69 0%, #61DAFB 50%, #A78BFA 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
              >
              Projects
            </span>
            </h2>

            <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
              Explore my latest work — from{" "}
              <span className="text-[#8DFF69] font-semibold">interactive</span> web apps to{" "}
              <span className="text-[#61DAFB] font-semibold">complex</span> full-stack solutions.
            </p>

            <motion.div
                className="h-px w-28 mx-auto rounded-full"
                style={{ background: "linear-gradient(90deg, #8DFF69, #61DAFB, #A78BFA)" }}
                initial={{ scaleX: 0 }}
                animate={headerInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
            />
          </motion.div>

          {/* ══════════ CATEGORY FILTER ══════════ */}
          <AnimatePresence>
            {filterInView && (
                <motion.div
                    ref={filterRef}
                    key="filters"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-wrap justify-center gap-3 mb-14"
                >
                  {categories.map((cat, i) => {
                    const Icon   = categoryIcons[cat] || Target;
                    const color  = categoryColors[cat] || "#8DFF69";
                    const active = activeCategory === cat;

                    return (
                        <motion.button
                            key={cat}
                            variants={itemVariants}
                            onClick={() => handleCategoryChange(cat)}
                            className="relative px-5 py-2.5 rounded-2xl font-bold text-sm overflow-hidden"
                            style={{
                              background: active ? `${color}15` : "rgba(255,255,255,0.03)",
                              border: active
                                  ? `1px solid ${color}50`
                                  : "1px solid rgba(255,255,255,0.08)",
                              color: active ? color : "#6b7280",
                            }}
                            whileHover={{
                              scale: 1.06,
                              color: color,
                              borderColor: `${color}50`,
                              background: `${color}10`,
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                          {/* active pill glow */}
                          {active && (
                              <motion.div
                                  layoutId="activeCategoryGlow"
                                  className="absolute inset-0 rounded-2xl"
                                  style={{
                                    background: `radial-gradient(circle at center, ${color}20 0%, transparent 70%)`,
                                  }}
                                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                              />
                          )}

                          {/* shimmer on active */}
                          {active && (
                              <motion.div
                                  className="absolute inset-0 rounded-2xl"
                                  style={{
                                    background: `linear-gradient(90deg, transparent, ${color}15, transparent)`,
                                  }}
                                  animate={{ x: ["-100%", "200%"] }}
                                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                              />
                          )}

                          <span className="relative z-10 flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                            {cat}
                    </span>
                        </motion.button>
                    );
                  })}
                </motion.div>
            )}
          </AnimatePresence>
          {/* invisible ref for filter */}
          <div ref={filterRef} style={{ height: 0 }} />

          {/* ══════════ SLIDER ══════════ */}
          <div ref={sliderRef}>
            <AnimatePresence>
              {sliderInView && filteredProjects.length > 0 && (
                  <motion.div
                      key="slider"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="relative"
                  >
                    {/* ── Nav Buttons ── */}
                    <motion.button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-6 z-20 w-11 h-11 flex items-center justify-center rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          backdropFilter: "blur(12px)",
                        }}
                        whileHover={{
                          scale: 1.12,
                          background: "rgba(141,255,105,0.12)",
                          borderColor: "rgba(141,255,105,0.4)",
                          boxShadow: "0 0 20px rgba(141,255,105,0.2)",
                        }}
                        whileTap={{ scale: 0.92 }}
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </motion.button>

                    <motion.button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-6 z-20 w-11 h-11 flex items-center justify-center rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          backdropFilter: "blur(12px)",
                        }}
                        whileHover={{
                          scale: 1.12,
                          background: "rgba(141,255,105,0.12)",
                          borderColor: "rgba(141,255,105,0.4)",
                          boxShadow: "0 0 20px rgba(141,255,105,0.2)",
                        }}
                        whileTap={{ scale: 0.92 }}
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </motion.button>

                    {/* ── Card ── */}
                    <div className="flex justify-center items-center min-h-[520px] px-8 md:px-12">
                      <AnimatePresence mode="wait" custom={direction}>
                        <ProjectCard
                            key={`${activeCategory}-${currentIndex}`}
                            project={filteredProjects[currentIndex]}
                            direction={direction}
                        />
                      </AnimatePresence>
                    </div>

                    {/* ── Counter ── */}
                    <motion.div
                        className="flex justify-center mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                  <span className="text-xs font-mono text-gray-600">
                    <span className="text-[#8DFF69] font-bold">{currentIndex + 1}</span>
                    {" / "}
                    {filteredProjects.length}
                  </span>
                    </motion.div>

                    {/* ── Dots ── */}
                    <div className="flex justify-center gap-2">
                      {filteredProjects.map((_, i) => (
                          <motion.button
                              key={i}
                              onClick={() => {
                                setDirection(i > currentIndex ? 1 : -1);
                                setCurrentIndex(i);
                              }}
                              className="rounded-full"
                              style={{
                                height: 6,
                                background: i === currentIndex
                                    ? "linear-gradient(90deg, #8DFF69, #61DAFB)"
                                    : "rgba(255,255,255,0.15)",
                              }}
                              animate={{ width: i === currentIndex ? 28 : 6 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              whileHover={{
                                background: "rgba(141,255,105,0.5)",
                                scale: 1.3,
                              }}
                          />
                      ))}
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>

            {/* empty state */}
            {filteredProjects.length === 0 && (
                <motion.div
                    className="text-center py-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                  <p className="text-gray-500">No projects found in this category.</p>
                </motion.div>
            )}
          </div>

        </div>
      </section>
  );
};

export default Projects;