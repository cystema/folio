"use client"

import FaultyTerminal from "../components/FaultyTerminal"
import NoisePattern from "../components/NoisePattern"
import ProjectsSection from "../components/ProjectsSection"
import DesignSection from "../components/DesignSection"
import FaceTracker from "../components/FaceTracker"
import { useState } from "react"

export default function ResumePage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentView, setCurrentView] = useState<"home" | "projects" | "design">("home")

  const handleProjectsClick = () => {
    setCurrentView("projects")
  }

  const handleDesignClick = () => {
    setCurrentView("design")
  }

  const handleBackClick = () => {
    setCurrentView("home")
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex">
      <div
        className={`w-1/2 p-8 font-mono relative z-10 transition-all duration-500 ease-in-out ${
          currentView !== "home" ? "fixed left-0 top-0 h-screen overflow-hidden" : ""
        } ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
      >
        {/* Theme toggle button in top right of left panel */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`absolute top-8 right-8 p-2 rounded-full transition-colors ${
            isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
          }`}
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            // Sun icon for light mode
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            // Moon icon for dark mode
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        <div
          className={`transition-opacity duration-300 ${currentView === "home" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          {/* Header with Face Tracker */}
          <div className="mb-12">
            <div className="flex items-center gap-6">
              <div>
                <h2 className="text-lg font-normal">SHUBHAM MAZUMDER</h2>
                <h3 className="text-lg font-normal opacity-70">Product Engineer</h3>
              </div>
              <div className="h-12 w-12 min-h-12 min-w-12 max-h-12 max-w-12 overflow-hidden flex-shrink-0 border border-current/20">
                <FaceTracker basePath="/faces/" />
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-12">
            <h3 className="text-sm font-normal mb-4 opacity-60">EXPERIENCE</h3>
            <div className="space-y-3">
              <div className="flex items-baseline border-b border-current/10 pb-2">
                <div className="flex-1 min-w-0">
                  <span className="block font-medium">Sameday AI (YC '23)</span>
                  <span className="block text-sm opacity-70">Product Engineer</span>
                </div>
                <span className="text-sm opacity-70 ml-4 flex-shrink-0">2025 → Present</span>
              </div>
              <div className="flex items-baseline border-b border-current/10 pb-2">
                <div className="flex-1 min-w-0">
                  <span className="block font-medium">BulkMagic</span>
                  <span className="block text-sm opacity-70">Intern</span>
                </div>
                <span className="text-sm opacity-70 ml-4 flex-shrink-0">2024 → 2024</span>
              </div>
              <div className="flex items-baseline border-b border-current/10 pb-2">
                <div className="flex-1 min-w-0">
                  <span className="block font-medium">University of Utah</span>
                  <span className="block text-sm opacity-70">Research Assistant</span>
                </div>
                <span className="text-sm opacity-70 ml-4 flex-shrink-0">2021 → 2024</span>
              </div>
              <div className="flex items-baseline border-b border-current/10 pb-2">
                <div className="flex-1 min-w-0">
                  <span className="block font-medium">Cognizant</span>
                  <span className="block text-sm opacity-70">Software Engineer</span>
                </div>
                <span className="text-sm opacity-70 ml-4 flex-shrink-0">2016 → 2019</span>
              </div>
            </div>
          </div>

          {/* Footer Links Section */}
          <div className="absolute bottom-8 left-8">
            <div className="flex space-x-4 text-lg font-mono">
              <a
                href="https://www.linkedin.com/in/mazumders/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                LinkedIn
              </a>
              <a href="mailto:shubham.mazumder@gmail.com" className="hover:opacity-70 transition-opacity">
                Email
              </a>
              <button onClick={handleProjectsClick} className="hover:opacity-70 transition-opacity">
                Projects
              </button>
              <button onClick={handleDesignClick} className="hover:opacity-70 transition-opacity">
                Design
              </button>
            </div>
          </div>
        </div>

        {currentView !== "home" && (
          <>
            <div className="absolute inset-0 z-0">
              <div style={{ width: "100%", height: "100%", position: "relative" }}>
                <FaultyTerminal
                  scale={1.5}
                  gridMul={[2, 1]}
                  digitSize={1.2}
                  timeScale={1}
                  pause={false}
                  scanlineIntensity={1}
                  glitchAmount={1}
                  flickerAmount={1}
                  noiseAmp={1}
                  chromaticAberration={0}
                  dither={0}
                  curvature={0}
                  tint="#00ff41"
                  mouseReact={true}
                  mouseStrength={0.5}
                  pageLoadAnimation={false}
                  brightness={1}
                />
              </div>
            </div>
            <div
              className={`absolute inset-0 z-10 transition-opacity duration-500 ${isDarkMode ? "bg-black/60" : "bg-white/60"}`}
            ></div>
          </>
        )}
      </div>

      <div
        className={`transition-all duration-500 ease-in-out ${
          currentView !== "home" ? "fixed right-0 top-0 w-1/2 h-screen overflow-hidden" : "w-1/2 h-screen"
        } relative`}
      >
        <div
          className={`transition-opacity duration-300 ${currentView === "home" ? "opacity-100" : "opacity-0 pointer-events-none absolute inset-0"}`}
        >
          <div className="h-full">
            <NoisePattern isDarkMode={isDarkMode} />
          </div>
        </div>

        <div
          className={`transition-opacity duration-300 ${currentView === "projects" ? "opacity-100" : "opacity-0 pointer-events-none"} ${
            currentView === "projects" ? "absolute inset-0 overflow-y-auto" : "absolute inset-0"
          }`}
        >
          <div className={`w-full min-h-full ${isDarkMode ? "bg-black" : "bg-white"}`}>
            <ProjectsSection />
          </div>
        </div>

        <div
          className={`transition-opacity duration-300 ${currentView === "design" ? "opacity-100" : "opacity-0 pointer-events-none"} ${
            currentView === "design" ? "absolute inset-0 overflow-y-auto" : "absolute inset-0"
          }`}
        >
          <div className={`w-full min-h-full ${isDarkMode ? "bg-black" : "bg-white"}`}>
            <DesignSection />
          </div>
        </div>
      </div>

      {(currentView === "projects" || currentView === "design") && (
        <button
          onClick={handleBackClick}
          className={`fixed bottom-8 left-8 z-30 flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-sm border transition-all duration-300 hover:opacity-70 animate-in fade-in slide-in-from-bottom-4 font-mono ${
            isDarkMode ? "bg-black/80 text-white border-white/20" : "bg-white/80 text-black border-black/20"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>
      )}
    </div>
  )
}
