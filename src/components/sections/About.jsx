import * as Icons from "lucide-react";
import { Download, Code2, Sparkles } from "lucide-react";
import { PERSONAL_INFO, ABOUT_STATS } from "../../utils/constants";
import FadeIn from "../animations/FadeIn";

const skills = [
  // { name: "React.js", icon: Icons.React, color: "#61DAFB" },
  { name: "Next.js", icon: Icons.Layers, color: "#000" },
  { name: "TypeScript", icon: Icons.FileText, color: "#3178C6" },
  { name: "Tailwind CSS", icon: Icons.Wind, color: "#38B2AC" },
  { name: "Node.js", icon: Icons.Server, color: "#339933" },
  { name: "MongoDB", icon: Icons.Database, color: "#47A248" },
];

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <FadeIn delay={100}>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="text-yellow-400" />
              <span className="text-sm uppercase tracking-widest text-gray-400">About Me</span>
            </div>
            <h2 className="text-4xl font-bold text-white">Who I Am</h2>
          </div>
        </FadeIn>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Content */}
          <FadeIn delay={200}>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6 backdrop-blur-md">
              <h3 className="text-xl font-semibold text-white">Full-Stack Developer</h3>
              <div className="space-y-4 text-white/70 leading-relaxed">
                {PERSONAL_INFO.bio.map((text, i) => <p key={i}>{text}</p>)}
              </div>
              <button
                onClick={() => window.open(PERSONAL_INFO.resume, "_blank")}
                className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </button>
            </div>
          </FadeIn>

          {/* Right Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Expertise", icon: Code2, text: "Building fast, scalable web apps." },
              { title: "Clean Code", icon: Icons.Braces, text: "Readable and maintainable code." },
              { title: "Performance", icon: Icons.Gauge, text: "Optimized UI & fast load times." },
              { title: "Reliability", icon: Icons.ShieldCheck, text: "Stable and long-term support." }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeIn key={index} delay={300 + index * 100}>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-medium text-white">{item.title}</h4>
                    </div>
                    <p className="text-sm text-white/70">{item.text}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* Tech Stack */}
        <FadeIn delay={600}>
          <div className="mt-16 flex flex-col items-center gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-normal text-white mb-2">Tech Stack & Expertise</h3>
              <p className="text-sm text-white/60">Technology I work with to build amazing products</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-4xl">
              {skills.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <div key={i} className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:scale-105 transition-all duration-300">
                    <Icon className="text-3xl text-primary" />
                    <div className="text-sm text-white/80 font-medium text-center">{skill.name}</div>
                    <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-primary/10 rounded-2xl transition-all duration-300"></div>
                  </div>
                )
              })}
            </div>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={900}>
          <div className="grid grid-cols-3 gap-6 mt-16">
            {ABOUT_STATS.map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-md">
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  );
};

export default About;
