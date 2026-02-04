import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Target , } from "lucide-react";
import { SiTypescript } from "react-icons/si";
import { FaJsSquare,FaFileCode,FaReact,FaInfinity    } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { projects, categories } from '../../data/projects';
import ProjectCard from '../ui/ProjectCard';

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(project => project.category === activeCategory);

    const categoryIcons = {
        'All': FaInfinity ,
        'JavaScript': FaJsSquare,
        'TypeScript': SiTypescript,
        'Frontend': FaFileCode ,
        'Next.js': RiNextjsFill,
        'React':FaReact 
    };

    return (
        <section id="projects" className="py-24 relative bg-[#030712]">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-semibold mb-6">
                        <Briefcase className="w-4 h-4" />
                        <span className="uppercase tracking-widest text-[10px]">My Portfolio</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
                        Featured <span className="text-primary">Projects</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Explore my latest work, from interactive web apps to complex full-stack solutions.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mb-16"
                >
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
                                        className="absolute inset-0 bg-primary border border-primary/50 rounded-2xl shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
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
                </motion.div>

                {/* Projects Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* View More Button (Optional) */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 italic">No projects found in this category.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;