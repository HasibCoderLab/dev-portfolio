import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { skills } from "../../data/skills";

const Skills = () => {
    const categories = ["Frontend Development", "Backend & APIs", "Database", "Tools"];

    const getProficiencyLevel = (level) => {
        const levels = { 'Expert': 95, 'Advanced': 85, 'Intermediate': 65, 'Basic': 45 };
        return levels[level] || 40;
    };

    const getLevelColor = (level) => {
        const colors = {
            'Expert': 'text-[#8DFF69] border-[#8DFF69]/30 bg-[#8DFF69]/5',
            'Advanced': 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5',
            'Intermediate': 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
            'Basic': 'text-orange-400 border-orange-500/30 bg-orange-500/5',
        };
        return colors[level] || 'text-gray-400 border-gray-500/30';
    };

    return (
        <section id="skills" className="py-24 relative overflow-hidden bg-[#030712]">
            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="text-yellow-400 w-5 h-5" />
                        <span className="text-sm uppercase tracking-[0.3em] text-gray-400">My Expertise</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">Skills & Technologies</h2>
                </motion.div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((catName) => (
                        <motion.div 
                            key={catName}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md hover:border-white/20 transition-all duration-500"
                        >
                            <h3 className="text-2xl font-bold mb-10 text-white flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-[#8DFF69] shadow-[0_0_10px_#8DFF69]" />
                                {catName}
                            </h3>

                            <div className="space-y-10">
                                {skills.filter(s => s.category === catName).map((skill) => {
                                    const Icon = skill.icon;
                                    return (
                                        <div key={skill.id} className="group">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-4">
                                                    {/* Icon Box */}
                                                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-primary/50 transition-colors">
                                                        <Icon size={28} className="text-gray-300 group-hover:text-[#8DFF69] transition-colors" />
                                                    </div>
                                                    {/* Name & Experience */}
                                                    <div>
                                                        <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors leading-tight">
                                                            {skill.name}
                                                        </h4>
                                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">
                                                            {skill.experience || '2+ YEARS'}
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* Level Badge */}
                                                <span className={`text-[10px] font-medium px-3 py-1 rounded-lg border ${getLevelColor(skill.level)}`}>
                                                    {skill.level}
                                                </span>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="h-[6px] w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${getProficiencyLevel(skill.level)}%` }}
                                                    transition={{ duration: 1.5, ease: "circOut" }}
                                                    className="h-full bg-gradient-to-r from-[#8DFF69] via-cyan-400 to-transparent rounded-full shadow-[0_0_15px_rgba(141,255,105,0.3)]"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;