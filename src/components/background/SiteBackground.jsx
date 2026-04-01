/**
 * SiteBackground.jsx  —  ULTRA EDITION
 * ─────────────────────────────────────────────────────────
 * Path: src/components/background/SiteBackground.jsx
 *
 * Usage:
 *   <SiteBackground variant="default" />   ← in MainLayout.jsx
 *
 * Variants: "default" | "minimal" | "intense"
 * ─────────────────────────────────────────────────────────
 */

import React, { useMemo, useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/* ═══════════════════════════════════════════════
   1. CSS KEYFRAMES  (injected once)
═══════════════════════════════════════════════ */
const KEYFRAMES = `
  @keyframes aurora1 {
    0%,100% { transform: translate(0%,0%) scale(1) rotate(0deg); opacity:.07; }
    33%      { transform: translate(5%,8%) scale(1.18) rotate(12deg); opacity:.13; }
    66%      { transform: translate(-4%,5%) scale(0.92) rotate(-8deg); opacity:.09; }
  }
  @keyframes aurora2 {
    0%,100% { transform: translate(0%,0%) scale(1) rotate(0deg); opacity:.06; }
    40%      { transform: translate(-6%,-5%) scale(1.22) rotate(-15deg); opacity:.12; }
    70%      { transform: translate(4%,6%) scale(0.88) rotate(10deg); opacity:.08; }
  }
  @keyframes aurora3 {
    0%,100% { transform: translate(0%,0%) scale(1); opacity:.04; }
    50%      { transform: translate(3%,-4%) scale(1.15); opacity:.08; }
  }
  @keyframes blobMorph {
    0%,100% { border-radius:60% 40% 30% 70%/60% 30% 70% 40%; }
    25%      { border-radius:30% 70% 70% 30%/30% 40% 60% 70%; }
    50%      { border-radius:50% 50% 40% 60%/40% 70% 30% 60%; }
    75%      { border-radius:70% 30% 50% 50%/50% 60% 40% 50%; }
  }
  @keyframes meteorFall {
    0%   { transform: translate(0,0) rotate(-35deg); opacity:1; }
    100% { transform: translate(-600px, 600px) rotate(-35deg); opacity:0; }
  }
  @keyframes gridPulse {
    0%,100% { opacity:.022; }
    50%      { opacity:.038; }
  }
  @keyframes scanSweep {
    0%   { top: -4px; }
    100% { top: 100%; }
  }
  @keyframes noiseAnim {
    0%   { background-position: 0   0;   }
    25%  { background-position: 50% 25%; }
    50%  { background-position: 100% 50%;}
    75%  { background-position: 50% 75%; }
    100% { background-position: 0   100%;}
  }
`;

const StyleTag = () => {
    const injected = useRef(false);
    if (!injected.current) {
        injected.current = true;
        if (typeof document !== "undefined") {
            const s = document.createElement("style");
            s.textContent = KEYFRAMES;
            document.head.appendChild(s);
        }
    }
    return null;
};

/* ═══════════════════════════════════════════════
   2. GRID OVERLAY  (animated pulse)
═══════════════════════════════════════════════ */
const GridOverlay = () => (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
        <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `
        linear-gradient(rgba(141,255,105,0.9) 1px, transparent 1px),
        linear-gradient(90deg, rgba(141,255,105,0.9) 1px, transparent 1px)
      `,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)",
            animation: "gridPulse 6s ease-in-out infinite",
        }} />
    </div>
);

