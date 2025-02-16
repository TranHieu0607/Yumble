import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const UserProfilePopup = ({ profile, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
      <div className="bg-orange-500 text-white px-5 py-4 flex items-center gap-3">
        <img 
          src={profile?.avatar || 'https://via.placeholder.com/50'} 
          alt="Avatar" 
          className="w-12 h-12 rounded-full border-2 border-white object-cover"
        />
        <div>
          <p className="text-sm font-bold">{profile?.name}</p>
          <p className="text-xs opacity-90">{profile?.email}</p>
        </div>
      </div>

      <div className="py-2 bg-gray-50">
        <button
          onClick={() => {
            navigate('/profile');
            onClose();
          }}
          className="flex items-center w-full px-5 py-3 text-sm text-gray-800 hover:bg-orange-100 transition-all"
        >
          <FaUser className="mr-3 h-5 w-5 text-orange-500" />
          Trang cá nhân
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center w-full px-5 py-3 text-sm text-gray-800 hover:bg-orange-100 transition-all"
        >
          <FaSignOutAlt className="mr-3 h-5 w-5 text-red-500" />
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default UserProfilePopup;
