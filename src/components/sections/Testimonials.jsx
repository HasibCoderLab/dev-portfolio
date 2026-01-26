import React, { useState, useRef } from "react";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { testimonials as testimonialData } from "../../data/testimonials";
import   from "../animations/ ";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const testimonialStats = [
    { value: "3x", label: "Faster Delivery" },
    { value: "99%", label: "Satisfaction" },
    { value: "100%", label: "On-Time" },
    { value: "5*", label: "Avg Rating" },
  ];

  const scrollToIndex = (index) => {
    if (index < 0 || index >= testimonialData.length) return;
    setCurrentIndex(index);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth =
        container.querySelector(".testimonial-card").offsetWidth + 24;
      container.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
    }
  };

  const nextTestimonial = () => {
    scrollToIndex((currentIndex + 1) % testimonialData.length);
  };

  const prevTestimonial = () => {
    scrollToIndex(
      (currentIndex - 1 + testimonialData.length) % testimonialData.length
    );
  };

  return (
    <section
      id="testimonial"
      className="py-24 relative overflow-hidden bg-[#030712]"
    >
      {/* Professional Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] mix-blend-lighten" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] mix-blend-lighten" />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        < >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
              <Quote className="w-4 h-4 fill-primary" />
              <span className="tracking-wider uppercase">Wall of Love</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
              Trusted by forward-thinking teams
            </h2>
            <p className="text-gray-400 text-lg">
              Empowering clients with logical solutions and high-quality craftsmanship.
            </p>
          </div>
        </ >

        <  delay={0.2}>
          <div className="relative max-w-6xl mx-auto">
            {/* Carousel */}
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth"
            >
              {testimonialData.map((testimonial, index) => (
                <div
                  key={index}
                  className="testimonial-card w-full md:w-[450px] flex-shrink-0 snap-center"
                >
                  <div className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.05] transition-all duration-500 h-full flex flex-col">
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform">
                      <Quote className="w-6 h-6 text-white fill-white/20" />
                    </div>

                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < (testimonial.rating || 5)
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-300 text-lg italic leading-relaxed mb-8">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex flex-col items-center text-center mt-auto">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30 mb-4">
                        <img
                          src={
                            testimonial.image || "/api/placeholder/100/100"
                          }
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <h4 className="font-bold text-white text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-primary text-sm font-medium">
                        {testimonial.role} @ {testimonial.institution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-4 px-4">
              <div className="flex gap-8">
                {testimonialStats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6">
                <div className="flex gap-2">
                  {testimonialData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToIndex(index)}
                      className={`h-1.5 rounded-full transition-all ${
                        index === currentIndex
                          ? "w-8 bg-primary"
                          : "w-2 bg-white/20"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={prevTestimonial}
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary transition"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary transition"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ >
      </div>
    </section>
  );
};

export default Testimonials;
