"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useSeason } from "./SeasonContext"
import Carousel from "./Carousel"
import { ExternalLink, Github } from "lucide-react"

const Projects: React.FC = () => {
  const { colors } = useSeason()

  const projectsData = [
    {
      title: "E-Commerce Platform",
      image: "/placeholder.svg?height=300&width=600",
      description:
        "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
      technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS", "MongoDB"],
      liveLink: "#",
      githubLink: "#",
    },
    {
      title: "Task Management App",
      image: "/placeholder.svg?height=300&width=600",
      description:
        "A collaborative task management application with real-time updates and team collaboration features.",
      technologies: ["React", "Firebase", "Redux", "Material UI", "Node.js"],
      liveLink: "#",
      githubLink: "#",
    },
    {
      title: "Portfolio Website",
      image: "/placeholder.svg?height=300&width=600",
      description: "A responsive portfolio website with seasonal themes and interactive elements.",
      technologies: ["React", "Framer Motion", "Tailwind CSS", "TypeScript"],
      liveLink: "#",
      githubLink: "#",
    },
    {
      title: "Weather Dashboard",
      image: "/placeholder.svg?height=300&width=600",
      description:
        "A weather dashboard that displays current and forecasted weather data with interactive visualizations.",
      technologies: ["React", "Chart.js", "Weather API", "Styled Components"],
      liveLink: "#",
      githubLink: "#",
    },
    {
      title: "Social Media Platform",
      image: "/placeholder.svg?height=300&width=600",
      description: "A social media platform with user profiles, posts, comments, and real-time notifications.",
      technologies: ["Next.js", "Socket.io", "MongoDB", "Express", "AWS S3"],
      liveLink: "#",
      githubLink: "#",
    },
  ]

  const projectSlides = projectsData.map((project, index) => (
    <motion.div
      key={index}
      className="bg-white rounded-2xl shadow-xl overflow-hidden h-[550px] flex flex-col"
      whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-[300px] overflow-hidden">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
          {project.title}
        </h3>
        <p className="text-lg text-gray-600 mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="py-1 px-3 rounded-full text-sm font-medium"
              style={{ backgroundColor: colors.primary + "15", color: colors.primary }}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4 mt-auto">
          <a
            href={project.liveLink}
            className="flex items-center gap-2 py-2 px-4 rounded-lg text-white font-medium transition-transform hover:scale-105"
            style={{ backgroundColor: colors.primary }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={18} />
            Live Demo
          </a>
          <a
            href={project.githubLink}
            className="flex items-center gap-2 py-2 px-4 rounded-lg font-medium border-2 transition-transform hover:scale-105"
            style={{ borderColor: colors.primary, color: colors.primary }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={18} />
            Code
          </a>
        </div>
      </div>
    </motion.div>
  ))

  return (
    <section id="projects" className="min-h-screen py-16">
      <Carousel title="My Projects" slides={projectSlides} titleColor={colors.primary} />
    </section>
  )
}

export default Projects
