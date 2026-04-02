/**
 * SiteBackground.jsx — PERFORMANCE OPTIMIZED
 * Path: src/components/background/SiteBackground.jsx
 *
 * Performance fixes applied:
 * ✅ border-radius animation removed (was non-composited → caused CLS)
 * ✅ will-change: transform, opacity added (GPU layer promotion)
 * ✅ Particle count reduced (20 default instead of 28)
 * ✅ Only opacity + scale animated on blobs (both GPU composited)
 */

import React, { useMemo } from "react";
import { motion } from "motion/react";

/* ─── 1. GRID OVERLAY ─── */
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
                maskImage: "radial-gradient(ellipse 100% 100% at 50% 50%, black 0%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 100% 100% at 50% 50%, black 0%, transparent 100%)",
            }}
        />
    </div>
);

/* ─── 2. PARTICLES (GPU composited) ─── */
const PARTICLE_COLORS = [
    { color: "rgba(141,255,105,0.7)", glow: "rgba(141,255,105,0.8)" },
    { color: "rgba(97,218,251,0.5)",  glow: "rgba(97,218,251,0.6)"  },
    { color: "rgba(167,139,250,0.5)", glow: "rgba(167,139,250,0.6)" },
    { color: "rgba(244,114,182,0.4)", glow: "rgba(244,114,182,0.5)" },
];

const Particle = ({ seed }) => {
    const s        = seed * 7919;
    const size     = ((s % 40) / 10) + 1.5;
    const xPos     = (s % 100);
    const duration = ((s % 120) / 10) + 8;
    const delay    = (s % 60) / 10;
    const drift    = ((s % 120) - 60);
    const { color, glow } = PARTICLE_COLORS[seed % PARTICLE_COLORS.length];

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
                willChange: "transform, opacity",  /* GPU layer */
            }}
            animate={{
                y:       [0, -(500 + (s % 400))],
                x:       [0, drift],
                opacity: [0, 0.85, 0.6, 0],
                scale:   [0, 1, 0.7, 0],
            }}
            transition={{ duration, delay, repeat: Infinity, ease: "easeOut", repeatDelay: (s % 30) / 10 }}
        />
    );
};

/* ─── 3. AMBIENT BLOBS (border-radius FIXED) ─── */
const blobDefs = [
    { pos: { top: "0%",    left: "0%"   }, size: [700, 700], color: "141,255,105", op: [0.06, 0.10, 0.06], sc: [1, 1.15, 1], dur: 8,  del: 0   },
    { pos: { top: "0%",    right: "0%"  }, size: [600, 600], color: "97,218,251",  op: [0.05, 0.09, 0.05], sc: [1, 1.20, 1], dur: 10, del: 1.5 },
    { pos: { top: "40%",   left: "35%"  }, size: [900, 900], color: "167,139,250", op: [0.02, 0.05, 0.02], sc: [1, 1.10, 1], dur: 14, del: 3   },
    { pos: { bottom: "0%", right: "0%"  }, size: [650, 650], color: "244,114,182", op: [0.04, 0.08, 0.04], sc: [1, 1.18, 1], dur: 11, del: 2   },
    { pos: { bottom: "5%", left: "5%"   }, size: [500, 500], color: "141,255,105", op: [0.03, 0.07, 0.03], sc: [1, 1.12, 1], dur: 9,  del: 4   },
];

const AmbientBlobs = ({ intensity = 1 }) => (
    <>
        {blobDefs.map((b, i) => {
            /* translate করে position adjust করি — layout shift হয় না */
            const tx = b.pos.right  !== undefined ? "40%" : "-40%";
            const ty = b.pos.bottom !== undefined ? "40%" : "-40%";
            return (
                <motion.div
                    key={i}
                    className="fixed pointer-events-none"
                    style={{
                        ...b.pos,
                        width:  b.size[0],
                        height: b.size[1],
                        borderRadius: "50%",            /* static, not animated */
                        background: `radial-gradient(circle, rgba(${b.color},1) 0%, transparent 70%)`,
                        transform: `translate(${tx}, ${ty})`,
                        zIndex: 0,
                        willChange: "transform, opacity", /* GPU compositing */
                    }}
                    animate={{
                        opacity: b.op.map((o) => o * intensity),
                        scale:   b.sc,
                        /* ✅ border-radius animate করা হচ্ছে না — CLS fix */
                    }}
                    transition={{ duration: b.dur, delay: b.del, repeat: Infinity, ease: "easeInOut" }}
                />
            );
        })}
    </>
);

/* ─── 4. GRAIN TEXTURE ─── */
const GrainTexture = () => (
    <div
        className="fixed inset-0 pointer-events-none"
        style={{
            zIndex: 1, opacity: 0.022,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat", backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
    />
);

/* ─── 5. CONFIGS ─── */
const CONFIGS = {
    default: { particleCount: 20, blobIntensity: 1,   showGrid: true,  showGrain: true },
    minimal: { particleCount: 8,  blobIntensity: 0.5, showGrid: false, showGrain: true },
    intense: { particleCount: 30, blobIntensity: 1.5, showGrid: true,  showGrain: true },
};

/* ─── 6. MAIN EXPORT ─── */
const SiteBackground = ({ variant = "default", particles: showParticles = true, grid: showGridProp }) => {
    const cfg      = CONFIGS[variant] ?? CONFIGS.default;
    const showGrid = showGridProp !== undefined ? showGridProp : cfg.showGrid;
    const seeds    = useMemo(() => Array.from({ length: cfg.particleCount }, (_, i) => i + 1), [cfg.particleCount]);

    return (
        <>
            <div className="fixed inset-0" style={{ background: "#030712", zIndex: -1 }} aria-hidden="true" />
            <AmbientBlobs intensity={cfg.blobIntensity} />
            {showGrid && <GridOverlay />}
            {cfg.showGrain && <GrainTexture />}
            {showParticles && (
                <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
                    {seeds.map((seed) => <Particle key={seed} seed={seed} />)}
                </div>
            )}
        </>
    );
};

export default SiteBackground;