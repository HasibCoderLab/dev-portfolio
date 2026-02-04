import tsRgb from "../assets/images/projects/ts-rgb.png"
import jsRgb from "../assets/images/projects/js-rgb.png"
import portfolioWeb from "../assets/images/projects/portfolio-web.png"
import NextJs from "../assets/images/projects/Next-js.png"
import ELearning  from "../assets/images/projects/E-Learning.png"
import TravelGuide  from "../assets/images/projects/Travel-Guide.png"
import reactPortfolio  from "../assets/images/projects/react-portfolio.png"
import restaurantWebsite  from "../assets/images/projects/restaurant-website.png"
import funProject  from "../assets/images/projects/fun-project.png"



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
    id: 6,
    title: "E-Learning Platfrom",
    description: "English base E-Learning Platfrom",
    image: ELearning,
    category: "React",
    technologies: ["React", "React-Router", "Framer-Motion"],
    metrics: "Client Work",
    demoUrl: "https://english-hunt.netlify.app/",
    
  },
  {
    id: 7,
    title: "send-friend-request",
    description: "",
    image: funProject,
    category: "JavaScript",
    technologies: ["HTML", "CSS", "JavaScript"],
    metrics: "Fun Project", 
    demoUrl: "https://send-friend-request.vercel.app/",
    githubUrl: "https://github.com/HasibCoderLab/Send-Friend-Request",
  },
  {
    id: 7,
    title: "Travel-Guide Website",
    description: "Travel-Guide built with Next.js",
    image: TravelGuide,
    category: "Next.js",
    technologies: ["Next.js", "React","File Base Routing", "Tailwind CSS"],
    metrics: "SEO Ready",
    demoUrl: "https://simple-website-with-next-js-pi.vercel.app/",
    githubUrl: "https://github.com/HasibCoderLab/next-js-interface",
  },
  
  {
    id: 8,
    title: "React Protfolio Website",
    description: "Collection of small JS games",
    image: reactPortfolio,
    category: "React",
    technologies: ["React-Router-Dom","gsap", "React-Scroll", "Typewriter-Package"],
    metrics: "React Base Practice Project",
    demoUrl: "https://portfolio-with-react-01.vercel.app/",
    githubUrl: "https://github.com/HasibCoderLab/portfolio-with-react",
  },
  {
    id: 9,
    title: " Restaurant Website ",
    description: "React Base restaurant Website For My Family ",
    image: restaurantWebsite,
    category: "React",
    technologies: ["React","React-Toastify", "ContextAPI", "Tailwind CSS", "React-Redux"],
    metrics: "Family Work (Demo Work)",
    demoUrl: "https://farmid-restaurant-website.vercel.app/",
    
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
