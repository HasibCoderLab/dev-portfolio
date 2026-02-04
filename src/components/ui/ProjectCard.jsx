import React from "react";
import { ExternalLink, Github, TrendingUp } from "lucide-react";

const ProjectCard = ({ project }) => {
  const {
    title,
    description,
    image,
    category,
    technologies,
    metrics,
    demoUrl,
    githubUrl,
  } = project;

  return (
    <div className="group flex flex-col md:flex-row bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 w-full min-h-[350px] shadow-2xl">
      
      {/* IMAGE SIDE (Left on Desktop) */}
      <div className="relative w-full md:w-2/5 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 md:bg-gradient-to-r md:from-black/40 to-transparent" />
        
        {/* CATEGORY BADGE */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-[10px] font-bold tracking-widest text-white bg-primary/80 backdrop-blur-md rounded-full uppercase">
            {category}
          </span>
        </div>
      </div>

      {/* CONTENT SIDE (Right on Desktop) */}
      <div className="p-8 md:w-3/5 flex flex-col justify-center space-y-5">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          {/* EXTERNAL LINKS */}
          <div className="flex items-center gap-3">
            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-white/5 rounded-xl border border-white/10 hover:bg-primary/20 hover:border-primary/40 text-white transition-all"
                title="Source Code"
              >
                <Github size={20} />
              </a>
            )}
            {demoUrl && (
              <a 
                href={demoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-white/5 rounded-xl border border-white/10 hover:bg-primary/20 hover:border-primary/40 text-white transition-all"
                title="Live Demo"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>

        <p className="text-gray-400 text-base md:text-lg leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* TECH STACK */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span 
              key={index} 
              className="px-3 py-1 text-[11px] font-semibold text-primary/90 border border-primary/20 bg-primary/5 rounded-lg uppercase tracking-wider"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* PERFORMANCE METRICS */}
        {metrics && (
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <div className="p-1.5 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <span className="text-sm font-medium text-green-400/90 italic">{metrics}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;