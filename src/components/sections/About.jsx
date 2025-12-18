// import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb } from "react-icons/si";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb, SiJavascript, SiRedux, SiGit, SiCanva, SiVite } from "react-icons/si";
import { Download, Code2, Sparkles } from "lucide-react";
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


  return <section id="about" className="" >
    <RadialGradientBackground variant="about" />
    <div className="">

      {/*Main grid  */}
      <div className="">
        {/*Left column Container     */}
        <div className="">
          <div className="">
            <FadeIn delay={60}>
              <div className="">
                <Code2 className />
                <span className="">

                  Full-Stack Next.js Developer
                </span>
                <Sparkles className="" />

              </div>
            </FadeIn>

            {/* =======    2nd FadeIn     ============= */}
            <FadeIn delay={100}>
              <h2 className="">  Crafting Digital Experiences </h2>
            </FadeIn>


            {/* 3rd FadeIn */}

            <FadeIn delay={200}>
              <div className="">
                {
                  PERSONAL_INFO.bio.map((paragraph, index) => (
                    <p key={index}
                      className="">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </FadeIn>
          </div>


          <FadeIn delay={300}>
            <div className="">
              {
                ABOUT_STATS.bio.map((stat, index) => (
                  <div key={index}
                    className="">

                    <div className=""></div>

                    <div className="">
                      {stat.value}
                    </div>
                    <p
                      className="">
                      {stat.lable}
                    </p>
                  </div>

                ))}
            </div>
          </FadeIn>
          {/* 4th  FadeIn */}

    
}

          export default About