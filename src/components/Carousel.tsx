"use client"

import React from "react"

import type { ReactNode, ReactElement } from "react"
import { useState, cloneElement } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Swiper as SwiperType } from "swiper"

interface CarouselProps {
  title: string
  slides: ReactNode[]
  titleColor?: string
}

// Define a type for the props we want to add to the slide
interface SlideProps {
  isActive?: boolean
}

const Carousel: React.FC<CarouselProps> = ({ title, slides, titleColor = "#333" }) => {
  // Calculate the initial slide to start from the middle
  const initialSlide = Math.floor(slides.length / 2)
  const [activeIndex, setActiveIndex] = useState(initialSlide)
  const [swiper, setSwiper] = useState<SwiperType | null>(null)

  // Update active slide index when swiper changes slides
  const handleSlideChange = (swiperInstance: SwiperType) => {
    setActiveIndex(swiperInstance.realIndex)
  }

  // Enhance slides with active state
  const enhancedSlides = slides.map((slide, index) => {
    // Check if the slide is a React element that we can clone
    if (React.isValidElement(slide)) {
      // Use type assertion to tell TypeScript that adding isActive prop is valid
      return cloneElement(slide as ReactElement<SlideProps>, {
        isActive: index === activeIndex,
        key: index,
      })
    }
    return slide
  })

  return (
    <motion.div
      className="w-full py-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold text-center mb-8" style={{ color: titleColor }}>
        {title}
      </h2>

      <div className="relative px-4 md:px-12">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={30}
          initialSlide={initialSlide}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1.5,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="mySwiper"
          onSwiper={setSwiper}
          onSlideChange={handleSlideChange}
        >
          {enhancedSlides.map((slide, index) => (
            <SwiperSlide key={index} className="max-w-4xl transition-all duration-300">
              {slide}
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-button-prev absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md">
          <ChevronLeft className="h-6 w-6" />
        </div>
        <div className="swiper-button-next absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md">
          <ChevronRight className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  )
}

export default Carousel
