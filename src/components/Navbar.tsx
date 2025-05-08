"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Link } from "react-scroll"
import { motion, AnimatePresence } from "framer-motion"
import { useSeason } from "./SeasonContext"

interface Colors {
  primary: string
  secondary: string
}

interface NavLink {
  name: string
  to: string
}

interface NavbarProps {
  colors: Colors
}

const Navbar: React.FC<NavbarProps> = ({ colors }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { currentSeason } = useSeason()

  // Improved scroll spy function
  const handleScroll = useCallback(() => {
    if (window.scrollY > 20) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }

    // Get all sections
    const sections = ["home", "skills", "projects", "certificates", "contact"]

    // Calculate current scroll position with offset
    const scrollPosition = window.scrollY + 150 // Increased offset for better detection

    // Find the section that is currently in view
    let currentSection = sections[0]

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        // Get the position of the element relative to the viewport
        const rect = element.getBoundingClientRect()
        const offsetTop = window.scrollY + rect.top

        // If we've scrolled past the start of this section, update the current section
        if (scrollPosition >= offsetTop) {
          currentSection = section
        }
      }
    }

    // Update active section if it's changed
    if (currentSection !== activeSection) {
      setActiveSection(currentSection)
      console.log("Active section:", currentSection) // For debugging
    }
  }, [activeSection])

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Initial check to set the active section on load
    handleScroll()

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Force update active section when a link is clicked
  const handleSetActive = (to: string) => {
    setActiveSection(to)
  }

  const navLinks: NavLink[] = [
    { name: "Home", to: "home" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Certificates", to: "certificates" },
    { name: "Contact", to: "contact" },
  ]

  // Define seasonal gradient animations
  const getSeasonalGradient = () => {
    switch (currentSeason) {
      case "spring":
        return {
          background: `linear-gradient(90deg, ${colors.primary}20, ${colors.secondary}30, ${colors.primary}20)`,
          backgroundSize: "200% 100%",
          animation: "gradientFlow 8s ease infinite",
        }
      case "summer":
        return {
          background: `linear-gradient(90deg, ${colors.primary}20, #ffeb3b20, ${colors.primary}20)`,
          backgroundSize: "200% 100%",
          animation: "gradientFlow 10s ease infinite",
        }
      case "fall":
        return {
          background: `linear-gradient(90deg, ${colors.primary}20, #ff980020, ${colors.primary}20)`,
          backgroundSize: "200% 100%",
          animation: "gradientFlow 12s ease infinite",
        }
      case "winter":
        return {
          background: `linear-gradient(90deg, ${colors.primary}20, #e1f5fe30, ${colors.primary}20)`,
          backgroundSize: "200% 100%",
          animation: "gradientFlow 15s ease infinite",
        }
      default:
        return {}
    }
  }

  // Get seasonal hover effects for links
  const getLinkHoverEffect = (index: number) => {
    const baseDelay = 0.1

    switch (currentSeason) {
      case "spring":
        return {
          whileHover: {
            scale: 1.1,
            color: colors.primary,
            transition: { duration: 0.3, delay: index * baseDelay },
          },
        }
      case "summer":
        return {
          whileHover: {
            scale: 1.1,
            color: colors.primary,
            rotate: 5,
            transition: { duration: 0.3, delay: index * baseDelay },
          },
        }
      case "fall":
        return {
          whileHover: {
            scale: 1.1,
            color: colors.primary,
            y: -5,
            transition: { duration: 0.3, delay: index * baseDelay },
          },
        }
      case "winter":
        return {
          whileHover: {
            scale: 1.1,
            color: colors.primary,
            filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.7))",
            transition: { duration: 0.3, delay: index * baseDelay },
          },
        }
      default:
        return {
          whileHover: {
            scale: 1.1,
            color: colors.primary,
            transition: { duration: 0.3 },
          },
        }
    }
  }

  // Enhanced animations for active link indicator
  const getActiveLinkAnimation = () => {
    switch (currentSeason) {
      case "spring":
        return {
          initial: { width: 0, opacity: 0 },
          animate: { width: "100%", opacity: 1 },
          exit: { width: 0, opacity: 0 },
          transition: { duration: 0.3, ease: "easeInOut" },
          style: {
            backgroundColor: colors.primary,
            boxShadow: `0 0 10px ${colors.primary}80`,
          },
        }
      case "summer":
        return {
          initial: { width: 0, opacity: 0 },
          animate: { width: "100%", opacity: 1 },
          exit: { width: 0, opacity: 0 },
          transition: { duration: 0.3, ease: "easeInOut" },
          style: {
            backgroundColor: colors.primary,
            boxShadow: `0 0 15px ${colors.primary}90`,
          },
        }
      case "fall":
        return {
          initial: { width: 0, opacity: 0 },
          animate: { width: "100%", opacity: 1 },
          exit: { width: 0, opacity: 0 },
          transition: { duration: 0.3, ease: "easeInOut" },
          style: {
            backgroundColor: colors.primary,
            boxShadow: `0 0 12px ${colors.primary}85`,
          },
        }
      case "winter":
        return {
          initial: { width: 0, opacity: 0 },
          animate: { width: "100%", opacity: 1 },
          exit: { width: 0, opacity: 0 },
          transition: { duration: 0.3, ease: "easeInOut" },
          style: {
            backgroundColor: colors.primary,
            boxShadow: `0 0 8px ${colors.primary}70, 0 0 15px rgba(255, 255, 255, 0.5)`,
          },
        }
      default:
        return {
          initial: { width: 0, opacity: 0 },
          animate: { width: "100%", opacity: 1 },
          exit: { width: 0, opacity: 0 },
          transition: { duration: 0.3 },
          style: { backgroundColor: colors.primary },
        }
    }
  }

  const activeLinkAnimation = getActiveLinkAnimation()

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "py-4" : "py-6"}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        ...getSeasonalGradient(),
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="nav-gradient-animation"></div>
      </div>

      <div className="container mx-auto px-6 flex justify-center items-center relative z-10">
        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex space-x-16 justify-center">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              className="relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              {...getLinkHoverEffect(index)}
            >
              <Link
                to={link.to}
                spy={true}
                smooth={true}
                offset={-100}
                duration={400}
                onSetActive={() => handleSetActive(link.to)}
                className={`text-xl font-medium transition-all duration-300 cursor-pointer ${
                  activeSection === link.to ? "text-[color:var(--season-color)]" : "text-gray-700"
                }`}
                style={{ "--season-color": colors.primary } as React.CSSProperties}
              >
                {link.name}
              </Link>

              {/* Animated underline indicator */}
              <AnimatePresence>
                {activeSection === link.to && (
                  <motion.div className="absolute bottom-[-8px] left-0 h-[4px] rounded-full" {...activeLinkAnimation} />
                )}
              </AnimatePresence>

              {/* Animated dot indicator */}
              <AnimatePresence>
                {activeSection === link.to && (
                  <motion.div
                    className="absolute -right-4 top-1/2 transform -translate-y-1/2 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: colors.primary,
                      boxShadow: `0 0 10px ${colors.primary}`,
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button - Positioned to the right */}
        <div className="md:hidden flex w-full justify-end">
          <motion.button
            className="text-gray-700 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            whileHover={{
              scale: 1.1,
              color: colors.primary,
              transition: { duration: 0.3 },
            }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.svg
                  key="close"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 90 }}
                  exit={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="menu"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: -90 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden relative z-10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative"
                >
                  <Link
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={400}
                    onSetActive={() => handleSetActive(link.to)}
                    className={`text-lg text-center font-medium transition-all duration-300 py-3 cursor-pointer block ${
                      activeSection === link.to ? "text-[color:var(--season-color)]" : "text-gray-700"
                    }`}
                    style={{ "--season-color": colors.primary } as React.CSSProperties}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>

                  {/* Animated indicator for mobile */}
                  {activeSection === link.to && (
                    <motion.div
                      className="absolute left-0 w-1 h-full rounded-r-full"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      style={{ backgroundColor: colors.primary, transformOrigin: "top" }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
