"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useSeason } from "./SeasonContext"
import Carousel from "./Carousel"
import { Monitor, Palette, Globe, Database, Server, Gamepad2 } from "lucide-react"

const Skills: React.FC = () => {
  const { colors } = useSeason()

  const skillsData = [
    {
      title: "Frontend Development",
      icon: <Monitor size={48} />,
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Bootstrap"],
      description: "Building responsive and interactive user interfaces with modern frameworks and libraries.",
    },
    {
      title: "UI/UX Design",
      icon: <Palette size={48} />,
      skills: ["Figma", "Wireframing", "Prototyping"],
      description: "Creating intuitive and visually appealing designs focused on user experience.",
    },
    {
      title: "Web Technologies",
      icon: <Globe size={48} />,
      skills: ["HTML5", "JavaScript", "Java"],
      description: "Leveraging the latest web technologies to build modern applications.",
    },
    {
      title: "Backend Development",
      icon: <Server size={48} />,
      skills: ["Node.js", "Python", "Java", "API Design"],
      description: "Developing robust server-side applications and APIs.",
    },
    {
      title: "Database Management",
      icon: <Database size={48} />,
      skills: ["MySQL", "Firebase"],
      description: "Working with various database systems to store and manage data efficiently.",
    },
    {
      title: "Mobile Development",
      icon: <Gamepad2 size={48} />,
      skills: ["Android", "Unity"],
      description: "Building native and cross-platform mobile applications and games.",
    },
  ]

  const skillSlides = skillsData.map((skill, index) => (
    <motion.div
      key={index}
      className="bg-white rounded-2xl shadow-xl p-10 h-[500px] flex flex-col items-center text-center"
      whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: colors.primary + "20" }}
      >
        <div style={{ color: colors.primary }}>{skill.icon}</div>
      </div>
      <h3 className="text-3xl font-bold mb-6" style={{ color: colors.primary }}>
        {skill.title}
      </h3>
      <p className="text-xl text-gray-600 mb-8">{skill.description}</p>
      <div className="grid grid-cols-2 gap-4 w-full mt-auto">
        {skill.skills.map((item, i) => (
          <div
            key={i}
            className="py-2 px-4 rounded-full text-lg font-medium"
            style={{ backgroundColor: colors.primary + "15", color: colors.primary }}
          >
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  ))

  return (
    <section id="skills" className="min-h-screen h-screen flex items-center py-20">
      <Carousel title="My Skills" slides={skillSlides} titleColor={colors.primary} />
    </section>
  )
}

export default Skills
