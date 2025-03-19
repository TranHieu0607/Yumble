import React from 'react';
import { Link } from 'react-router-dom';
import blog1 from '../../assets/blog1.png';
import blog2 from '../../assets/blog2.6.png';
import blog3 from '../../assets/blog1.2.png';

const Blog = () => {
  const posts = [
    { id: 1, title: 'Thực Đơn Eat Clean Giảm Cân - Món Healthy Đơn Giản với Yumble', image: blog1, description: 'Bạn đang tìm kiếm thực đơn eat clean để giảm cân hiệu quả? 🍽️ Những món healthy đơn giản không chỉ giúp duy trì vóc dáng mà còn tăng cường sức khỏe. Cùng Yumble khám phá những gợi ý thực đơn eat clean dễ làm, giàu dinh dưỡng và phù hợp với mọi chế độ ăn! 🌱' },
    { id: 2, title: 'Gợi Ý Món Ăn Hôm Nay - Hôm Nay Ăn Gì Ngon Với Yumble?', image: blog2, description: 'Bạn đang băn khoăn "hôm nay ăn gì?" hay tìm kiếm gợi ý món ăn hôm nay để vừa ngon miệng vừa lành mạnh? Đừng lo, Yumble sẽ giúp bạn giải quyết câu hỏi "hôm nay ăn gì ngon" một cách dễ dàng! Từ những thực đơn đơn giản, giàu dinh dưỡng đến các bữa ăn nhanh gọn với Meal Kit, cùng khám phá những ý tưởng tuyệt vời để làm phong phú bữa ăn mỗi ngày của bạn!' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-80 h-80 sm:w-64 sm:h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 sm:w-48 sm:h-48 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce [animation-delay:0.5s]"></div>
        <div className="absolute top-1/2 left-1/4 w-72 h-72 sm:w-56 sm:h-56 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce [animation-delay:1s]"></div>
        <div className="absolute -bottom-20 -left-20 w-56 h-56 sm:w-48 sm:h-48 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce [animation-delay:1.5s]"></div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 sm:w-40 sm:h-40 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce [animation-delay:2s]"></div>
      </div>
      <div className="p-6 max-w-5xl mx-auto bg-cover bg-center">
        <div className="flex items-center space-x-2 text-green-600 mb-3">
          <span className="bg-green-100 text-green-600 px-3 py-1 text-sm rounded-full">Blog</span>
          <div className="w-1 h-6 bg-green-600 animate-bounce" />
        </div>
        <h1 className="text-3xl font-bold mb-6 transition-transform transform hover:scale-105">Our Trending Article <span className="text-gray-400">[{posts.length}]</span></h1>
        <div className="space-y-10">
          {posts.map(post => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`} 
              className="flex flex-col sm:flex-row items-center rounded-lg hover:shadow-lg transition-all transform  bg-opacity-80 p-4"
            >
              <div className="p-4 w-full sm:w-3/4">
                <p className="text-sm text-gray-500 mb-1">✍️ Blog</p>
                <h2 className="text-lg font-semibold transition-colors duration-300 hover:text-green-600">{post.title}</h2>
                <p className="text-gray-600 text-sm mt-1">{post.description}</p>
              </div>
              <img src={post.image} alt={post.title} className="w-full h-60 object-cover rounded-r-lg transition-transform duration-300 transform hover:scale-105 sm:w-1/4" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;