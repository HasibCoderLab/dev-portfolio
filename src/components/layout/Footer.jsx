import React, { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Heart,
  ExternalLink,
  Clock
} from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS, NAV_LINKS } from "../../utils/constants";
import FadeIn from "../animations/FadeIn";

const Footer = () => {

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <footer className="py-20 border-t border-white/5 bg-[#030712]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Left Side: Info */}
          <FadeIn delay={100}>
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {PERSONAL_INFO.name.split(' ')[1]}
                </h3>
                <p className="text-gray-400 mt-2 max-w-sm text-sm leading-relaxed">
                  {PERSONAL_INFO.tagline}
                </p>
              </div>

              <div className="space-y-4">
                <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-4 group">
                  <div className="p-2 bg-gray-900 border border-white/10 rounded-xl group-hover:border-cyan-500/50 transition-colors">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-gray-300 group-hover:text-cyan-400 transition-colors text-sm">
                    {PERSONAL_INFO.email}
                  </span>
                </a>
                <div className="flex items-center gap-4 group">
                  <div className="p-2 bg-gray-900 border border-white/10 rounded-xl">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-gray-300 text-sm">{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Middle: Quick Links */}
          <FadeIn delay={200}>
            <div className="flex flex-col md:items-center">
              <div>
                <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                <ul className="space-y-4">
                  {NAV_LINKS.map((link) => (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        className="text-gray-400 hover:text-cyan-400 text-sm transition-all flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-cyan-500 transition-colors" />
                        {link.label}
                        <ExternalLink className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-500" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* Right: Social Connect */}
          <FadeIn delay={300}>
            <div className="flex flex-col md:items-end">
              <h4 className="text-white font-semibold mb-6">Social Connect</h4>
              <div className="flex gap-4">
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="p-3 bg-gray-900 border border-white/10 rounded-2xl hover:border-cyan-500/50 hover:scale-110 transition-all group">
                  <Github className="w-6 h-6 text-gray-400 group-hover:text-white" />
                </a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-gray-900 border border-white/10 rounded-2xl hover:border-cyan-500/50 hover:scale-110 transition-all group">
                  <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-white" />
                </a>
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer" className="p-3 bg-gray-900 border border-white/10 rounded-2xl hover:border-cyan-500/50 hover:scale-110 transition-all group">
                  <Twitter className="w-6 h-6 text-gray-400 group-hover:text-white" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Bottom Bar with Time */}
        <FadeIn delay={500}>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">

            {/* Column 1: Copyright - Left Aligned */}
            <div className="flex-1 text-left">
              <p className="text-gray-500 text-sm md:text-base whitespace-nowrap">
                © -{new Date().getFullYear()} <span className="text-gray-300">{PERSONAL_INFO.name} . All Right Reserved</span>.
              </p>
            </div>

            {/* Column 2: Local Time - Center Aligned */}
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-3 font-mono tracking-widest text-gray-400 group">
                <Clock className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
                <span className="text-sm md:text-lg font-bold whitespace-nowrap">
                  {currentTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                  }).split(' ').map((part, i) => i === 0 ? part.replace(/:/g, ' : ') : part).join(' ')}
                </span>
              </div>
            </div>

            {/* Column 3: Built with - Right Aligned */}
            <div className="flex-1 flex justify-end">
              <div className="flex items-center gap-2 text-sm md:text-base text-gray-500 whitespace-nowrap">
                <span>Built with</span>
                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                <span>using</span>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-semibold text-xs md:text-sm">
                  React & Tailwind
                </span>
              </div>
            </div>

          </div>
        </FadeIn>

      </div>
    </footer>
  );
};

export default Footer;