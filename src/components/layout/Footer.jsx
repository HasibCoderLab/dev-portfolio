import React from 'react';
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  MapPin,
  Heart,
} from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS, NAV_LINKS } from "../../utils/constants";
import FadeIn from "../animations/FadeIn";

const Footer = () => {
  return (
    <footer className="py-20 bg-[#030014] border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Section 1: Brand & Contact */}
          <FadeIn delay={100}>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-[#8DFF69]">
                {PERSONAL_INFO.name.split(' ')[0]}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                {PERSONAL_INFO.tagline}
              </p>

              <div className="space-y-3">
                {/* Email Box */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-900/50 border border-white/5">
                  <div className="p-2 bg-[#8DFF69]/10 rounded-lg">
                    <Mail className="w-4 h-4 text-[#8DFF69]" />
                  </div>
                  <span className="text-sm text-gray-300">{PERSONAL_INFO.email}</span>
                </div>

                {/* Location Box */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-900/50 border border-white/5">
                  <div className="p-2 bg-[#8DFF69]/10 rounded-lg">
                    <MapPin className="w-4 h-4 text-[#8DFF69]" />
                  </div>
                  <span className="text-sm text-gray-300">{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Section 2: Quick Links (NAV_LINKS) */}
         
          <FadeIn delay={200}>
            <div className="md:ml-12">
              <h4 className="text-white font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`} 
                      className="text-gray-500 hover:text-[#8DFF69] text-sm transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-[#8DFF69]" />
                      {link.label} 
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Section 3: Connect With Me */}
          <FadeIn delay={300}>
            <div>
              <h4 className="text-white font-semibold mb-2">Connect With Me</h4>
              <p className="text-gray-500 text-sm mb-6 italic">Let's connect and create something amazing together.</p>

              <div className="flex gap-3">
                {[
                  { icon: Github, href: SOCIAL_LINKS.github },
                  { icon: Linkedin, href: SOCIAL_LINKS.linkedin },
                  { icon: Twitter, href: SOCIAL_LINKS.twitter },
                  { icon: Globe, href: "#" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-900/80 border border-white/10 rounded-xl hover:border-[#8DFF69]/50 transition-all hover:-translate-y-1"
                  >
                    <social.icon className="w-5 h-5 text-gray-400 hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Bottom Line */}
        <FadeIn delay={400}>
          <div className="pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4">
            <p className="text-gray-600 text-xs">
              © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span>Built with</span>
              <Heart className="w-3 h-3 text-[#8DFF69] fill-[#8DFF69]" />
              <span>using React & Tailwind CSS</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};

export default Footer;