/* ═══════════════════════════════════════════════
   3. AURORA BANDS  (large blurred color bands)
═══════════════════════════════════════════════ */
const AuroraBands = ({ intensity = 1 }) => {
    const bands = [
        {
            style: { top: "-10%", left: "-15%", width: "80vw", height: "80vw" },
            anim: "aurora1",
            duration: "18s",
            bg: `radial-gradient(ellipse, rgba(141,255,105,${0.18 * intensity}) 0%, rgba(97,218,251,${0.08 * intensity}) 40%, transparent 70%)`,
        },
        {
            style: { top: "-5%", right: "-10%", width: "70vw", height: "70vw" },
            anim: "aurora2",
            duration: "22s",
            bg: `radial-gradient(ellipse, rgba(97,218,251,${0.15 * intensity}) 0%, rgba(167,139,250,${0.08 * intensity}) 40%, transparent 70%)`,
        },
        {
            style: { bottom: "-5%", left: "15%", width: "75vw", height: "75vw" },
            anim: "aurora3",
            duration: "26s",
            bg: `radial-gradient(ellipse, rgba(167,139,250,${0.12 * intensity}) 0%, rgba(244,114,182,${0.07 * intensity}) 40%, transparent 70%)`,
        },
        {
            style: { bottom: "-10%", right: "-5%", width: "60vw", height: "60vw" },
            anim: "aurora1",
            duration: "20s",
            bg: `radial-gradient(ellipse, rgba(244,114,182,${0.1 * intensity}) 0%, rgba(141,255,105,${0.06 * intensity}) 40%, transparent 70%)`,
        },
    ];

    return (
        <>
            {bands.map((b, i) => (
                <div
                    key={i}
                    className="fixed pointer-events-none"
                    style={{
                        ...b.style,
                        background: b.bg,
                        filter: "blur(80px)",
                        animation: `${b.anim} ${b.duration} ease-in-out infinite`,
                        animationDelay: `${i * 3}s`,
                        zIndex: 0,
                        willChange: "transform, opacity",
                    }}
                    aria-hidden="true"
                />
            ))}
        </>
    );
};

/* ═══════════════════════════════════════════════
   4. MORPHING BLOBS  (organic shape-shift)
═══════════════════════════════════════════════ */
const BLOB_DEFS = [
    { pos: { top: "8%",   left: "5%"   }, size: 340, color: "141,255,105", opacity: 0.055, dur: "14s", delay: "0s"  },
    { pos: { top: "5%",   right: "5%"  }, size: 280, color: "97,218,251",  opacity: 0.05,  dur: "18s", delay: "2s"  },
    { pos: { top: "45%",  left: "38%"  }, size: 420, color: "167,139,250", opacity: 0.03,  dur: "22s", delay: "4s"  },
    { pos: { bottom: "5%",right: "5%"  }, size: 300, color: "244,114,182", opacity: 0.045, dur: "16s", delay: "1s"  },
    { pos: { bottom: "8%",left: "8%"   }, size: 260, color: "141,255,105", opacity: 0.04,  dur: "12s", delay: "3s"  },
    { pos: { top: "50%",  right: "10%" }, size: 200, color: "97,218,251",  opacity: 0.035, dur: "20s", delay: "5s"  },
];

const MorphingBlobs = ({ intensity = 1 }) => (
    <>
        {BLOB_DEFS.map((b, i) => (
            <div
                key={i}
                className="fixed pointer-events-none"
                style={{
                    ...b.pos,
                    width:  b.size,
                    height: b.size,
                    background: `radial-gradient(circle, rgba(${b.color},${b.opacity * intensity * 12}) 0%, transparent 70%)`,
                    filter: "blur(40px)",
                    animation: `blobMorph ${b.dur} ease-in-out infinite`,
                    animationDelay: b.delay,
                    zIndex: 0,
                    willChange: "border-radius",
                }}
                aria-hidden="true"
            />
        ))}
    </>
);

/* ═══════════════════════════════════════════════
   5. FLOATING PARTICLES  (deterministic, stable)
═══════════════════════════════════════════════ */
const PCOLORS = [
    { color: "rgba(141,255,105,0.75)", glow: "rgba(141,255,105,0.9)" },
    { color: "rgba(97,218,251,0.6)",   glow: "rgba(97,218,251,0.75)"  },
    { color: "rgba(167,139,250,0.55)", glow: "rgba(167,139,250,0.7)"  },
    { color: "rgba(244,114,182,0.5)",  glow: "rgba(244,114,182,0.65)" },
    { color: "rgba(255,200,80,0.45)",  glow: "rgba(255,200,80,0.6)"   },
];

