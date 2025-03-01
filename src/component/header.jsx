import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../store/userSlice';
import { logout } from '../store/auth';
import UserProfilePopup from './UserProfilePopup';
import overlayImage from '../assets/logoyumble.png';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const popupRef = useRef(null);
    
    const { token, userId } = useSelector((state) => state.auth);
    const { profile } = useSelector((state) => state.user);

    useEffect(() => {
        if (token && userId) {
            console.log('Fetching profile for user:', userId);
            dispatch(fetchUserProfile(userId));
        }
    }, [token, userId, dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowProfilePopup(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login')
    }

    const handleHome = () => {
        navigate('/')
    }

    const handleAbout = () => {
        navigate('/about')
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
    const handleFavoriteFood = () => {
        navigate('/favoriteFood');
    }
  
    return (
        <header className="bg-white shadow-sm w-full top-0 z-[100] sticky">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <img
                            src={overlayImage}
                            alt="Yumble Logo"
                            className="h-8 sm:h-10 w-auto cursor-pointer"
                            onClick={handleHome}
                        />
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-red-500 hover:bg-red-50 focus:outline-none transition-colors duration-200"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Desktop navigation */}
                    <nav className="hidden md:flex items-center justify-center flex-1 px-4 lg:px-8">
                        <div className="flex items-center justify-center space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12">
                            <button
                                onClick={handleAi}
                                className="text-gray-600 hover:text-red-500 font-medium transition-colors duration-200 text-sm lg:text-base whitespace-nowrap px-2" >
                                AI
                            </button>
                            <button
                                onClick={handleRecipe}
                                className="text-gray-600 hover:text-red-500 font-medium transition-colors duration-200 text-sm lg:text-base whitespace-nowrap px-2" >
                                Công thức
                            </button>
                            <button
                                onClick={handleFavoriteFood}
                                className="text-gray-600 hover:text-red-500 font-medium transition-colors duration-200 text-sm lg:text-base whitespace-nowrap px-2" >
                                Yêu thích
                            </button>
                            <button
                                onClick={handlePremium}
                                className="text-gray-600 hover:text-red-500 font-medium transition-colors duration-200 text-sm lg:text-base whitespace-nowrap px-2">
                                Premium
                            </button>
                            {profile && profile.role === 'ADMIN' && (
                                <button 
                                    onClick={() => navigate('/admin')}
                                    className="text-gray-600 hover:text-red-500 font-medium transition-colors duration-200 text-sm lg:text-base whitespace-nowrap px-2"
                                >
                                    Admin
                                </button>
                            )}
                        </div>
                    </nav>

                    {/* User profile section */}
                    <div className="flex items-center ml-auto">
                        {token && profile ? (
                            <div className="relative" ref={popupRef}>
                                <button
                                    onClick={() => setShowProfilePopup(!showProfilePopup)}
                                    className="flex items-center space-x-2 hover:opacity-80"
                                >
                                    <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-red-500">
                                        <img
                                            src={profile.avatar}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </button>

                                {showProfilePopup && (
                                    <div className="absolute right-0 mt-2 z-[150]">
                                        <UserProfilePopup 
                                            profile={profile}
                                            onClose={() => setShowProfilePopup(false)}
                                            onLogout={handleLogout}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 whitespace-nowrap"
                            >
                                Đăng nhập
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100">
                        <div className="flex flex-col space-y-3">
                            <button
                                onClick={() => { handleHome(); setIsMenuOpen(false); }}
                                className="text-gray-600 hover:text-red-500 font-medium transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-red-50"
                            >
                                Trang chủ
                            </button>
                            <button
                                onClick={() => { handleAi(); setIsMenuOpen(false); }}
                                className="text-gray-600 hover:text-red-500 font-medium transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-red-50"
                            >
                                AI
                            </button>
                            <button
                                onClick={() => { handleRecipe(); setIsMenuOpen(false); }}
                                className="text-gray-600 hover:text-red-500 font-medium transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-red-50"
                            >
                                Công thức
                            </button>
                            <button
                                onClick={() => { handleFavoriteFood(); setIsMenuOpen(false); }}
                                className="text-gray-600 hover:text-red-500 font-medium transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-red-50"
                            >
                                Yêu thích
                            </button>
                            <button
                                onClick={() => { handlePremium(); setIsMenuOpen(false); }}
                                className="text-gray-600 hover:text-red-500 font-medium transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-red-50"
                            >
                                Premium
                            </button>
                            {profile && profile.role === 'ADMIN' && (
                                <button 
                                    onClick={() => { navigate('/admin'); setIsMenuOpen(false); }}
                                    className="text-gray-600 hover:text-red-500 font-medium transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-red-50"
                                >
                                    Admin
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;