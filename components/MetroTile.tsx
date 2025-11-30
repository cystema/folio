"use client"

import { ReactNode } from "react"

interface MetroTileProps {
  color: string
  area: string
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

export function MetroTile({ color, area, children, className = "", onClick, href }: MetroTileProps) {
  const interactiveClasses = "flex flex-col justify-end p-3 transition-opacity hover:opacity-85 active:opacity-70"
  const staticClasses = "flex flex-col justify-end p-3"
  
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${interactiveClasses} ${className}`}
        style={{ backgroundColor: color, gridArea: area }}
      >
        {children}
      </a>
    )
  }
  
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${interactiveClasses} ${className} w-full text-left`}
        style={{ backgroundColor: color, gridArea: area }}
      >
        {children}
      </button>
    )
  }
  
  return (
    <div
      className={`${staticClasses} ${className}`}
      style={{ backgroundColor: color, gridArea: area }}
    >
      {children}
    </div>
  )
}

// Metro UI Colors
export const METRO = {
  blue: '#0078D4',
  darkBlue: '#0063B1',
  lightBlue: '#00BCF2',
  deepSpaceBlue: '#021f31',
  teal: '#008272',
  green: '#107C10',
  darkGreen: '#004B1C',
  lightGreen: '#00CC6A',
  yellow: '#FFB900',
  orange: '#D83B01',
  red: '#E81123',
  magenta: '#B4009E',
  purple: '#5C2D91',
  dark: '#1F1F1F',
  darker: '#171717',
}

