import { services } from "../../data/services";
import * as Icons from "lucide-react";
import { Wrench } from "lucide-react";
import FadeIn from "../animations/FadeIn";

const Services = () => {
  return (
    <section id="services" className="relative py-20 bg-black overflow-hidden">

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
      </div>

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary text-primary text-sm mb-4">
              <Wrench className="w-4 h-4" />
              <span className="font-medium">What I Offer</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built for innovation. Logic for result.
            </h2>

            <p className="text-white/60 max-w-2xl mx-auto">
              Clean structure, strong logic, and performance-focused solutions
            </p>
          </div>
        </FadeIn>

        {/* SERVICES GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const IconComponent = Icons[service.icon] || Icons.Code2;

            return (
              <FadeIn key={service.id} delay={index * 100}>
                <div className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/40 transition">

                  {/* Icon */}
                  <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Text */}
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {service.title}
                  </h3>

                  <p className="text-white/60 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition pointer-events-none" />
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
