import React, { useState, useRef } from "react";
import {
    Quote,
    Star,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { testimonials as testimonialData } from "../../data/testimonials"; // Alias to avoid conflict
import FadeIn from "../animations/FadeIn";

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    const testimonialStats = [
        { value: '3x', label: 'Faster Delivery' },
        { value: '99%', label: 'Satisfaction' },
        { value: '100%', label: 'On-Time' },
        { value: '5*', label: 'Avg Rating' },
    ];

    const scrollToIndex = (index) => {
        if (index < 0 || index >= testimonialData.length) return;
        setCurrentIndex(index);
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const cardWidth = container.querySelector('.testimonial-card').offsetWidth + 24; // width + gap
            container.scrollTo({
                left: cardWidth * index,
                behavior: 'smooth'
            });
        }
    };

    const nextTestimonial = () => {
        const next = (currentIndex + 1) % testimonialData.length;
        scrollToIndex(next);
    };

    const prevTestimonial = () => {
        const prev = (currentIndex - 1 + testimonialData.length) % testimonialData.length;
        scrollToIndex(prev);
    };

    return (
        <section id="testimonial" className="py-24 mb-20 relative overflow-hidden bg-[#030712]">
            {/* Background Aesthetic Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <FadeIn delay={0}>
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
                </FadeIn>

                {/* Main Carousel Wrapper */}
                <FadeIn delay={0.2}>
                    <div className="relative max-w-6xl mx-auto">
                        {/* Scroll Container */}
                        <div
                            className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory scrollbar-hide scroll-smooth no-scrollbar"
                            ref={scrollContainerRef}
                        >
                            {testimonialData.map((testimonial, index) => (
                                <div
                                    key={testimonial.id || index}
                                    className="testimonial-card w-full md:w-[450px] flex-shrink-0 snap-center"
                                >
                                    <div className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.05] transition-all duration-500 h-full flex flex-col">
                                        
                                        {/* Floating Quote Icon */}
                                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-12 group-hover:rotate-0 transition-transform">
                                            <Quote className="w-6 h-6 text-white fill-white/20" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-4 h-4 ${i < (testimonial.rating || 5) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}`} />
                                            ))}
                                        </div>

                                        <p className="text-gray-300 text-lg italic leading-relaxed mb-8 flex-grow">
                                            "{testimonial.quote}"
                                        </p>

                                        {/* User Info */}
                                        <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                                            <div className="relative">
                                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30">
                                                    <img
                                                        src={testimonial.image || "/api/placeholder/100/100"}
                                                        alt={testimonial.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-[#030712]" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-lg leading-tight">{testimonial.name}</h4>
                                                <p className="text-primary text-sm font-medium">{testimonial.role} @ {testimonial.institution}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-4 px-4">
                            {/* Stats */}
                            <div className="flex gap-8 overflow-x-auto pb-2">
                                {testimonialStats.map((stat, i) => (
                                    <div key={i} className="text-center md:text-left">
                                        <div className="text-xl font-bold text-white leading-none">{stat.value}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Arrows & Pagination */}
                            <div className="flex items-center gap-6">
                                <div className="flex gap-2">
                                    {testimonialData.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => scrollToIndex(index)}
                                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                                index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'
                                            }`}
                                        />
                                    ))}
                                </div>
                                
                                <div className="flex gap-3">
                                    <button
                                        onClick={prevTestimonial}
                                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-white group-hover:scale-110" />
                                    </button>
                                    <button
                                        onClick={nextTestimonial}
                                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                                    >
                                        <ChevronRight className="w-5 h-5 text-white group-hover:scale-110" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default Testimonials;