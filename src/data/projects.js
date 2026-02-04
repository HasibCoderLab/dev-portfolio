import tsRgb from "../assets/images/projects/ts-rgb.png"
import jsRgb from "../assets/images/projects/js-rgb.png"
import portfolioWeb from "../assets/images/projects/portfolio-web.png"
import NextJs from "../assets/images/projects/Next-js.png"


export const projects = [
  {
    id: 1,
    title: "RGB Color Generator with TS",
    description: "Generate random RGB colors using TypeScript",
    image: tsRgb,
    category: "TypeScript",
    technologies: ["HTML", "CSS", "TypeScript"],
    metrics: "Mini Project",
    demoUrl: "https://rgb-color-generator-with-ts.vercel.app/",
    githubUrl: "https://github.com/HasibCoderLab/rgb-color-generator-with-ts",
  },
  {
    id: 2,
    title: "RGB Color Generator with JS",
    description: "Generate random RGB colors using JavaScript",
    image:jsRgb,
    category: "JavaScript",
    technologies: ["HTML", "CSS", "JavaScript"],
    metrics: "Mini-Project",
    demoUrl: "https://rgb-color-generator-eight.vercel.app/",
    githubUrl: "https://github.com/HasibCoderLab/rgb-color-generator",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "Personal portfolio website",
    image: portfolioWeb,
    category: "Frontend",
    technologies: ["HTML", "CSS", "JavaScript"],
    metrics: "Responsive",
    demoUrl: "https://coderhasib.vercel.app/",
    githubUrl: "https://github.com/HasibCoderLab/coderhasib-portfolio",
  },
  {
    id: 4,
    title: "Next.js Landing Page",
    description: "Landing page built with Next.js",
    image: NextJs,
    category: "Next.js",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    metrics: "SEO Ready",
    demoUrl: "https://next-js-interface-omega.vercel.app/",
    githubUrl: "https://github.com/HasibCoderLab/next-js-interface",
  },
  {
    id: 5,
    title: "JavaScript Mini Games",
    description: "Collection of small JS games",
    image: "/images/projects/project5.png",
    category: "JavaScript",
    technologies: ["HTML", "CSS", "JavaScript"],
    metrics: "Fun Project",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "TypeScript Counter App",
    description: "Counter app with TypeScript logic",
    image: "/images/projects/project6.png",
    category: "TypeScript",
    technologies: ["HTML", "CSS", "TypeScript"],
    metrics: "Beginner Friendly",
    demoUrl: "#",
    githubUrl: "#",
  },
];

export const categories= [
  "All",
  "JavaScript",
  "TypeScript",
  "Frontend",
  "Next.js",
  "React"
];
