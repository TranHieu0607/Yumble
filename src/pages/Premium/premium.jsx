import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import premiumImage from '../../assets/premium.png';
import { processPayment } from '../../store/payment'; // Import action từ payment.js
import { fetchUserPremium } from '../../store/userSlice'; // Import fetchUserPremium từ userSlice.js

const Premium = () => {
  const [isPremium, setIsPremium] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkPremiumStatus = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const premiumData = await dispatch(fetchUserPremium(userId)).unwrap();
        if (premiumData && new Date(premiumData.premiumExpiry) > new Date()) {
          setIsPremium(true); // Cập nhật trạng thái nếu đã có gói premium
        }
      }
    };

    checkPremiumStatus();
  }, [dispatch]);

  const handlePayment = async (isMonthPremium) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    
    if (!userId || !token) {
      alert('Vui lòng đăng nhập để thực hiện thanh toán');
      return;
    }
    
    if (!token.startsWith('Bearer ')) {
      alert('Token không hợp lệ, vui lòng đăng nhập lại');
      return;
    }

    // Nếu đã có gói premium, không cho phép thanh toán
    if (isPremium) {
      alert('Tài khoản của bạn đã có gói premium còn hiệu lực. Bạn không thể đăng ký lại.');
      return;
    }

    dispatch(processPayment(userId, isMonthPremium));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center">
          {/* Premium Badge */}
          <div className="mb-6 sm:mb-8 lg:mb-10 transform hover:scale-105 transition-transform duration-300">
            <img 
              src={premiumImage} 
              alt="Premium Badge" 
              className="h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40 object-contain"
            />
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-6 sm:mb-8 lg:mb-10 text-center leading-tight max-w-3xl">
            Tìm đồ ăn hợp với bạn nhanh hơn!
          </h1>

          {/* Features List */}
          <div className="flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12 w-full max-w-2xl">
            <div className="flex items-start sm:items-center gap-3 p-4  duration-300">
              <div className="p-2 bg-green-100 rounded-full shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-base sm:text-lg text-gray-700 font-medium">
                Tìm kiếm đồ ăn và địa điểm ăn nhanh hơn bằng cách tích hợp AI
              </span>
            </div>
            <div className="flex items-start sm:items-center gap-3 p-4  duration-300">
              <div className="p-2 bg-green-100 rounded-full shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-base sm:text-lg text-gray-700 font-medium">
                Xem công thức các món ăn
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl w-full">
            {/* Monthly Plan */}
            <div 
              className={`group relative cursor-pointer transform hover:scale-105 transition-all duration-300 ${isPremium ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => {
                if (!isPremium) {
                  handlePayment(true);
                } else {
                  alert('Tài khoản của bạn đã có gói premium còn hiệu lực. Bạn không thể đăng ký lại.');
                }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-amber-500 rounded-xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-black text-white p-6 sm:p-8 rounded-xl shadow-lg">
                <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Phổ biến
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">Mỗi tháng</h3>
                <p className="text-3xl sm:text-4xl font-extrabold text-center mb-2">59.000đ</p>
                <p className="text-sm text-center mt-2 text-gray-300">Hỗ trợ tối ưu, không quảng cáo</p>
              </div>
            </div>

            {/* Yearly Plan */}
            <div 
              className={`group relative cursor-pointer transform hover:scale-105 transition-all duration-300 ${isPremium ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => {
                if (!isPremium) {
                  handlePayment(false);
                } else {
                  alert('Tài khoản của bạn đã có gói premium còn hiệu lực. Bạn không thể đăng ký lại.');
                }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-black text-white p-6 sm:p-8 rounded-xl shadow-lg">
                <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Tiết kiệm
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">Mỗi năm</h3>
                <p className="text-3xl sm:text-4xl font-extrabold text-center mb-2">599.000đ</p>
                <p className="text-sm text-center mt-2 text-gray-300">Tiết kiệm hơn 20% so với gói tháng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
