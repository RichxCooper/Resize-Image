import React from 'react'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🖼️ Image Resizer Pro
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional image resizing with AI-powered background removal and advanced save options
          </p>
        </div>
        
        <div className="mt-6 flex justify-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Resize Images</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Remove Backgrounds</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <span>Multiple Formats</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
