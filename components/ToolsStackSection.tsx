"use client"

import { Card, CardContent } from "@/components/ui/card"
import Navbar from "./Navbar"
import { 
  FolderCode, 
  LayoutTemplate, 
  BrainCircuit, 
  AudioWaveform,
  Code,
  Database,
  Cloud,
  Terminal,
  FileCode,
  Zap,
  Globe
} from "lucide-react"

interface Tool {
  name: string
  category: string
  icon: React.ComponentType<{ className?: string }>
}

const tools: Tool[] = [
  // Backend
  { name: "Python", category: "PROGRAMMING LANGUAGE", icon: Code },
  { name: "FastAPI", category: "BACKEND FRAMEWORK", icon: FolderCode },
  { name: "MongoDB", category: "DATABASE", icon: Database },
  
  // Frontend
  { name: "React", category: "JAVASCRIPT LIBRARY", icon: LayoutTemplate },
  { name: "TypeScript", category: "PROGRAMMING LANGUAGE", icon: FileCode },
  { name: "Tailwind CSS", category: "CSS FRAMEWORK", icon: Zap },
  { name: "Next.js", category: "FULL STACK FRAMEWORK", icon: Globe },
  
  // AI
  { name: "LangChain", category: "AI FRAMEWORK", icon: BrainCircuit },
  { name: "OpenAI", category: "AI PLATFORM", icon: BrainCircuit },
  { name: "Claude", category: "AI PLATFORM", icon: BrainCircuit },
  
  // Voice
  { name: "Vapi", category: "VOICE AI", icon: AudioWaveform },
  { name: "ElevenLabs", category: "VOICE AI", icon: AudioWaveform },
  { name: "Deepgram", category: "VOICE AI", icon: AudioWaveform },
  
  // DevOps/Tools
  { name: "GitHub", category: "VERSION CONTROL", icon: Terminal },
  { name: "Vercel", category: "HOSTING PLATFORM", icon: Cloud },
]

interface ToolsStackSectionProps {
  onNavigate?: (page: "home" | "projects" | "design" | "tools") => void
}

export default function ToolsStackSection({ onNavigate }: ToolsStackSectionProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar currentPage="tools" onNavigate={onNavigate || (() => {})} />
      <div className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Bold Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white">
            Tools & Stack
          </h1>
          
          {/* Tools Grid - Two Columns */}
          <div className="grid md:grid-cols-2 gap-4">
            {tools.map((tool, idx) => {
              const Icon = tool.icon
              return (
                <Card 
                  key={idx} 
                  className="bg-[#1F1F1F] border-white/10 hover:border-white/20 transition-colors rounded-none"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-none flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {tool.name}
                        </h3>
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                          {tool.category}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

