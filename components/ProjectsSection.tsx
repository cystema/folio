"use client"

import { useRef } from "react"
import Link from "next/link"
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
  {
    name: "Academic Portfolio",
    description: "Academic Portfolio in Jekyll, built for a friend.",
    image: "/project_section/anupamportfolio.png",
    github: "https://github.com/cystema/anupam-portfolio",
    link: "https://cystema.github.io/anupam-portfolio/",
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
  {
    name: "Rasa Chatbot",
    description: "A simple chatbot built with Rasa and Flask.",
    image: "/project_section/rasa.png",
    github: "https://github.com/cystema/rasa-project",
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
    name: "GPT-Copy",
    description: "A Firefox Plugin to copy ChatGPT output with one click.",
    image: "/project_section/chatgptcopy.png",
    github: "https://github.com/cystema/chatgpt-copy",
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
    className="magic-bento-card magic-bento-card--border-glow"
    style={{ backgroundColor: '#060010', '--glow-color': GLOW_COLOR } as React.CSSProperties}
    disableAnimations={isMobile}
    particleCount={4}
    glowColor={GLOW_COLOR}
    enableTilt={!isMobile}
    clickEffect={true}
    enableMagnetism={false}
  >
    <div className="magic-bento-card__header">
      <div className="magic-bento-card__label text-xs opacity-50">project</div>
    </div>
    <div className="magic-bento-card__content">
      <h3 className="text-base font-normal mb-2">{project.name}</h3>
      <p className="text-xs opacity-60 leading-relaxed mb-4">{project.description}</p>
      <div className="flex gap-3 text-xs">
        <Link 
          href={project.github} 
          target="_blank" 
          className="hover:text-purple-400 transition-colors"
        >
          github ↗
        </Link>
        {project.link && (
          <Link 
            href={project.link} 
            target="_blank" 
            className="hover:text-purple-400 transition-colors"
          >
            demo ↗
          </Link>
        )}
      </div>
    </div>
  </ParticleCard>
)

const ProjectsSection = () => {
  const gridRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobileDetection()

  return (
    <div className="p-4 md:p-6 bg-[#060010] min-h-full">
      <GlobalSpotlight
        gridRef={gridRef}
        disableAnimations={isMobile}
        enabled={true}
        spotlightRadius={350}
        glowColor={GLOW_COLOR}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 px-3">
          <h1 className="text-lg font-normal text-white">PROJECTS</h1>
        </div>

        {/* Conversational AI Section */}
        <div className="mb-8">
          <h2 className="text-xs font-normal mb-4 opacity-50 text-white px-3">CONVERSATIONAL AI</h2>
          <div className="card-grid bento-section" ref={gridRef} style={{ maxWidth: '100%' }}>
            {conversational_ai_projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} isMobile={isMobile} />
            ))}
          </div>
        </div>

        {/* Web Projects Section */}
        <div className="mb-8">
          <h2 className="text-xs font-normal mb-4 opacity-50 text-white px-3">WEB PROJECTS</h2>
          <div className="card-grid bento-section" style={{ maxWidth: '100%' }}>
            {web_projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} isMobile={isMobile} />
            ))}
          </div>
        </div>

        {/* Other Projects Section */}
        <div className="mb-8">
          <h2 className="text-xs font-normal mb-4 opacity-50 text-white px-3">OTHER</h2>
          <div className="card-grid bento-section" style={{ maxWidth: '100%' }}>
            {other_projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectsSection
