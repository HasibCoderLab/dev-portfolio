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
    <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300">
      
      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

        {/* CATEGORY */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-sm text-white bg-black/40 rounded-full">
            {category}
          </span>
        </div>

        {/* LINKS */}
        <div className="absolute bottom-4 right-4 flex items-center gap-3">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View Demo"
              className="p-2.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-primary/30 hover:border-primary/50 transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4 text-white" />
            </a>
          )}

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View Code"
              className="p-2.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-primary/30 hover:border-primary/50 transition-all duration-300"
            >
              <Github className="w-4 h-4 text-white" />
            </a>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-white group-hover:text-[#A8FF8D] transition-colors">
          {title}
        </h3>

        <p className="text-white/60 text-sm line-clamp-2">
          {description}
        </p>

        {/* TECHNOLOGIES */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs text-primary border border-white/20 rounded-lg"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* METRICS */}
        {metrics && (
          <div className="flex items-center gap-2 pt-3 border-t border-white/10">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm text-green-400">{metrics}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
