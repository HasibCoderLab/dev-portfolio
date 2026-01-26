import React from "react";
import { motion } from "framer-motion"; // Framer Motion import
import Typewriter from "typewriter-effect";
import { SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb } from "react-icons/si";
import { ChevronDown } from "lucide-react";
import { STATS } from "../../utils/constants";
import { scrollToSection } from "../../hooks/useScrollSpy";
import RadialGradientBackground from "../background/RadialGradientBackground";

const Hero = () => {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#030712] py-20 lg:py-0">
      {/* Radial Background Glows */}
      <RadialGradientBackground variant="hero" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column */}
          <div className="space-y-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="space-y-4"
            >
              {/* Name */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                Hasib Hasan
              </h1>

              {/* "And I'm a" */}
              <p className="text-lg md:text-xl font-medium text-gray-400 ml-1">
                And I am a
              </p>

              {/* Typing Animation */}
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white min-h-[60px]">
                <Typewriter
                  options={{
                    strings: [
                      "Web Developer",
                      "React Developer",
                      "MERN Stack Developer",
                      "Next.js Developer",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                  }}
                />
              </div>

              <p className="text-lg text-gray-400 mt-6 max-w-[500px] leading-relaxed">
                Building modern, scalable web applications with cutting-edge technologies.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
                >
                  Get in Touch
                </button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
            >
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center backdrop-blur-md hover:border-primary/30 transition-colors"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1 font-mono">
                    {stat.value}
                  </div>
                  <p className="text-[10px] uppercase tracking-tighter text-gray-500 font-medium">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Image & Tech Stack */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Outer Glow for Image */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative overflow-hidden rounded-3xl max-w-[450px] bg-white/[0.03] border border-white/10 p-2 backdrop-blur-md">
                <div className="rounded-2xl overflow-hidden aspect-square">
                  <img
                    src="/developer.png"
                    alt="Hasib Hasan"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Tech Icons Float */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-full px-6">
                  <div className="flex items-center justify-around bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
                    {[SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb].map(
                      (Icon, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.2, y: -5 }}
                          className="w-8 h-8 flex items-center justify-center cursor-pointer"
                        >
                          <Icon className="h-full w-full text-cyan-400" />
                        </motion.div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => scrollToSection("about")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-50 text-gray-400 hover:text-white transition-colors"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </div>
      </motion.button>

      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

export default Hero;