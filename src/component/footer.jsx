import React from 'react';
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-black-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="flex justify-center items-center">
          <div className="flex space-x-4">
            <a 
              href="https://www.facebook.com/profile.php?id=61573046339972" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:text-black-500"
            >
              <FaFacebook className="mr-1" />  FACEBOOK
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:text-black-500"
            >
              <FaInstagram className="mr-1" />  INSTAGRAM
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:text-black-500"
            >
              <FaEnvelope className="mr-1" />  GMAIL
            </a>
          </div>
        </div>
        <hr className="border-gray-800 my-4" />
        <div className="text-sm text-center">
          <p>&copy; 2024 - Nguyễn Minh Thiên. Đã đăng ký bản quyền. Thiết kế và phát triển bởi Trần Minh Hiếu</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;