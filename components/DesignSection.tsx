"use client"

import { useRef } from "react"
import Image from "next/image"
import Navbar from "./Navbar"
import { METRO } from "./MetroTile"
import "./DesignGrid.css"

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

const DesignTile = ({ design }: { design: Design }) => (
  <div className="design-tile bg-white border border-gray-200 hover:border-gray-300 transition-colors rounded-lg overflow-hidden">
    {/* Image takes up most of the tile */}
    <div className="design-tile__image bg-gray-50">
      <Image
        src={design.image}
        alt={design.name}
        fill
        className="object-contain p-4"
        sizes="(max-width: 599px) 280px, (max-width: 1023px) 320px, 380px"
      />
    </div>
    {/* Text info at the bottom */}
    <div className="design-tile__info">
      <h3 className="text-black text-base font-semibold">{design.name}</h3>
      <p className="text-gray-600 text-xs leading-snug">{design.description}</p>
    </div>
  </div>
)

interface DesignSectionProps {
  onNavigate?: (page: "home" | "projects" | "design" | "tools") => void
}

const DesignSection = ({ onNavigate }: DesignSectionProps) => {
  const gridRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar currentPage="design" onNavigate={onNavigate} />
      <div className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Bold Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-black">
            Design
          </h1>

          {/* Design Grid */}
          <div className="design-grid" ref={gridRef}>
            {logo_designs.map((design, idx) => (
              <DesignTile key={idx} design={design} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignSection
