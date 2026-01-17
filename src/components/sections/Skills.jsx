import * as Icons from "lucide-react";
import { skills } from "../../data/skills";
import FadeIn from "../animations/FadeIn";

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
            'Expert': 'text-[#8DFF69] bg-[#8DFF69]/20 border-[#8DFF69]/30',
            'Advanced': 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
            'Intermediate': 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
        };
        return colors[level] || 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    };

    return (
        <section id="skills" className="py-24 relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />

            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <FadeIn delay={100}>
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Icons.Sparkles className="text-yellow-400" />
                            <span className="text-sm uppercase tracking-widest text-gray-400">My Expertise</span>
                        </div>
                        <h2 className="text-4xl font-bold text-white">Skills & Technologies</h2>
                    </div>
                </FadeIn>

                {/* Skills Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(skillCategories).map(([category, categorySkills], idx) => (
                        <FadeIn key={category} delay={200 + idx * 100}>
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
                                <h3 className="text-xl font-semibold mb-6 text-white">{category}</h3>

                                {/* Skills List */}
                                <div className="space-y-6">
                                    {categorySkills.map(skill => {
                                        const IconComponent = Icons[skill.icon] || Icons.Code2;
                                        const proficiency = getProficiencyLevel(skill.level);

                                        return (
                                            <div key={skill.id}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-primary/10 rounded-lg">
                                                            <IconComponent className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-white">{skill.name}</div>
                                                            <div className="text-xs text-white/50">{skill.experiences}</div>
                                                        </div>
                                                    </div>
                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getLevelColor(skill.level)}`}>
                                                        {skill.level}
                                                    </span>
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-linear-to-r from-primary/50 to-cyan-400 transition-all duration-1000"
                                                        style={{ width: `${proficiency}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
