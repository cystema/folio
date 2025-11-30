"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Navbar from "../components/Navbar"
import FaceTracker from "../components/FaceTracker"
import ProjectsSection from "../components/ProjectsSection"
import DesignSection from "../components/DesignSection"
import ToolsStackSection from "../components/ToolsStackSection"

export default function ResumePage() {
  const [currentView, setCurrentView] = useState<"home" | "projects" | "design" | "tools">("home")
  const [currentTime, setCurrentTime] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', {
        timeZone: 'America/Denver',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  if (currentView !== "home") {
    return (
      <div className="min-h-screen bg-black text-white">
        {currentView === "projects" && <ProjectsSection onNavigate={setCurrentView} />}
        {currentView === "design" && <DesignSection onNavigate={setCurrentView} />}
        {currentView === "tools" && <ToolsStackSection onNavigate={setCurrentView} />}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Fixed Header */}
      <Navbar currentPage="home" onNavigate={setCurrentView} />

      {/* Main Content */}
      <main className="pt-20">
        {/* Top Section - Two Column Layout */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Left Column - FaceTracker & Title */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-[128px] h-[128px] flex-shrink-0">
                  <FaceTracker basePath="/faces/" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Founding Product Engineer
                </h1>
              </div>
              <p className="text-lg text-gray-600">
                {currentTime} MST
              </p>
            </div>

            {/* Right Column - Description */}
            <div className="flex items-start">
              <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                Shubham Mazumder blends creativity with technical expertise to design and build digital products that are not only functional but also delightful to use. With a strong foundation in full-stack development and a sharp eye for design, he transforms ideas into products that scale seamlessly from concept to launch.
              </p>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="w-full mt-12">
          <div className="w-full h-[60vh] md:h-[70vh] relative overflow-hidden">
            <Image
              src="/pictures/showcase/IMG_2859.jpg"
              alt="Showcase"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
      </main>
    </div>
  )
}
