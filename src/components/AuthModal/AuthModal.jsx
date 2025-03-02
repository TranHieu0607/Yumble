import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from "../../assets/logoyumble.png";

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    navigate('/login');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-2xl p-6 max-w-md w-full mx-4 transform animate-fade-scale shadow-2xl">
        <div className="flex items-center justify-center mb-6">
          <img src={logoImage} alt="Yumble Logo" className="h-16 w-auto" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-3">
          Bạn chưa đăng nhập!
        </h3>
        <p className="text-gray-600 text-center mb-8 text-lg">
          Vui lòng đăng nhập để sử dụng tính năng này
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleLogin}
            className="w-full bg-red-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Đăng nhập ngay
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300 text-lg hover:shadow-lg"
          >
            Để sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 