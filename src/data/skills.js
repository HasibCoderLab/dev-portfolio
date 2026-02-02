import { 
  SiReact, SiJavascript, SiTypescript, SiNextdotjs, SiTailwindcss, SiRedux, 
  SiNodedotjs, SiExpress, SiMongodb, SiPrisma, SiPostman, SiGit, 
  SiGithub, SiVercel, SiLinux, SiVite, SiCanva, SiJsonwebtokens, SiFirebase 
} from "react-icons/si";
import { FaServer, FaTools, FaDatabase, FaCode } from "react-icons/fa";

export const skills = [
  // ========== FRONTEND DEVELOPMENT ==========
  { id: 1, name: "React.js", icon: SiReact, level: "Advanced", experiences: "1+ Year", category: "Frontend Development" },
  { id: 2, name: "JavaScript", icon: SiJavascript, level: "Advanced", experiences: "2+ Years", category: "Frontend Development" },
  { id: 3, name: "TypeScript", icon: SiTypescript, level: "Intermediate", experiences: "1+ Year", category: "Frontend Development" },
  { id: 4, name: "Next.js", icon: SiNextdotjs, level: "Intermediate", experiences: "1+ Year", category: "Frontend Development" },
  { id: 5, name: "Tailwind CSS", icon: SiTailwindcss, level: "Advanced", experiences: "1+ Year", category: "Frontend Development" },
  { id: 6, name: "Redux", icon: SiRedux, level: "Basic", experiences: "6+ Months", category: "Frontend Development" },

  // ========== BACKEND & APIs ==========
  { id: 8, name: "Node.js", icon: SiNodedotjs, level: "Intermediate", experiences: "6+ Months", category: "Backend & APIs" },
  { id: 9, name: "Express.js", icon: SiExpress, level: "Basic", experiences: "6+ Months", category: "Backend & APIs" },
  { id: 12, name: "REST APIs", icon: FaServer, level: "Basic", experiences: "3+ Months", category: "Backend & APIs" },
  { id: 14, name: "JWT", icon: SiJsonwebtokens, level: "Basic", experiences: "6+ Months", category: "Backend & APIs" },
  { id: 15, name: "Auth", icon: SiFirebase, level: "Basic", experiences: "6+ Months", category: "Backend & APIs" },

  // ========== DATABASE ==========
  { id: 10, name: "MongoDB", icon: SiMongodb, level: "Basic", experiences: "6+ Months", category: "Database" },
  { id: 11, name: "Mongoose", icon: FaDatabase, level: "Basic", experiences: "3+ Months", category: "Database" },

  // ========== TOOLS & OTHERS ==========
  { id: 16, name: "Git & GitHub", icon: SiGithub, level: "Advanced", experiences: "2+ Years", category: "Tools" },
  { id: 19, name: "Vercel", icon: SiVercel, level: "Advanced", experiences: "1+ Year", category: "Tools" },
  { id: 21, name: "Postman", icon: SiPostman, level: "Intermediate", experiences: "1+ Year", category: "Tools" },
  { id: 23, name: "Vite", icon: SiVite, level: "Intermediate", experiences: "1+ Years", category: "Tools" },
  { id: 24, name: "Canva", icon: SiCanva, level: "Expert", experiences: "3+ Year", category: "Tools" },
];