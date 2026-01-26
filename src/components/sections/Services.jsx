import { services } from "../../data/services";
import * as Icons from "lucide-react";


const Services = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <FadeIn delay={100}>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Icons.Wrench className="text-yellow-400" />
              <span className="text-sm uppercase tracking-widest text-gray-400">
                What I Offer
              </span>
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">
              Services
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto">
              Clean structure, strong logic, and performance-focused solutions
            </p>
          </div>
        </FadeIn>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = Icons[service.icon] || Icons.Code2;

            return (
              <FadeIn key={service.id} delay={200 + index * 100}>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group">

                  <div className="relative mb-6 w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 group">

                    {/* Subtle wave rings */}
                    <span className="absolute inset-0 rounded-xl border border-cyan-500/30 opacity-0 group-hover:opacity-100 animate-wave" />
                    <span className="absolute inset-0 rounded-xl border border-cyan-500/20 opacity-0 group-hover:opacity-100 animate-wave delay-1" />

                    <IconComponent className="relative z-10 w-6 h-6 text-primary" />
                  </div>

                  {/* Text */}
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {service.title}
                  </h3>

                  <p className="text-sm text-white/70 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="mt-6 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-0 group-hover:w-full bg-linear-to-r from-primary/50 to-cyan-400 transition-all duration-700" />
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
