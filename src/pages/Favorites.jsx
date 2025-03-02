function Favorites() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
        Your Favorite Projects
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center mb-8">
        Here you can find all the projects you've saved for later.
      </p>
      
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">
            You haven't added any favorites yet.
          </p>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Browse projects and click the star icon to add them to your favorites.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Favorites






















