import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate();
    
    const handleLogin = () => {
      navigate('/login')
    }

    const handleHome = () => {
      navigate('/')
    }

    const handleAbout = () => {
      navigate('/about')
    }
  
    return (
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo và Brand */}
            <div className="flex items-center cursor-pointer" onClick={handleHome}>
              <span className="text-2xl font-bold text-blue-600">Court</span>
              <span className="text-2xl font-bold text-gray-800">site</span>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600">Venues</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Sports</a>
              <button 
                onClick={handleAbout}
                className="text-gray-600 hover:text-blue-600 focus:outline-none"
              >
                About
              </button>
              <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLogin}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </header>
    )
}

export default Header