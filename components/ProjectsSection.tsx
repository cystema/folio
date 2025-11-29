import Link from "next/link"

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
    name: "MovieLang AI: Movies with Langflow",
    description:
      "Conversational AI tool powered by LangChain, Langflow, AstraDB, RAG, and GPT, offering seamless, intelligent movie recommendations through real-time data retrieval.",
    image: "/project_section/movielangai.png",
    github: "https://github.com/cystema/movielang-ai",
  },
  {
    name: "Langchain Hierarchical Planning Agent",
    description:
      "Hierarchical API Planner using LangChain and the OpenAPI Toolkit to intelligently navigate and consume an API spec, determining and calling endpoints sequentially based on complex user queries.",
    image: "/project_section/hpa.png",
    github: "https://github.com/cystema/langchain-openapi-tmdb",
  },
  {
    name: "Insight Engine: CSV AI ",
    description:
      "Interactive conversational tool that leverages LangChain, HoloViz Panel, and OpenAI GPT to empower users to seamlessly upload, query, and interact with their CSV data. ",
    image: "/project_section/csvai.png",
    github: "https://github.com/cystema/langchain-panel-csv-query",
  },
  {
    name: "Movie AI Assistant",
    description:
      "Conversational chatbot leveraging Dialogflow and Gen AI to provide personalized movie recommendations based on user queries.",
    image: "/project_section/movieassistant.png",
    github: "https://github.com/cystema/movieassistant",
  },
  {
    name: "Insight Engine: PDF AI",
    description:
      "AI-powered application that allows interactions with PDF documents and provides intelligent responses in a conversational format using RAG, Langchain, OpenAI, and HuggingFace.",
    image: "/project_section/pdfassistant.png",
    github: "https://github.com/cystema/pdf-reader-langchain-streamlit",
  },
  {
    name: "WikiLam: Wiki AI",
    description:
      "Conversational Wikipedia query tool that leverages LlamaIndex, Chainlit, and OpenAI GPT to help you query and interact with indexed Wikipedia pages in a conversational manner.",
    image: "/project_section/wikilam.png",
    github: "https://github.com/cystema/wikilam",
  },
  {
    name: "RAG + Langchain",
    description:
      "Walks through the process of integrating Google’s Gemini API with LangChain to create a Retrieval-Augmented Generation (RAG) system for querying PDFs.",
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
    description:
      "An implementation of popular game Wordle, with NextJS. The game is fully responsive and can be played on any device.",
    image: "/project_section/wordle.png",
    github: "https://github.com/cystema/wordle",
    link: "https://wordle.shubh.ink/",
  },
  {
    name: "GPT-Copy",
    description: "A Firefox Plugin that allows you to copy ChatGPT output with the click of a button.",
    image: "/project_section/chatgptcopy.png",
    github: "https://github.com/cystema/chatgpt-copy",
  },
  {
    name: "NoShorts",
    description: "A Firefox Plugin that removes all YouTube Shorts elements from the search results.",
    image: "/project_section/noshorts.png",
    github: "https://github.com/cystema/NoShorts",
    link: "https://addons.mozilla.org/en-US/firefox/addon/noytshorts/",
  },
]

const ProjectsSection = () => {
  return (
    <div className="p-8 font-mono text-white bg-black min-h-full">
      <div className="mb-12">
        <h1 className="text-lg font-normal mb-8">PROJECTS</h1>
      </div>

      <div className="mb-12">
        <h2 className="text-sm font-normal mb-6 opacity-60">CONVERSATIONAL AI</h2>
        <div className="space-y-4">
          {conversational_ai_projects.map((project, idx) => (
            <div key={idx} className="border-b border-current/10 pb-4">
              <div className="mb-2">
                <h3 className="font-medium text-base">{project.name}</h3>
                <p className="text-sm opacity-70 mt-1 leading-relaxed">{project.description}</p>
              </div>
              <div className="flex space-x-4 text-sm">
                <Link href={project.github} target="_blank" className="hover:opacity-70 transition-opacity underline">
                  GitHub
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-sm font-normal mb-6 opacity-60">WEB PROJECTS</h2>
        <div className="space-y-4">
          {web_projects.map((project, idx) => (
            <div key={idx} className="border-b border-current/10 pb-4">
              <div className="mb-2">
                <h3 className="font-medium text-base">{project.name}</h3>
                <p className="text-sm opacity-70 mt-1 leading-relaxed">{project.description}</p>
              </div>
              <div className="flex space-x-4 text-sm">
                <Link href={project.github} target="_blank" className="hover:opacity-70 transition-opacity underline">
                  GitHub
                </Link>
                {project.link && (
                  <Link href={project.link} target="_blank" className="hover:opacity-70 transition-opacity underline">
                    Live Demo
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-sm font-normal mb-6 opacity-60">OTHER PROJECTS</h2>
        <div className="space-y-4">
          {other_projects.map((project, idx) => (
            <div key={idx} className="border-b border-current/10 pb-4">
              <div className="mb-2">
                <h3 className="font-medium text-base">{project.name}</h3>
                <p className="text-sm opacity-70 mt-1 leading-relaxed">{project.description}</p>
              </div>
              <div className="flex space-x-4 text-sm">
                <Link href={project.github} target="_blank" className="hover:opacity-70 transition-opacity underline">
                  GitHub
                </Link>
                {project.link && (
                  <Link href={project.link} target="_blank" className="hover:opacity-70 transition-opacity underline">
                    Live Demo
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectsSection
