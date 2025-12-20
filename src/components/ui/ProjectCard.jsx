import React from 'react'
import { ExternalLink, Github, TrendingUp } from 'lucide-react'

const ProjectCard = ({ project }) => {
  const { title, description, image, category, technologies, metrics, demoUrl, githubUrl } = project;
  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden  hover:border-primary/30 transition-all duration-300">

      <div className="">
        <img
          src={image}
          alt={title}
          className=''
        />

        <div className="" />
        <div className="">
          {demoUrl && (
            <a
              href={demoUrl}
              target='_blank'
              rel='noopener noreferrer'
              title='View Demo'
            >
              <ExternalLink className="" />
            </a>
          )}
          <div className="">
            {githubUrl && (
              <a
                href={githubUrl}
                target='_blank'
                rel='noopener noreferrer'
                title='View Code'
              >
                <Github className="" />
              </a>
            )}
          </div>


          {/* show project.category}  */}

          <div className="">
            <span className="">
              {project.category}
            </span>
          </div>
        </div>

        <div className="">
          <div>
            <h3 className="">
              {title}
            </h3>
            <p className="">
              {description}
            </p>
          </div>
        </div>

        <div className="">
          {technologies.map((tech, index) => (
            <span key={index}
              className=""
            >{tech}</span>
          ))}

        </div>
        {/* Show metrics */}

        {
          metrics && (
            <div className="">
              <TrendingUp className='' />
              <p className=""> {metrics}</p>
            </div>
          )

        }

      </div>
    </div>
  )
}

export default ProjectCard
