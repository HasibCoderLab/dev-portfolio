// import React, { useState } from 'react'
import { SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb } from "react-icons/si";
import { Star } from "lucide-react";
import { PERSONAL_INFO, STATS } from "../../utils/constants";
import { scrollToSection } from "../../hooks/useScrollSpy";
import FadeIn from "../animations/FadeIn";
import RadialGradientBackground from "../background/RadialGradientBackground";
const Hero = () => {

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black ">
      {/* <RadialGradientBackground variant="hero" /> */}

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-left">
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2.5 px-4.5 py-2.5 mb-8 bg-linear-to-r from-primary/10 via-primary/15 to-primary/20 border border-primary/20 rounded-full">
                <Star className="w-4 h-4 text-white fill-white" />
                <span className="text-xs md:text-sm  text-white tracking-[1.2px]">
                  {PERSONAL_INFO.title} | Based in {PERSONAL_INFO.location}
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-6 leading-tight">
                Next.js Developer
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="text-lg text-white/70 max-w-[550px] mb-8">
                Building modern, scalable web applications with
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-0 mb-12 group:"
              >
                <div className="relative z-10 bg-white text-[#212121] rounded-[17px]  px-6 py-3 text-base font-medium border border-white cursor-pointer
                 ">

                  Get in Touch.
                </div>
              </button>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-full">
                {
                  STATS.map((stat, index) => (
                    <div key={index} className='text-left border-r border-white/50 pr-10 last:border-r-0' >
                      <div className='text-2xl font-normal text-primary md-[8px] font-mono' >
                        {stat.value}
                      </div>
                      <p className='text-sm text-white leading-snug'> {
                        stat.label}
                      </p>
                    </div>

                  ))
                }
              </div>
            </FadeIn>
          </div>

          {/* Left Column - For image */}


                              {/* coustom CSS inset-[-2px]`max-w-[500px]` */}
          <FadeIn delay={200}>
            <div className="relativer">
              <div className="relative overflow-hidden rounded-2xl aspect-4/5 max-w-125 ml-auto group">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0.5 bg-linear-to-r from-primary/20 via-primary/10 to-primary  animate-spin-slow rounded-2xl"></div>
                </div>



                {/* image Container */}
                <div className="">
                  <img src="/developer.png" alt="developer-pic"
                    className=""

                  />
                </div>



                {/* technology logo Container */}

                <div className="">
                  <FadeIn delay={500}>
                    <div className="">

                      <div className="">
                        <SiReact className="" />
                      </div>

                      <div className="">
                        <SiNextdotjs className="" />
                      </div>

                      <div className="">
                        <SiTailwindcss className="" />
                      </div>


                      <div className="">
                        <SiNodedotjs className="" />
                      </div>

                      <div className="">
                        <SiMongodb className="" />
                      </div>
                    </div>

                  </FadeIn>
                </div>
              </div>
            </div>

          </FadeIn>

          {/* all */}
        </div>
      </div>

    </section >

  )
}

export default Hero