import React from 'react';
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt,  FaTiktok } from 'react-icons/fa';
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
                <Link to="/recipe" className="text-sm sm:text-base hover:text-red-400 transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                  Công Thức
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
                <span className="group-hover:text-red-400 transition-colors duration-200">+84 867 632 610</span>
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
                href="https://www.instagram.com/yumble.vn?igsh=eDUzNnA2anpybGtw&utm_source=qr&fbclid=IwZXh0bgNhZW0CMTEAAR0vKWI-8EASOMPGbCWXKlFaYGoh82IiLtxcyys116-cRepXgGFBTiW6fsg_aem_SGekIFRPcYnA6G4ryaLHOg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-sm sm:text-base hover:text-pink-400 transition-colors duration-200 group"
              >
                <FaInstagram className="mr-3 text-xl group-hover:text-pink-400 transition-colors duration-200" />
                <span>Instagram</span>
              </a>
              <a 
                href="https://www.tiktok.com/@yumblevn?_t=ZS-8uwMAVL1by4&_r=1&fbclid=IwZXh0bgNhZW0CMTEAAR11x34du9BOtaw8_xhFrvkXCVMPNf8FXbb0iBTeKOqv9ofcNLwTrAEZc2E_aem_kk3SM1mAvCMlQfXsal1Dcg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-sm sm:text-base hover:text-[#00f2ea] transition-colors duration-200 group"
              >
                <FaTiktok className="mr-3 text-xl group-hover:text-[#00f2ea] transition-colors duration-200" />
                <span>TikTok</span>
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
            &copy; 2025 Yumble. Đã đăng ký bản quyền.
          </p>
          <p className="text-xs sm:text-sm text-gray-400 flex items-center justify-center flex-wrap gap-1">
            <span>Thiết kế và phát triển bởi</span>
            <span className="text-white hover:text-red-400 transition-colors duration-200">Trần Minh Hiếu</span>
            <span>với</span>
            <span className="text-white hover:text-red-400 transition-colors duration-200">Trần Nguyễn Minh Thiên</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;