import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { testimonials as testimonialData } from "../../data/testimonials";

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
      const card = container.querySelector(".testimonial-card");
      if (card) {
        const cardWidth = card.offsetWidth + 24;
        container.scrollTo({
          left: cardWidth * index,
          behavior: "smooth",
        });
      }
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
    <section id="testimonial" className="py-24 relative overflow-hidden bg-[#030712]">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
            <Quote className="w-4 h-4 fill-primary" />
            <span className="tracking-widest uppercase text-[10px]">Wall of Love</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Trusted by <span className="text-primary">forward-thinking</span> teams
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Empowering clients with logical solutions and high-quality craftsmanship.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Carousel Container */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth"
          >
            {testimonialData.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="testimonial-card w-full md:w-[450px] flex-shrink-0 snap-center"
              >
                <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md hover:border-primary/30 transition-all duration-500 h-full flex flex-col">
                  {/* Quote Icon Badge */}
                  <div className="absolute -top-4 -right-2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-300">
                    <Quote className="w-5 h-5 text-white fill-white/20" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (testimonial.rating || 5)
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-gray-700"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-300 text-lg italic leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </p>

                  {/* Profile */}
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 p-1">
                      <img
                        src={testimonial.image || "/api/placeholder/100/100"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-white text-base">
                        {testimonial.name}
                      </h4>
                      <p className="text-primary text-xs font-medium">
                        {testimonial.role} @ {testimonial.institution}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Controls & Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-8 mt-4 px-4"
          >
            {/* Stats */}
            <div className="flex gap-8 border-l border-white/10 pl-6">
              {testimonialStats.map((stat, i) => (
                <div key={i} className="text-center md:text-left">
                  <div className="text-xl font-bold text-white font-mono">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-8">
              {/* Pagination Dots */}
              <div className="flex gap-2.5">
                {testimonialData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-8 bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              {/* Arrow Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
                >
                  <ChevronLeft className="w-5 h-5 text-white group-hover:scale-110" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
                >
                  <ChevronRight className="w-5 h-5 text-white group-hover:scale-110" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;