"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 border border-orange-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-48 h-48 border border-orange-400/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-500/5 to-transparent rounded-full blur-3xl" />
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
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
                Me
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
            Passionate full-stack developer crafting digital experiences with modern technologies.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
              Let me share my journey with you.
            </span>
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-gradient-to-br from-orange-500/5 to-orange-600/10 backdrop-blur-sm border border-orange-400/20 rounded-2xl p-6 lg:p-8">
                <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full blur-xl" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/20 backdrop-blur-sm mb-4">
                    <span className="text-sm font-medium text-white/80">About Me</span>
                  </div>
                  <h3 className="text-2xl font-light mb-6 text-white/60">Who I Am</h3>
                  <div className="space-y-4">
                    <p className="text-white/70">
                      I&apos;m a passionate full-stack developer with over 2 years of experience creating modern web
                      applications. Based in Kolkata, I combine technical expertise with creative problem-solving to
                      build digital solutions that make an impact.
                    </p>
                    <p className="text-white/70">
                      My journey in web development began during school, where I discovered my love for coding. Since
                      then, I&apos;ve worked with startups and agencies, helping them achieve their digital goals through
                      thoughtful and efficient development.
                    </p>
                    <p className="text-white/70">
                      When I&apos;m not coding, you can find me hiking in the mountains, experimenting with new cooking
                      recipes, or contributing to open-source projects.
                    </p>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-0.5 rounded-xl bg-gradient-to-br from-orange-500/30 to-transparent">
                      <div className="bg-[#0a0a1a]/80 backdrop-blur-sm p-4 rounded-xl h-full">
                        <div className="text-3xl font-light text-orange-400 mb-2">2+</div>
                        <div className="text-white/80 text-sm">Years of Experience</div>
                      </div>
                    </div>
                    <div className="p-0.5 rounded-xl bg-gradient-to-br from-orange-600/30 to-transparent">
                      <div className="bg-[#0a0a1a]/80 backdrop-blur-sm p-4 rounded-xl h-full">
                        <div className="text-3xl font-light text-orange-500 mb-2">30+</div>
                        <div className="text-white/80 text-sm">Projects Completed</div>
                      </div>
                    </div>
                    <div className="p-0.5 rounded-xl bg-gradient-to-br from-orange-400/30 to-transparent">
                      <div className="bg-[#0a0a1a]/80 backdrop-blur-sm p-4 rounded-xl h-full">
                        <div className="text-3xl font-light text-orange-300 mb-2">10+</div>
                        <div className="text-white/80 text-sm">Happy Clients</div>
                      </div>
                    </div>
                    <div className="p-0.5 rounded-xl bg-gradient-to-br from-orange-500/30 to-transparent">
                      <div className="bg-[#0a0a1a]/80 backdrop-blur-sm p-4 rounded-xl h-full">
                        <div className="text-3xl font-light text-orange-400 mb-2">5+</div>
                        <div className="text-white/80 text-sm">Open Source Contributions</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-gradient-to-br from-orange-500/5 to-orange-600/10 backdrop-blur-sm border border-orange-400/20 rounded-2xl p-6 lg:p-8">
                <div className="absolute top-0 left-0 w-20 h-20 bg-orange-500/10 rounded-full blur-xl" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/20 backdrop-blur-sm mb-4">
                    <span className="text-sm font-medium text-white/80">Education & Training</span>
                  </div>
                  <h3 className="text-2xl font-light mb-6 text-white/60">My Background</h3>

                  <div className="space-y-6">
                    <div className="p-0.5 rounded-xl bg-gradient-to-br from-orange-500/30 via-orange-500/10 to-transparent">
                      <div className="bg-[#0a0a1a]/80 backdrop-blur-sm p-6 rounded-xl">
                        <div className="flex items-start gap-4">
                          <div className="relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-white/5 to-white/10">
                            <img
                              src="https://abped-college-dashboard.s3.us-east-2.amazonaws.com/tted/college-backend/college/d7dfe448-aba2-4dac-9878-1d7a70181ae0.png"
                              alt="Adamas University"
                              className="object-cover p-2 w-full h-full"
                            />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-white">
                              Bachelor of Technology in Computer Science and Engineering, Barasat
                            </h4>
                            <p className="text-white/60">Adamas University</p>
                            <p className="text-white/50 text-sm mt-1">2024 - 2028</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge variant="outline" className="bg-white/5 text-white/70 border-orange-500/30">
                                Data Structures
                              </Badge>
                              <Badge variant="outline" className="bg-white/5 text-white/70 border-orange-500/30">
                                Algorithms
                              </Badge>
                              <Badge variant="outline" className="bg-white/5 text-white/70 border-orange-500/30">
                                Networking
                              </Badge>
                              <Badge variant="outline" className="bg-white/5 text-white/70 border-orange-500/30">
                                Operating Systems
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-0.5 rounded-xl bg-gradient-to-br from-orange-600/30 via-orange-600/10 to-transparent">
                      <div className="bg-[#0a0a1a]/80 backdrop-blur-sm p-6 rounded-xl">
                        <div className="flex items-start gap-4">
                          <div className="relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-white/5 to-white/10">
                            <img
                              src="https://imgs.search.brave.com/L0qvvolyKO8siG5g82Xg17X2h6Fh3yga9JZGQU8Mgcw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/Z2VyLmdvb2dsZXVz/ZXJjb250ZW50LmNv/bS9pbWcvYi9SMjl2/WjJ4bC9BVnZYc0Vp/SE1Nb29kdk42UVFE/VUQ1R0t2MTdfQ3hT/djdIdDlZOHMydFlR/WUZ5czg4TnJSVzNL/R3ltdDVPUm01cUh0/LU1aSVpZZjM3eVlW/LTg2VFFkdEc5MzNE/aGJqbWhETUZEUWx5/dGZXcWVjUlhFN182/dXVWYUhBV1BpeDJX/cnc0Z0UwM3NkVG1S/OXVTNnhZUS9zMTYw/MC9rdnMtbG9nby1j/b2xvdXIuanBn"
                              alt="Kendriya Vidyalaya"
                              className="object-cover p-2 w-full h-full"
                            />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-white">
                              PM Shri Kendriya Vidyalaya Birbhum, Birbhum{" "}
                            </h4>
                            <p className="text-white/60">Higher Secondary Education</p>
                            <p className="text-white/50 text-sm mt-1">2024</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge variant="outline" className="bg-white/5 text-white/70 border-orange-500/30">
                                CBSE Syllabus Subjects
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-0.5 rounded-xl bg-gradient-to-br from-orange-400/30 via-orange-400/10 to-transparent">
                      <div className="bg-[#0a0a1a]/80 backdrop-blur-sm p-6 rounded-xl">
                        <div className="flex items-start gap-4">
                          <div className="relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-white/5 to-white/10">
                            <img
                              src="https://as2.ftcdn.net/v2/jpg/14/11/91/85/1000_F_1411918531_xtAaS4QYKiqaJxQHO4KAvRaP5JCpOjGD.jpg"
                              alt="Continuous Learning"
                              className="object-cover p-2 w-full h-full"
                            />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-white">Continuous Learning</h4>
                            <p className="text-white/60">Online Courses & Workshops</p>
                            <p className="text-white/50 text-sm mt-1">2024 - Present</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge variant="outline" className="bg-white/5 text-white/70 border-orange-500/30">
                                AI/ML Basics
                              </Badge>
                              <Badge variant="outline" className="bg-white/5 text-white/70 border-orange-500/30">
                                Cloud Computing
                              </Badge>
                              <Badge variant="outline" className="bg-white/5 text-white/70 border-orange-500/30">
                                UI/UX Design
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
