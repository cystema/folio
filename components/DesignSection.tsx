"use client"

import { useRef } from "react"
import Image from "next/image"
import { ParticleCard, useMobileDetection } from "./MagicBento"
import PageNavigation from "./PageNavigation"
import "./MagicBento.css"

// Metro UI Colors
const METRO = {
  teal: '#008272',
  purple: '#5C2D91',
}

const logo_designs = [
  {
    name: "UtahSec",
    description: "A logo for University of Utah's cybersecurity club.",
    image: "/design_section/utahsec1.png",
    color: METRO.teal,
  },
  {
    name: "CTF Team",
    description: "A logo for University of Utah's official capture-the-flag team.",
    image: "/design_section/utahsec3.png",
    color: METRO.purple,
  },
]

interface Design {
  name: string
  description: string
  image: string
  color: string
}

const DesignCard = ({ design }: { design: Design }) => (
  <ParticleCard
    className="magic-bento-card"
    style={{ 
      backgroundColor: design.color, 
      aspectRatio: 'auto',
      minHeight: '280px'
    } as React.CSSProperties}
    disableAnimations={true}
    particleCount={0}
    enableTilt={false}
    clickEffect={false}
    enableMagnetism={false}
  >
    <div className="flex-1 flex flex-col justify-end">
      <div className="flex-1 mb-3 overflow-hidden flex items-center justify-center bg-black/20">
        <Image
          src={design.image || "/placeholder.svg"}
          alt={design.name}
          width={400}
          height={300}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="magic-bento-card__content">
        <h3 className="text-base font-semibold mb-1">{design.name}</h3>
        <p className="text-xs opacity-75 leading-relaxed">{design.description}</p>
      </div>
    </div>
  </ParticleCard>
)

interface DesignSectionProps {
  onNavigate?: (page: "home" | "projects" | "design") => void
}

const DesignSection = ({ onNavigate }: DesignSectionProps) => {
  const gridRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      {/* Spotlight disabled for Metro style */}

      <div className="w-full max-w-6xl mx-auto px-0 py-0">
        {/* Header */}
        <div className="mb-1 px-4 py-4 flex items-center justify-end">
          {onNavigate && (
            <PageNavigation currentPage="design" onNavigate={onNavigate} />
          )}
        </div>

        {/* Logo Design Section */}
        <div>
          <div className="card-grid bento-section" ref={gridRef} style={{ maxWidth: '100%', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {logo_designs.map((design, idx) => (
              <DesignCard key={idx} design={design} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignSection
