"use client"

import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { ArrowRight, ExternalLink } from "lucide-react"
import { useEffect, useRef } from "react"

// Embedded background paths component with original shapes but positioned lower
function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none z-0 -translate-y-13">
      <svg className="w-full h-full text-white/70" viewBox="0 0 696 316" fill="none">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

// New floating shapes component
function FloatingShapes() {
  const shapes = [
    // Left side - only 2 shapes
    { type: "circle", size: 50, x: "8%", y: "25%", delay: 0, color: "from-orange-500/20 to-red-500/20" },
    { type: "hexagon", size: 40, x: "15%", y: "70%", delay: 3, color: "from-red-600/15 to-orange-400/15" },

    // Right side - majority of shapes
    { type: "circle", size: 60, x: "85%", y: "15%", delay: 1, color: "from-red-400/15 to-orange-600/15" },
    { type: "square", size: 45, x: "75%", y: "35%", delay: 2, color: "from-orange-400/15 to-red-600/15" },
    { type: "triangle", size: 50, x: "90%", y: "55%", delay: 1.5, color: "from-red-500/20 to-orange-500/20" },
    { type: "hexagon", size: 55, x: "70%", y: "75%", delay: 4, color: "from-orange-600/12 to-red-500/12" },
    { type: "circle", size: 35, x: "82%", y: "80%", delay: 2.5, color: "from-red-700/18 to-orange-400/18" },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 0.8, 1],
            scale: [0, 1, 1.1, 1],
            rotate: [0, 180, 360],
            y: [0, -20, 0, -10, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            delay: shape.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {shape.type === "circle" && (
            <div
              className={`w-full h-full rounded-full bg-gradient-to-br ${shape.color} backdrop-blur-sm border border-white/5`}
            />
          )}

          {shape.type === "square" && (
            <motion.div
              className={`w-full h-full bg-gradient-to-br ${shape.color} backdrop-blur-sm border border-white/5`}
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          )}

          {shape.type === "triangle" && (
            <div
              className={`w-full h-full bg-gradient-to-br ${shape.color} backdrop-blur-sm border border-white/5`}
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
            />
          )}

          {shape.type === "hexagon" && (
            <div
              className={`w-full h-full bg-gradient-to-br ${shape.color} backdrop-blur-sm border border-white/5`}
              style={{
                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  useEffect(() => {
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
  }, [mouseX, mouseY])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section id="home" className="relative z-10 min-h-screen flex items-start justify-center pt-48 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-950/10 via-transparent to-transparent "></div>

      {/* Original floating paths */}
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />

      {/* New floating shapes */}
      <FloatingShapes />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center mt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
            {["Abirbhab", "Dasgupta"].map((word, wordIndex) => (
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
            ))}
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
                {/* Button Background Effects */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-rose-500/20 rounded-2xl blur-xl"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />

                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-2xl"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />

                <span className="relative z-10 flex items-center justify-center space-x-3 text-md">
                  <span>Explore My Work</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
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
