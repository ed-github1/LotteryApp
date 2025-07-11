import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'

import register1 from '../../assets/covers/Register1.jpg'
import register2 from '../../assets/covers/Register2.jpg'
import register3 from '../../assets/covers/Register3.jpg'

const images = [register1, register2, register3]

const Slider = () => {
  const [index, setIndex] = useState(0)

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length)
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length)

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 15000)
    return () => clearInterval(timer)
  }, [index])

  return (
    <div className="relative w-full h-full overflow-hidden ">
      <AnimatePresence initial={false}>
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`slide-${index}`}
          className="w-full h-full object-cover block"
          initial={{ opacity: 0, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </AnimatePresence>
      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/70 transition"
        aria-label="Previous"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/70 transition"
        aria-label="Next"
      >
        <FaChevronRight />
      </button>
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? 'bg-[#FFD700]' : 'bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider
