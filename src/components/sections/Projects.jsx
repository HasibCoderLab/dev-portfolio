import React, { useState, useRef } from "react";

import { Briefcase, Sparkles, Target, Globe, Palette, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, categories } from '../../data/projects';
import FadeIn from "../animations/FadeIn";
import ProjectCard from '../ui/ProjectCard';

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(project => project.category === activeCategory);

    // Reset carousel when category changes
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setCurrentIndex(0);
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
    }

    const scrollToIndex = (index) => {
        setCurrentIndex(index);
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const cardWidth = container.offsetWidth / 3;
            container.scrollTo({
                left: cardWidth * index,
                behavior: 'smooth'
            })
        }
    }

    const nextSlide = () => {
        const maxIndex = Math.max(0, filteredProjects.length - 3);
        const newIndex = Math.min(currentIndex + 1, maxIndex);
        scrollToIndex(newIndex);
    };

    const prevSlide = () => {
        const newIndex = Math.max(currentIndex - 1, 0);
        scrollToIndex(newIndex);
    };

    // Category Icons Mapping
    const categoryIcons = {
        'All': Target,
        'JavaScript': Zap,
        'TypeScript': Sparkles,
        'Frontend': Palette,
        'Next.js': Globe,
    };

    return (
        <section id="projects" className="py-20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-primary/5 to-transparent" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <FadeIn delay={0}>
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-sm mb-4">
                            <Briefcase className="w-4 h-4" />
                            <span className="font-medium">My Work</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                        <p className="text-white/60 text-lg">Showcase my best work and achievements</p>
                    </div>
                </FadeIn>

                {/* Category Filter */}
                <FadeIn delay={0.2}>
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === category
                                        ? 'text-white'
                                        : 'text-white/60 hover:text-white'
                                    }`}
                            >
                                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${activeCategory === category
                                        ? 'bg-primary/20 border-primary/50'
                                        : 'bg-white/5 border border-white/10 group-hover:bg-white/10'
                                    }`} />

                                <div className="relative flex items-center gap-2">
                                    {categoryIcons[category] && React.createElement(categoryIcons[category], { className: 'w-4 h-4' })}
                                    <span>{category}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </FadeIn>

                {/* Project Carousel */}
                <FadeIn delay={0.4}>
                    <div className="relative group">
                        <div
                            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide scroll-smooth"
                            ref={scrollContainerRef}
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            <div className="flex gap-6">
                                {filteredProjects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="w-[300px] md:w-[350px] flex-shrink-0 snap-start"
                                    >
                                        <ProjectCard project={project} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        {filteredProjects.length > 3 && (
                            <>
                                <button
                                    onClick={prevSlide}
                                    disabled={currentIndex === 0}
                                    className={`absolute top-1/2 -left-4 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${currentIndex === 0
                                            ? 'bg-white/5 text-white/20 cursor-not-allowed'
                                            : 'bg-white/10 text-white hover:bg-primary hover:scale-110 backdrop-blur-sm'
                                        }`}
                                    aria-label="Previous projects"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={nextSlide}
                                    disabled={currentIndex >= filteredProjects.length - 3}
                                    className={`absolute top-1/2 -right-4 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${currentIndex >= filteredProjects.length - 3
                                            ? 'bg-white/5 text-white/20 cursor-not-allowed'
                                            : 'bg-white/10 text-white hover:bg-primary hover:scale-110 backdrop-blur-sm'
                                        }`}
                                    aria-label="Next projects"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}

                        {/* Navigation Dots */}
                        {filteredProjects.length > 3 && (
                            <div className="flex justify-center gap-2 mt-8">
                                {Array.from({ length: Math.max(0, filteredProjects.length - 2) }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => scrollToIndex(index)}
                                        className={`transition-all duration-300 rounded-full ${index === currentIndex
                                                ? 'bg-primary w-6 h-2'
                                                : 'bg-white/20 w-2 h-2 hover:bg-white/50'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default Projects;