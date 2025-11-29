"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ParticleCard, useMobileDetection } from "./MagicBento"
import PageNavigation from "./PageNavigation"
import "./MagicBento.css"

// Metro UI Colors
const METRO = {
  blue: '#0078D4',
  darkBlue: '#0063B1',
  teal: '#008272',
  green: '#107C10',
  purple: '#5C2D91',
  magenta: '#B4009E',
  dark: '#1F1F1F',
}

// Assign colors to project cards
const projectColors = [
  METRO.blue, METRO.teal, METRO.purple, METRO.green, 
  METRO.darkBlue, METRO.magenta, METRO.blue, METRO.teal,
  METRO.purple, METRO.green, METRO.darkBlue
]

const other_projects = [
  {
    name: "Mini-Blockchain",
    description: "A miniature implementation of a Blockchain, using Python 3 and Flask.",
    image: "/project_section/blockchain.png",
    github: "https://github.com/cystema/mini-blockchain",
  },
  {
    name: "PlushCV",
    description: "A two-column one-page resume template with 71 stars and 25 forks on github.",
    image: "/project_section/plushcv.png",
    github: "https://github.com/cystema/plushcv",
    link: "https://www.overleaf.com/latex/templates/plushcv/jybpnsftmdkf",
  },
]

const conversational_ai_projects = [
  {
    name: "MovieLang AI",
    description: "Movie recommendations with LangChain, Langflow, AstraDB, RAG, and GPT.",
    image: "/project_section/movielangai.png",
    github: "https://github.com/cystema/movielang-ai",
  },
  {
    name: "Hierarchical Planning Agent",
    description: "Hierarchical API Planner using LangChain and the OpenAPI Toolkit.",
    image: "/project_section/hpa.png",
    github: "https://github.com/cystema/langchain-openapi-tmdb",
  },
  {
    name: "Insight Engine: CSV AI",
    description: "Upload, query, and interact with CSV data using LangChain and GPT.",
    image: "/project_section/csvai.png",
    github: "https://github.com/cystema/langchain-panel-csv-query",
  },
  {
    name: "Movie AI Assistant",
    description: "Conversational chatbot with Dialogflow for movie recommendations.",
    image: "/project_section/movieassistant.png",
    github: "https://github.com/cystema/movieassistant",
  },
  {
    name: "Insight Engine: PDF AI",
    description: "Interact with PDF documents using RAG, Langchain, and OpenAI.",
    image: "/project_section/pdfassistant.png",
    github: "https://github.com/cystema/pdf-reader-langchain-streamlit",
  },
  {
    name: "WikiLam",
    description: "Query and interact with Wikipedia pages using LlamaIndex and GPT.",
    image: "/project_section/wikilam.png",
    github: "https://github.com/cystema/wikilam",
  },
  {
    name: "RAG + Langchain",
    description: "Gemini API with LangChain for RAG-based PDF querying.",
    image: "/project_section/rag_langchain.png",
    github: "https://github.com/cystema/rag-with-langchain",
  },
]

const web_projects = [
  {
    name: "Wordle",
    description: "An implementation of the popular game Wordle with NextJS.",
    image: "/project_section/wordle.png",
    github: "https://github.com/cystema/wordle",
    link: "https://wordle.shubh.ink/",
  },
  {
    name: "NoShorts",
    description: "A Firefox Plugin that removes YouTube Shorts from search results.",
    image: "/project_section/noshorts.png",
    github: "https://github.com/cystema/NoShorts",
    link: "https://addons.mozilla.org/en-US/firefox/addon/noytshorts/",
  },
]

interface Project {
  name: string
  description: string
  image: string
  github: string
  link?: string
}

const ProjectCard = ({ project, isMobile, color }: { project: Project; isMobile: boolean; color: string }) => (
  <ParticleCard
    className="magic-bento-card project-card-square"
    style={{ backgroundColor: color } as React.CSSProperties}
    disableAnimations={true}
    particleCount={0}
    enableTilt={false}
    clickEffect={false}
    enableMagnetism={false}
  >
    <div className="flex flex-col h-full justify-end">
      <div className="mb-2 relative h-[80px] flex items-center justify-center bg-black/20 rounded-none">
        <Image 
          src={project.image} 
          alt={project.name}
          width={160}
          height={160}
          className="object-contain max-w-full max-h-full"
          sizes="(max-width: 599px) 80px, (max-width: 1023px) 100px, 140px"
        />
      </div>
      <div className="flex flex-col gap-1 flex-1 min-h-0 justify-end">
        <h3 className="text-sm font-semibold">{project.name}</h3>
        <p className="text-xs opacity-75 leading-snug line-clamp-2 flex-shrink-0">{project.description}</p>
        <div className="flex gap-3 text-xs mt-1">
          <Link 
            href={project.github} 
            target="_blank" 
            className="project-card-link font-medium"
          >
            github
          </Link>
          {project.link && (
            <Link 
              href={project.link} 
              target="_blank" 
              className="project-card-link font-medium"
            >
              demo
            </Link>
          )}
        </div>
      </div>
    </div>
  </ParticleCard>
)

interface ProjectsSectionProps {
  onNavigate?: (page: "home" | "projects" | "design") => void
}

const ProjectsSection = ({ onNavigate }: ProjectsSectionProps) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobileDetection()

  // Combine all projects into one array
  const allProjects = [
    ...conversational_ai_projects,
    ...web_projects,
    ...other_projects
  ]

  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      {/* Spotlight disabled for Metro style */}

      <div className="w-full max-w-6xl mx-auto px-0 py-0">
        {/* Header */}
        <div className="mb-1 px-4 py-4 flex items-center justify-end">
          {onNavigate && (
            <PageNavigation currentPage="projects" onNavigate={onNavigate} />
          )}
        </div>

        {/* Projects Grid */}
        <div className="projects-bento-grid bento-section" ref={gridRef}>
          {allProjects.map((project, idx) => (
            <ProjectCard 
              key={idx} 
              project={project} 
              isMobile={isMobile} 
              color={projectColors[idx % projectColors.length]}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectsSection
