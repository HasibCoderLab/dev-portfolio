import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { 
  SiReact, SiNextdotjs, SiTypescript, 
  SiTailwindcss, SiNodedotjs, SiMongodb 
} from "react-icons/si";
import { Download, Code2, Sparkles, Braces, Gauge, ShieldCheck } from "lucide-react";
import { PERSONAL_INFO, ABOUT_STATS } from "../../utils/constants";

const skills = [
  { name: "React.js", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
];

const About = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#030712]">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-yellow-400 w-5 h-5" />
            <span className="text-sm uppercase tracking-[0.3em] text-gray-400 font-medium">About Me</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Passion Drives <span className="text-primary">Purpose</span>
          </h2>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left Content: Bio */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6 backdrop-blur-xl relative group"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl -z-10" />
            <h3 className="text-2xl font-semibold text-white">Full-Stack Developer</h3>
            <div className="space-y-4 text-gray-400 leading-relaxed text-lg">
              {PERSONAL_INFO.bio.map((text, i) => <p key={i}>{text}</p>)}
            </div>
            
            <button
              onClick={() => window.open(PERSONAL_INFO.resume, "_blank")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-300 font-medium"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </button>
          </motion.div>

          {/* Right Cards: Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Expertise", icon: Code2, text: "Building fast, scalable web apps." },
              { title: "Clean Code", icon: Braces, text: "Readable and maintainable code." },
              { title: "Performance", icon: Gauge, text: "Optimized UI & fast load times." },
              { title: "Reliability", icon: ShieldCheck, text: "Stable and long-term support." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-primary/10 rounded-xl">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-white">{item.title}</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mt-24">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-semibold text-white mb-2">Tech Stack & Expertise</h3>
            <p className="text-gray-500">The tools I use to bring ideas to life</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full max-w-5xl mx-auto">
            {skills.map((skill, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-4 hover:bg-white/[0.05] transition-all"
              >
                <skill.icon 
                  className="text-4xl transition-colors duration-300" 
                  style={{ color: skill.color }} 
                />
                <span className="text-sm text-gray-300 font-medium">{skill.name}</span>
                {/* Glow Effect on Hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 blur-xl transition-opacity rounded-2xl -z-10"
                  style={{ backgroundColor: skill.color }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-24"
        >
          {ABOUT_STATS.map((stat, i) => (
            <div key={i} className="relative group p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 text-center overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <div className="text-4xl font-bold text-white mb-2 font-mono">{stat.value}</div>
              <p className="text-sm uppercase tracking-widest text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default About;