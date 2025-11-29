"use client"

import { useRef, useState } from "react"
import LetterGlitch from "../components/LetterGlitch"
import dynamic from "next/dynamic"

const ASCIIText = dynamic(() => import("../components/ASCIIText"), { ssr: false })
import ProjectsSection from "../components/ProjectsSection"
import DesignSection from "../components/DesignSection"
import FaceTracker from "../components/FaceTracker"
import { ParticleCard, GlobalSpotlight, BentoCardGrid, BentoSlot, useMobileDetection } from "../components/MagicBento"
import "../components/MagicBento.css"

const GLOW_COLOR = "23, 86, 232" // Imperial Blue

export default function ResumePage() {
  const [currentView, setCurrentView] = useState<"home" | "projects" | "design">("home")
  const gridRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobileDetection()

  if (currentView !== "home") {
    return (
      <div className="min-h-screen bg-[#141210] text-white">
        <div className="flex h-screen">
          {/* Left side - LetterGlitch */}
          <div className="w-1/2 h-full relative">
            <LetterGlitch
              glitchSpeed={50}
              centerVignette={true}
              outerVignette={false}
              smooth={true}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          {/* Right side - Content */}
          <div className="w-1/2 h-full overflow-y-auto bg-[#141210]">
            {currentView === "projects" && <ProjectsSection />}
            {currentView === "design" && <DesignSection />}
          </div>
        </div>
        
        <button
          onClick={() => setCurrentView("home")}
          className="fixed bottom-6 left-6 z-30 flex items-center space-x-2 px-4 py-2 bg-black/80 text-white border border-white/20 rounded-none backdrop-blur-sm transition-all duration-300 hover:opacity-70"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>back</span>
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#141210] text-white p-4 md:p-6">
      <GlobalSpotlight
        gridRef={gridRef}
        disableAnimations={isMobile}
        enabled={true}
        spotlightRadius={350}
        glowColor={GLOW_COLOR}
      />

      <div className="max-w-6xl mx-auto relative">
        <BentoCardGrid gridRef={gridRef}>
          {/* Profile Image - using BentoSlot (no card border) */}
          <BentoSlot area="profile">
            <div className="bento-slot__image">
              <FaceTracker basePath="/faces/" />
            </div>
          </BentoSlot>

          {/* Name & Title */}
          <ParticleCard
            className="magic-bento-card magic-bento-card--border-glow"
            style={{ backgroundColor: '#1c1a17', '--glow-color': GLOW_COLOR, gridArea: 'name' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={6}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-2xl font-normal mb-1">SHUBHAM MAZUMDER</h2>
              <p className="text-sm opacity-70">product engineer</p>
            </div>
          </ParticleCard>

          {/* LinkedIn */}
          <ParticleCard
            className="magic-bento-card magic-bento-card--border-glow cursor-pointer bento-link-card"
            style={{ backgroundColor: '#1c1a17', '--glow-color': GLOW_COLOR, gridArea: 'linkedin' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={4}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >
            <a 
              href="https://www.linkedin.com/in/mazumders/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center text-lg hover:text-blue-400 transition-colors"
            >
              linkedin ↗
            </a>
          </ParticleCard>

          {/* Email */}
          <ParticleCard
            className="magic-bento-card magic-bento-card--border-glow cursor-pointer bento-link-card"
            style={{ backgroundColor: '#1c1a17', '--glow-color': GLOW_COLOR, gridArea: 'email' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={4}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >
            <a 
              href="mailto:shubham.mazumder@gmail.com" 
              className="flex-1 flex items-center justify-center text-lg hover:text-blue-400 transition-colors"
            >
              @email ↗
            </a>
          </ParticleCard>

          {/* GitHub */}
          <ParticleCard
            className="magic-bento-card magic-bento-card--border-glow cursor-pointer bento-link-card"
            style={{ backgroundColor: '#1c1a17', '--glow-color': GLOW_COLOR, gridArea: 'github' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={4}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >
            <a 
              href="https://github.com/cystema" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center text-lg hover:text-blue-400 transition-colors"
            >
              github ↗
            </a>
          </ParticleCard>

          {/* Projects */}
          <ParticleCard
            className="magic-bento-card cursor-pointer bento-nav-card"
            style={{ backgroundColor: '#1c1a17', '--glow-color': GLOW_COLOR, gridArea: 'projects' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={6}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >
            <button 
              onClick={() => setCurrentView("projects")}
              className="flex-1 flex items-center justify-center text-xl hover:text-blue-400 transition-colors w-full"
            >
              projects
            </button>
          </ParticleCard>

          {/* Currently (Left side - spans 2 rows) */}
          <ParticleCard
            className="magic-bento-card"
            style={{ backgroundColor: '#1c1a17', '--glow-color': GLOW_COLOR, gridArea: 'currently' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={6}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >

            <div className="magic-bento-card__content">
              <p className="text-sm leading-relaxed">
                currently building AI-powered CSRs at Sameday.
              </p>

            </div>
          </ParticleCard>

          {/* Tech Stack */}
          <ParticleCard
            className="magic-bento-card magic-bento-card--border-glow"
            style={{ backgroundColor: '#1c1a17', '--glow-color': GLOW_COLOR, gridArea: 'techstack' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={4}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-xs opacity-50 mb-2">tech stack</div>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="px-2 py-0.5 bg-white/5 rounded">React</span>
                <span className="px-2 py-0.5 bg-white/5 rounded">TypeScript</span>
                <span className="px-2 py-0.5 bg-white/5 rounded">Python</span>
                <span className="px-2 py-0.5 bg-white/5 rounded">Node</span>
                <span className="px-2 py-0.5 bg-white/5 rounded">AI/ML</span>
              </div>
            </div>
          </ParticleCard>

          {/* Location */}
          <ParticleCard
            className="magic-bento-card magic-bento-card--border-glow"
            style={{ backgroundColor: '#1c1a17', '--glow-color': GLOW_COLOR, gridArea: 'location' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={4}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <span className="text-2xl mb-1">📍</span>
              <span className="text-sm">Salt Lake City</span>
              <span className="text-xs opacity-50">MST</span>
            </div>
          </ParticleCard>

          {/* Design */}
          <ParticleCard
            className="magic-bento-card magic-bento-card--border-glow cursor-pointer bento-nav-card"
            style={{ backgroundColor: '#1c1a17', gridArea: 'design' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={6}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >
            <button 
              onClick={() => setCurrentView("design")}
              className="flex-1 flex items-center justify-center text-xl hover:text-blue-400 transition-colors w-full"
            >
              design
            </button>
          </ParticleCard>

          {/* LetterGlitch Background */}
          <ParticleCard
            className="magic-bento-card magic-bento-card--border-glow"
            style={{ backgroundColor: '#1c1a17', '--glow-color': GLOW_COLOR, padding: 0, gridArea: 'glitch' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={4}
            glowColor={GLOW_COLOR}
            enableTilt={false}
            clickEffect={false}
            enableMagnetism={false}
          >
            <div className="w-full h-full">
              <LetterGlitch
                glitchSpeed={50}
                centerVignette={true}
                outerVignette={false}
                smooth={true}
              />
            </div>
          </ParticleCard>

          {/* ASCII Text Effect */}
          <ParticleCard
            className="magic-bento-card magic-bento-card--border-glow"
            style={{ backgroundColor: '#1c1a17', '--glow-color': GLOW_COLOR, padding: 0, gridArea: 'ascii', minHeight: '150px' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={4}
            glowColor={GLOW_COLOR}
            enableTilt={false}
            clickEffect={false}
            enableMagnetism={false}
          >
            <div className="w-full h-full relative" style={{ minHeight: '150px' }}>
              <ASCIIText
                text="Hello!"
                enableWaves={true}
                asciiFontSize={8}
                textFontSize={150}
              />
            </div>
          </ParticleCard>
        </BentoCardGrid>
      </div>
    </div>
  )
}
