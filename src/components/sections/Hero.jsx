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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#030712]">
      {/* Radial Background Glows */}
      <RadialGradientBackground variant="hero" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column */}
          <div className="space-y-8">
            <FadeIn delay={0}>
              {/* Name & Intro */}
<div className="space-y-4 text-white">
  {/* Name */}
  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
    Hasib Hasan
  </h1>

  {/* "And I'm a" */}
  <p className="text-lg md:text-xl font-semibold text-gray-300 relative left-8">
    And I'm a
  </p>

  {/* Typing Animation */}
  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r  via-purple-400 from-cyan-400 ">
    <Typewriter
      options={{
        strings: [
          "Web Developer",
          "React Developer",
          "MERN Stack Developer",
          "Next.js Developer",
          "React | Tailwind | Node.js | MongoDB"
        ],
        autoStart: true,
        loop: true,
        delay: 50,
        deleteSpeed: 30,
      }}
    />
  </div>



                <p className="text-lg text-gray-400 mt-6 max-w-[500px]">
                  Building modern, scalable web applications with cutting-edge technologies.
                </p>

                <button
                  onClick={() => scrollToSection("contact")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/20 text-primary hover:bg-primary/10 transition-all font-medium mt-4"
                >
                  Get in Touch
                </button>
              </div>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={200}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                {STATS.map((stat, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 text-center backdrop-blur-md"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1 font-mono">
                      {stat.value}
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right Column */}
          <FadeIn delay={400}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl max-w-[500px] ml-auto group bg-white/[0.03] border border-white/10 p-2 backdrop-blur-md">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="/developer.png"
                    alt="developer-pic"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute bottom-6 left-6 z-20">
                  <div className="flex items-center gap-4 bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                    {[SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb].map(
                      (Icon, idx) => (
                        <div
                          key={idx}
                          className="w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                        >
                          <Icon className="h-full w-full text-primary" />
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
        <ChevronDown className="w-8 h-8 text-primary" />
      </button>

      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] mix-blend-lighten" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] mix-blend-lighten" />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2" />
    </section>
  );
};

export default Hero;
