import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const socialConfig = {
    github: { icon: Github, label: "GitHub", color: "hover:text-white" },
    linkedin: { icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-400" },
    twitter: { icon: Twitter, label: "Twitter", color: "hover:text-cyan-400" },
  };

  return (
    <footer className="py-20 border-t border-white/5 bg-[#030712] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Left Side: Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                {PERSONAL_INFO.name.split(' ')[1] || PERSONAL_INFO.name}
              </h3>
              <p className="text-gray-400 mt-3 max-w-sm text-sm leading-relaxed">
                {PERSONAL_INFO.tagline}
              </p>
            </div>

            <div className="space-y-4">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-4 group w-fit">
                <div className="p-2 bg-white/5 border border-white/10 rounded-xl group-hover:border-primary/50 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors text-sm">
                  {PERSONAL_INFO.email}
                </span>
              </a>
              <div className="flex items-center gap-4 w-fit">
                <div className="p-2 bg-white/5 border border-white/10 rounded-xl">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-gray-400 text-sm">{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Middle: Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:items-center"
          >
            <div className="w-fit">
              <h4 className="text-white font-semibold mb-6 tracking-wider">Quick Links</h4>
              <ul className="space-y-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className="text-gray-500 hover:text-primary text-sm transition-all flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-primary transition-all group-hover:scale-150" />
                      {link.label}
                      <ExternalLink className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Social Connect with Animated Tooltip */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:items-end"
          >
            <h4 className="text-white font-semibold mb-6 tracking-wider">Social Connect</h4>
            <div className="flex gap-5">
              {Object.entries(SOCIAL_LINKS).map(([key, url]) => {
                const config = socialConfig[key];
                if (!config) return null;
                const Icon = config.icon;

                return (
                  <motion.a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex flex-col items-center"
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-3 bg-white/5 border border-white/10 rounded-2xl group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                      <Icon className={`w-6 h-6 text-gray-400 transition-colors duration-300 ${config.color}`} />
                    </div>
                    
                    {/* Floating Label (Reveals from bottom) */}
                    <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 group-hover:-bottom-10 transition-all duration-300 text-[10px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/5 px-2 py-1 rounded border border-primary/10 whitespace-nowrap pointer-events-none">
                      {config.label}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8"
        >
          {/* Copyright */}
          <div className="flex-1 text-gray-500 text-xs md:text-sm tracking-wide">
            © {new Date().getFullYear()} <span className="text-gray-300 font-medium">{PERSONAL_INFO.name}</span>. 
            <span className="hidden md:inline ml-1 text-gray-600">All Rights Reserved.</span>
          </div>

          {/* Dynamic Time */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/[0.02] border border-white/5 rounded-full group hover:border-primary/20 transition-colors">
              <Clock className="w-4 h-4 text-primary group-hover:rotate-[30deg] transition-transform duration-500" />
              <span className="text-sm font-mono font-bold text-gray-300 tracking-widest uppercase">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
              </span>
            </div>
          </div>

          {/* Tech Stack Badge */}
          <div className="flex-1 flex justify-end items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              Built with <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
            </span>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 text-primary font-bold text-[10px] uppercase tracking-tighter">
              React & Tailwind
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;