import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Target, ChevronLeft, ChevronRight } from "lucide-react";
import { SiTypescript } from "react-icons/si";
import { FaJsSquare, FaFileCode, FaReact, FaInfinity } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { projects, categories } from '../../data/projects';
import ProjectCard from '../ui/ProjectCard';

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [currentIndex, setCurrentIndex] = useState(0);

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(project => project.category === activeCategory);

    // Ensure index stays valid when filtering
    useEffect(() => {
        setCurrentIndex(0);
    }, [activeCategory]);

    const nextProject = () => {
        setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
    };

    const prevProject = () => {
        setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    };

    const categoryIcons = {
        'All': FaInfinity,
        'JavaScript': FaJsSquare,
        'TypeScript': SiTypescript,
        'Frontend': FaFileCode,
        'Next.js': RiNextjsFill,
        'React': FaReact 
    };

    return (
        <section id="projects" className="py-24 relative bg-[#030712] overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-semibold mb-6">
                        <Briefcase className="w-4 h-4" />
                        <span className="uppercase tracking-widest text-[10px]">My Portfolio</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
                        Featured <span className="text-primary">Projects</span>
                    </h2>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map((category) => {
                        const Icon = categoryIcons[category] || Target;
                        const isActive = activeCategory === category;
                        return (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`group relative px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
                                    isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeCategory"
                                        className="absolute inset-0 bg-primary rounded-2xl shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <div className="relative z-10 flex items-center gap-2">
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'group-hover:text-primary'}`} />
                                    <span>{category}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* SLIDER SECTION */}
                <div className="relative max-w-6xl mx-auto group">
                    {/* Navigation Buttons - Hidden on small screens, visible on hover/desktop */}
                    {filteredProjects.length > 1 && (
                        <>
                            <button 
                                onClick={prevProject}
                                className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:border-primary transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex"
                            >
                                <ChevronLeft size={28} />
                            </button>
                            <button 
                                onClick={nextProject}
                                className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:border-primary transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex"
                            >
                                <ChevronRight size={28} />
                            </button>
                        </>
                    )}

                    {/* Active Project Display */}
                    <div className="min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {filteredProjects.length > 0 ? (
                                <motion.div
                                    key={filteredProjects[currentIndex].id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <ProjectCard project={filteredProjects[currentIndex]} />
                                </motion.div>
                            ) : (
                                <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10 text-gray-500 italic">
                                    No projects found in this category.
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Navigation controls */}
                    <div className="flex justify-center items-center gap-6 mt-10 md:hidden">
                        <button onClick={prevProject} className="p-3 bg-white/5 rounded-full text-white"><ChevronLeft/></button>
                        <span className="text-gray-500 font-mono text-sm">{currentIndex + 1} / {filteredProjects.length}</span>
                        <button onClick={nextProject} className="p-3 bg-white/5 rounded-full text-white"><ChevronRight/></button>
                    </div>

                    {/* Indicator Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {filteredProjects.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-1.5 transition-all duration-300 rounded-full ${currentIndex === idx ? 'w-8 bg-primary' : 'w-2 bg-white/20'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;