"use client"

import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { ArrowRight, ExternalLink } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import HeroBackground from "../ui/HeroBackground"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(true)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const hasHover = window.matchMedia("(hover: hover)").matches
    setIsTouch(!hasHover)
    const mq = window.matchMedia("(max-width: 768px)")
    setIsMobile(mq.matches)
    const onResize = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    mq.addEventListener("change", onResize)
    return () => mq.removeEventListener("change", onResize)
  }, [])

  useEffect(() => {
    if (isTouch) return
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        mouseX.set((x - rect.width / 2) / 10)
        mouseY.set((y - rect.height / 2) / 10)
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isTouch, mouseX, mouseY])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section id="home" className="relative z-10 min-h-screen flex items-start justify-center pt-48 overflow-hidden">
      <HeroBackground />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center mt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
            {isMobile ? (
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60"
              >
                Abirbhab Dasgupta
              </motion.span>
            ) : (
              ["Abirbhab", "Dasgupta"].map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 2 }}
                      className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))
            )}
          </h1>

          <p className="text-xl text-white/70 mb-6">
            Creative Developer building{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
              sleek digital experiences
            </span>
          </p>

          <p className="text-sm text-white/60 mb-8">
            Specializing in modern web technologies,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
              interactive design,{" "}
            </span>
            and{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
              seamless user experiences{" "}
            </span>
            that make a lasting impact.
          </p>

          <div className="inline-block group relative p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              {/* Primary CTA - Enhanced */}
              <motion.button
                className="group relative px-8 py-5 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-mono rounded-2xl transition-all duration-300 overflow-hidden shadow-2xl shadow-red-500/25"
                onClick={() => scrollToSection("projects")}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  x: useTransform(mouseXSpring, [-50, 50], [-3, 3]),
                  y: useTransform(mouseYSpring, [-50, 50], [-2, 2]),
                }}
              >
                {/* Button Background Effects — no infinite animation on mobile */}
                {!isMobile && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-rose-500/20 rounded-2xl blur-xl"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}

                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-2xl"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />

                <span className="relative z-10 flex items-center justify-center space-x-3 text-md">
                  <span>Explore My Work</span>
                  <motion.div
                    animate={isMobile ? { x: 0 } : { x: [0, 4, 0] }}
                    transition={isMobile ? {} : { duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </span>
              </motion.button>

              {/* Secondary CTA - Enhanced */}
              <motion.button
                className="group relative px-8 py-5 bg-gray-800/40 backdrop-blur-sm border-2 border-gray-600/50 hover:border-gray-500/70 text-gray-200 hover:text-white font-mono rounded-2xl transition-all duration-300 overflow-hidden"
                onClick={() => scrollToSection("contact")}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  x: useTransform(mouseXSpring, [-50, 50], [2, -2]),
                  y: useTransform(mouseYSpring, [-50, 50], [1, -1]),
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-700/20 to-gray-600/20 rounded-2xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <span className="relative z-10 flex items-center justify-center space-x-3 text-md">
                  <span>Let&apos;s Connect</span>
                  <motion.div className="group-hover:rotate-45 transition-transform duration-300">
                    <ExternalLink size={20} />
                  </motion.div>
                </span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
