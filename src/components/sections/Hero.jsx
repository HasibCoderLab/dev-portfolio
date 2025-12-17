import React, { useState } from 'react'
import { siReact, siNextdotjs, SiTailwindcss, siNodedotjs, siMongodb } from "react-icons/si";
import { PERSONAL_INFO, STATS } from "../../utils/constants";
import { scrollToSection } from "../../hooks/useScrollSpy";
import { FadeIn } from "../animations/FadeIn";
import { RadialGradientBackground } from "../background/RadialGradientBackground";
const Hero = () => {
  useState
  return (
    <section className="">
      <RadialGradientBackground variant="hero" />

      {/* Content Container */}
      <div className="">
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
            <FadeIn delay={200}>
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
            )
}

            export default Hero