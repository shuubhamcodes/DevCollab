import ProjectCard from '../components/ProjectCard'

function Home() {
  // Sample project data
  const projects = [
    {
      id: 1,
      name: "AI Image Generator",
      ownerName: "Sarah Chen",
      profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
      description: "An open-source AI image generator that creates realistic images from text descriptions using state-of-the-art machine learning models.",
      category: "AI",
      experienceLevel: "Intermediate",
      tags: ["python", "tensorflow", "react", "api"],
      dateAdded: "2025-03-15",
      viewsCount: 1243,
      status: "Open",
      popularityScore: 87
    },
    {
      id: 2,
      name: "Decentralized Marketplace",
      ownerName: "Alex Johnson",
      profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
      description: "A blockchain-based marketplace for digital goods with built-in escrow and reputation system. Looking for contributors with Solidity experience.",
      category: "Blockchain",
      experienceLevel: "Advanced",
      tags: ["solidity", "ethereum", "web3", "react"],
      dateAdded: "2025-02-28",
      viewsCount: 856,
      status: "Open",
      popularityScore: 72
    },
    {
      id: 3,
      name: "Responsive Portfolio Template",
      ownerName: "Miguel Rodriguez",
      profilePicture: "https://randomuser.me/api/portraits/men/67.jpg",
      description: "A modern, customizable portfolio template for developers built with React and TailwindCSS. Perfect for showcasing your projects and skills.",
      category: "Web",
      experienceLevel: "Beginner",
      tags: ["react", "tailwindcss", "portfolio", "responsive"],
      dateAdded: "2025-04-02",
      viewsCount: 2105,
      status: "Open",
      popularityScore: 93
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
        Welcome to DevCollab
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center mb-10">
        A platform for developers to collaborate, share ideas, and build amazing projects together.
      </p>
      
      <div className="w-full max-w-5xl space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home