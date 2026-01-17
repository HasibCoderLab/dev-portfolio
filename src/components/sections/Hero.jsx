import React from "react";
import Typewriter from "typewriter-effect";
import { SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb } from "react-icons/si";
import { Star, ChevronDown } from "lucide-react";
import { PERSONAL_INFO, STATS } from "../../utils/constants";
import { scrollToSection } from "../../hooks/useScrollSpy";
import FadeIn from "../animations/FadeIn";
import RadialGradientBackground from "../background/RadialGradientBackground";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <RadialGradientBackground variant="hero" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Intro Card */}
            <FadeIn delay={0}>
              <div className="p-6 rounded-2xl bg-gray-900/50 border border-white/10">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-6 bg-gray-800/20 border border-cyan-500/30 rounded-full">
                  <Star className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-white/70 tracking-[1.2px]">
                    {PERSONAL_INFO.title} | {PERSONAL_INFO.location}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-4 leading-tight">
                  <Typewriter
                    options={{
                      strings: [
                        "It's me Mohammad Hasib Hasan",
                        "And I'm a Web Application Developer",
                        "Next.js Developer",
                        "React | Tailwind | Node.js | MongoDB"
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 30,
                    }}
                  />
                </h1>

                <p className="text-lg text-white/70 mb-6 max-w-[500px]">
                  Building modern, scalable web applications with cutting-edge technologies.
                </p>

                <button
                  onClick={() => scrollToSection("contact")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all font-medium"
                >
                  Get in Touch
                </button>
              </div>
            </FadeIn>

            {/* Stats Card */}
            <FadeIn delay={200}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {STATS.map((stat, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-gray-900/50 border border-white/10 text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1 font-mono">
                      {stat.value}
                    </div>
                    <p className="text-sm text-white/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Image + Tech Logos */}
          <FadeIn delay={400}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl max-w-[500px] ml-auto group bg-gray-900/50 border border-white/10 p-2">
                {/* Image */}
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="/developer.png"
                    alt="developer-pic"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Tech Logos */}
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="flex items-center gap-4 bg-gray-900/40 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                    {[SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb].map(
                      (Icon, idx) => (
                        <div
                          key={idx}
                          className="w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                        >
                          <Icon className="h-full w-full text-cyan-400" />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-50"
      >
        <ChevronDown className="w-8 h-8 text-cyan-400" />
      </button>

      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
    </section>
  );
};

export default Hero;
