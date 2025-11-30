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
  <div
    className="design-tile transition-opacity hover:opacity-90 active:opacity-80"
    style={{ backgroundColor: design.color }}
  >
    {/* Image takes up most of the tile */}
    <div className="design-tile__image">
      <Image
        src={design.image}
        alt={design.name}
        fill
        className="object-contain p-4"
        sizes="(max-width: 599px) 280px, (max-width: 1023px) 320px, 380px"
      />
    </div>
    {/* Text overlay at the bottom */}
    <div className="design-tile__info">
      <h3 className="text-white text-base font-bold">{design.name}</h3>
      <p className="text-white text-xs opacity-70 leading-snug">{design.description}</p>
    </div>
  </div>
)

interface DesignSectionProps {
  onNavigate?: (page: "home" | "projects" | "design" | "tools") => void
}

const DesignSection = ({ onNavigate }: DesignSectionProps) => {
  const gridRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      <Navbar currentPage="design" onNavigate={onNavigate} />
      <div className="w-full max-w-4xl mx-auto px-0 py-0 pt-20">

        {/* Design Grid */}
        <div className="design-grid" ref={gridRef}>
          {logo_designs.map((design, idx) => (
            <DesignTile key={idx} design={design} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DesignSection
