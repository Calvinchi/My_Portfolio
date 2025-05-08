"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { useSeason } from "./SeasonContext"
import Carousel from "./Carousel"

// ------------------ TYPES ------------------
type BaseProject = {
  title: string
  description: string
  technologies: string[]
  githubLink: string
}

type ImageProject = BaseProject & {
  image: string
  video?: never
}

type VideoProject = BaseProject & {
  video: string
  image?: never
}

type Project = ImageProject | VideoProject

// ------------------ COMPONENT ------------------
const Projects: React.FC = () => {
  const { colors } = useSeason()

  const projectsData: Project[] = [
    {
      title: "VAMOS - Virtual Machine Monitoring System",
      image: "/placeholder.svg?height=300&width=600",
      description:
        "An efficient and lightweight Virtual Machine Monitoring System providing real-time performance tracking across critical system metrics in virtualized environments.",
      technologies: ["TypeScript", "Python", "React", "Node.js", "Docker"],
      githubLink: "https://github.com/SKYRENZ/VAMOS.git",
    },
    {
      title: "Clinic Management System",
      image: "/placeholder.svg?height=300&width=600",
      description:
        "A comprehensive clinic management solution designed to streamline patient records, appointments, billing, and medical staff management for healthcare facilities.",
      technologies: ["TypeScript", "Java", "React", "Spring Boot", "MySQL"],
      githubLink: "https://github.com/Genrei123/clinic-management-system.git",
    },
    {
      title: "Temphu - IoT Temperature & Humidity Monitor",
      image: "/placeholder.svg?height=300&width=600",
      description:
        "An IoT-based system that monitors temperature and humidity levels in real-time, providing accurate environmental data tracking and alerts for various applications.",
      technologies: ["TypeScript", "IoT", "React", "Node.js", "MongoDB"],
      githubLink: "https://github.com/kopiibara/Temphu.git",
    },
    {
      title: "NaviGaze - Indoor Navigation System",
      video: "/Navigaze.mp4",
      description:
        "An innovative indoor navigation solution that uses eye-tracking technology to assist users in navigating complex indoor environments like shopping malls and airports.",
      technologies: ["Python", "Computer Vision", "React Native", "TensorFlow"],
      githubLink: "https://github.com/Arjayy007/NaviGaze-Indoor-Navigation.git",
    },
    {
      title: "Restaurant Management System",
      image: "/placeholder.svg?height=300&width=600",
      description:
        "A full-featured restaurant management platform that handles orders, inventory, staff scheduling, and customer management to optimize restaurant operations.",
      technologies: ["Java", "Spring Boot", "React", "MySQL", "REST API"],
      githubLink: "https://github.com/Mon0629/RestaurantManagementSystem.git",
    },
    {
      title: "Billing Management System",
      image: "/placeholder.svg?height=300&width=600",
      description:
        "A robust billing and invoicing system that automates payment processing, tracks expenses, generates financial reports, and manages customer billing information.",
      technologies: ["Java", "Spring Boot", "React", "PostgreSQL", "Docker"],
      githubLink: "https://github.com/Mon0629/BillingManagementSystem.git",
    },
  ]

  const projectSlides = projectsData.map((project, index) => {
    // Ensure that 'project' has all necessary properties
    if (project.video) {
      return (
        <NaviGazeProjectSlide
          key={index}
          project={{
            title: project.title,
            description: project.description,
            technologies: project.technologies,
            githubLink: project.githubLink,
            video: project.video, // video is passed as part of the full project
          }}
          colors={colors}
        />
      )
    }

    // Handle ImageProject rendering if no video exists
    return (
      <motion.div
        key={index}
        className="bg-white rounded-2xl shadow-xl overflow-hidden h-[650px] flex flex-col"
        whileHover={{
          y: -10,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-[400px] overflow-hidden">
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
              href={project.githubLink}
              className="py-2 px-4 rounded-lg text-white font-medium transition-transform hover:scale-105 w-full text-center"
              style={{ backgroundColor: colors.primary }}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Code
            </a>
          </div>
        </div>
      </motion.div>
    )
  })

  return (
    <section id="projects" className="min-h-screen w-full py-16">
      <Carousel title="My Projects" slides={projectSlides} titleColor={colors.primary} />
    </section>
  )
}

interface NaviGazeProjectSlideProps {
  project: VideoProject
  colors: {
    primary: string
    secondary: string
  }
  isActive?: boolean
}

const NaviGazeProjectSlide: React.FC<NaviGazeProjectSlideProps> = ({ project, colors, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  // Play/pause video based on hover and active state
  useEffect(() => {
    if (videoRef.current) {
      if (isActive && isHovering) {
        videoRef.current.play().catch((err) => console.error("Error playing video:", err))
      } else {
        videoRef.current.pause()
      }
    }
  }, [isActive, isHovering])

  // Reset video when slide becomes inactive
  useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }, [isActive])

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl overflow-hidden h-[650px] flex flex-col"
      whileHover={{
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      <div className="h-[400px] overflow-hidden relative">
        <video
          ref={videoRef}
          src={project.video}
          className="w-full h-full object-cover"
          muted
          playsInline
          loop
          poster="/placeholder.svg?height=400&width=600"
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
            href={project.githubLink}
            className="py-2 px-4 rounded-lg text-white font-medium transition-transform hover:scale-105 w-full text-center"
            style={{ backgroundColor: colors.primary }}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Code
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default Projects
