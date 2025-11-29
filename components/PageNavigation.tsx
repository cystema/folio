"use client"

import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

// Metro UI Colors
const METRO = {
  blue: '#0078D4',
  magenta: '#B4009E',
  dark: '#1F1F1F',
}

interface PageNavigationProps {
  currentPage: "projects" | "design"
  onNavigate: (page: "home" | "projects" | "design") => void
}

export default function PageNavigation({ currentPage, onNavigate }: PageNavigationProps) {
  const isMobile = useIsMobile()

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap gap-1">
        <NavigationMenuItem>
          <NavigationMenuLink 
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              "bg-[#1F1F1F] text-white border-none rounded-none hover:opacity-80 font-semibold"
            )}
          >
            <button onClick={() => onNavigate("home")}>
              home
            </button>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink 
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              currentPage === "projects" 
                ? "bg-[#B4009E] text-white border-none rounded-none hover:opacity-80 font-semibold" 
                : "bg-[#1F1F1F] text-white border-none rounded-none hover:opacity-80 font-semibold"
            )}
          >
            <button onClick={() => onNavigate("projects")}>
              projects
            </button>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink 
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              currentPage === "design" 
                ? "bg-[#B4009E] text-white border-none rounded-none hover:opacity-80 font-semibold" 
                : "bg-[#1F1F1F] text-white border-none rounded-none hover:opacity-80 font-semibold"
            )}
          >
            <button onClick={() => onNavigate("design")}>
              design
            </button>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

