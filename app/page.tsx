"use client"

import { useRef, useState, useEffect } from "react"
import LetterGlitch from "../components/LetterGlitch"
import dynamic from "next/dynamic"

const ASCIIText = dynamic(() => import("../components/ASCIIText"), { ssr: false })
import ProjectsSection from "../components/ProjectsSection"
import DesignSection from "../components/DesignSection"
import FaceTracker from "../components/FaceTracker"
import BrowserInfo from "../components/BrowserInfo"
import { ParticleCard, GlobalSpotlight, BentoCardGrid, BentoSlot, useMobileDetection } from "../components/MagicBento"
import "../components/MagicBento.css"

const GLOW_COLOR = "11, 155, 244" // Deep Space Blue

export default function ResumePage() {
  const [currentView, setCurrentView] = useState<"home" | "projects" | "design">("home")
  const [currentTime, setCurrentTime] = useState<string>("")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobileDetection()

  const handleViewChange = (newView: "home" | "projects" | "design") => {
    if (newView === currentView) return
    
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentView(newView)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 300)
  }

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const mstTime = now.toLocaleTimeString('en-US', {
        timeZone: 'America/Denver',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      })
      setCurrentTime(mstTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  if (currentView !== "home") {
    return (
      <div className="min-h-screen bg-[#141210] text-white">
        <div className={`min-h-screen overflow-y-auto bg-[#141210] transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {currentView === "projects" && <ProjectsSection onNavigate={handleViewChange} />}
          {currentView === "design" && <DesignSection onNavigate={handleViewChange} />}
        </div>
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

      <div className={`max-w-6xl mx-auto relative transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <BentoCardGrid gridRef={gridRef}>
          {/* Profile Image - using BentoSlot (no card border) */}
          <BentoSlot area="profile">
            <div className="bento-slot__image">
              <FaceTracker basePath="/faces/" />
            </div>
          </BentoSlot>

          {/* Name & Title */}
          <ParticleCard
            className="magic-bento-card"
            style={{ backgroundColor: '#ffe5ff', gridArea: 'name' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={0}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >
            <div className="flex-1 flex flex-col justify-center" style={{ color: '#141210' }}>
              <h2 className="text-2xl font-normal mb-1" style={{ color: '#141210' }}>SHUBHAM MAZUMDER</h2>
              <p className="text-sm opacity-90 mb-2" style={{ color: '#141210' }}>Product Engineer</p>
              <p className="text-xs opacity-70" style={{ color: '#141210' }}>
                currently building AI CSRs and agentic workflows for the trades at Sameday AI.
              </p>
            </div>
          </ParticleCard>

          {/* LinkedIn */}
          <ParticleCard
            className="magic-bento-card cursor-pointer bento-link-card"
            style={{ backgroundColor: '#1c1a17', gridArea: 'linkedin' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={0}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >
            <a 
              href="https://www.linkedin.com/in/mazumders/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center text-lg"
            >
              linkedin ↗
            </a>
          </ParticleCard>

          {/* Email */}
          <ParticleCard
            className="magic-bento-card cursor-pointer bento-link-card"
            style={{ backgroundColor: '#1c1a17', gridArea: 'email' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={0}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >
            <a 
              href="mailto:shubham.mazumder@gmail.com" 
              className="flex-1 flex items-center justify-center text-lg"
            >
              @email ↗
            </a>
          </ParticleCard>

          {/* GitHub */}
          <ParticleCard
            className="magic-bento-card cursor-pointer bento-link-card"
            style={{ backgroundColor: '#1c1a17', gridArea: 'github' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={0}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >
            <a 
              href="https://github.com/cystema" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center text-lg"
            >
              github ↗
            </a>
          </ParticleCard>

          {/* Projects */}
          <ParticleCard
            className="magic-bento-card cursor-pointer bento-nav-card"
            style={{ backgroundColor: '#1c1a17', gridArea: 'projects' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={0}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >
            <button 
              onClick={() => handleViewChange("projects")}
              className="flex-1 flex items-center justify-center text-xl transition-all duration-300 w-full hover:scale-105"
            >
              projects
            </button>
          </ParticleCard>

          {/* Tech Stack */}
          <ParticleCard
            className="magic-bento-card bento-techstack-card"
            style={{ gridArea: 'techstack' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={0}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >
            <div className="flex-1 flex flex-col justify-center gap-2">
              <div className="text-xs opacity-50 mb-1">tech stack</div>
              <div className="text-xs opacity-40 mt-1 mb-0.5">backend</div>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="badge badge-tech">Python</span>
                <span className="badge badge-tech">Pydantic</span>
                <span className="badge badge-tech">FastAPI</span>
                <span className="badge badge-tech">MongoDB</span>
                <span className="badge badge-tech">SQL</span>
                <span className="badge badge-tech">Beanie</span>
              </div>
              <div className="text-xs opacity-40 mt-1 mb-0.5">frontend</div>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="badge badge-tech">JavaScript</span>
                <span className="badge badge-tech">React</span>
                <span className="badge badge-tech">shadcn</span>
                <span className="badge badge-tech">Tailwind</span>
              </div>
              <div className="text-xs opacity-40 mt-1 mb-0.5">AI frameworks</div>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="badge badge-ai">Pydantic-AI</span>
                <span className="badge badge-ai">LangChain</span>
                <span className="badge badge-ai">Temporal</span>
                <span className="badge badge-ai">OpenAI</span>
                <span className="badge badge-ai">Anthropic</span>
              </div>
              <div className="text-xs opacity-40 mt-1 mb-0.5">Voice AI</div>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="badge badge-ai">Vapi</span>
                <span className="badge badge-ai">Retell</span>
                <span className="badge badge-ai">ElevenLabs</span>
                <span className="badge badge-ai">Cartesia</span>
                <span className="badge badge-ai">Deepgram</span>
              </div>
              <div className="text-xs opacity-40 mt-1 mb-0.5">IDE</div>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="badge badge-tech">Cursor</span>
                <span className="badge badge-tech">Claude-Code</span>
                <span className="badge badge-tech">VSCode</span>
              </div>
            </div>
          </ParticleCard>

          {/* Location */}
          <ParticleCard
            className="magic-bento-card bento-square-card"
            style={{ backgroundColor: '#1c1a17', gridArea: 'location' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={0}
            glowColor={GLOW_COLOR}
            enableTilt={false}
            clickEffect={false}
            enableMagnetism={false}
          >
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <span className="text-2xl mb-1">📍</span>
              <span className="text-sm">Salt Lake City</span>
              <span className="text-xs opacity-50 mb-1">MST</span>
              <span className="text-lg font-mono">{currentTime}</span>
            </div>
          </ParticleCard>

          {/* Design */}
          <ParticleCard
            className="magic-bento-card cursor-pointer bento-nav-card"
            style={{ backgroundColor: '#1c1a17', gridArea: 'design' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={0}
            glowColor={GLOW_COLOR}
            enableTilt={!isMobile}
            clickEffect={true}
            enableMagnetism={true}
          >
            <button 
              onClick={() => handleViewChange("design")}
              className="flex-1 flex items-center justify-center text-xl transition-all duration-300 w-full hover:scale-105"
            >
              design
            </button>
          </ParticleCard>

          {/* LetterGlitch Background */}
          <ParticleCard
            className="magic-bento-card bento-square-card"
            style={{ backgroundColor: '#1c1a17', padding: 0, gridArea: 'glitch' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={0}
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

          {/* Browser Info */}
          <ParticleCard
            className="magic-bento-card bento-browser-card"
            style={{ backgroundColor: '#1c1a17', gridArea: 'browser' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={0}
            glowColor={GLOW_COLOR}
            enableTilt={false}
            clickEffect={false}
            enableMagnetism={false}
          >
            <BrowserInfo />
          </ParticleCard>

          {/* ASCII Text Effect */}
          <ParticleCard
            className="magic-bento-card"
            style={{ backgroundColor: '#1c1a17', padding: 0, gridArea: 'ascii', minHeight: '150px' } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={0}
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
