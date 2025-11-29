"use client"

import { useRef } from "react"
import Image from "next/image"
import { ParticleCard, GlobalSpotlight, useMobileDetection } from "./MagicBento"
import "./MagicBento.css"

const GLOW_COLOR = "132, 0, 255"

const logo_designs = [
  {
    name: "UtahSec",
    description: "A logo for University of Utah's cybersecurity club.",
    image: "/design_section/utahsec1.png",
  },
  {
    name: "CTF Team",
    description: "A logo for University of Utah's official capture-the-flag team.",
    image: "/design_section/utahsec3.png",
  },
]

interface Design {
  name: string
  description: string
  image: string
}

const DesignCard = ({ design, isMobile }: { design: Design; isMobile: boolean }) => (
  <ParticleCard
    className="magic-bento-card magic-bento-card--border-glow"
    style={{ 
      backgroundColor: '#1c1a17', 
      '--glow-color': GLOW_COLOR,
      aspectRatio: 'auto',
      minHeight: '320px'
    } as React.CSSProperties}
    disableAnimations={isMobile}
    particleCount={0}
    glowColor={GLOW_COLOR}
    enableTilt={false}
    clickEffect={true}
    enableMagnetism={false}
  >
    <div className="flex-1 flex flex-col">
      <div className="flex-1 mb-4 overflow-hidden">
        <Image
          src={design.image || "/placeholder.svg"}
          alt={design.name}
          width={400}
          height={300}
          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 ease-out"
        />
      </div>
      <div className="magic-bento-card__content">
        <h3 className="text-base font-normal mb-1">{design.name}</h3>
        <p className="text-xs opacity-60 leading-relaxed">{design.description}</p>
      </div>
    </div>
  </ParticleCard>
)

interface DesignSectionProps {
  onBack?: () => void
}

const DesignSection = ({ onBack }: DesignSectionProps) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobileDetection()

  return (
    <div className="min-h-screen bg-[#141210] flex flex-col items-center">
      <GlobalSpotlight
        gridRef={gridRef}
        disableAnimations={isMobile}
        enabled={true}
        spotlightRadius={350}
        glowColor={GLOW_COLOR}
      />

      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-6">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-4 py-2 bg-black/80 text-white border border-white/20 rounded-none backdrop-blur-sm transition-all duration-300 hover:opacity-70 hover:scale-105"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>back</span>
            </button>
          )}
          <h1 className="text-lg font-normal text-white">DESIGN</h1>
        </div>

        {/* Logo Design Section */}
        <div className="mb-8">
          <div className="card-grid bento-section" ref={gridRef} style={{ maxWidth: '100%' }}>
            {logo_designs.map((design, idx) => (
              <DesignCard key={idx} design={design} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignSection
