"use client"

import type React from "react"
import { useSeason } from "./SeasonContext"
import { Github, Linkedin, Facebook, Heart } from "lucide-react"
import { motion } from "framer-motion"

const Footer: React.FC = () => {
  const { colors, currentSeason } = useSeason()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-8 border-t relative z-10">
      <div
        className="container mx-auto px-4"
        style={{
          borderTopColor: colors.primary + "30",
        }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Social Media Links */}
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <motion.a
              href="https://github.com/Calvinchi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              style={{ backgroundColor: colors.primary + "20" }}
              whileHover={{
                scale: 1.1,
                backgroundColor: colors.primary,
                color: "#fff",
              }}
              transition={{ duration: 0.3 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/jhediael-calvin-ramboyong-b4573932b/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              style={{ backgroundColor: colors.primary + "20" }}
              whileHover={{
                scale: 1.1,
                backgroundColor: colors.primary,
                color: "#fff",
              }}
              transition={{ duration: 0.3 }}
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="https://www.facebook.com/jhediaelcalvin.ramboyong"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              style={{ backgroundColor: colors.primary + "20" }}
              whileHover={{
                scale: 1.1,
                backgroundColor: colors.primary,
                color: "#fff",
              }}
              transition={{ duration: 0.3 }}
            >
              <Facebook size={20} />
            </motion.a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-gray-600">
            <a href="#skills" className="hover:text-gray-900 transition-colors">
              Skills
            </a>
            <a href="#projects" className="hover:text-gray-900 transition-colors">
              Projects
            </a>
            <a href="#certificates" className="hover:text-gray-900 transition-colors">
              Certificates
            </a>
            <a href="#contact" className="hover:text-gray-900 transition-colors">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="text-gray-600 text-sm mt-4 md:mt-0">
            <p className="flex items-center gap-1">
              © {currentYear} Jhediael Ramboyong. All rights reserved.
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Heart size={14} className="inline-block ml-1" style={{ color: colors.primary }} />
              </motion.span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
