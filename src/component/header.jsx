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
    const handleSearch = () => {
      navigate('/search')
    }

    const handlePremium = () => {
      navigate('/premium')
    }
    const handleRecipe = () => {
      navigate('/recipe')
    }
    const handleAi = () => {
      navigate('/ai')
    }
    const handleAdmin = () => {
      navigate('/admin')
    }
  
    return (
      <header className="bg-white shadow-sm w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <nav className="flex space-x-20">
              <button
              onClick={handleHome}
              className="text-gray-600 hover:text-blue-600" >
                Trang chủ
              </button>
              <button
              onClick={handleAi}
              className="text-gray-600 hover:text-blue-600" >
                AI
              </button>
              <button
              onClick={handleRecipe}
              className="text-gray-600 hover:text-blue-600" >
                Công thức
              </button>
              <button
              onClick={handleSearch}
              className="text-gray-600 hover:text-blue-600">
                Tìm kiếm
              </button>
              <button
              onClick={handlePremium}
              className="text-gray-600 hover:text-blue-600">
                Premium
              </button>
              <a href="#" className="text-gray-600 hover:text-blue-600">Phản hồi</a>
              <button 
                onClick={handleAdmin}
                className="text-gray-600 hover:text-blue-600 focus:outline-none"
              >
                Admin
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLogin}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </header>
    )
}

export default Header