// import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb } from "react-icons/si";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb, SiJavascript, SiRedux, SiGit, SiCanva, SiVite } from "react-icons/si";
import { Download,Code2,Sparkles } from "lucide-react";
import { PERSONAL_INFO, ABOUT_STATS } from "../../utils/constants";
import FadeIn from "../animations/FadeIn";
import RadialGradientBackground from "../background/RadialGradientBackground";


const About = () => {

 const skills = [
  { name: "React.js", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Redux", icon: SiRedux, color: "#764ABC" },
  { name: "Git & GitHub", icon: SiGit, color: "#F05032" },
  { name: "Canva", icon: SiCanva, color: "#00C4CC" },
  { name: "Vite", icon: SiVite, color: "#646CFF" },
];


  return (
    <div>About</div>
  )
}

export default About