"use client"

import { useRef, useState } from "react"
import LetterGlitch from "../components/LetterGlitch"
import ProjectsSection from "../components/ProjectsSection"
import DesignSection from "../components/DesignSection"
import FaceTracker from "../components/FaceTracker"
import { ParticleCard, GlobalSpotlight, BentoCardGrid, useMobileDetection } from "../components/MagicBento"
import "../components/MagicBento.css"

const GLOW_COLOR = "132, 0, 255"

export default function ResumePage() {
  const [currentView, setCurrentView] = useState<"home" | "projects" | "design">("home")
  const gridRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobileDetection()

  if (currentView !== "home") {
    return (
      <div className="min-h-screen bg-[#060010] text-white">
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
          <div className="w-1/2 h-full overflow-y-auto bg-[#060010]">
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
    <div className="min-h-screen bg-[#060010] text-white p-4 md:p-6">
      <GlobalSpotlight
        gridRef={gridRef}
        disableAnimations={isMobile}
        enabled={true}
        spotlightRadius={350}
        glowColor={GLOW_COLOR}
      />

      <div className="max-w-6xl mx-auto">
        <BentoCardGrid gridRef={gridRef}>
          {/* Card 1: Face Tracker */}
          <ParticleCard
            className="magic-bento-card magic-bento-card--border-glow"
            style={{ backgroundColor: '#060010', '--glow-color': GLOW_COLOR } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={8}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={false}
          >
            <div className="flex-1 flex items-center justify-center">
              <div className="w-32 h-32 overflow-hidden">
                <FaceTracker basePath="/faces/" />
              </div>
            </div>
          </ParticleCard>

          {/* Card 2: Name & Title */}
          <ParticleCard
            className="magic-bento-card magic-bento-card--border-glow"
            style={{ backgroundColor: '#060010', '--glow-color': GLOW_COLOR } as React.CSSProperties}
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

          {/* Card 3: Experience (Large) */}
          <ParticleCard
            className="magic-bento-card magic-bento-card--border-glow"
            style={{ backgroundColor: '#060010', '--glow-color': GLOW_COLOR } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={12}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={false}
          >
            <div className="magic-bento-card__header">
              <div className="magic-bento-card__label">experience</div>
            </div>
            <div className="magic-bento-card__content space-y-3 text-sm">
              <div className="flex justify-between items-baseline border-b border-white/10 pb-2">
                <div>
                  <span className="block">Sameday AI (YC '23)</span>
                  <span className="text-xs opacity-50">product engineer</span>
                </div>
                <span className="text-xs opacity-50">2025 →</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-white/10 pb-2">
                <div>
                  <span className="block">BulkMagic</span>
                  <span className="text-xs opacity-50">intern</span>
                </div>
                <span className="text-xs opacity-50">2024</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-white/10 pb-2">
                <div>
                  <span className="block">University of Utah</span>
                  <span className="text-xs opacity-50">research assistant</span>
                </div>
                <span className="text-xs opacity-50">2021-24</span>
              </div>
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="block">Cognizant</span>
                  <span className="text-xs opacity-50">software engineer</span>
                </div>
                <span className="text-xs opacity-50">2016-19</span>
              </div>
            </div>
          </ParticleCard>

          {/* Card 4: LinkedIn */}
          <ParticleCard
            className="magic-bento-card magic-bento-card--border-glow cursor-pointer"
            style={{ backgroundColor: '#060010', '--glow-color': GLOW_COLOR } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={6}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >
            <a 
              href="https://www.linkedin.com/in/mazumders/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center text-xl hover:text-purple-400 transition-colors"
            >
              linkedin ↗
            </a>
          </ParticleCard>

          {/* Card 5: Email */}
          <ParticleCard
            className="magic-bento-card magic-bento-card--border-glow cursor-pointer"
            style={{ backgroundColor: '#060010', '--glow-color': GLOW_COLOR } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={6}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >
            <a 
              href="mailto:shubham.mazumder@gmail.com" 
              className="flex-1 flex items-center justify-center text-xl hover:text-purple-400 transition-colors"
            >
              email ↗
            </a>
          </ParticleCard>

          {/* Card 6: Projects */}
          <ParticleCard
            className="magic-bento-card magic-bento-card--border-glow cursor-pointer"
            style={{ backgroundColor: '#060010', '--glow-color': GLOW_COLOR } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={6}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >
            <button 
              onClick={() => setCurrentView("projects")}
              className="flex-1 flex items-center justify-center text-xl hover:text-purple-400 transition-colors w-full"
            >
              projects →
            </button>
          </ParticleCard>

          {/* Card 7: Design */}
          <ParticleCard
            className="magic-bento-card magic-bento-card--border-glow cursor-pointer"
            style={{ backgroundColor: '#060010', '--glow-color': GLOW_COLOR } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={6}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >
            <button 
              onClick={() => setCurrentView("design")}
              className="flex-1 flex items-center justify-center text-xl hover:text-purple-400 transition-colors w-full"
            >
              design →
            </button>
          </ParticleCard>

          {/* Card 8: Currently */}
          <ParticleCard
            className="magic-bento-card magic-bento-card--border-glow"
            style={{ backgroundColor: '#060010', '--glow-color': GLOW_COLOR } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={6}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >
            <div className="magic-bento-card__header">
              <div className="magic-bento-card__label">currently</div>
            </div>
            <div className="magic-bento-card__content">
              <p className="text-sm leading-relaxed">
                building AI-powered scheduling at Sameday. previously research in NLP & computer vision.
              </p>
              <div className="flex items-center gap-2 text-xs opacity-50 mt-4">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>open to opportunities</span>
              </div>
            </div>
          </ParticleCard>

          {/* Card 9: LetterGlitch Background */}
          <ParticleCard
            className="magic-bento-card magic-bento-card--border-glow"
            style={{ backgroundColor: '#060010', '--glow-color': GLOW_COLOR, padding: 0 } as React.CSSProperties}
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
        </BentoCardGrid>
      </div>
    </div>
  )
}
