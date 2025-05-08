"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useSeason } from "./SeasonContext"
import Carousel from "./Carousel"
import { Award, Calendar, ExternalLink } from "lucide-react"

const Certificates: React.FC = () => {
  const { colors } = useSeason()
  const sectionRef = useRef<HTMLElement>(null)

  // Ensure the section is properly registered for scroll detection
  useEffect(() => {
    const section = sectionRef.current
    if (section) {
      // Make sure the section has the correct ID
      section.id = "certificates"
    }
  }, [])

  const certificatesData = [
    {
      title: "Full Stack Web Development",
      issuer: "Udemy",
      date: "January 2023",
      image: "/placeholder.svg?height=300&width=600",
      description: "Comprehensive course covering modern full-stack web development with React, Node.js, and MongoDB.",
      link: "#",
    },
    {
      title: "React Native Masterclass",
      issuer: "Coursera",
      date: "March 2023",
      image: "/placeholder.svg?height=300&width=600",
      description: "Advanced course on building cross-platform mobile applications with React Native.",
      link: "#",
    },
    {
      title: "UI/UX Design Fundamentals",
      issuer: "Interaction Design Foundation",
      date: "May 2023",
      image: "/placeholder.svg?height=300&width=600",
      description: "Comprehensive course on user interface and user experience design principles and best practices.",
      link: "#",
    },
    {
      title: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "July 2023",
      image: "/placeholder.svg?height=300&width=600",
      description: "Professional certification for developing and maintaining applications on the AWS platform.",
      link: "#",
    },
    {
      title: "TypeScript Advanced Concepts",
      issuer: "Frontend Masters",
      date: "September 2023",
      image: "/placeholder.svg?height=300&width=600",
      description: "Deep dive into advanced TypeScript concepts, patterns, and best practices.",
      link: "#",
    },
  ]

  const certificateSlides = certificatesData.map((certificate, index) => (
    <motion.div
      key={index}
      className="bg-white rounded-2xl shadow-xl overflow-hidden h-[550px] flex flex-col"
      whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-[250px] overflow-hidden">
        <img
          src={certificate.image || "/placeholder.svg"}
          alt={certificate.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <Award size={24} style={{ color: colors.primary }} />
          <h3 className="text-3xl font-bold" style={{ color: colors.primary }}>
            {certificate.title}
          </h3>
        </div>
        <div className="flex items-center gap-2 mb-4 text-gray-600">
          <span className="text-xl font-medium">{certificate.issuer}</span>
          <span>•</span>
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            <span>{certificate.date}</span>
          </div>
        </div>
        <p className="text-xl text-gray-600 mb-6">{certificate.description}</p>
        <div className="mt-auto">
          <a
            href={certificate.link}
            className="flex items-center gap-2 py-2 px-4 rounded-lg text-white font-medium transition-transform hover:scale-105 w-fit"
            style={{ backgroundColor: colors.primary }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={18} />
            View Certificate
          </a>
        </div>
      </div>
    </motion.div>
  ))

  return (
    <section ref={sectionRef} id="certificates" className="min-h-screen py-20" data-section="certificates">
      <Carousel title="My Certificates" slides={certificateSlides} titleColor={colors.primary} />
    </section>
  )
}

export default Certificates
