"use client"

import { motion, AnimatePresence } from "motion/react"
import { Home, Mail, Menu, X, CircleUserRound, FolderCodeIcon, Code2Icon } from "lucide-react"
import { useState, useEffect, useMemo } from "react"

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = useMemo(() => [
    { id: "home", icon: Home, label: "Home" },
    { id: "about", icon: CircleUserRound, label: "About" },
    { id: "projects", icon: FolderCodeIcon, label: "Projects" },
    { id: "skills", icon: Code2Icon, label: "Skills" },
    { id: "contact", icon: Mail, label: "Contact" },
  ], []);

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    // Close mobile menu after clicking
    setIsMobileMenuOpen(false)
  }

  // Detect which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id)
      const scrollPosition = window.scrollY + 100

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [navItems])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMobileMenuOpen && !target.closest(".mobile-menu") && !target.closest(".hamburger-btn")) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobileMenuOpen])

  return (
    <>
      {/* Desktop Navbar */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
        <motion.nav
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2,
          }}
          className="relative"
        >
          {/* Main navbar – dark glass with vibrant orange accent to match hero */}
          <div className="bg-[#0C0203]/90 backdrop-blur-xl rounded-2xl px-6 py-4 border border-orange-500/30 shadow-2xl shadow-orange-500/10">
            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.3 }}
                >
                  <motion.div
                    className={`relative p-3 rounded-xl transition-all duration-300 cursor-pointer ${activeSection === item.id
                      ? "bg-orange-500/90 text-white shadow-lg shadow-orange-500/25"
                      : "text-white hover:bg-orange-500/25"
                      }`}
                    onClick={() => scrollToSection(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Icon */}
                    <item.icon size={20} strokeWidth={2} />
                  </motion.div>

                  {/* Tooltip */}
                  <motion.div
                    className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 pointer-events-none"
                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                    animate={{
                      opacity: hoveredItem === item.id ? 1 : 0,
                      y: hoveredItem === item.id ? 0 : -10,
                      scale: hoveredItem === item.id ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-[#0C0203]/95 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-lg border border-orange-500/35 shadow-xl shadow-orange-500/5 whitespace-nowrap">
                      {item.label}
                      {/* Tooltip arrow */}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#0C0203] border-l border-t border-orange-500/35 rotate-45" />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Navbar */}
      <div className="fixed top-6 right-6 z-50 md:hidden">
        <motion.button
          className="hamburger-btn bg-[#0C0203]/90 backdrop-blur-xl rounded-2xl p-4 border border-orange-500/30 shadow-2xl shadow-orange-500/10 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div animate={{ rotate: isMobileMenuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </motion.button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu fixed top-20 right-6 bg-[#0C0203]/95 backdrop-blur-xl rounded-2xl border border-orange-500/30 shadow-2xl shadow-orange-500/10 overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.button
                      className={`w-full flex items-center space-x-3 px-6 py-4 text-left transition-all duration-300 ${activeSection === item.id ? "bg-orange-500/80 text-white" : "text-white hover:bg-orange-500/20"
                        }`}
                      onClick={() => scrollToSection(item.id)}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon size={20} strokeWidth={2} />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
