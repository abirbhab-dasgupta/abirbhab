"use client"

import { motion } from "framer-motion"
import { skillsData } from "@/data"

export default function Component() {
  return (
    <section id="skills" className="relative min-h-screen w-full overflow-hidden bg-transparent pt-20">
       

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Centered heading with orange and white texture */}
        <div className="text-center mb-16">
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
                My{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
                  Skills
                </span>
              </motion.h2>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills grid */}
        <div className="max-w-6xl mx-auto">
          {/* First row - 6 items */}
          <div className="flex justify-center items-center gap-4 md:gap-8 mb-12 flex-wrap">
            {skillsData.slice(0, 6).map((skill, index) => (
              <div
                key={`row1-${index}`}
                className="group relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-orange-500/5 to-orange-600/10 backdrop-blur-sm border border-orange-400/20 hover:border-orange-400/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/25"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
                <div className="flex items-center justify-center h-full p-2">
                  <img
                    src={skill.image || "/placeholder.svg"}
                    alt={skill.name}
                    className="w-8 h-8 md:w-10 md:h-10 object-contain"
                  />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-orange-200 whitespace-nowrap bg-orange-900/50 px-2 py-1 rounded backdrop-blur-sm">
                    {skill.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Second row - 5 items */}
          <div className="flex justify-center items-center gap-4 md:gap-8 mb-12 flex-wrap">
            {skillsData.slice(6, 11).map((skill, index) => (
              <div
                key={`row2-${index}`}
                className="group relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-orange-500/5 to-orange-600/10 backdrop-blur-sm border border-orange-400/20 hover:border-orange-400/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/25"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
                <div className="flex items-center justify-center h-full p-2">
                  <img
                    src={skill.image || "/placeholder.svg"}
                    alt={skill.name}
                    className="w-8 h-8 md:w-10 md:h-10 object-contain"
                  />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-orange-200 whitespace-nowrap bg-orange-900/50 px-2 py-1 rounded backdrop-blur-sm">
                    {skill.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Third row - 4 items */}
          <div className="flex justify-center items-center gap-4 md:gap-8 mb-12 flex-wrap">
            {skillsData.slice(11, 15).map((skill, index) => (
              <div
                key={`row3-${index}`}
                className="group relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-orange-500/5 to-orange-600/10 backdrop-blur-sm border border-orange-400/20 hover:border-orange-400/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/25"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
                <div className="flex items-center justify-center h-full p-2">
                  <img
                    src={skill.image || "/placeholder.svg"}
                    alt={skill.name}
                    className="w-8 h-8 md:w-10 md:h-10 object-contain"
                  />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-orange-200 whitespace-nowrap bg-orange-900/50 px-2 py-1 rounded backdrop-blur-sm">
                    {skill.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Fourth row - 3 items */}
          <div className="flex justify-center items-center gap-4 md:gap-8 mb-12 flex-wrap">
            {skillsData.slice(15, 18).map((skill, index) => (
              <div
                key={`row4-${index}`}
                className="group relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-orange-500/5 to-orange-600/10 backdrop-blur-sm border border-orange-400/20 hover:border-orange-400/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/25"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
                <div className="flex items-center justify-center h-full p-2">
                  <img
                    src={skill.image || "/placeholder.svg"}
                    alt={skill.name}
                    className="w-8 h-8 md:w-10 md:h-10 object-contain"
                  />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-orange-200 whitespace-nowrap bg-orange-900/50 px-2 py-1 rounded backdrop-blur-sm">
                    {skill.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Fifth row - 2 items */}
          <div className="flex justify-center items-center gap-4 md:gap-8 mb-12">
            {skillsData.slice(18, 20).map((skill, index) => (
              <div
                key={`row5-${index}`}
                className="group relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-orange-500/5 to-orange-600/10 backdrop-blur-sm border border-orange-400/20 hover:border-orange-400/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/25"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
                <div className="flex items-center justify-center h-full p-2">
                  <img
                    src={skill.image || "/placeholder.svg"}
                    alt={skill.name}
                    className="w-8 h-8 md:w-10 md:h-10 object-contain"
                  />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-orange-200 whitespace-nowrap bg-orange-900/50 px-2 py-1 rounded backdrop-blur-sm">
                    {skill.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
