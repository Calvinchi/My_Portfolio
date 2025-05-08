"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { SeasonWheel } from './SeasonWheel';


// Define the types for the theme
export interface Theme {
  colors: {
    background: string
    text: string
    primary: string
    secondary: string
    accent: string
  }
  fonts: {
    primary: string
    secondary: string
  }
  breakpoints: {
    mobile: string
    tablet: string
    desktop: string
  }
}

// Define the context type
interface ThemeContextProps {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
  season: string
  setSeason: React.Dispatch<React.SetStateAction<string>>
}

// Create the theme context
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

// Define the theme provider
interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [season, setSeason] = useState<string>("spring")
  const [theme, setTheme] = useState<Theme>(getTheme(season))

  useEffect(() => {
    setTheme(getTheme(season))
  }, [season])

  // Function to determine the theme based on the season
  function getTheme(season: string): Theme {
    switch (season) {
      case "spring":
        return {
          colors: {
            background: "#f0f8ff",
            text: "#006400",
            primary: "#98fb98",
            secondary: "#e6ffee",
            accent: "#7fffd4",
          },
          fonts: {
            primary: "Arial, sans-serif",
            secondary: "Verdana, sans-serif",
          },
          breakpoints: {
            mobile: "576px",
            tablet: "768px",
            desktop: "992px",
          },
        }
      case "summer":
        return {
          colors: {
            background: "#fffacd",
            text: "#8b4513",
            primary: "#ffdab9",
            secondary: "#ffe4c4",
            accent: "#f0e68c",
          },
          fonts: {
            primary: "Helvetica, sans-serif",
            secondary: "Georgia, serif",
          },
          breakpoints: {
            mobile: "576px",
            tablet: "768px",
            desktop: "992px",
          },
        }
      case "autumn":
        return {
          colors: {
            background: "#fff5ee",
            text: "#a0522d",
            primary: "#f4a460",
            secondary: "#ffe4b5",
            accent: "#d2691e",
          },
          fonts: {
            primary: "Times New Roman, serif",
            secondary: "Courier New, monospace",
          },
          breakpoints: {
            mobile: "576px",
            tablet: "768px",
            desktop: "992px",
          },
        }
      case "winter":
        return {
          colors: {
            background: "#f8f8ff",
            text: "#4682b4",
            primary: "#b0c4de",
            secondary: "#e6e6fa",
            accent: "#afeeee",
          },
          fonts: {
            primary: "Garamond, serif",
            secondary: "Lucida Console, monospace",
          },
          breakpoints: {
            mobile: "576px",
            tablet: "768px",
            desktop: "992px",
          },
        }
      default:
        return {
          colors: {
            background: "#f0f8ff",
            text: "#006400",
            primary: "#98fb98",
            secondary: "#e6ffee",
            accent: "#7fffd4",
          },
          fonts: {
            primary: "Arial, sans-serif",
            secondary: "Verdana, sans-serif",
          },
          breakpoints: {
            mobile: "576px",
            tablet: "768px",
            desktop: "992px",
          },
        }
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, season, setSeason }}>
      {children}
      {/* Season wheel selector */}
      <div className="absolute bottom-4 right-4 z-20">
        <SeasonWheel />
      </div>
    </ThemeContext.Provider>
  )
}

// Define the hook to use the theme
const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

// Custom hook for media queries
const useBreakpoint = () => {
  const { theme } = useTheme()

  const isMobile = useMediaQuery({ maxWidth: theme.breakpoints.mobile })
  const isTablet = useMediaQuery({ minWidth: theme.breakpoints.mobile, maxWidth: theme.breakpoints.tablet })
  const isDesktop = useMediaQuery({ minWidth: theme.breakpoints.desktop })

  return { isMobile, isTablet, isDesktop }
}

export { ThemeProvider, useTheme, useBreakpoint }
