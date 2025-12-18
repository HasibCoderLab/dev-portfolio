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


  return <section id="about" className="relative py-20 overflow-hidden bg-black" >
    <RadialGradientBackground variant="about" />

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/*Main grid  */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20 ">
        {/*Left column Container     */}
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-8">
            <FadeIn delay={60}>
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-primary/30 bg-primary/10 rounded-full w-fit">
                <Code2 className ="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">

                  Full-Stack Next.js Developer
                </span>
                <Sparkles className="w-4 h-4 text-primary" />

              </div>
            </FadeIn>

            {/* =======    2nd FadeIn     ============= */}
            <FadeIn delay={100}>
              <h2 className=" text-3xl  lg:4xl  font-normal text-white leading-tight"> I am a developer who creates beautiful, fast, and efficient digital experiences using modern web technologies.  </h2>
            </FadeIn>


            {/* 3rd FadeIn */}

            <FadeIn delay={200}>
              <div className="flex flex-col gap-4">
                {
                  PERSONAL_INFO.bio.map((paragraph, index) => (
                    <p key={index}
                      className="text-base text-white/70 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </FadeIn>
          </div>


          <FadeIn delay={300}>
            <div className="grid grid-cols-3 gap-8 ">
              {
                ABOUT_STATS.map((stat, index) => (
                  <div key={index}
                    className="relative">

                    <div className="absolute -left-4 top-0 w-1 h-full  bg-linear-to-b from from-primary via-primary/50 to-primary/20 rounded-b-full "></div>

                    <div className="text-3xl font-notmal text-white mb-2 font-mono">
                      {stat.value}
                    </div>
                    <p
                      className="text-sm text-white/60 leading-snug">
                      {stat.label}
                    </p>
                  </div>

                ))}
            </div>
          </FadeIn>
          {/* 4th  FadeIn */}
          <FadeIn delay={400}>
            <button onClick={() => window.open(PERSONAL_INFO.resume, '_blank')}
              className="inline-flex items-centergap-3 bg-white hover:bg-white/90 text-black rounded-full  px-8 py-4 text-base font-medium  cursor-pointer transition-all duration-300 w-fit group"
            >
              <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transfrom duration-300" />

              Download  Resume.
            </button>
          </FadeIn>
        </div>

        
      </div>
    </div>
  </section>

}

export default About