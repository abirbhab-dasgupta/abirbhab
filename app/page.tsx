
import Footer from "@/components/Footer"
import { Navbar } from "@/components/navbar"
import AboutSection from "@/components/sections/About"
import ContactSection from "@/components/sections/Contact"
import  HeroSection  from "@/components/sections/Hero"
import ProjectSection from "@/components/sections/Projects"
import SkillsSection from "@/components/sections/Skills"

export default function Home() {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "	#0C0203" }} >
      <Navbar />

      <div className="pt-28">
        <HeroSection />
        <AboutSection />
        <ProjectSection/>
        <SkillsSection/>
        <ContactSection/>
      </div>
      <Footer/>
    </div>
  )
}