const Particle = ({ seed }) => {
    const s        = seed * 7919;
    const size     = ((s % 45) / 10) + 1.5;
    const xPos     = s % 100;
    const duration = ((s % 130) / 10) + 7;
    const delay    = (s % 70) / 10;
    const drift    = ((s % 140) - 70);
    const yTravel  = 480 + (s % 420);
    const cIdx     = seed % PCOLORS.length;
    const { color, glow } = PCOLORS[cIdx];

    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                width: size, height: size,
                left: `${xPos}%`, bottom: "-14px",
                background: color,
                boxShadow: `0 0 ${size * 2.5}px ${glow}`,
            }}
            animate={{
                y:       [0, -yTravel],
                x:       [0, drift],
                opacity: [0, 0.9, 0.65, 0],
                scale:   [0, 1, 0.8, 0],
            }}
            transition={{
                duration,
                delay,
                repeat:      Infinity,
                ease:        "easeOut",
                repeatDelay: (s % 35) / 10,
            }}
        />
    );
};

/* ═══════════════════════════════════════════════
   6. METEOR SHOWER  (streaking lines)
═══════════════════════════════════════════════ */
const METEOR_SEEDS = [
    { top: "8%",  left: "90%", delay: "0s",   dur: "2.2s" },
    { top: "15%", left: "70%", delay: "3.5s", dur: "1.8s" },
    { top: "5%",  left: "50%", delay: "6s",   dur: "2.5s" },
    { top: "20%", left: "80%", delay: "9s",   dur: "1.6s" },
    { top: "3%",  left: "60%", delay: "12s",  dur: "2s"   },
    { top: "12%", left: "40%", delay: "15s",  dur: "2.3s" },
];

const MeteorShower = () => (
    <>
        {METEOR_SEEDS.map((m, i) => (
            <div
                key={i}
                className="fixed pointer-events-none overflow-hidden"
                style={{ top: m.top, left: m.left, zIndex: 0 }}
                aria-hidden="true"
            >
                <div style={{
                    width: "160px", height: "1.5px",
                    background: "linear-gradient(90deg, rgba(141,255,105,0), rgba(141,255,105,0.85), rgba(255,255,255,0.9))",
                    boxShadow: "0 0 6px rgba(141,255,105,0.8)",
                    animation: `meteorFall ${m.dur} linear infinite`,
                    animationDelay: m.delay,
                    opacity: 0,
                }} />
            </div>
        ))}
    </>
);

/* ═══════════════════════════════════════════════
   7. GRAIN TEXTURE
═══════════════════════════════════════════════ */
const GrainTexture = () => (
    <div
        className="fixed inset-0 pointer-events-none"
        style={{
            zIndex: 1, opacity: 0.028,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "180px 180px",
            animation: "noiseAnim 8s steps(1) infinite",
        }}
        aria-hidden="true"
    />
);

/* ═══════════════════════════════════════════════
   8. SCANLINE (CRT vibe)
═══════════════════════════════════════════════ */
const Scanlines = () => (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1, overflow: "hidden" }} aria-hidden="true">
        {/* static lines */}
        <div style={{
            position: "absolute", inset: 0, opacity: 0.012,
            backgroundImage: "repeating-linear-gradient(0deg, rgba(141,255,105,0.18) 0px, rgba(141,255,105,0.18) 1px, transparent 1px, transparent 4px)",
        }} />
        {/* moving sweep */}
        <div style={{
            position: "absolute", left: 0, right: 0, height: "4px",
            background: "linear-gradient(180deg, transparent, rgba(141,255,105,0.06), transparent)",
            animation: "scanSweep 6s linear infinite",
        }} />
    </div>
);

