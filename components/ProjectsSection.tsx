"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ParticleCard, GlobalSpotlight, useMobileDetection } from "./MagicBento"
import "./MagicBento.css"

const GLOW_COLOR = "132, 0, 255"

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

const ProjectCard = ({ project, isMobile }: { project: Project; isMobile: boolean }) => (
  <ParticleCard
    className="magic-bento-card project-card-square"
    style={{ backgroundColor: '#1c1a17' } as React.CSSProperties}
    disableAnimations={isMobile}
    particleCount={0}
    glowColor={GLOW_COLOR}
    enableTilt={false}
    clickEffect={true}
    enableMagnetism={false}
  >
    <div className="flex flex-col h-full">
      <div className="mb-3 rounded-sm relative h-[120px] flex items-center justify-center bg-[#0a0806]">
        <Image 
          src={project.image} 
          alt={project.name}
          width={200}
          height={200}
          className="object-contain max-w-full max-h-full"
          sizes="(max-width: 599px) 100px, (max-width: 1023px) 140px, 180px"
        />
      </div>
      <div className="flex flex-col gap-2 flex-1 min-h-0">
        <h3 className="text-sm font-normal">{project.name}</h3>
        <p className="text-xs opacity-60 leading-relaxed line-clamp-2 flex-shrink-0">{project.description}</p>
        <div className="flex gap-3 text-xs mt-auto">
          <Link 
            href={project.github} 
            target="_blank" 
            className="hover:text-blue-400 transition-colors"
          >
            github ↗
          </Link>
          {project.link && (
            <Link 
              href={project.link} 
              target="_blank" 
              className="hover:text-blue-400 transition-colors"
            >
              demo ↗
            </Link>
          )}
        </div>
      </div>
    </div>
  </ParticleCard>
)

interface ProjectsSectionProps {
  onBack?: () => void
}

const ProjectsSection = ({ onBack }: ProjectsSectionProps) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobileDetection()

  // Combine all projects into one array
  const allProjects = [
    ...conversational_ai_projects,
    ...web_projects,
    ...other_projects
  ]

  return (
    <div className="min-h-screen bg-[#141210] flex flex-col items-center">
      <GlobalSpotlight
        gridRef={gridRef}
        disableAnimations={isMobile}
        enabled={true}
        spotlightRadius={350}
        glowColor={GLOW_COLOR}
      />

      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-6">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-4 py-2 bg-black/80 text-white border border-white/20 rounded-none backdrop-blur-sm transition-all duration-300 hover:opacity-70 hover:scale-105"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>back</span>
            </button>
          )}
          <h1 className="text-lg font-normal text-white">PROJECTS</h1>
        </div>

        {/* Projects Grid */}
        <div className="projects-bento-grid bento-section" ref={gridRef}>
          {allProjects.map((project, idx) => (
            <ProjectCard key={idx} project={project} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectsSection
