// Replace the entire component with a simpler version that cycles through seasons
"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useSeason, type Season } from "./SeasonContext"

export const SeasonWheel: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { currentSeason, setCurrentSeason } = useSeason()

  const seasons: { name: Season; emoji: string; color: string; label: string }[] = [
    { name: "spring", emoji: "🌱", color: "#88c9a1", label: "Spring" },
    { name: "summer", emoji: "☀️", color: "#4caf50", label: "Summer" },
    { name: "fall", emoji: "🍂", color: "#ff9800", label: "Fall" },
    { name: "winter", emoji: "❄️", color: "#90caf9", label: "Winter" },
  ]

  const cycleToNextSeason = () => {
    const currentIndex = seasons.findIndex((s) => s.name === currentSeason)
    const nextIndex = (currentIndex + 1) % seasons.length
    setCurrentSeason(seasons[nextIndex].name)
  }

  const currentSeasonData = seasons.find((s) => s.name === currentSeason) || seasons[0]

  return (
    <div className={`relative ${className}`}>
      <motion.button
        className="w-32 h-32 rounded-full bg-white shadow-xl flex flex-col items-center justify-center cursor-pointer border-4"
        style={{ borderColor: currentSeasonData.color }}
        onClick={cycleToNextSeason}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-5xl mb-2">{currentSeasonData.emoji}</span>
        <span className="text-lg font-medium">{currentSeasonData.label}</span>
      </motion.button>
    </div>
  )
}
