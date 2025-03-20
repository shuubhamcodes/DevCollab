import { useState, useEffect } from 'react'
import ProjectCard from '../components/ProjectCard'

function Home() {
  // Sample project data
  const allProjects = [
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
    },
    {
      id: 4,
      name: "Mobile Fitness Tracker",
      ownerName: "Priya Patel",
      profilePicture: "https://randomuser.me/api/portraits/women/22.jpg",
      description: "A React Native app that tracks workouts, nutrition, and progress with beautiful visualizations and social sharing features.",
      category: "Mobile",
      experienceLevel: "Intermediate",
      tags: ["react-native", "firebase", "fitness", "mobile"],
      dateAdded: "2025-03-22",
      viewsCount: 1567,
      status: "Open",
      popularityScore: 81
    },
    {
      id: 5,
      name: "Retro Arcade Game",
      ownerName: "David Kim",
      profilePicture: "https://randomuser.me/api/portraits/men/45.jpg",
      description: "A browser-based retro arcade game collection built with vanilla JavaScript and HTML Canvas. Looking for pixel artists and game developers.",
      category: "Game",
      experienceLevel: "Beginner",
      tags: ["javascript", "canvas", "game-dev", "pixel-art"],
      dateAdded: "2025-02-10",
      viewsCount: 3210,
      status: "Open",
      popularityScore: 95
    },
    {
      id: 6,
      name: "Smart Home Dashboard",
      ownerName: "Emma Wilson",
      profilePicture: "https://randomuser.me/api/portraits/women/33.jpg",
      description: "An IoT dashboard for smart home devices with real-time monitoring, automation rules, and voice control integration.",
      category: "Web",
      experienceLevel: "Advanced",
      tags: ["iot", "react", "mqtt", "websockets"],
      dateAdded: "2025-01-15",
      viewsCount: 1876,
      status: "Closed",
      popularityScore: 79
    }
  ];

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState('');
  const [sortOption, setSortOption] = useState('dateAdded');
  const [filteredProjects, setFilteredProjects] = useState(allProjects);
  const [projectViews, setProjectViews] = useState({});

  // Available categories and experience levels
  const categories = ['Web', 'AI', 'Blockchain', 'Mobile', 'Game'];
  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const sortOptions = [
    { value: 'dateAdded', label: 'Date Added (Newest)' },
    { value: 'dateAddedAsc', label: 'Date Added (Oldest)' },
    { value: 'popularityScore', label: 'Popularity (Highest)' },
    { value: 'popularityScoreAsc', label: 'Popularity (Lowest)' },
    { value: 'experienceLevel', label: 'Experience Level' }
  ];

  // Handle view details click
  const handleViewDetails = (projectId) => {
    setProjectViews(prev => ({
      ...prev,
      [projectId]: (prev[projectId] || 0) + 1
    }));
  };

  // Filter and sort projects when any filter changes
  useEffect(() => {
    let result = [...allProjects];
    
    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(project => 
        project.name.toLowerCase().includes(lowerCaseSearch) ||
        project.ownerName.toLowerCase().includes(lowerCaseSearch) ||
        project.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch))
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(project => project.category === selectedCategory);
    }
    
    // Apply experience level filter
    if (selectedExperienceLevel) {
      result = result.filter(project => project.experienceLevel === selectedExperienceLevel);
    }
    
    // Apply sorting
    result = sortProjects(result, sortOption);
    
    setFilteredProjects(result);
  }, [searchTerm, selectedCategory, selectedExperienceLevel, sortOption]);

  // Sort projects based on selected option
  const sortProjects = (projects, option) => {
    const sortedProjects = [...projects];
    
    switch (option) {
      case 'dateAdded':
        return sortedProjects.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      case 'dateAddedAsc':
        return sortedProjects.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
      case 'popularityScore':
        return sortedProjects.sort((a, b) => b.popularityScore - a.popularityScore);
      case 'popularityScoreAsc':
        return sortedProjects.sort((a, b) => a.popularityScore - b.popularityScore);
      case 'experienceLevel':
        const levelOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'Expert': 4 };
        return sortedProjects.sort((a, b) => levelOrder[a.experienceLevel] - levelOrder[b.experienceLevel]);
      default:
        return sortedProjects;
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedExperienceLevel('');
    setSortOption('dateAdded');
  };

  // SearchBar component
  const SearchBar = () => (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      <input
        type="text"
        className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search projects by name, owner, or tags..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={() => setSearchTerm('')}
        >
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 12 12M1 13 13 1"/>
          </svg>
        </button>
      )}
    </div>
  );

  // Filters component
  const Filters = () => (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="w-full sm:w-auto">
        <select
          className="block w-full p-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      <div className="w-full sm:w-auto">
        <select
          className="block w-full p-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          value={selectedExperienceLevel}
          onChange={(e) => setSelectedExperienceLevel(e.target.value)}
        >
          <option value="">All Experience Levels</option>
          {experienceLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>
      
      {(selectedCategory || selectedExperienceLevel || searchTerm) && (
        <button
          className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-800"
          onClick={resetFilters}
        >
          Clear Filters
        </button>
      )}
    </div>
  );

  // SortDropdown component
  const SortDropdown = () => (
    <div className="w-full sm:w-auto">
      <select
        className="block w-full p-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
        Welcome to DevCollab
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center mb-10">
        A platform for developers to collaborate, share ideas, and build amazing projects together.
      </p>
      
      <div className="w-full max-w-5xl space-y-6">
        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
          <div className="mb-4">
            <SearchBar />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <Filters />
            <SortDropdown />
          </div>
        </div>
        
        {/* Results Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {filteredProjects.length > 0 
                ? `Projects (${filteredProjects.length})` 
                : 'No projects found'}
            </h2>
          </div>
          
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={{
                    ...project,
                    viewsCount: (projectViews[project.id] || 0) + project.viewsCount
                  }}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                No projects match your current filters. Try adjusting your search criteria.
              </p>
              <button
                className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home