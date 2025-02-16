import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../store/userSlice';
import { logout } from '../store/auth';
import UserProfilePopup from './UserProfilePopup';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showProfilePopup, setShowProfilePopup] = useState(false);
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
  
    return (
        <header className="bg-white shadow-sm w-full top-0 z-[100]">
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
                            onClick={handlePremium}
                            className="text-gray-600 hover:text-blue-600">
                            Premium
                        </button>
                        <a href="#" className="text-gray-600 hover:text-blue-600">Phản hồi</a>
                        {profile && profile.role === 'ADMIN' && (
                            <button 
                                onClick={() => navigate('/admin')}
                                className="text-gray-600 hover:text-blue-600"
                            >
                                Admin
                            </button>
                        )}
                    </nav>
                    <div className="flex items-center space-x-4">
                        {console.log('Current state:', { token, userId, profile })}
                        {token && profile ? (
                            <div className="relative" ref={popupRef}>
                                <button
                                    onClick={() => setShowProfilePopup(!showProfilePopup)}
                                    className="flex items-center space-x-2 hover:opacity-80"
                                >
                                    <div className="w-8 h-8 rounded-full overflow-hidden">
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
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
                            >
                                Đăng nhập
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header