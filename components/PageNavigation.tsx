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

interface PageNavigationProps {
  currentPage: "projects" | "design"
  onNavigate: (page: "home" | "projects" | "design") => void
}

export default function PageNavigation({ currentPage, onNavigate }: PageNavigationProps) {
  const isMobile = useIsMobile()

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuLink 
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              "bg-black/80 text-white border border-white/20 hover:bg-black/90 hover:text-white hover:border-white/30"
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
                ? "bg-[#D8315B]/80 text-white border border-[#D8315B]/60 hover:bg-[#D8315B]/90" 
                : "bg-black/80 text-white border border-white/20 hover:bg-black/90 hover:text-white hover:border-white/30"
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
                ? "bg-[#D8315B]/80 text-white border border-[#D8315B]/60 hover:bg-[#D8315B]/90" 
                : "bg-black/80 text-white border border-white/20 hover:bg-black/90 hover:text-white hover:border-white/30"
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

