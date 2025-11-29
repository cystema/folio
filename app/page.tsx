"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { MoveUpRight, Blocks, FolderCode, LayoutTemplate, AudioWaveform, LocateFixed, Globe, Monitor, ArrowRightFromLine, Wifi, Cpu, HardDrive } from "lucide-react"
import { MetroTile, METRO } from "../components/MetroTile"
import { useBrowserInfo } from "../components/useBrowserInfo"
import "../components/MetroGrid.css"

const ASCIIText = dynamic(() => import("../components/ASCIIText"), { ssr: false })
import ProjectsSection from "../components/ProjectsSection"
import DesignSection from "../components/DesignSection"
import FaceTracker from "../components/FaceTracker"

export default function ResumePage() {
  const [currentView, setCurrentView] = useState<"home" | "projects" | "design">("home")
  const [currentTime, setCurrentTime] = useState<string>("")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { data: browserData, loading: browserLoading } = useBrowserInfo()

  const handleViewChange = (newView: "home" | "projects" | "design") => {
    if (newView === currentView) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentView(newView)
      setTimeout(() => setIsTransitioning(false), 100)
    }, 300)
  }

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
        <div className={`min-h-screen overflow-y-auto transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {currentView === "projects" && <ProjectsSection onNavigate={handleViewChange} />}
          {currentView === "design" && <DesignSection onNavigate={handleViewChange} />}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="metro-grid">
          {/* Name */}
          <MetroTile color="#DCE1DE" area="name" className="text-[#1F2421]">
            <h1 className="text-lg font-semibold">SHUBHAM MAZUMDER</h1>
            <p className="text-xs opacity-85">Product Engineer</p>
          </MetroTile>

          {/* Work */}
          <MetroTile color={METRO.teal} area="work" className="relative">
            <Blocks className="absolute top-3 right-3 w-6 h-6 opacity-60" />
            <p className="text-xs opacity-85">
              Building AI CSRs and agentic workflows at Sameday AI
            </p>
          </MetroTile>

          {/* LinkedIn */}
          <MetroTile color={METRO.deepSpaceBlue} area="linkedin" href="https://www.linkedin.com/in/mazumders/" className="relative">
            <span className="text-base font-semibold">linkedin</span>
            <MoveUpRight className="absolute bottom-3 right-3 w-4 h-4 opacity-60" />
          </MetroTile>

          {/* Email */}
          <MetroTile color={METRO.deepSpaceBlue} area="email" href="mailto:shubham.mazumder@gmail.com" className="relative">
            <span className="text-base font-semibold">email</span>
            <MoveUpRight className="absolute bottom-3 right-3 w-4 h-4 opacity-60" />
          </MetroTile>

          {/* GitHub */}
          <MetroTile color={METRO.deepSpaceBlue} area="github" href="https://github.com/cystema" className="relative">
            <span className="text-base font-semibold">github</span>
            <MoveUpRight className="absolute bottom-3 right-3 w-4 h-4 opacity-60" />
          </MetroTile>

          {/* Profile */}
          <div className="metro-profile" style={{ gridArea: 'profile', backgroundColor: METRO.teal }}>
            <FaceTracker basePath="/faces/" />
          </div>

          {/* Projects */}
          <MetroTile color={METRO.red} area="projects" onClick={() => handleViewChange("projects")} className="relative">
            <span className="text-lg font-semibold">projects</span>
            <ArrowRightFromLine className="absolute bottom-3 right-3 w-4 h-4 opacity-60" />
          </MetroTile>

          {/* Design */}
          <MetroTile color={METRO.red} area="design" onClick={() => handleViewChange("design")} className="relative">
            <span className="text-lg font-semibold">design</span>
            <ArrowRightFromLine className="absolute bottom-3 right-3 w-4 h-4 opacity-60" />
          </MetroTile>

          {/* Backend */}
          <MetroTile color={METRO.darkGreen} area="backend" className="relative">
            <FolderCode className="absolute top-3 right-3 w-6 h-6 opacity-60" />
            <div className="flex flex-wrap gap-1">
              <span className="metro-badge">Python</span>
              <span className="metro-badge">FastAPI</span>
              <span className="metro-badge">MongoDB</span>
            </div>
          </MetroTile>

          {/* Frontend */}
          <MetroTile color={METRO.darkGreen} area="frontend" className="relative">
            <LayoutTemplate className="absolute top-3 right-3 w-6 h-6 opacity-60" />
            <div className="flex flex-wrap gap-1">
              <span className="metro-badge">React</span>
              <span className="metro-badge">TypeScript</span>
              <span className="metro-badge">Tailwind</span>
            </div>
          </MetroTile>

          {/* AI */}
          <MetroTile color={METRO.darkGreen} area="ai" className="relative">
            <LayoutTemplate className="absolute top-3 right-3 w-6 h-6 opacity-60" />
            <div className="flex flex-wrap gap-1">
              <span className="metro-badge">LangChain</span>
              <span className="metro-badge">OpenAI</span>
              <span className="metro-badge">Claude</span>
            </div>
          </MetroTile>

          {/* Voice */}
          <MetroTile color={METRO.darkGreen} area="voice" className="relative">
            <AudioWaveform className="absolute top-3 right-3 w-6 h-6 opacity-60" />
            <div className="flex flex-wrap gap-1">
              <span className="metro-badge">Vapi</span>
              <span className="metro-badge">ElevenLabs</span>
              <span className="metro-badge">Deepgram</span>
            </div>
          </MetroTile>

          {/* Your Location */}
          <MetroTile color={METRO.yellow} area="yourloc" className="metro-browser relative">
            <LocateFixed className="absolute top-3 right-3 w-6 h-6 opacity-60" />
            <div className="text-[10px] font-semibold opacity-60 mb-1">Your Location</div>
            {browserLoading ? (
              <span className="text-xs opacity-50">loading...</span>
            ) : (
              <>
                <span className="text-sm font-semibold">{browserData?.city}</span>
                <span className="text-xs opacity-70">{browserData?.country}</span>
              </>
            )}
          </MetroTile>

          {/* Your IP */}
          <MetroTile color={METRO.yellow} area="yourip" className="metro-browser relative">
            <Globe className="absolute top-3 right-3 w-6 h-6 opacity-60" />
            <div className="text-[10px] font-semibold opacity-60 mb-1">Your IP</div>
            {browserLoading ? (
              <span className="text-xs opacity-50">loading...</span>
            ) : (
              <span className="text-xs font-semibold font-mono">{browserData?.ip}</span>
            )}
          </MetroTile>

          {/* Your Device */}
          <MetroTile color={METRO.yellow} area="yourdev" className="metro-browser relative">
            <Monitor className="absolute top-3 right-3 w-6 h-6 opacity-60" />
            <div className="text-[10px] font-semibold opacity-60 mb-1">Your Device</div>
            {browserLoading ? (
              <span className="text-xs opacity-50">loading...</span>
            ) : (
              <>
                <span className="text-xs font-semibold">{browserData?.browser}</span>
                <span className="text-[10px] opacity-70">{browserData?.os}</span>
              </>
            )}
          </MetroTile>

          {/* Network Speed */}
          <MetroTile color={METRO.yellow} area="networkspeed" className="metro-browser relative">
            <Wifi className="absolute top-3 right-3 w-6 h-6 opacity-60" />
            <div className="text-[10px] font-semibold opacity-60 mb-1">Your Network Speed</div>
            {browserLoading ? (
              <span className="text-xs opacity-50">loading...</span>
            ) : (
              <span className="text-xs font-semibold">{browserData?.networkSpeed || 'N/A'}</span>
            )}
          </MetroTile>

          {/* CPU Cores */}
          <MetroTile color={METRO.yellow} area="cpucores" className="metro-browser relative">
            <Cpu className="absolute top-3 right-3 w-6 h-6 opacity-60" />
            <div className="text-[10px] font-semibold opacity-60 mb-1">Your CPU Cores</div>
            {browserLoading ? (
              <span className="text-xs opacity-50">loading...</span>
            ) : (
              <span className="text-xs font-semibold">{browserData?.cpuCores ? `${browserData.cpuCores} cores` : 'N/A'}</span>
            )}
          </MetroTile>

          {/* Device Memory */}
          <MetroTile color={METRO.yellow} area="devicememory" className="metro-browser relative">
            <HardDrive className="absolute top-3 right-3 w-6 h-6 opacity-60" />
            <div className="text-[10px] font-semibold opacity-60 mb-1">Your Device Memory</div>
            {browserLoading ? (
              <span className="text-xs opacity-50">loading...</span>
            ) : (
              <span className="text-xs font-semibold">{browserData?.deviceMemory ? `${browserData.deviceMemory} GB` : 'N/A'}</span>
            )}
          </MetroTile>

          {/* ASCII */}
          <div style={{ gridArea: 'ascii', backgroundColor: '#92140C', padding: 0 }} className="relative">
            <ASCIIText text="Hello World!" enableWaves={true} asciiFontSize={6} textFontSize={80} />
          </div>

          {/* Shubham's Location */}
          <MetroTile color="#49A078" area="myloc" className="relative">
            <LocateFixed className="absolute top-3 right-3 w-6 h-6 opacity-60" />
            <div className="text-[10px] font-semibold opacity-70 mb-1">Shubham&apos;s Location</div>
            <span className="text-sm font-semibold">Salt Lake City</span>
            <span className="text-xs opacity-70">MST</span>
            <span className="text-sm font-semibold">{currentTime}</span>
          </MetroTile>
        </div>
      </div>
    </div>
  )
}