/* ═══════════════════════════════════════════════
   9. CORNER ACCENT LINES  (cyber frame feel)
═══════════════════════════════════════════════ */
const CornerAccents = () => {
    const corners = [
        { top: 0,    left: 0,    borderTop: true,  borderLeft: true  },
        { top: 0,    right: 0,   borderTop: true,  borderRight: true },
        { bottom: 0, left: 0,    borderBottom: true, borderLeft: true  },
        { bottom: 0, right: 0,   borderBottom: true, borderRight: true },
    ];
    return (
        <>
            {corners.map((c, i) => (
                <motion.div
                    key={i}
                    className="fixed pointer-events-none"
                    style={{
                        ...Object.fromEntries(Object.entries(c).filter(([k]) => !k.startsWith("border")).map(([k, v]) => [k, v === 0 ? "16px" : undefined]).filter(([,v]) => v)),
                        top:    c.top    !== undefined ? 16 : undefined,
                        bottom: c.bottom !== undefined ? 16 : undefined,
                        left:   c.left   !== undefined ? 16 : undefined,
                        right:  c.right  !== undefined ? 16 : undefined,
                        width:  40, height: 40,
                        borderTop:    c.borderTop    ? "1px solid rgba(141,255,105,0.25)" : "none",
                        borderBottom: c.borderBottom ? "1px solid rgba(141,255,105,0.25)" : "none",
                        borderLeft:   c.borderLeft   ? "1px solid rgba(141,255,105,0.25)" : "none",
                        borderRight:  c.borderRight  ? "1px solid rgba(141,255,105,0.25)" : "none",
                        zIndex: 2,
                    }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    aria-hidden="true"
                />
            ))}
        </>
    );
};

/* ═══════════════════════════════════════════════
   10. VARIANT CONFIGS
═══════════════════════════════════════════════ */
const VARIANTS = {
    default: {
        particleCount: 32,
        auroraIntensity: 1,
        blobIntensity: 1,
        showGrid:     true,
        showGrain:    true,
        showScanlines:false,
        showMeteors:  true,
        showCorners:  true,
    },
    minimal: {
        particleCount: 12,
        auroraIntensity: 0.45,
        blobIntensity: 0.45,
        showGrid:     false,
        showGrain:    true,
        showScanlines:false,
        showMeteors:  false,
        showCorners:  false,
    },
    intense: {
        particleCount: 55,
        auroraIntensity: 1.7,
        blobIntensity: 1.7,
        showGrid:     true,
        showGrain:    true,
        showScanlines:true,
        showMeteors:  true,
        showCorners:  true,
    },
};

/* ═══════════════════════════════════════════════
   11. SCROLL-REACTIVE VIGNETTE
═══════════════════════════════════════════════ */
const ScrollVignette = () => {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.04, 0.04, 0]);
    return (
        <motion.div
            className="fixed inset-0 pointer-events-none"
            style={{
                zIndex: 1,
                background: "radial-gradient(ellipse at center, transparent 50%, rgba(141,255,105,0.06) 100%)",
                opacity,
            }}
            aria-hidden="true"
        />
    );
};

/* ═══════════════════════════════════════════════
   12. MAIN EXPORT
═══════════════════════════════════════════════ */
const SiteBackground = ({
                            variant  = "default",
                            particles: showParticles = true,
                            grid: showGridProp,
                        }) => {
    const cfg = VARIANTS[variant] ?? VARIANTS.default;
    const showGrid = showGridProp !== undefined ? showGridProp : cfg.showGrid;

    const seeds = useMemo(
        () => Array.from({ length: cfg.particleCount }, (_, i) => i + 1),
        [cfg.particleCount]
    );

    return (
        <>
            <StyleTag />

            {/* ── Solid base ── */}
            <div className="fixed inset-0" style={{ background: "#030712", zIndex: -1 }} aria-hidden="true" />

            {/* ── Aurora bands (behind everything) ── */}
            <AuroraBands intensity={cfg.auroraIntensity} />

            {/* ── Morphing blobs ── */}
            <MorphingBlobs intensity={cfg.blobIntensity} />

            {/* ── Grid ── */}
            {showGrid && <GridOverlay />}

            {/* ── Meteors ── */}
            {cfg.showMeteors && <MeteorShower />}

            {/* ── Particles ── */}
            {showParticles && (
                <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
                    {seeds.map((seed) => <Particle key={seed} seed={seed} />)}
                </div>
            )}

            {/* ── Grain ── */}
            {cfg.showGrain && <GrainTexture />}

            {/* ── Scanlines ── */}
            {cfg.showScanlines && <Scanlines />}

            {/* ── Corner accents ── */}
            {cfg.showCorners && <CornerAccents />}

            {/* ── Scroll-reactive vignette ── */}
            <ScrollVignette />
        </>
    );
};

export default SiteBackground;