import { 
  SiReact, SiJavascript, SiTypescript, SiNextdotjs, SiTailwindcss, SiRedux, 
  SiNodedotjs, SiExpress, SiMongodb, SiPrisma, SiPostman, SiGit, 
  SiGithub, SiVercel, SiLinux, SiVite, SiCanva, SiJsonwebtokens, SiFirebase 
} from "react-icons/si";
import { FaServer, FaDatabase } from "react-icons/fa";

export const skills = [
  // ========== FRONTEND DEVELOPMENT ==========
  { id: 1, name: "React.js", icon: SiReact, color: "#61DAFB", level: "Advanced", experiences: "1+ Year", category: "Frontend Development" },
  { id: 2, name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: "Advanced", experiences: "2+ Years", category: "Frontend Development" },
  { id: 3, name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: "Intermediate", experiences: "1+ Year", category: "Frontend Development" },
  { id: 4, name: "Next.js", icon: SiNextdotjs, color: "#ffffff", level: "Intermediate", experiences: "1+ Year", category: "Frontend Development" },
  { id: 5, name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", level: "Advanced", experiences: "1+ Year", category: "Frontend Development" },
  { id: 6, name: "Redux", icon: SiRedux, color: "#764ABC", level: "Basic", experiences: "6+ Months", category: "Frontend Development" },

  // ========== BACKEND & APIs ==========
  { id: 8, name: "Node.js", icon: SiNodedotjs, color: "#339933", level: "Intermediate", experiences: "6+ Months", category: "Backend & APIs" },
  { id: 9, name: "Express.js", icon: SiExpress, color: "#ffffff", level: "Basic", experiences: "6+ Months", category: "Backend & APIs" },
  { id: 12, name: "REST APIs", icon: FaServer, color: "#005571", level: "Basic", experiences: "3+ Months", category: "Backend & APIs" },
  { id: 14, name: "JWT", icon: SiJsonwebtokens, color: "#d63aff", level: "Basic", experiences: "6+ Months", category: "Backend & APIs" },
  { id: 15, name: "Auth", icon: SiFirebase, color: "#FFCA28", level: "Basic", experiences: "6+ Months", category: "Backend & APIs" },

  // ========== DATABASE ==========
  { id: 10, name: "MongoDB", icon: SiMongodb, color: "#47A248", level: "Basic", experiences: "6+ Months", category: "Database" },
  { id: 11, name: "Mongoose", icon: FaDatabase, color: "#880000", level: "Basic", experiences: "3+ Months", category: "Database" },

  // ========== TOOLS & OTHERS ==========
  { id: 16, name: "Git & GitHub", icon: SiGithub, color: "#ffffff", level: "Advanced", experiences: "2+ Years", category: "Tools" },
  { id: 19, name: "Vercel", icon: SiVercel, color: "#ffffff", level: "Advanced", experiences: "1+ Year", category: "Tools" },
  { id: 21, name: "Postman", icon: SiPostman, color: "#FF6C37", level: "Intermediate", experiences: "1+ Year", category: "Tools" },
  { id: 23, name: "Vite", icon: SiVite, color: "#646CFF", level: "Intermediate", experiences: "1+ Years", category: "Tools" },
  { id: 24, name: "Canva", color: "#00C4CC", icon: SiCanva, level: "Expert", experiences: "3+ Year", category: "Tools" },
];