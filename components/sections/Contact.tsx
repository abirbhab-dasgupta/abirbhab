"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Send, CheckCircle, AlertCircle } from "lucide-react"
import { useIsMobile } from "@/lib/use-mobile"

interface FormData {
  fullName: string
  email: string
  message: string
}

interface FormErrors {
  fullName?: string
  email?: string
  message?: string
}

interface SubmissionState {
  status: "idle" | "loading" | "success" | "error"
  message: string
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submission, setSubmission] = useState<SubmissionState>({
    status: "idle",
    message: "",
  })

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setSubmission({ status: "loading", message: "" })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmission({
          status: "success",
          message: "Thank you! Your message has been sent successfully. You'll receive a confirmation email shortly.",
        })
        setFormData({ fullName: "", email: "", message: "" })
      } else {
        setSubmission({
          status: "error",
          message: result.error || "Sorry, there was an error sending your message. Please try again.",
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmission({
        status: "error",
        message: "Sorry, there was an error sending your message. Please try again.",
      })
    }
  }

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/abirbhab-dasgupta",
      label: "GitHub",
      username: "@abirbhab-dasgupta",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/abirbhab",
      label: "LinkedIn",
      username: "/in/abirbhab",
    },
    {
      icon: Mail,
      href: "mailto:abirbhab00dasgupta@gmail.com",
      label: "Email",
      username: "abirbhab00dasgupta@gmail.com",
    },
  ]
  const isMobile = useIsMobile()
  return (
    <section id="contact" className="relative min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      {/* Background Decorative Elements — no infinite rotation on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        {!isMobile && (
          <>
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
          </>
        )}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-500/5 to-transparent rounded-full ${isMobile ? "blur-2xl" : "blur-3xl"}`} />
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
              Let&apos;s{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 ">Connect</span>
            </motion.h2>
          </motion.div>
          <motion.p
            className="text-lg text-white/60 max-w-3xl mx-auto mt-8 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to bring your ideas to life? I&apos;m always open to discuss new projects, collaborations, or just say hello.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 ">Let&apos;s connect.</span>
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Form - Takes up 7 columns */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative flex flex-col gap-6">
              {/* Form Container with Unique Shape */}
              <div className={`relative bg-gradient-to-br from-orange-500/5 to-orange-600/10 border border-orange-400/20 rounded-2xl p-5 lg:p-6 max-w-xl mx-auto ${isMobile ? "" : "backdrop-blur-sm"}`}>
                <div className={`absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full ${isMobile ? "blur-xl" : "blur-2xl"}`} />
                <div className={`absolute bottom-0 left-0 w-16 h-16 bg-orange-400/10 rounded-full ${isMobile ? "blur-lg" : "blur-xl"}`} />

                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-white/60 mb-8">Send a Message</h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-white/60 mb-3">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-4 bg-transparent border-2 rounded-xl text-white/80 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${
                            errors.fullName ? "border-orange-500" : "border-orange-400/30 hover:border-orange-400/50"
                          }`}
                          placeholder="Your Name"
                        />
                        {errors.fullName && (
                          <motion.p
                            className="mt-2 text-sm text-orange-400 flex items-center gap-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.fullName}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-3">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-4 bg-transparent border-2 rounded-xl text-white/80 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${
                            errors.email ? "border-orange-500" : "border-orange-400/30 hover:border-orange-400/50"
                          }`}
                          placeholder="youremail@example.com"
                        />
                        {errors.email && (
                          <motion.p
                            className="mt-2 text-sm text-orange-400 flex items-center gap-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white/60 mb-3">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 bg-transparent border-2 rounded-xl text-white/80 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none ${
                          errors.message ? "border-orange-500" : "border-orange-400/30 hover:border-orange-400/50"
                        }`}
                        placeholder="Tell me about your project, ideas, or just say hello..."
                      />
                      {errors.message && (
                        <motion.p
                          className="mt-2 text-sm text-orange-400 flex items-center gap-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={submission.status === "loading"}
                      className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                      whileHover={isMobile ? undefined : { scale: submission.status === "loading" ? 1 : 1.02 }}
                      whileTap={isMobile ? undefined : { scale: 0.98 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-center justify-center gap-2">
                        {submission.status === "loading" ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </div>
                    </motion.button>

                    {/* Status Message */}
                    {submission.status !== "idle" && submission.status !== "loading" && (
                      <motion.div
                        className={`p-4 rounded-xl flex items-center gap-3 ${
                          submission.status === "success"
                            ? "bg-green-500/10 border border-green-400/30 text-green-300"
                            : "bg-orange-600/10 border border-orange-500/30 text-orange-400"
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {submission.status === "success" ? (
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                        )}
                        {submission.message}
                      </motion.div>
                    )}
                  </form>
                </div>
              </div>

              
            </div>
          </motion.div>

          {/* Sidebar - Takes up 5 columns */}
          <motion.div
            className="lg:col-span-5 flex flex-col space-y-8 w-full max-w-full lg:max-w-none"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Social Links Card */}
            <div className={`relative bg-gradient-to-br from-orange-500/5 to-orange-600/10 border border-orange-400/20 rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-md mx-auto lg:mx-0 ${isMobile ? "" : "backdrop-blur-sm"}`}>
              <div className={`absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full ${isMobile ? "blur-lg" : "blur-xl"}`} />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white/60 mb-6">Connect With Me</h3>
                <div className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target={social.href.startsWith("mailto:") ? "_self" : "_blank"}
                      rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      className="group flex items-center gap-4 p-4 border border-orange-400/20 rounded-xl hover:border-orange-400/40 hover:bg-orange-500/5 transition-all duration-300"
                      whileHover={isMobile ? undefined : { x: 5 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * (isMobile ? 0.05 : 0.1) }}
                      viewport={{ once: true }}
                    >
                      <div className="p-3 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors duration-300">
                        <social.icon className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-white/60 group-hover:text-white/80 transition-colors duration-300">
                          {social.label}
                        </div>
                        <div className="text-sm text-white/40">{social.username}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote Card */}
            <motion.div
                className={`relative bg-gradient-to-br from-orange-500/5 to-orange-600/10 border border-orange-400/20 rounded-xl p-4 sm:p-5 w-full max-w-md mx-auto lg:mx-0 ${isMobile ? "" : "backdrop-blur-sm"}`}
                whileHover={isMobile ? undefined : { scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute top-0 left-0 w-8 h-8 bg-orange-500/20 rounded-full blur-lg" />
                <div className="relative z-10">
                  <div className="text-4xl text-orange-400 mb-4">&quot;</div>
                  <p className="text-white/60 italic mb-4 leading-relaxed">
                    Great things are built by great teams. Let&apos;s create something amazing together.
                  </p>
                  <div className="text-sm text-orange-300 font-medium">— Ready to collaborate</div>
                </div>
              </motion.div>


          </motion.div>
        </div>
      </div>
    </section>
  )
}