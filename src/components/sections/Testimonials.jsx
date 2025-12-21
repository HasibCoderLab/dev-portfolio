import React, { useState, useRef } from "react";
import { Quote, Star, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { testimonials} from "../../data/testimonials"; 


const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    const testimonialStats = [
        { value: '3x', label: 'Faster Delivery' },
        { value: '98%', label: 'Client Satisfaction' },
        { value: '50+', label: 'Projects Completed' },
        { value: '100%', label: 'On-Time Delivery' },
        { value: '5★', label: 'Average Rating' }
    ];

    const scrollToIndex = (index) => {
        setCurrentIndex(index);
        if (scrollContainerRef.current) {
            const cardWidth = 350 + 24; // card width + gap
            scrollContainerRef.current.scrollTo({
                left: cardWidth * index,
                behavior: 'smooth'
            });
        }
    };

    const nextTestimonial = () => {
        const newIndex = (currentIndex + 1) % testimonials.length;
        scrollToIndex(newIndex);
    };

    const prevTestimonial = () => {
        const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        scrollToIndex(newIndex);
    };

    return (
        <section id="testimonial" className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500/5 to-transparent" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-medium">Testimonials</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                        Trusted by Forward-Thinking Teams
                    </h2>
                    <p className="text-slate-400 text-lg">Empowering clients with logic and high-quality solutions</p>
                </div>

                {/* Testimonials Carousel */}
                <div className="relative max-w-7xl mx-auto">
                    <div className="relative group">
                        {/* Navigation Buttons */}
                        <button
                            onClick={prevTestimonial}
                            className="absolute top-1/2 -left-6 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                            onClick={nextTestimonial}
                            className="absolute top-1/2 -right-6 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Scrollable Container */}
                        <div
                            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide scroll-smooth"
                            ref={scrollContainerRef}
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={testimonial.id}
                                    className="w-[350px] flex-shrink-0 snap-start"
                                >
                                    <div className="group/card relative h-full">
                                        {/* Card */}
                                        <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20">
                                            {/* Hover Glow Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover/card:from-blue-500/10 group-hover/card:to-purple-500/10 transition-all duration-500" />
                                            
                                            {/* Content */}
                                            <div className="relative p-6">
                                                {/* Image Section */}
                                                <div className="relative mb-6">
                                                    <div className="relative w-20 h-20 mx-auto mb-4">
                                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-50 group-hover/card:opacity-75 transition-opacity duration-500" />
                                                        <img
                                                            src={testimonial.image}
                                                            alt={testimonial.name}
                                                            className="relative w-full h-full object-cover rounded-full border-2 border-slate-700 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:border-blue-500"
                                                        />
                                                    </div>

                                                    {/* Stats Badge */}
                                                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-3 shadow-lg shadow-blue-500/30 animate-pulse">
                                                        <div className="text-center">
                                                            <div className="text-sm font-bold text-white">
                                                                {testimonialStats[index]?.value}
                                                            </div>
                                                            <div className="text-xs text-white/80 whitespace-nowrap">
                                                                {testimonialStats[index]?.label}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Quote */}
                                                <div className="mb-6">
                                                    <Quote className="w-8 h-8 text-blue-500/50 mb-3" />
                                                    <p className="text-slate-300 text-base leading-relaxed italic">
                                                        {testimonial.quote}
                                                    </p>
                                                </div>

                                                {/* Author Info */}
                                                <div className="mb-4">
                                                    <div className="text-white font-semibold text-lg mb-1">
                                                        {testimonial.name}
                                                    </div>
                                                    <div className="text-slate-400 text-sm">
                                                        {testimonial.role}, {testimonial.institution}
                                                    </div>
                                                </div>

                                                {/* Rating */}
                                                <div className="flex gap-1">
                                                    {[...Array(testimonial.rating)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Dots */}
                        <div className="flex justify-center gap-2 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollToIndex(index)}
                                    className={`transition-all duration-300 rounded-full ${
                                        index === currentIndex
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-8 h-2'
                                            : 'bg-slate-700 w-2 h-2 hover:bg-slate-600'
                                    }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;