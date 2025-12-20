import { Briefcase, Sparkles, Target, Global, Palette, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, categories } from '../../data/projects'
import FadeIn from "../animations/FadeIn";
import ProjectCard from '../ui/ProjectCard'
import { useState } from "react";
import { useRef } from "react";
const Projects = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    const filteredProjects = activeCatagory === 'All'
        ? projects
        : projects.filter(project => project.category === activeCatagory);


    // Reset carousel when catagory changes

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setCurrentIndex(0);
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smoth' });
        }
    }

    const scrollToIndex = (index) => {
        setCurrentIndex(index);
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const cardWidth = container.offsetWidth / 3;
            container.scrollTo({
                left: cardWidth * index,
                behavior: 'smoth'
            })
        }
    }


    const nextSlide = () => {
        const maxIndex = Math.max(0, filteredProjects.length - 3);
        const newIndex = Math.min(currentIndex + 1, maxIndex)
    }


    const prevSlide = () => {

        const newIndex = Math.max(currentIndex - 1, 0);
        scrollToIndex(newIndex);

    }


    // Category Icons Mapping
    const categoryIcons = {
        'All': Target,
        'JavaScript': Zap,
        'TypeScript': Sparkles,
        'Frontend': Palette,
        'Next.js': Global,
    };




    return (
        <section id="projects" className="" >
            <div className="">
                <div className="" />
                <div className="" />
                <div className="" />

            </div>

            <div className="">
                <FadeIn delay={0}>
                    <div className="">
                        <div className="">
                            <Briefcase className="" />
                            <span className="">My Work</span>
                        </div>
                        <h2 className="">Featured Projects</h2>
                        <p className="">Showcase my best work and achievements </p>
                    </div>
                    <FadeIn />


                    {/* Category Filter */}
                    < FadeIn delay={100}>
                        <div className="">
                            {
                                categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryChange(category)}
                                        className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === category
                                            ? 'text-white'
                                            : 'text-white/30 hover:text-white'
                                            }`} 
                                    >
                                        <div className={`absolute inset-0 rounded-full transition-all dutarion-300 ${activeCategory === category
                                                ? 'bg-primary/10 opacity-100'
                                                : 'bg-white/5 border border-white/10 hover:text-white  group hover:bg-white/10'
                                            }`} />
                                            <div className=""
                                            {React.createElement(categoryIcons[category],{className:'w-4 h-4'})}
                                        
                                            >

                                                <span className=""> {category} </span>
                                            </div>
                                            {activeCategory === category && (
                                                <div className="" />
                                            )}
                                    </button>
                                ))
                            }
                        </div>
                    </FadeIn>
                    
                    )
}

                    export default Projects