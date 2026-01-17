import { services } from "../../data/services";
import * as Icons from "lucide-react";
import FadeIn from "../animations/FadeIn";

const Services = () => {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">

        {/* Header — same as Skills */}
        <FadeIn delay={100}>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Icons.Wrench className="text-yellow-400" />
              <span className="text-sm uppercase tracking-widest text-gray-400">
                What I Offer
              </span>
            </div>

            <h2 className="text-4xl font-bold mb-4">
              Services
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto">
              Clean structure, strong logic, and performance-focused solutions
            </p>
          </div>
        </FadeIn>

        {/* Services Grid — same card style as Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = Icons[service.icon] || Icons.Code2;

            return (
              <FadeIn key={service.id} delay={index * 100}>
                <div className="p-6 rounded-2xl bg-gray-900/50 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group">

                  <div className="relative mb-6 w-12 h-12 flex items-center justify-center rounded-xl bg-gray-800 group">

                    {/* Subtle wave rings */}
                    <span className="absolute inset-0 rounded-xl border border-cyan-500/30 opacity-0 group-hover:opacity-100 animate-wave" />
                    <span className="absolute inset-0 rounded-xl border border-cyan-500/20 opacity-0 group-hover:opacity-100 animate-wave delay-1" />

                    <IconComponent className="relative z-10 w-6 h-6 text-cyan-400" />
                  </div>


                  {/* Text */}
                  <h3 className="text-xl font-semibold mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Bottom accent line (like progress feel) */}
                  <div className="mt-6 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full w-0 group-hover:w-full bg-linear-to-r from-cyan-500 to-blue-500 transition-all duration-700" />
                  </div>

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
