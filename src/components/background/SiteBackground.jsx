/**
 * SiteBackground.jsx
 * ─────────────────────────────────────────────────────────
 * Path: src/components/background/SiteBackground.jsx
 *
 * Usage — place once inside MainLayout.jsx, wraps the whole site:
 *
 *   import SiteBackground from "../components/background/SiteBackground";
 *
 *   const MainLayout = () => (
 *     <div className="relative">
 *       <SiteBackground />          ← always behind everything
 *       <Navbar />
 *       <Outlet />
 *       <Footer />
 *     </div>
 *   );
 *
 * Props:
 *   variant   → "default" | "minimal" | "intense"   (default: "default")
 *   particles → true | false                         (default: true)
 *   grid      → true | false                         (default: true)
 * ─────────────────────────────────────────────────────────
 */

import React, { useMemo } from "react";
import { motion } from "motion/react";

/* ═══════════════════════════════════════════════
   1.  GRID OVERLAY
═══════════════════════════════════════════════ */
const GridOverlay = () => (
    <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, opacity: 0.028 }}
        aria-hidden="true"
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
                    "radial-gradient(ellipse 100% 100% at 50% 50%, black 0%, transparent 100%)",
                WebkitMaskImage:
                    "radial-gradient(ellipse 100% 100% at 50% 50%, black 0%, transparent 100%)",
            }}
        />
    </div>
);

/* ═══════════════════════════════════════════════
   2.  FLOATING PARTICLES
═══════════════════════════════════════════════ */
const PARTICLE_COLORS = [
    { color: "rgba(141,255,105,0.7)", glow: "rgba(141,255,105,0.8)" },
    { color: "rgba(97,218,251,0.5)",  glow: "rgba(97,218,251,0.6)"  },
    { color: "rgba(167,139,250,0.5)", glow: "rgba(167,139,250,0.6)" },
    { color: "rgba(244,114,182,0.4)", glow: "rgba(244,114,182,0.5)" },
];

const Particle = ({ seed }) => {
    // deterministic-ish values from seed so they're stable across renders
    const s  = seed * 7919;
    const size      = ((s % 40) / 10) + 1.5;          // 1.5 – 5.5 px
    const xPos      = (s % 100);                       // 0 – 100 %
    const duration  = ((s % 120) / 10) + 8;           // 8 – 20 s
    const delay     = (s % 60) / 10;                  // 0 – 6 s
    const drift     = ((s % 120) - 60);               // –60 – +60 px
    const cIdx      = seed % PARTICLE_COLORS.length;
    const { color, glow } = PARTICLE_COLORS[cIdx];

    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                width:  size,
                height: size,
                left:   `${xPos}%`,
                bottom: "-12px",
                background: color,
                boxShadow: `0 0 ${size * 2}px ${glow}`,
            }}
            animate={{
                y:       [0, -(500 + (s % 400))],
                x:       [0, drift],
                opacity: [0, 0.85, 0.6, 0],
                scale:   [0, 1, 0.7, 0],
            }}
            transition={{
                duration,
                delay,
                repeat:    Infinity,
                ease:      "easeOut",
                repeatDelay: (s % 30) / 10,
            }}
        />
    );
};

/* ═══════════════════════════════════════════════
   3.  AMBIENT GLOW BLOBS
═══════════════════════════════════════════════ */
const blobs = [
    // top-left  — green
    {
        pos:  { top: "0%",   left: "0%"   },
        size: { width: 700,  height: 700  },
        color: "141,255,105",
        opacity: [0.06, 0.10, 0.06],
        scale:   [1, 1.15, 1],
        duration: 8,
        delay: 0,
    },
    // top-right  — blue
    {
        pos:  { top: "0%",  right: "0%"  },
        size: { width: 600, height: 600  },
        color: "97,218,251",
        opacity: [0.05, 0.09, 0.05],
        scale:   [1, 1.2, 1],
        duration: 10,
        delay: 1.5,
    },
    // center — purple  (very subtle)
    {
        pos:  { top: "40%",  left: "35%"  },
        size: { width: 900,  height: 900  },
        color: "167,139,250",
        opacity: [0.02, 0.05, 0.02],
        scale:   [1, 1.1, 1],
        duration: 14,
        delay: 3,
    },
    // bottom-right — pink
    {
        pos:  { bottom: "0%", right: "0%" },
        size: { width: 650,  height: 650  },
        color: "244,114,182",
        opacity: [0.04, 0.08, 0.04],
        scale:   [1, 1.18, 1],
        duration: 11,
        delay: 2,
    },
    // bottom-left — green secondary
    {
        pos:  { bottom: "5%", left: "5%" },
        size: { width: 500,  height: 500 },
        color: "141,255,105",
        opacity: [0.03, 0.07, 0.03],
        scale:   [1, 1.12, 1],
        duration: 9,
        delay: 4,
    },
];

