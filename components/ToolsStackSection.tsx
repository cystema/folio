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
  proficiency?: number
}

const tools: Tool[] = [
  // Backend
  { name: "Python", category: "PROGRAMMING LANGUAGE", icon: Code, proficiency: 90 },
  { name: "FastAPI", category: "BACKEND FRAMEWORK", icon: FolderCode, proficiency: 85 },
  { name: "MongoDB", category: "DATABASE", icon: Database, proficiency: 80 },
  
  // Frontend
  { name: "React", category: "JAVASCRIPT LIBRARY", icon: LayoutTemplate, proficiency: 95 },
  { name: "TypeScript", category: "PROGRAMMING LANGUAGE", icon: FileCode, proficiency: 85 },
  { name: "Tailwind CSS", category: "CSS FRAMEWORK", icon: Zap, proficiency: 90 },
  { name: "Next.js", category: "FULL STACK FRAMEWORK", icon: Globe, proficiency: 90 },
  
  // AI
  { name: "LangChain", category: "AI FRAMEWORK", icon: BrainCircuit, proficiency: 85 },
  { name: "OpenAI", category: "AI PLATFORM", icon: BrainCircuit, proficiency: 90 },
  { name: "Claude", category: "AI PLATFORM", icon: BrainCircuit, proficiency: 85 },
  
  // Voice
  { name: "Vapi", category: "VOICE AI", icon: AudioWaveform, proficiency: 80 },
  { name: "ElevenLabs", category: "VOICE AI", icon: AudioWaveform, proficiency: 75 },
  { name: "Deepgram", category: "VOICE AI", icon: AudioWaveform, proficiency: 75 },
  
  // DevOps/Tools
  { name: "GitHub", category: "VERSION CONTROL", icon: Terminal, proficiency: 95 },
  { name: "Vercel", category: "HOSTING PLATFORM", icon: Cloud, proficiency: 80 },
]

interface ToolsStackSectionProps {
  onNavigate?: (page: "home" | "projects" | "design" | "tools") => void
}

export default function ToolsStackSection({ onNavigate }: ToolsStackSectionProps) {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar currentPage="tools" onNavigate={onNavigate || (() => {})} />
      <div className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Bold Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-black">
            Tools & Stack
          </h1>
          
          {/* Tools Grid - Two Columns */}
          <div className="grid md:grid-cols-2 gap-4">
            {tools.map((tool, idx) => {
              const Icon = tool.icon
              return (
                <Card 
                  key={idx} 
                  className="bg-white border border-gray-200 hover:border-gray-300 transition-colors rounded-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-black mb-1">
                            {tool.name}
                          </h3>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            {tool.category}
                          </p>
                        </div>
                      </div>
                      {tool.proficiency && (
                        <div className="text-lg font-semibold text-black">
                          {tool.proficiency}%
                        </div>
                      )}
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

