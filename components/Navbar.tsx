"use client"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Github, Linkedin, Mail, Command } from "lucide-react"

interface NavbarProps {
  currentPage: "home" | "projects" | "design" | "tools"
  onNavigate: (page: "home" | "projects" | "design" | "tools") => void
  onOpenCommand?: () => void
}

// Navigation links array
const navigationLinks = [
  { id: "home" as const, label: "Home" },
  { id: "projects" as const, label: "Projects" },
  { id: "design" as const, label: "Design" },
  { id: "tools" as const, label: "Tools" },
]

export default function Navbar({ currentPage, onNavigate, onOpenCommand }: NavbarProps) {
  const isLightMode = currentPage === "home"
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 backdrop-blur-sm",
      isLightMode 
        ? "border-b border-gray-200 bg-white/95" 
        : "border-b border-white/10 bg-black/95"
    )}>
      <div className="flex h-16 items-center justify-between px-6 md:px-8">
        {/* Left side - Navigation */}
        <div className="flex items-center gap-8">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className={cn(
                  "group size-8 md:hidden rounded-none",
                  isLightMode ? "text-black hover:bg-gray-100" : "text-white hover:bg-white/10"
                )}
                size="icon"
                variant="ghost"
              >
                <svg
                  className="pointer-events-none"
                  fill="none"
                  height={16}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="-translate-y-[7px] origin-center transition-all duration-300 group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    style={{ transitionTimingFunction: 'cubic-bezier(.5,.85,.25,1.1)' }}
                    d="M4 12L20 12"
                  />
                  <path
                    className="origin-center transition-all duration-300 group-aria-expanded:rotate-45"
                    style={{ transitionTimingFunction: 'cubic-bezier(.5,.85,.25,1.8)' }}
                    d="M4 12H20"
                  />
                  <path
                    className="origin-center translate-y-[7px] transition-all duration-300 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    style={{ transitionTimingFunction: 'cubic-bezier(.5,.85,.25,1.1)' }}
                    d="M4 12H20"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className={cn(
              "w-40 p-2 md:hidden",
              isLightMode ? "bg-white border-gray-200" : "bg-black border-white/10"
            )}>
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0">
                  {navigationLinks.map((link) => (
                    <NavigationMenuItem className="w-full" key={link.id}>
                      <NavigationMenuLink
                        className={cn(
                          "py-2 px-3 block w-full cursor-pointer text-sm font-bold transition-all rounded-none",
                          currentPage === link.id
                            ? isLightMode 
                              ? "bg-black text-white border-2 border-black"
                              : "bg-white text-black border-2 border-white"
                            : isLightMode
                              ? "bg-transparent text-black border border-black/30 hover:border-black/60 hover:bg-black/10"
                              : "bg-transparent text-white border border-white/30 hover:border-white/60 hover:bg-white/10"
                        )}
                        onClick={() => onNavigate(link.id)}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Desktop Navigation menu */}
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.id}>
                  <NavigationMenuLink
                    className={cn(
                      "px-4 py-2 text-sm font-bold cursor-pointer transition-all rounded-none h-9 flex items-center",
                      currentPage === link.id
                        ? isLightMode 
                          ? "bg-black text-white border-2 border-black"
                          : "bg-white text-black border-2 border-white"
                        : isLightMode
                          ? "bg-transparent text-black border border-black/30 hover:border-black/60 hover:bg-black/10"
                          : "bg-transparent text-white border border-white/30 hover:border-white/60 hover:bg-white/10"
                    )}
                    onClick={() => onNavigate(link.id)}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="outline"
            className={cn(
              "rounded-none h-9 px-4",
              isLightMode
                ? "border-black/30 bg-transparent text-black hover:bg-black/10 hover:text-black"
                : "border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            )}
          >
            <a 
              href="https://github.com/cystema" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              <span className="text-sm font-medium">GitHub</span>
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className={cn(
              "rounded-none h-9 px-4",
              isLightMode
                ? "border-black/30 bg-transparent text-black hover:bg-black/10 hover:text-black"
                : "border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            )}
          >
            <a 
              href="https://www.linkedin.com/in/mazumders/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Linkedin className="h-4 w-4" />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className={cn(
              "rounded-none h-9 px-4",
              isLightMode
                ? "border-black/30 bg-transparent text-black hover:bg-black/10 hover:text-black"
                : "border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            )}
          >
            <a 
              href="mailto:shubham.mazumder@gmail.com"
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              <span className="text-sm font-medium">Email</span>
            </a>
          </Button>
          <Button
            variant="default"
            onClick={onOpenCommand}
            className="h-9 px-4 bg-white text-black hover:bg-gray-100 border border-gray-200"
          >
            <Command className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Command</span>
            <kbd className={cn(
              "ml-2 pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none",
              isLightMode
                ? "bg-gray-100 text-gray-600 border-gray-300"
                : "bg-white/10 text-white/70 border-white/20"
            )}>
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>
      </div>
    </header>
  )
}