const AmbientBlobs = ({ intensity = 1 }) => (
    <>
        {blobs.map((b, i) => (
            <motion.div
                key={i}
                className="fixed pointer-events-none rounded-full"
                style={{
                    ...b.pos,
                    width:  b.size.width,
                    height: b.size.height,
                    background: `radial-gradient(circle, rgba(${b.color},1) 0%, transparent 70%)`,
                    zIndex: 0,
                    translateX: b.pos.right !== undefined ? "40%" : "-40%",
                    translateY: b.pos.bottom !== undefined ? "40%" : "-40%",
                }}
                animate={{
                    opacity: b.opacity.map((o) => o * intensity),
                    scale:   b.scale,
                }}
                transition={{
                    duration:  b.duration,
                    delay:     b.delay,
                    repeat:    Infinity,
                    ease:      "easeInOut",
                }}
            />
        ))}
    </>
);

/* ═══════════════════════════════════════════════
   4.  NOISE / GRAIN TEXTURE  (pure CSS, zero JS)
═══════════════════════════════════════════════ */
const GrainTexture = () => (
    <div
        className="fixed inset-0 pointer-events-none"
        style={{
            zIndex: 1,
            opacity: 0.022,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
    />
);

/* ═══════════════════════════════════════════════
   5.  SCANLINE  (subtle CRT vibe — optional)
═══════════════════════════════════════════════ */
const Scanlines = () => (
    <div
        className="fixed inset-0 pointer-events-none"
        style={{
            zIndex: 1,
            opacity: 0.012,
            backgroundImage:
                "repeating-linear-gradient(0deg, rgba(141,255,105,0.15) 0px, rgba(141,255,105,0.15) 1px, transparent 1px, transparent 3px)",
        }}
        aria-hidden="true"
    />
);

/* ═══════════════════════════════════════════════
   6.  VARIANT CONFIGS
═══════════════════════════════════════════════ */
const VARIANT_CONFIG = {
    default: {
        particleCount: 28,
        blobIntensity: 1,
        showGrid:      true,
        showGrain:     true,
        showScanlines: false,
    },
    minimal: {
        particleCount: 10,
        blobIntensity: 0.5,
        showGrid:      false,
        showGrain:     true,
        showScanlines: false,
    },
    intense: {
        particleCount: 45,
        blobIntensity: 1.6,
        showGrid:      true,
        showGrain:     true,
        showScanlines: true,
    },
};

/* ═══════════════════════════════════════════════
   7.  MAIN EXPORT
═══════════════════════════════════════════════ */
const SiteBackground = ({
                            variant  = "default",
                            particles: showParticles = true,
                            grid: showGridProp,
                        }) => {
    const cfg = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.default;
    const showGrid = showGridProp !== undefined ? showGridProp : cfg.showGrid;

    // stable seed array
    const seeds = useMemo(
        () => Array.from({ length: cfg.particleCount }, (_, i) => i + 1),
        [cfg.particleCount]
    );

    return (
        <>
            {/* Solid base — darkest bg */}
            <div
                className="fixed inset-0"
                style={{ background: "#030712", zIndex: -1 }}
                aria-hidden="true"
            />

            {/* Ambient blobs */}
            <AmbientBlobs intensity={cfg.blobIntensity} />

            {/* Grid */}
            {showGrid && <GridOverlay />}

            {/* Grain */}
            {cfg.showGrain && <GrainTexture />}

            {/* Scanlines */}
            {cfg.showScanlines && <Scanlines />}

            {/* Particles */}
            {showParticles && (
                <div
                    className="fixed inset-0 overflow-hidden pointer-events-none"
                    style={{ zIndex: 0 }}
                    aria-hidden="true"
                >
                    {seeds.map((seed) => (
                        <Particle key={seed} seed={seed} />
                    ))}
                </div>
            )}
        </>
    );
};

export default SiteBackground;