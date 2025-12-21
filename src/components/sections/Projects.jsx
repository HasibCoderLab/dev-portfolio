import React, { useState, useRef } from "react";
import {
  Briefcase,
  Sparkles,
  Target,
  Globe,
  Palette,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { projects, categories } from "../../data/projects";
import FadeIn from "../animations/FadeIn";
import ProjectCard from "../ui/ProjectCard";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollContainerRef = useRef(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);

    requestAnimationFrame(() => {
      scrollContainerRef.current?.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    });
  };

  const nextSlide = () => {
    scrollContainerRef.current?.scrollBy({
      left: 360,
      behavior: "smooth",
    });
  };

  const prevSlide = () => {
    scrollContainerRef.current?.scrollBy({
      left: -360,
      behavior: "smooth",
    });
  };

  const categoryIcons = {
    All: Target,
    JavaScript: Zap,
    TypeScript: Sparkles,
    Frontend: Palette,
    "Next.js": Globe,
  };

  return (
    <section id="projects" className="relative py-20 bg-black overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary text-primary text-sm mb-4">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm text-primary font-medium">My Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Showcase my best work and achievements
            </p>
          </div>
        </FadeIn>

        {/* Category Filter */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => {
              const Icon = categoryIcons[category];
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`group relative px-6 py-3 rounded-full font-medium cursor-pointer transition ${
                    activeCategory === category
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <div
                    className={`absolute inset-0 rounded-full ${
                      activeCategory === category
                        ? "bg-primary/20 border border-primary/50"
                        : "bg-white/5 border border-white/10 group-hover:bg-white/10"
                    }`}
                  />
                  <div className="relative flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{category}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Carousel */}
        <FadeIn delay={0.4}>
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide pb-8"
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="w-full sm:w-[80%] md:w-[45%] lg:w-[30%] shrink-0 snap-start"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>

            {filteredProjects.length > 3 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:bg-primary transition cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5 mx-auto text-white" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:bg-primary transition cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5 mx-auto text-white" />
                </button>
              </>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Projects;
