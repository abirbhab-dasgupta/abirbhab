"use client"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { projects } from "@/data"
import { useIsMobile } from "@/lib/use-mobile"

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isMobile = useIsMobile()
  const [cardsPerView, setCardsPerView] = useState(3)

  useEffect(() => {
    const getCardsPerView = () => {
      if (window.innerWidth < 640) return 1
      if (window.innerWidth < 1024) return 2
      return 3
    }
    let tick: number | null = null
    const update = () => {
      if (tick != null) return
      tick = requestAnimationFrame(() => {
        setCardsPerView(getCardsPerView())
        tick = null
      })
    }
    update()
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("resize", update)
      if (tick != null) cancelAnimationFrame(tick)
    }
  }, [])

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + cardsPerView >= projects.length ? 0 : prev + 1))
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, projects.length - cardsPerView) : prev - 1))
  }

  const visibleProjects = projects.slice(currentIndex, currentIndex + cardsPerView)

  // Fill remaining slots if needed
  if (visibleProjects.length < cardsPerView && projects.length > cardsPerView) {
    const remaining = cardsPerView - visibleProjects.length
    visibleProjects.push(...projects.slice(0, remaining))
  }

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden pt-30"
    >
      {/* Background Decorative Elements — no infinite rotation on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-20 left-10 w-72 h-72 border border-orange-500/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-48 h-48 border border-orange-400/10 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </>
        )}
        <div className={`absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/5 to-transparent rounded-full ${isMobile ? "blur-2xl" : "blur-3xl"}`} />
        <div className={`absolute bottom-1/3 left-1/4 w-64 h-64 bg-gradient-to-l from-orange-400/5 to-transparent rounded-full ${isMobile ? "blur-xl" : "blur-2xl"}`} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mt-12 mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="inline-block relative">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white/60 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
                Projects
              </span>
            </motion.h2>
          </motion.div>
          <motion.p
            className="text-lg text-white/60 max-w-3xl mx-auto mt-8 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Explore my latest work and creative solutions.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
            From concept to code, every step matters.
            </span>
          </motion.p>
        </motion.div>

        {/* Projects Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-8">
            <motion.button
              onClick={prevProject}
              className={`group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-400/30 rounded-full text-white/80 hover:text-white hover:border-orange-400/50 transition-all duration-300 ${isMobile ? "" : "backdrop-blur-sm"}`}
              whileHover={isMobile ? undefined : { scale: 1.1 }}
              whileTap={isMobile ? undefined : { scale: 0.9 }}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-6 h-6 group-hover:text-orange-400 transition-colors duration-300" />
            </motion.button>

            {/* Project Counter */}
            <div className="flex items-center gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index >= currentIndex && index < currentIndex + cardsPerView ? "bg-orange-500" : "bg-orange-500/30"
                  }`}
                  aria-label={`Go to project set ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextProject}
              className={`group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-400/30 rounded-full text-white/80 hover:text-white hover:border-orange-400/50 transition-all duration-300 ${isMobile ? "" : "backdrop-blur-sm"}`}
              whileHover={isMobile ? undefined : { scale: 1.1 }}
              whileTap={isMobile ? undefined : { scale: 0.9 }}
              disabled={currentIndex + cardsPerView >= projects.length}
            >
              <ChevronRight className="w-6 h-6 group-hover:text-orange-400 transition-colors duration-300" />
            </motion.button>
          </div>

          {/* Projects Grid */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                initial={{ opacity: 0, x: isMobile ? 40 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isMobile ? -40 : -100 }}
                transition={{ duration: isMobile ? 0.35 : 0.5, ease: "easeInOut" }}
              >
                {visibleProjects.map((project, index) => (
                  <ProjectCard key={`${project.id}-${currentIndex}-${index}`} project={project} index={index} isMobile={isMobile} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.a
            href="https://github.com/abirbhab-dasgupta"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-400/30 rounded-xl text-white/80 hover:text-white hover:border-orange-400/50 transition-all duration-300 group ${isMobile ? "" : "backdrop-blur-sm"}`}
            whileHover={isMobile ? undefined : { scale: 1.05 }}
            whileTap={isMobile ? undefined : { scale: 0.95 }}
          >
            <Github className="w-5 h-5 group-hover:text-orange-400 transition-colors duration-300" />
            <span className="font-medium">View All Projects on GitHub</span>
            <ExternalLink className="w-4 h-4 group-hover:text-orange-400 transition-colors duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, isMobile }: { project: (typeof projects)[0]; index: number; isMobile: boolean }) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: isMobile ? 24 : 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: isMobile ? 0.4 : 0.6, delay: index * (isMobile ? 0.05 : 0.1) }}
      whileHover={isMobile ? undefined : { y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
    >
      {/* Card Container */}
      <div className={`relative bg-gradient-to-br from-orange-500/5 to-orange-600/10 border border-orange-400/20 rounded-2xl p-6 h-full overflow-hidden group-hover:border-orange-400/40 transition-all duration-500 ${isMobile ? "" : "backdrop-blur-sm"}`}>
        {/* Decorative Elements — smaller blur on mobile */}
        <div className={`absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full group-hover:bg-orange-500/20 transition-all duration-500 ${isMobile ? "blur-xl" : "blur-2xl"}`} />
        <div className={`absolute bottom-0 left-0 w-16 h-16 bg-orange-400/10 rounded-full group-hover:bg-orange-400/20 transition-all duration-500 ${isMobile ? "blur-lg" : "blur-xl"}`} />

        <div className="relative z-10 flex flex-col h-full">
          {/* Project Image */}
          <div className="relative mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-orange-500/10 to-orange-600/5">
            <Image
              src={project.img || "/placeholder.svg"}
              alt={project.title}
              width={400}
              height={240}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Project Content */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-white/80 mb-3 group-hover:text-white transition-colors duration-300 line-clamp-2">
              {project.title}
            </h3>

            <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">{project.des}</p>

            {/* Tech Stack */}
            <div className="flex items-center gap-3 mb-6">
              {project.iconLists.map((icon, iconIndex) => (
                <div
                  key={iconIndex}
                  className="w-8 h-8 p-1.5 bg-orange-500/10 rounded-lg border border-orange-400/20 group-hover:bg-orange-500/20 group-hover:border-orange-400/30 transition-all duration-300"
                >
                  <Image
                    src={icon || "/placeholder.svg"}
                    alt="Tech icon"
                    width={20}
                    height={20}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-medium rounded-lg transition-all duration-300 group/btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                Live Demo
              </motion.a>

              <motion.a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-400/30 hover:border-orange-400/50 text-white/80 hover:text-white text-sm font-medium rounded-lg transition-all duration-300 group/btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                Code
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
