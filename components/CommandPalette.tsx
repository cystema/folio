"use client"

import { useEffect, useState } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Home, FolderKanban, Palette, Wrench, Github, Linkedin, Mail } from "lucide-react"

interface CommandPaletteProps {
  currentPage: "home" | "projects" | "design" | "tools"
  onNavigate: (page: "home" | "projects" | "design" | "tools") => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CommandPalette({ currentPage, onNavigate, open: externalOpen, onOpenChange: externalOnOpenChange }: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = externalOpen !== undefined ? externalOpen : internalOpen
  const setOpen = externalOnOpenChange || setInternalOpen

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [setOpen])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => onNavigate("home"))}>
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
            {currentPage === "home" && <CommandShortcut>●</CommandShortcut>}
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => onNavigate("projects"))}>
            <FolderKanban className="mr-2 h-4 w-4" />
            <span>Projects</span>
            {currentPage === "projects" && <CommandShortcut>●</CommandShortcut>}
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => onNavigate("design"))}>
            <Palette className="mr-2 h-4 w-4" />
            <span>Design</span>
            {currentPage === "design" && <CommandShortcut>●</CommandShortcut>}
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => onNavigate("tools"))}>
            <Wrench className="mr-2 h-4 w-4" />
            <span>Tools & Stack</span>
            {currentPage === "tools" && <CommandShortcut>●</CommandShortcut>}
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Links">
          <CommandItem onSelect={() => runCommand(() => window.open("https://github.com/cystema", "_blank"))}>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
            <CommandShortcut>↗</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.open("https://www.linkedin.com/in/mazumders/", "_blank"))}>
            <Linkedin className="mr-2 h-4 w-4" />
            <span>LinkedIn</span>
            <CommandShortcut>↗</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.href = "mailto:shubham.mazumder@gmail.com")}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Email</span>
            <CommandShortcut>↗</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

