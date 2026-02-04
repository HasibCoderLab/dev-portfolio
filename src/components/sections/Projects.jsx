import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Target, ChevronLeft, ChevronRight } from "lucide-react";
import { SiTypescript } from "react-icons/si";
import { FaJsSquare, FaFileCode, FaReact, FaInfinity } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { projects, categories } from "../../data/projects";
import ProjectCard from "../ui/ProjectCard";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const categoryIcons = {
    All: FaInfinity,
    JavaScript: FaJsSquare,
    TypeScript: SiTypescript,
    Frontend: FaFileCode,
    "Next.js": RiNextjsFill,
    React: FaReact,
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredProjects.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === filteredProjects.length - 1 ? 0 : prev + 1
    );
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  return (
    <section  id="projects" className="relative py-20 px-6 bg-[#030712] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Briefcase className="w-4 h-4 text-white/70" />
            <span className="text-white/70 text-sm font-medium">
              My Portfolio
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
            Featured <span className="text-primary">Projects</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore my latest work, from interactive web apps to complex
            full-stack solutions.
          </p>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => {
            const Icon = categoryIcons[category] || Target;
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`relative px-6 py-3 rounded-2xl font-semibold text-sm transition-all
                  ${
                    isActive
                      ? "text-white bg-white/10 border border-white/20"
                      : "text-gray-400 hover:text-white"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-white/10 rounded-2xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative flex items-center gap-2 z-10">
                  <Icon className="w-4 h-4" />
                  {category}
                </span>
              </button>
            );
          })}
        </div>

        {/* PROJECT SLIDER */}
        {filteredProjects.length > 0 ? (
          <div className="relative">
            {/* LEFT */}
            <button
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20
              bg-white/5 hover:bg-white/10 text-white p-3 rounded-full
              border border-white/10 backdrop-blur transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* CARD */}
            <div className="flex justify-center items-center min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-2xl"
                >
                  <ProjectCard
                    project={filteredProjects[currentIndex]}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT */}
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20
              bg-white/5 hover:bg-white/10 text-white p-3 rounded-full
              border border-white/10 backdrop-blur transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* DOTS */}
            <div className="flex justify-center gap-2 mt-8">
              {filteredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all
                    ${
                      index === currentIndex
                        ? "w-8 bg-white"
                        : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
