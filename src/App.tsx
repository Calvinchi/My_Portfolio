"use client"

import type React from "react"
import { useRef } from "react"
import { Link } from "react-scroll"
import Navbar from "./components/Navbar"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Certificates from "./components/Certificates"
import Contact from "./components/Contact"
import { motion } from "framer-motion"
import { SeasonWheel } from "./components/SeasonWheel"
import SeasonalBackground from "./components/SeasonalBackground"
import { useSeason } from "./components/SeasonContext"

const App: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null)
  const { colors, currentSeason } = useSeason()

  // Define seasonal quotes
  const seasonalQuotes = {
    spring: "Bloom where you are planted.",
    summer: "Sunshine is the best medicine.",
    fall: "Every leaf speaks bliss to me, fluttering from the autumn tree.",
    winter: "Winter is not a season, it's a celebration.",
  }

  // Get current quote
  const currentQuote = seasonalQuotes[currentSeason as keyof typeof seasonalQuotes]

  // Generate particles that will circle around the profile picture
  const generateCirclingParticles = (count: number) => {
    return [...Array(count)].map((_, i) => {
      // Calculate the angle for even distribution around the circle
      const angle = (i / count) * 360
      // Different radius for each particle to create multiple orbits
      const radius = 140 + (i % 3) * 30
      // Different speeds for more dynamic movement
      const speed = 10 + (i % 5) * 5
      // Different sizes for visual interest
      const size = 6 + (i % 4) * 3

      let particleColor = ""

      // Assign colors based on season
      switch (currentSeason) {
        case "spring":
          particleColor = i % 3 === 0 ? "#88c9a1" : i % 3 === 1 ? "#f8bbd0" : "#c5e1a5"
          break
        case "summer":
          particleColor = i % 3 === 0 ? "#ffa726" : i % 3 === 1 ? "#ffeb3b" : "#ff9800"
          break
        case "fall":
          particleColor = i % 3 === 0 ? "#ff9800" : i % 3 === 1 ? "#f44336" : "#ffeb3b"
          break
        case "winter":
          particleColor = i % 3 === 0 ? "#b3e5fc" : i % 3 === 1 ? "#e1f5fe" : "#ffffff"
          break
        default:
          particleColor = colors.primary
      }

      return {
        id: i,
        angle,
        radius,
        speed,
        size,
        color: particleColor,
      }
    })
  }

  const circlingParticles = generateCirclingParticles(15)

  return (
    <div className="min-h-screen transition-colors duration-1000">
      {/* Add the seasonal background with particles */}
      <SeasonalBackground />

      {/* Fixed position for the season wheel - moved to bottom right */}
      <div className="fixed bottom-8 right-8 z-50">
        <SeasonWheel />
      </div>

      <Navbar colors={colors} />

      <div className="relative z-10" ref={mainRef}>
        {/* Hero Section */}
        <section id="home" className="h-screen flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div
                className="md:w-1/2 mb-8 md:mb-0 text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-6xl md:text-7xl font-bold text-[#0a192f] mb-6">
                  Welcome, My name is <span style={{ color: colors.primary }}>Jhediael Calvin.</span>
                </h1>
                <p className="text-2xl md:text-3xl text-gray-600 mb-6 leading-relaxed">
                  A passionate and proactive Computer Science student committed to continuous learning and growth in
                  both technical and interpersonal domains.
                </p>

                {/* Add seasonal quote */}
                <p className="text-xl md:text-2xl italic mb-10" style={{ color: colors.primary }}>
                  "{currentQuote}"
                </p>

                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  duration={400}
                  className="font-medium text-xl py-4 px-8 rounded-full inline-block transition-all cursor-pointer"
                  style={{ backgroundColor: colors.primary, color: "white" }}
                >
                  Get in touch
                </Link>
              </motion.div>

              <motion.div
                className="md:w-1/2 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Profile Picture with animations */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: "min(100%, 500px)", height: "min(100vw, 500px)" }}
                >
                  {/* Animated border/glow effect based on season */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                      filter: "blur(20px)",
                      opacity: 0.5,
                      zIndex: -1,
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />

                  {/* Rotating circles around the profile pic */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: `3px solid ${colors.primary}`,
                      zIndex: -1,
                    }}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />

                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: `3px dashed ${colors.secondary}`,
                      zIndex: -1,
                    }}
                    animate={{
                      rotate: -360,
                    }}
                    transition={{
                      duration: 30,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />

                  {/* Circling particles around the profile picture */}
                  {circlingParticles.map((particle) => (
                    <motion.div
                      key={particle.id}
                      className="absolute rounded-full"
                      style={{
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                        top: "50%",
                        left: "50%",
                        marginTop: -particle.size / 2,
                        marginLeft: -particle.size / 2,
                        zIndex: 2,
                      }}
                      animate={{
                        x: [
                          Math.cos((particle.angle * Math.PI) / 180) * particle.radius,
                          Math.cos(((particle.angle + 120) * Math.PI) / 180) * particle.radius,
                          Math.cos(((particle.angle + 240) * Math.PI) / 180) * particle.radius,
                          Math.cos(((particle.angle + 360) * Math.PI) / 180) * particle.radius,
                        ],
                        y: [
                          Math.sin((particle.angle * Math.PI) / 180) * particle.radius,
                          Math.sin(((particle.angle + 120) * Math.PI) / 180) * particle.radius,
                          Math.sin(((particle.angle + 240) * Math.PI) / 180) * particle.radius,
                          Math.sin(((particle.angle + 360) * Math.PI) / 180) * particle.radius,
                        ],
                        scale: [1, 1.2, 0.8, 1],
                        opacity: [0.8, 1, 0.8, 0.8],
                      }}
                      transition={{
                        duration: particle.speed,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                  ))}

                  {/* Profile image */}
                  <motion.div
                    className="w-full h-full rounded-full overflow-hidden border-4 relative z-1"
                    style={{ borderColor: colors.primary }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 0 30px ${colors.primary}80`,
                    }}
                  >
                    <img src="/ProfilePic.jpg" alt="Jhediael Calvin" className="w-full h-full object-cover" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Other Sections with seasonal styling */}
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </div>
    </div>
  )
}

export default App
