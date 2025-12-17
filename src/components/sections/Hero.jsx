// import React, { useState } from 'react'
import { SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb } from "react-icons/si";
import { Star } from "lucide-react";
import { PERSONAL_INFO, STATS } from "../../utils/constants";
import { scrollToSection } from "../../hooks/useScrollSpy";
import FadeIn from "../animations/FadeIn";
import  RadialGradientBackground  from "../background/RadialGradientBackground";
const Hero = () => {
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black ">
      <RadialGradientBackground variant="hero" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-left">
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2.5 px-[18px] py-[11px] mb-8 bg-linear-to-r from-primary/10 via-primary/15 to-primary/20 border border-primary/20 rounded-full">
                <Star className="" />
                <span className="">
                  {PERSONAL_INFO.title} | Based in {PERSONAL_INFO.location}
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <h1 className="">
                Building modern, scalable web applications with
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="">
                Building modern, scalable web applications with
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <button
                onClick={() => scrollToSection('contact')}
                className=""
              >
                <div className="">
                  Get in Touch
                </div>
              </button>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="">
                {
                  STATS.map((stat, index) => (
                    <div key={index} className='' >
                      <div className='' >
                        {stat.value}
                      </div>
                      <p className=''> {stat.label} </p>
                    </div>

                  ))
                }
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

    </section>

  )
}

export default Hero