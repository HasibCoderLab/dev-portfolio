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
        <div>Projects</div>
    )
}

export default Projects