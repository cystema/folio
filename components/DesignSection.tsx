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
      backgroundColor: '#060010', 
      '--glow-color': GLOW_COLOR,
      aspectRatio: 'auto',
      minHeight: '320px'
    } as React.CSSProperties}
    disableAnimations={isMobile}
    particleCount={6}
    glowColor={GLOW_COLOR}
    enableTilt={!isMobile}
    clickEffect={true}
    enableMagnetism={false}
  >
    <div className="magic-bento-card__header">
      <div className="magic-bento-card__label text-xs opacity-50">design</div>
    </div>
    <div className="flex-1 flex flex-col">
      <div className="flex-1 mb-4 overflow-hidden">
        <Image
          src={design.image || "/placeholder.svg"}
          alt={design.name}
          width={400}
          height={300}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 ease-out"
        />
      </div>
      <div className="magic-bento-card__content">
        <h3 className="text-base font-normal mb-1">{design.name}</h3>
        <p className="text-xs opacity-60 leading-relaxed">{design.description}</p>
      </div>
    </div>
  </ParticleCard>
)

const DesignSection = () => {
  const gridRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobileDetection()

  return (
    <div className="p-4 md:p-6 bg-[#060010] min-h-full">
      <GlobalSpotlight
        gridRef={gridRef}
        disableAnimations={isMobile}
        enabled={true}
        spotlightRadius={350}
        glowColor={GLOW_COLOR}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 px-3">
          <h1 className="text-lg font-normal text-white">DESIGN</h1>
        </div>

        {/* Logo Design Section */}
        <div className="mb-8">
          <h2 className="text-xs font-normal mb-4 opacity-50 text-white px-3">LOGO DESIGN</h2>
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
