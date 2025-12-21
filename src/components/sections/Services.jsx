import { services } from "../../data/services";
import * as Icons from "lucide-react";
import { Wrench, Code2 } from "lucide-react";
import FadeIn from "../animations/FadeIn";

const Services = () => {
  return (
    <section id="services" className="relative py-20 bg-black overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary text-primary text-sm mb-4">
              <Wrench className="w-4 h-4" />
              <span className="font-medium">What I Offer</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Built for innovation. Logic for result.
            </h2>

            <p className="text-white/60 max-w-2xl mx-auto">
              Clean structure, strong logic, and performance-focused solutions
            </p>
          </div>
        </FadeIn>

        {/* Services grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const IconComponent = Icons[service.icon] || Code2;

            return (
              <FadeIn key={service.id} delay={index * 120}>
                <div
                  className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 
                  hover:border-primary/40 transition-all duration-300
                  hover:shadow-[0_0_45px_rgba(99,102,241,0.18)] overflow-hidden"
                >

                  {/* ICON with SOUND-WAVE */}
                  <div className="relative mb-6 w-14 h-14 flex items-center justify-center rounded-2xl bg-primary/10 text-primary
                  group-hover:scale-110 transition-transform duration-300">

                    {/* Wave rings */}
                    <span className="absolute inset-0 rounded-2xl border border-primary/40 opacity-0 group-hover:opacity-100 animate-wave delay-0" />
                    <span className="absolute inset-0 rounded-2xl border border-primary/30 opacity-0 group-hover:opacity-100 animate-wave delay-1" />
                    <span className="absolute inset-0 rounded-2xl border border-primary/20 opacity-0 group-hover:opacity-100 animate-wave delay-2" />

                    <IconComponent className="relative z-10 w-7 h-7" />
                  </div>

                  {/* Text */}
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {service.title}
                  </h3>

                  <p className="text-white/60 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover background glow */}
                  <div className="absolute inset-0 rounded-3xl bg-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition pointer-events-none" />
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
