import * as Icons from "lucide-react";
import { Download, Code2, Sparkles } from "lucide-react";
import { PERSONAL_INFO, ABOUT_STATS } from "../../utils/constants";
import FadeIn from "../animations/FadeIn";

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">

        {/* Header */}
        <FadeIn delay={100}>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="text-yellow-400" />
              <span className="text-sm uppercase tracking-widest text-gray-400">
                About Me
              </span>
            </div>
            <h2 className="text-4xl font-bold">Who I Am</h2>
          </div>
        </FadeIn>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Content */}
          <FadeIn delay={200}>
            <div className="p-6 rounded-2xl bg-gray-900/50 border border-white/10 space-y-6">
              <h3 className="text-xl font-semibold">Full-Stack Developer</h3>

              <div className="space-y-4 text-gray-400 leading-relaxed">
                {PERSONAL_INFO.bio.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
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
              {
                title: "Expertise",
                icon: Code2,
                text: "Building fast, scalable and maintainable web applications."
              },
              {
                title: "Clean Code",
                icon: Icons.Braces,
                text: "Readable, reusable and well-structured codebase."
              },
              {
                title: "Performance",
                icon: Icons.Gauge,
                text: "Optimized UI, smooth UX and fast load times."
              },
              {
                title: "Reliability",
                icon: Icons.ShieldCheck,
                text: "Focused on quality, stability and long-term support."
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={300 + index * 100}>
                  <div className="p-6 rounded-2xl bg-gray-900/50 border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gray-800 rounded-lg">
                        <Icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <h4 className="font-medium">{item.title}</h4>
                    </div>
                    <p className="text-sm text-gray-400">{item.text}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <FadeIn delay={700}>
          <div className="grid grid-cols-3 gap-6 mt-16">
            {ABOUT_STATS.map((stat, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-gray-900/50 border border-white/10 text-center"
              >
                <div className="text-3xl font-bold text-cyan-400 mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  );
};

export default About;
