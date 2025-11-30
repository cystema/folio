"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "./Navbar"
import { 
  FileCode,
  Globe,
  BrainCircuit
} from "lucide-react"

interface Tool {
  name: string
  category: string
  logo?: string
  icon?: React.ComponentType<{ className?: string }>
}

const tools: Tool[] = [
  // Backend
  { name: "Python", category: "PROGRAMMING LANGUAGE", logo: "/logos/python.svg" },
  { name: "FastAPI", category: "BACKEND FRAMEWORK", logo: "/logos/FastAPI.svg" },
  { name: "MongoDB", category: "DATABASE", logo: "/logos/mongodb.svg" },
  
  // Frontend
  { name: "React", category: "JAVASCRIPT LIBRARY", logo: "/logos/react.svg" },
  { name: "TypeScript", category: "PROGRAMMING LANGUAGE", logo: "/logos/js.svg", icon: FileCode },
  { name: "shadcn/ui", category: "UI LIBRARY", logo: "/logos/shadcn.svg" },
  { name: "Tailwind CSS", category: "CSS FRAMEWORK", logo: "/logos/tailwind.svg" },
  { name: "Next.js", category: "FULL STACK FRAMEWORK", icon: Globe },
  
  // AI
  { name: "LangChain", category: "AI FRAMEWORK", logo: "/logos/langchain.svg" },
  { name: "Pydantic AI", category: "AI FRAMEWORK", logo: "/logos/pydantic-ai.svg" },
  { name: "Hugging Face", category: "AI PLATFORM", logo: "/logos/huggingface.svg" },
  { name: "OpenAI", category: "AI PLATFORM", icon: BrainCircuit },
  { name: "Claude", category: "AI PLATFORM", logo: "/logos/claude.svg" },
  { name: "Exa", category: "AI SEARCH", logo: "/logos/exa.svg" },
  
  // Voice
  { name: "Vapi", category: "VOICE AI", logo: "/logos/vapi.svg" },
  { name: "ElevenLabs", category: "VOICE AI", logo: "/logos/11labs.svg" },
  { name: "Deepgram", category: "VOICE AI", logo: "/logos/deepgram.svg" },
  { name: "Retell", category: "VOICE AI", logo: "/logos/retell.svg" },
  
  // DevOps/Tools
  { name: "AWS", category: "CLOUD PLATFORM", logo: "/logos/aws.svg" },
  { name: "Docker", category: "CONTAINER PLATFORM", logo: "/logos/docker.svg" },
  { name: "n8n", category: "AUTOMATION PLATFORM", logo: "/logos/n8n.svg" },
  { name: "Insomnia", category: "API TOOL", logo: "/logos/insomnia.svg" },
  { name: "Git", category: "VERSION CONTROL", logo: "/logos/git.svg" },
]

interface ToolsStackSectionProps {
  onNavigate?: (page: "home" | "projects" | "design" | "tools") => void
  onOpenCommand?: () => void
}

export default function ToolsStackSection({ onNavigate, onOpenCommand }: ToolsStackSectionProps) {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar currentPage="tools" onNavigate={onNavigate || (() => {})} onOpenCommand={onOpenCommand} />
      <div className="pt-20">
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
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {tool.logo ? (
                          <Image
                            src={tool.logo}
                            alt={tool.name}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        ) : Icon ? (
                          <Icon className="w-6 h-6 text-gray-700" />
                        ) : null}
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
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Image Section */}
        <section className="w-full mt-12">
          <div className="w-full h-[60vh] md:h-[70vh] relative overflow-hidden">
            <Image
              src="/pictures/showcase/IMG_1345.jpg"
              alt="Showcase"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
      </div>
    </div>
  )
}

