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
      title: "VAMOS - Virtual Machine Monitoring System",
      image: "/placeholder.svg?height=300&width=600",
      description:
        "An efficient and lightweight Virtual Machine Monitoring System providing real-time performance tracking across critical system metrics in virtualized environments.",
      technologies: ["TypeScript", "Python", "React", "Node.js", "Docker"],
      liveLink: "#",
      githubLink: "https://github.com/SKYRENZ/VAMOS.git",
    },
    {
      title: "Clinic Management System",
      image: "/placeholder.svg?height=300&width=600",
      description:
        "A comprehensive clinic management solution designed to streamline patient records, appointments, billing, and medical staff management for healthcare facilities.",
      technologies: ["TypeScript", "Java", "React", "Spring Boot", "MySQL"],
      liveLink: "#",
      githubLink: "https://github.com/Genrei123/clinic-management-system.git",
    },
    {
      title: "Temphu - IoT Temperature & Humidity Monitor",
      image: "/placeholder.svg?height=300&width=600",
      description:
        "An IoT-based system that monitors temperature and humidity levels in real-time, providing accurate environmental data tracking and alerts for various applications.",
      technologies: ["TypeScript", "IoT", "React", "Node.js", "MongoDB"],
      liveLink: "#",
      githubLink: "https://github.com/kopiibara/Temphu.git",
    },
    {
      title: "NaviGaze - Indoor Navigation System",
      image: "/placeholder.svg?height=300&width=600",
      description:
        "An innovative indoor navigation solution that uses eye-tracking technology to assist users in navigating complex indoor environments like shopping malls and airports.",
      technologies: ["Python", "Computer Vision", "React Native", "TensorFlow"],
      liveLink: "#",
      githubLink: "https://github.com/Arjayy007/NaviGaze-Indoor-Navigation.git",
    },
    {
      title: "Restaurant Management System",
      image: "/placeholder.svg?height=300&width=600",
      description:
        "A full-featured restaurant management platform that handles orders, inventory, staff scheduling, and customer management to optimize restaurant operations.",
      technologies: ["Java", "Spring Boot", "React", "MySQL", "REST API"],
      liveLink: "#",
      githubLink: "https://github.com/Mon0629/RestaurantManagementSystem.git",
    },
    {
      title: "Billing Management System",
      image: "/placeholder.svg?height=300&width=600",
      description:
        "A robust billing and invoicing system that automates payment processing, tracks expenses, generates financial reports, and manages customer billing information.",
      technologies: ["Java", "Spring Boot", "React", "PostgreSQL", "Docker"],
      liveLink: "#",
      githubLink: "https://github.com/Mon0629/BillingManagementSystem.git",
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
    <section id="projects" className="min-h-screen w-full py-16">
      <Carousel title="My Projects" slides={projectSlides} titleColor={colors.primary} />
    </section>
  )
}

export default Projects
