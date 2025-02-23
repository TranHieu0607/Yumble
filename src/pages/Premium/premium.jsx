import React from 'react';
import { useDispatch } from 'react-redux';
import premiumImage from '../../assets/premium.png';
import { processPayment } from '../../store/payment'; // Import action từ payment.js

const Premium = () => {
  const dispatch = useDispatch();

  const handlePayment = (isMonthPremium) => {
    const userId = 'c084de8b-6c1c-4905-8b96-c2b428a67e55'; // Thay thế bằng user ID thực tế
    dispatch(processPayment(userId, isMonthPremium)); // Gọi action để xử lý thanh toán
  };

  return (
    <div className="h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col items-center justify-center px-4 pt-8">
        {/* Premium Badge */}
      <div className="mb-8">
        <img src={premiumImage} alt="Premium Badge" className="h-40 w-40" />
      </div>

      {/* Main Title */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center leading-tight">
        Tìm đồ ăn hợp với bạn nhanh hơn!
      </h1>

      {/* Features List */}
      <div className="flex flex-col gap-6 mb-12 w-full max-w-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-gray-700 text-lg font-medium">Tìm kiếm đồ ăn và địa điểm ăn nhanh hơn bằng cách tích hợp AI</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-gray-700 text-lg font-medium">Tôi bị ngu</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-gray-700 text-lg font-medium">Xem công thức các món ăn</span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {/* Monthly Plan */}
        <div className="relative w-72 cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => handlePayment(true)}>
          <div className="absolute inset-0 rounded-xl shadow-xl"></div>
          <div className="relative bg-black text-white p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-center">Mỗi tháng</h3>
            <p className="text-4xl font-extrabold text-center">59.000đ</p>
            <p className="text-sm text-center mt-2">Hỗ trợ tối ưu, không quảng cáo</p>
          </div>
        </div>

        {/* Yearly Plan */}
        <div className="relative w-72 cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => handlePayment(false)}>
          <div className="absolute inset-0 rounded-xl shadow-xl"></div>
          <div className="relative bg-black text-white p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-center">Mỗi năm</h3>
            <p className="text-4xl font-extrabold text-center">599.000đ</p>
            <p className="text-sm text-center mt-2">Tiết kiệm hơn 20% so với gói tháng</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
