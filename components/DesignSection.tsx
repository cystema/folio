import Image from "next/image"

const logo_designs = [
  {
    name: "UtahSec",
    description: "A logo for University of Utah's cybersecurity club.",
    image: "/design_section/utahsec1.png",
  },
  {
    name: "CTF Team",
    description: "A logo for University of Utah's official capture-the-flag team.",
    image: "/design_section/utahsec3.png",
  },
]

const DesignSection = () => {
  return (
    <div className="p-8 font-mono text-white">
      <div className="mb-12">
        <h2 className="text-lg font-normal mb-8">DESIGN PORTFOLIO</h2>

        {/* Logo Design Section */}
        <div className="mb-12">
          <h3 className="text-sm font-normal mb-6 opacity-60">LOGO DESIGN</h3>
          <div className="space-y-6">
            {logo_designs.map((design, idx) => (
              <div key={idx} className="border-b border-current/10 pb-6">
                <div className="mb-4">
                  <Image
                    src={design.image || "/placeholder.svg"}
                    alt={design.name}
                    width={400}
                    height={300}
                    className="w-full rounded border border-current/10 hover:scale-105 transition-transform duration-300 ease-out"
                  />
                </div>
                <div className="mb-2">
                  <h4 className="font-medium">{design.name}</h4>
                </div>
                <p className="text-sm opacity-70 leading-relaxed">{design.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignSection
