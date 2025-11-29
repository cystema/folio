"use client"

import { useRef } from "react"
import Link from "next/link"
import PageNavigation from "./PageNavigation"
import { METRO } from "./MetroTile"
import "./ProjectsGrid.css"
import { 
  Blocks, 
  Brain, 
  MessageSquare, 
  FileText, 
  Search, 
  Database,
  Sparkles,
  Bot,
  Film,
  Gamepad2,
  Puzzle,
  FileCode,
  ArrowRightFromLine
} from "lucide-react"

// Assign colors to project cards - using Metro colors
const projectColors = [
  METRO.blue, METRO.teal, METRO.purple, METRO.green, 
  METRO.darkBlue, METRO.magenta, METRO.orange, METRO.darkGreen,
  '#5C2D91', '#008272', '#0063B1', '#B4009E'
]

// Icon components for projects
const projectIcons = [
  Film,        // MovieLang AI
  Brain,       // Hierarchical Planning Agent
  Database,    // Insight Engine: CSV AI
  MessageSquare, // Movie AI Assistant
  FileText,    // Insight Engine: PDF AI
  Search,      // WikiLam
  Sparkles,    // RAG + Langchain
  Gamepad2,    // Wordle
  Puzzle,      // NoShorts
  Blocks,      // Mini-Blockchain
  FileCode,    // PlushCV
]

const other_projects = [
  {
    name: "Mini-Blockchain",
    description: "A miniature implementation of a Blockchain, using Python 3 and Flask.",
    github: "https://github.com/cystema/mini-blockchain",
  },
  {
    name: "PlushCV",
    description: "A two-column one-page resume template with 71 stars and 25 forks on github.",
    github: "https://github.com/cystema/plushcv",
    link: "https://www.overleaf.com/latex/templates/plushcv/jybpnsftmdkf",
  },
]

const conversational_ai_projects = [
  {
    name: "MovieLang AI",
    description: "Movie recommendations with LangChain, Langflow, AstraDB, RAG, and GPT.",
    github: "https://github.com/cystema/movielang-ai",
  },
  {
    name: "Hierarchical Planning Agent",
    description: "Hierarchical API Planner using LangChain and the OpenAPI Toolkit.",
    github: "https://github.com/cystema/langchain-openapi-tmdb",
  },
  {
    name: "Insight Engine: CSV AI",
    description: "Upload, query, and interact with CSV data using LangChain and GPT.",
    github: "https://github.com/cystema/langchain-panel-csv-query",
  },
  {
    name: "Movie AI Assistant",
    description: "Conversational chatbot with Dialogflow for movie recommendations.",
    github: "https://github.com/cystema/movieassistant",
  },
  {
    name: "Insight Engine: PDF AI",
    description: "Interact with PDF documents using RAG, Langchain, and OpenAI.",
    github: "https://github.com/cystema/pdf-reader-langchain-streamlit",
  },
  {
    name: "WikiLam",
    description: "Query and interact with Wikipedia pages using LlamaIndex and GPT.",
    github: "https://github.com/cystema/wikilam",
  },
  {
    name: "RAG + Langchain",
    description: "Gemini API with LangChain for RAG-based PDF querying.",
    github: "https://github.com/cystema/rag-with-langchain",
  },
]

const web_projects = [
  {
    name: "Wordle",
    description: "An implementation of the popular game Wordle with NextJS.",
    github: "https://github.com/cystema/wordle",
    link: "https://wordle.shubh.ink/",
  },
  {
    name: "NoShorts",
    description: "A Firefox Plugin that removes YouTube Shorts from search results.",
    github: "https://github.com/cystema/NoShorts",
    link: "https://addons.mozilla.org/en-US/firefox/addon/noytshorts/",
  },
]

interface Project {
  name: string
  description: string
  github: string
  link?: string
}

const ProjectTile = ({ project, color, Icon }: { project: Project; color: string; Icon: React.ComponentType<{ size?: number; className?: string }> }) => (
  <div
    className="project-tile flex flex-col justify-between p-3 transition-opacity hover:opacity-85 active:opacity-70"
    style={{ backgroundColor: color }}
  >
    <div className="flex justify-between items-start">
      <span className="text-white text-xs font-semibold uppercase tracking-wide opacity-70">Project</span>
      <Icon size={28} className="text-white opacity-80" />
    </div>
    <div className="flex flex-col gap-1">
      <h3 className="text-white text-sm font-bold leading-tight">{project.name}</h3>
      <p className="text-white text-[10px] opacity-70 leading-snug line-clamp-2">{project.description}</p>
      <div className="flex gap-3 text-[10px] mt-1">
        <Link 
          href={project.github} 
          target="_blank" 
          className="text-white opacity-80 hover:opacity-100 font-medium flex items-center gap-1"
        >
          GitHub <ArrowRightFromLine size={10} />
        </Link>
        {project.link && (
          <Link 
            href={project.link} 
            target="_blank" 
            className="text-white opacity-80 hover:opacity-100 font-medium flex items-center gap-1"
          >
            Demo <ArrowRightFromLine size={10} />
          </Link>
        )}
      </div>
    </div>
  </div>
)

interface ProjectsSectionProps {
  onNavigate?: (page: "home" | "projects" | "design") => void
}

const ProjectsSection = ({ onNavigate }: ProjectsSectionProps) => {
  const gridRef = useRef<HTMLDivElement>(null)

  // Combine all projects into one array
  const allProjects = [
    ...conversational_ai_projects,
    ...web_projects,
    ...other_projects
  ]

  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto px-0 py-0">
        {/* Header */}
        <div className="mb-1 px-4 py-4 flex items-center justify-end">
          {onNavigate && (
            <PageNavigation currentPage="projects" onNavigate={onNavigate} />
          )}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid" ref={gridRef}>
          {allProjects.map((project, idx) => {
            const Icon = projectIcons[idx % projectIcons.length]
            return (
              <ProjectTile 
                key={idx} 
                project={project} 
                color={projectColors[idx % projectColors.length]}
                Icon={Icon}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProjectsSection
