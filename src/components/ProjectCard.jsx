import { useState, useEffect } from 'react'

function ProjectCard({ project, onViewDetails }) {
  const [isFavorite, setIsFavorite] = useState(false)
  
  useEffect(() => {
    // Check if project is in favorites on mount
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFavorite(favorites.some(fav => fav.id === project.id))
  }, [project.id])
  
  // Category background colors
  const categoryColors = {
    Web: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    AI: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
    Blockchain: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    Mobile: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200',
    Game: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
  }

  // Experience level colors
  const experienceLevelColors = {
    Beginner: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    Intermediate: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    Advanced: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
    Expert: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
  }

  // Status colors
  const statusColors = {
    Open: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    Closed: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    let newFavorites
    
    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== project.id)
    } else {
      newFavorites = [...favorites, project]
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Card Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img 
              src={project.profilePicture} 
              alt={`${project.ownerName}'s profile`}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">{project.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">by {project.ownerName}</p>
          </div>
        </div>
        <button 
          onClick={toggleFavorite}
          className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <span className="text-2xl">❤️</span>
          ) : (
            <span className="text-2xl">🤍</span>
          )}
        </button>
      </div>
      
      {/* Card Body */}
      <div className="p-4">
        <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
        
        {/* Category and Experience Level */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[project.category] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
            {project.category}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${experienceLevelColors[project.experienceLevel] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
            {project.experienceLevel}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
            {project.status}
          </span>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        {/* Stats */}
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{formatDate(project.dateAdded)}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            <span>{project.viewsCount} views</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
            <span>{project.popularityScore} popularity</span>
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => onViewDetails(project.id)}
          className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default ProjectCard