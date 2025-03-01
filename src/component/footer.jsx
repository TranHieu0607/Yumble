import React from 'react';
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#263238] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* About Section */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-white border-b-2 border-red-500 pb-2 mb-3 sm:mb-4 inline-block">
              Về Yumble
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Yumble là nền tảng chia sẻ công thức nấu ăn, kết nối những người yêu thích ẩm thực và khám phá văn hóa ẩm thực đa dạng trên toàn thế giới.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-white border-b-2 border-red-500 pb-2 mb-3 sm:mb-4 inline-block">
              Liên Kết Nhanh
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/" className="text-sm sm:text-base hover:text-red-400 transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="text-sm sm:text-base hover:text-red-400 transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                  Công Thức
                </Link>
              </li>
              <li>
                <Link to="/favorite" className="text-sm sm:text-base hover:text-red-400 transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                  Yêu Thích
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm sm:text-base hover:text-red-400 transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                  Về Chúng Tôi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-white border-b-2 border-red-500 pb-2 mb-3 sm:mb-4 inline-block">
              Liên Hệ
            </h3>
            <div className="space-y-3">
              <p className="flex items-center text-sm sm:text-base group">
                <FaPhone className="mr-3 text-red-400 group-hover:text-red-300 transition-colors duration-200" />
                <span className="group-hover:text-red-400 transition-colors duration-200">+84 123 456 789</span>
              </p>
              <p className="flex items-center text-sm sm:text-base group">
                <FaEnvelope className="mr-3 text-red-400 group-hover:text-red-300 transition-colors duration-200" />
                <span className="group-hover:text-red-400 transition-colors duration-200">contact@yumble.com</span>
              </p>
              <p className="flex items-center text-sm sm:text-base group">
                <FaMapMarkerAlt className="mr-3 text-red-400 group-hover:text-red-300 transition-colors duration-200" />
                <span className="group-hover:text-red-400 transition-colors duration-200">Thành phố Hồ Chí Minh, Việt Nam</span>
              </p>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-white border-b-2 border-red-500 pb-2 mb-3 sm:mb-4 inline-block">
              Kết Nối
            </h3>
            <div className="flex flex-col space-y-3">
              <a 
                href="https://www.facebook.com/profile.php?id=61573046339972" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-sm sm:text-base hover:text-blue-400 transition-colors duration-200 group"
              >
                <FaFacebook className="mr-3 text-xl group-hover:text-blue-400 transition-colors duration-200" />
                <span>Facebook</span>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-sm sm:text-base hover:text-pink-400 transition-colors duration-200 group"
              >
                <FaInstagram className="mr-3 text-xl group-hover:text-pink-400 transition-colors duration-200" />
                <span>Instagram</span>
              </a>
              <a 
                href="mailto:contact@yumble.com" 
                className="flex items-center text-sm sm:text-base hover:text-red-400 transition-colors duration-200 group"
              >
                <FaEnvelope className="mr-3 text-xl group-hover:text-red-400 transition-colors duration-200" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="my-8 sm:my-10">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        </div>

        {/* Copyright Section */}
        <div className="text-center space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm text-gray-400">
            &copy; 2024 Yumble. Đã đăng ký bản quyền.
          </p>
          <p className="text-xs sm:text-sm text-gray-400 flex items-center justify-center flex-wrap gap-1">
            <span>Thiết kế và phát triển bởi</span>
            <span className="text-white hover:text-red-400 transition-colors duration-200">Trần Minh Hiếu</span>
            <span>với</span>
            <FaHeart className="mx-1 text-red-400 animate-pulse" />
            <span>từ</span>
            <span className="text-white hover:text-red-400 transition-colors duration-200">Nguyễn Minh Thiên</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;