import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { skills } from "../../data/skills";

const Skills = () => {
    // Categorize skills
    const skillCategories = {
        'Frontend Development': [
            skills.find(s => s.name === 'React.js'),
            skills.find(s => s.name === 'JavaScript'),
            skills.find(s => s.name === 'TypeScript'),
            skills.find(s => s.name === 'Next.js'),
            skills.find(s => s.name === 'Tailwind CSS'),
            skills.find(s => s.name === 'Redux'),
        ].filter(Boolean),
        'Backend & APIs': [
            skills.find(s => s.name === 'Node.js'),
            skills.find(s => s.name === 'REST APIs'),
        ].filter(Boolean),
        'Tools & Others': [
            skills.find(s => s.name === 'Git & GitHub'),
            skills.find(s => s.name === 'Responsive Design'),
            skills.find(s => s.name === 'Figma'),
            skills.find(s => s.name === 'Vite'),
        ].filter(Boolean),
    };

    const getProficiencyLevel = (level) => {
        const levels = { 'Expert': 95, 'Advanced': 80, 'Intermediate': 65 };
        return levels[level] || 50;
    };

    const getLevelColor = (level) => {
        const colors = {
            'Expert': 'text-[#8DFF69] bg-[#8DFF69]/10 border-[#8DFF69]/20',
            'Advanced': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
            'Intermediate': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        };
        return colors[level] || 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="skills" className="py-24 relative overflow-hidden bg-[#030712]">

            {/* Background Glows */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Icons.Sparkles className="text-yellow-400 w-5 h-5" />
                        <span className="text-sm uppercase tracking-[0.3em] text-gray-400">My Expertise</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">Skills & Technologies</h2>
                </motion.div>

                {/* Skills Categories Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {Object.entries(skillCategories).map(([category, categorySkills]) => (
                        <motion.div 
                            key={category} 
                            variants={cardVariants}
                            className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md hover:border-primary/30 transition-colors duration-500 group"
                        >
                            <h3 className="text-xl font-bold mb-8 text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                {category}
                            </h3>

                            <div className="space-y-8">
                                {categorySkills.map(skill => {
                                    const IconComponent = Icons[skill.icon] || Icons.Code2;
                                    const proficiency = getProficiencyLevel(skill.level);

                                    return (
                                        <div key={skill.id} className="relative">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2.5 bg-white/5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                                        <IconComponent className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-white text-sm">{skill.name}</div>
                                                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">{skill.experiences}</div>
                                                    </div>
                                                </div>
                                                <span className={`text-[9px] font-bold px-2 py-1 rounded-md border tracking-tighter ${getLevelColor(skill.level)}`}>
                                                    {skill.level}
                                                </span>
                                            </div>

                                            {/* Progress Bar Container */}
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                {/* Animated Progress Fill */}
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${proficiency}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                                                    className="h-full bg-gradient-to-r from-primary via-cyan-400 to-primary/80 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;