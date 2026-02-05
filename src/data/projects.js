import tsRgb from "../assets/images/projects/ts-rgb.png";
import jsRgb from "../assets/images/projects/js-rgb.png";
import portfolioWeb from "../assets/images/projects/portfolio-web.png";
import NextJs from "../assets/images/projects/Next-js.png";
import ELearning from "../assets/images/projects/e-learning.png";
import TravelGuide from "../assets/images/projects/travel-guide.png";
import reactPortfolio from "../assets/images/projects/react-portfolio.png";
import restaurantWebsite from "../assets/images/projects/restaurant-website.png";


export const projects = [
  {
    id: 1,
    title: "RGB Color Generator (TypeScript)",
    description: "A random RGB color generator built using TypeScript.",
    image: tsRgb,
    category: "TypeScript",
    technologies: ["HTML", "CSS", "TypeScript"],
    metrics: "Mini Project",
    demoUrl: "https://rgb-color-generator-with-ts.vercel.app/",
    githubUrl: "https://github.com/HasibCoderLab/rgb-color-generator-with-ts",
  },
  {
    id: 2,
    title: "RGB Color Generator (JavaScript)",
    description: "Generate random RGB colors using vanilla JavaScript.",
    image: jsRgb,
    category: "JavaScript",
    technologies: ["HTML", "CSS", "JavaScript"],
    metrics: "Mini Project",
    demoUrl: "https://rgb-color-generator-eight.vercel.app/",
    githubUrl: "https://github.com/HasibCoderLab/rgb-color-generator",
  },
  {
    id: 3,
    title: "Personal Portfolio Website",
    description: "A responsive personal portfolio showcasing my projects and skills.",
    image: portfolioWeb,
    category: "Frontend",
    technologies: ["HTML", "CSS", "JavaScript"],
    metrics: "Responsive Design",
    demoUrl: "https://coderhasib.vercel.app/",
    githubUrl: "https://github.com/HasibCoderLab/coderhasib-portfolio",
  },
  {
    id: 4,
    title: "Next.js Landing Page",
    description: "SEO-optimized landing page built with Next.js.",
    image: NextJs,
    category: "Next.js",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    metrics: "SEO Ready",
    demoUrl: "https://next-js-interface-omega.vercel.app/",
    githubUrl: "https://github.com/HasibCoderLab/next-js-interface",
  },
  {
    id: 5,
    title: "E-Learning Platform",
    description: "English-based e-learning platform with smooth animations.",
    image: ELearning,
    category: "React",
    technologies: ["React", "React Router", "Framer Motion"],
    metrics: "Client Project",
    demoUrl: "https://english-hunt.netlify.app/",
  },
 
  {
    id: 6,
    title: "Travel Guide Website",
    description: "A simple travel guide website built using Next.js.",
    image: TravelGuide,
    category: "Next.js",
    technologies: ["Next.js", "React", "File-based Routing", "Tailwind CSS"],
    metrics: "SEO Ready",
    demoUrl: "https://simple-website-with-next-js-pi.vercel.app/",
    githubUrl: "https://github.com/HasibCoderLab/next-js-interface",
  },
  {
    id: 7,
    title: "React Portfolio Website",
    description: "A modern portfolio website built with React and animations.",
    image: reactPortfolio,
    category: "React",
    technologies: ["React Router DOM", "GSAP", "React Scroll", "Typewriter Effect"],
    metrics: "Practice Project",
    demoUrl: "https://portfolio-with-react-01.vercel.app/",
    githubUrl: "https://github.com/HasibCoderLab/portfolio-with-react",
  },
  {
    id: 8,
    title: "Restaurant Website",
    description: "A React-based restaurant website built for a family business demo.",
    image: restaurantWebsite,
    category: "React",
    technologies: ["React", "React Toastify", "Context API", "Tailwind CSS", "Redux"],
    metrics: "Family Demo Project",
    demoUrl: "https://farmid-restaurant-website.vercel.app/",
  },
];

export const categories = [
  "All",
  "JavaScript",
  "TypeScript",
  "Frontend",
  "Next.js",
  "React",
];
