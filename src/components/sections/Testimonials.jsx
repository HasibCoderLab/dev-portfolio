/**
 * Testimonials.jsx — Industry-level animated Testimonials section
 * Path: src/components/sections/Testimonials.jsx
 *
 * Dependencies: motion/react | lucide-react
 */

import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "motion/react";
import { Quote, Star, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { testimonials as testimonialData } from "../../data/testimonials";

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
   STAR RATING
───────────────────────────────────────────── */
const StarRating = ({ rating = 5, inView, delay = 0 }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
          <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: -30 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{
                delay: delay + i * 0.07,
                duration: 0.4,
                ease: "backOut",
              }}
          >
            <Star
                className="w-4 h-4"
                style={{
                  fill: i < rating ? "#FBBF24" : "transparent",
                  color: i < rating ? "#FBBF24" : "#374151",
                }}
            />
          </motion.div>
      ))}
    </div>
);

/* ─────────────────────────────────────────────
   TESTIMONIAL CARD
───────────────────────────────────────────── */
const TestimonialCard = ({ testimonial, direction, cardInView }) => {
  const [hovered, setHovered] = useState(false);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 320 : -320,
      opacity: 0,
      scale: 0.9,
      rotateY: dir > 0 ? 14 : -14,
      filter: "blur(10px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir) => ({
      x: dir > 0 ? -320 : 320,
      opacity: 0,
      scale: 0.9,
      rotateY: dir > 0 ? -14 : 14,
      filter: "blur(10px)",
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
            className="relative rounded-3xl overflow-hidden p-8 md:p-10"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: hovered
                  ? "1px solid rgba(141,255,105,0.3)"
                  : "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(18px)",
              transition: "border 0.3s",
            }}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
        >
          {/* animated top line */}
          <motion.div
              className="absolute top-0 left-0 h-[2px] rounded-full"
              style={{
                background: "linear-gradient(90deg, #8DFF69, #61DAFB, #A78BFA)",
              }}
              animate={{ width: hovered ? "100%" : "40%" }}
              transition={{ duration: 0.45 }}
          />

          {/* corner ambient glow */}
          <AnimatePresence>
            {hovered && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                          "radial-gradient(circle at 10% 10%, rgba(141,255,105,0.07) 0%, transparent 60%)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />
            )}
          </AnimatePresence>

          {/* Quote badge */}
          <motion.div
              className="absolute -top-4 -right-2 w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: "#8DFF69" }}
              animate={hovered ? { rotate: 0, scale: 1.1 } : { rotate: 12, scale: 1 }}
              transition={{ duration: 0.35 }}
              whileHover={{ boxShadow: "0 0 24px rgba(141,255,105,0.5)" }}
          >
            <Quote className="w-5 h-5 text-black fill-black/20" />
          </motion.div>

          {/* Stars */}
          <StarRating
              rating={testimonial.rating || 5}
              inView={true}
              delay={0.1}
          />

          {/* Quote text */}
          <motion.div className="mt-6 mb-8 relative">
            {/* giant decorative quote */}
            <span
                className="absolute -top-2 -left-1 text-7xl leading-none font-serif pointer-events-none select-none"
                style={{ color: "rgba(141,255,105,0.08)" }}
            >
            "
          </span>
            <motion.p
                className="text-gray-300 text-base md:text-lg italic leading-relaxed pl-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
              "{testimonial.quote}"
            </motion.p>
          </motion.div>

          {/* Profile row */}
          <motion.div
              className="flex items-center gap-4 pt-6"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
          >
            {/* Avatar with animated ring */}
            <div className="relative flex-shrink-0">
              <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #8DFF69, #61DAFB, #A78BFA)",
                    padding: 2,
                  }}
                  animate={{ rotate: hovered ? 360 : 0 }}
                  transition={{ duration: 2, ease: "linear", repeat: hovered ? Infinity : 0 }}
              />
              <div
                  className="relative w-14 h-14 rounded-full overflow-hidden"
                  style={{
                    border: "2px solid rgba(141,255,105,0.4)",
                    padding: 2,
                  }}
              >
                <img
                    src={testimonial.image || "/api/placeholder/100/100"}
                    alt={testimonial.name}
                    className="w-full h-full object-cover rounded-full"
                />
              </div>
              {/* online dot */}
              <motion.div
                  className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                  style={{
                    background: "#8DFF69",
                    borderColor: "#030712",
                  }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-extrabold text-white text-base leading-tight">
                {testimonial.name}
              </h4>
              <p
                  className="text-xs font-semibold mt-0.5"
                  style={{ color: "#8DFF69" }}
              >
                {testimonial.role}
                {testimonial.institution && (
                    <span className="text-gray-500 font-normal">
                  {" "}@ {testimonial.institution}
                </span>
                )}
              </p>
            </div>

            {/* verified badge */}
            <motion.div
                className="flex-shrink-0 px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider flex items-center gap-1"
                style={{
                  background: "rgba(141,255,105,0.1)",
                  border: "1px solid rgba(141,255,105,0.25)",
                  color: "#8DFF69",
                }}
                whileHover={{ scale: 1.06 }}
            >
              <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-[#8DFF69]"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
              />
              Verified
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
  );
};

