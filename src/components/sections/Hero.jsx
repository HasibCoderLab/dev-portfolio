import React, { useState } from 'react'
import { siReact, siNextdotjs, SiTailwindcss, siNodedotjs, siMongodb } from "react-icons/si";
import { PERSONAL_INFO, STATS } from "../../utils/constants";
import { scrollToSection } from "../../hooks/useScrollSpy";
import { FadeIn } from "../animations/FadeIn";
import { RadialGradientBackground } from "../background/RadialGradientBackground";
const Hero = () => {
  useState
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black ">
      <RadialGradientBackground variant="hero" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="">
          {/* Left Column - Content */}
          <div className="">
            <FadeIn delay={0}>
              <div className="">
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