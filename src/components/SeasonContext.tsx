"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type Season = "spring" | "summer" | "fall" | "winter"

interface SeasonContextType {
  currentSeason: Season
  setCurrentSeason: (season: Season) => void
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
}

const seasonColors = {
  spring: {
    primary: "#88c9a1",
    secondary: "#f8bbd0",
    accent: "#c5e1a5",
    background: "bg-gradient-to-b from-[#e8f5e9] to-[#f3e5f5]",
    text: "#2e7d32",
  },
  summer: {
    primary: "#4caf50",
    secondary: "#ffeb3b",
    accent: "#2196f3",
    background: "bg-gradient-to-b from-[#e3f2fd] to-[#e8f5e9]",
    text: "#1b5e20",
  },
  fall: {
    primary: "#ff9800",
    secondary: "#f44336",
    accent: "#795548",
    background: "bg-gradient-to-b from-[#fff8e1] to-[#fff3e0]",
    text: "#e65100",
  },
  winter: {
    primary: "#90caf9",
    secondary: "#e1f5fe",
    accent: "#b0bec5",
    background: "bg-gradient-to-b from-[#e8eaf6] to-[#e1f5fe]",
    text: "#0d47a1",
  },
}

const SeasonContext = createContext<SeasonContextType | undefined>(undefined)

export const SeasonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSeason, setCurrentSeason] = useState<Season>("spring")
  const [colors, setColors] = useState(seasonColors.spring)

  useEffect(() => {
    setColors(seasonColors[currentSeason])

    // Apply background gradient to body
    document.body.className = seasonColors[currentSeason].background

    // Set CSS variable for season color to use in other components
    document.documentElement.style.setProperty("--season-color", seasonColors[currentSeason].primary)
    document.documentElement.style.setProperty("--season-secondary", seasonColors[currentSeason].secondary)
    document.documentElement.style.setProperty("--season-accent", seasonColors[currentSeason].accent)
    document.documentElement.style.setProperty("--season-text", seasonColors[currentSeason].text)
  }, [currentSeason])

  return <SeasonContext.Provider value={{ currentSeason, setCurrentSeason, colors }}>{children}</SeasonContext.Provider>
}

export const useSeason = () => {
  const context = useContext(SeasonContext)
  if (context === undefined) {
    throw new Error("useSeason must be used within a SeasonProvider")
  }
  return context
}