/* ─────────────────────────────────────────────
   STATS STRIP
───────────────────────────────────────────── */
const statsData = [
  { value: "3x",   label: "Faster Delivery", color: "#8DFF69"  },
  { value: "99%",  label: "Satisfaction",    color: "#61DAFB"  },
  { value: "100%", label: "On-Time",         color: "#A78BFA"  },
  { value: "5★",   label: "Avg Rating",      color: "#FBBF24"  },
];

const StatsStrip = ({ inView }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statsData.map((s, i) => (
          <motion.div
              key={i}
              className="relative rounded-2xl p-4 text-center overflow-hidden group"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                scale: 1.05,
                borderColor: `${s.color}40`,
              }}
          >
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{
                  background: `radial-gradient(circle at center, ${s.color}10 0%, transparent 70%)`,
                }}
            />
            {/* sweep line on enter */}
            <motion.div
                className="absolute top-0 left-0 h-[2px] rounded-full"
                style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }}
                initial={{ width: 0 }}
                animate={inView ? { width: "100%" } : { width: 0 }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
            />
            <div
                className="text-2xl md:text-3xl font-black font-mono mb-1"
                style={{
                  background: `linear-gradient(135deg, ${s.color}, #fff)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
            >
              {s.value}
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">
              {s.label}
            </p>
          </motion.div>
      ))}
    </div>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection]       = useState(1);

  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const cardRef    = useRef(null);
  const statsRef   = useRef(null);
  const navRef     = useRef(null);

  const headerInView = useInView(headerRef, { once: false, margin: "-15% 0px -15% 0px" });
  const cardInView   = useInView(cardRef,   { once: false, margin: "-10% 0px -10% 0px" });
  const statsInView  = useInView(statsRef,  { once: false, margin: "-10% 0px -10% 0px" });
  const navInView    = useInView(navRef,    { once: false, margin: "-10% 0px -10% 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const springY   = useSpring(parallaxY, { stiffness: 60, damping: 20 });

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((p) =>
        p === 0 ? testimonialData.length - 1 : p - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((p) =>
        p === testimonialData.length - 1 ? 0 : p + 1
    );
  };

  const handleDot = (i) => {
    setDirection(i > currentIndex ? 1 : -1);
    setCurrentIndex(i);
  };

  return (
      <section
          id="testimonial"
          ref={sectionRef}
          className="relative py-28 overflow-hidden"
      >
        {/* ── Section-specific ambient glows ── */}
        <motion.div
            className="absolute top-[-80px] left-[-80px] w-[580px] h-[580px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(97,218,251,0.07) 0%, transparent 70%)",
              zIndex: 0,
            }}
            animate={{ scale: [1, 1.14, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute bottom-[-60px] right-[-60px] w-[520px] h-[520px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)",
              zIndex: 0,
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.75, 0.4] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
            className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(141,255,105,0.04) 0%, transparent 70%)",
              zIndex: 0,
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />

        {/* ── Corner decorative lines ── */}
        <div
            className="absolute top-0 left-0 w-px h-48 pointer-events-none"
            style={{ background: "linear-gradient(180deg, rgba(97,218,251,0.25), transparent)", zIndex: 1 }}
        />
        <div
            className="absolute bottom-0 right-0 w-px h-48 pointer-events-none"
            style={{ background: "linear-gradient(0deg, rgba(167,139,250,0.2), transparent)", zIndex: 1 }}
        />

        {/* ── Parallax diagonal line ── */}
        <motion.div
            className="absolute top-2/3 left-0 w-full h-px pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(97,218,251,0.04), transparent)",
              y: springY,
              zIndex: 0,
            }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* ══════════ HEADER ══════════ */}
          <motion.div
              ref={headerRef}
              className="text-center mb-14 space-y-5"
              initial={{ opacity: 0, y: 40 }}
              animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel>Wall of Love</SectionLabel>

            <h2
                className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
                style={{ lineHeight: 1.1 }}
            >
              <span className="text-white">Trusted by</span>{" "}
              <span
                  style={{
                    background: "linear-gradient(135deg, #8DFF69 0%, #61DAFB 50%, #A78BFA 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
              >
              forward-thinking
            </span>{" "}
              <span className="text-white">teams</span>
            </h2>

            <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
              Empowering clients with{" "}
              <span className="text-[#8DFF69] font-semibold">logical solutions</span> and{" "}
              <span className="text-[#61DAFB] font-semibold">high-quality</span> craftsmanship.
            </p>

            {/* animated divider */}
            <motion.div
                className="h-px w-28 mx-auto rounded-full"
                style={{ background: "linear-gradient(90deg, #8DFF69, #61DAFB, #A78BFA)" }}
                initial={{ scaleX: 0 }}
                animate={headerInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
            />

            {/* heart icon */}
            <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={headerInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.4, ease: "backOut" }}
            >
              <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-5 h-5" style={{ color: "#F472B6", fill: "#F472B6" }} />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ══════════ CARD SLIDER ══════════ */}
          <div ref={cardRef} className="mb-10">
            <AnimatePresence>
              {cardInView && (
                  <motion.div
                      key="card-area"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Nav + Card */}
                    <div className="relative flex items-center">
                      {/* LEFT */}
                      <motion.button
                          onClick={handlePrev}
                          className="absolute left-0 -translate-x-3 md:-translate-x-6 z-20 w-11 h-11 flex items-center justify-center rounded-full flex-shrink-0"
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

                      {/* CARD */}
                      <div className="w-full px-6 md:px-10 min-h-[380px] flex items-center">
                        <AnimatePresence mode="wait" custom={direction}>
                          <TestimonialCard
                              key={currentIndex}
                              testimonial={testimonialData[currentIndex]}
                              direction={direction}
                              cardInView={cardInView}
                          />
                        </AnimatePresence>
                      </div>

                      {/* RIGHT */}
                      <motion.button
                          onClick={handleNext}
                          className="absolute right-0 translate-x-3 md:translate-x-6 z-20 w-11 h-11 flex items-center justify-center rounded-full flex-shrink-0"
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
                    </div>

                    {/* ── Counter + Dots ── */}
                    <div ref={navRef} className="mt-8 flex flex-col items-center gap-3">
                      <motion.span
                          className="text-xs font-mono text-gray-600"
                          initial={{ opacity: 0 }}
                          animate={navInView ? { opacity: 1 } : {}}
                          transition={{ delay: 0.2 }}
                      >
                    <span className="text-[#8DFF69] font-bold">
                      {currentIndex + 1}
                    </span>{" "}
                        / {testimonialData.length}
                      </motion.span>

                      <div className="flex gap-2">
                        {testimonialData.map((_, i) => (
                            <motion.button
                                key={i}
                                onClick={() => handleDot(i)}
                                className="rounded-full"
                                style={{
                                  height: 6,
                                  background:
                                      i === currentIndex
                                          ? "linear-gradient(90deg, #8DFF69, #61DAFB)"
                                          : "rgba(255,255,255,0.15)",
                                }}
                                animate={{ width: i === currentIndex ? 28 : 6 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                whileHover={{ background: "rgba(141,255,105,0.5)", scale: 1.3 }}
                            />
                        ))}
                      </div>
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ══════════ STATS STRIP ══════════ */}
          <div ref={statsRef} className="mt-6">
            <motion.div
                className="flex items-center gap-3 mb-6 justify-center"
                initial={{ opacity: 0 }}
                animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
              <div
                  className="h-px flex-1 max-w-[60px]"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(141,255,105,0.3))" }}
              />
              <span className="text-[10px] uppercase tracking-[0.25em] text-gray-600 font-bold">
              By The Numbers
            </span>
              <div
                  className="h-px flex-1 max-w-[60px]"
                  style={{ background: "linear-gradient(90deg, rgba(141,255,105,0.3), transparent)" }}
              />
            </motion.div>
            <StatsStrip inView={statsInView} />
          </div>

        </div>
      </section>
  );
};

export default Testimonials;