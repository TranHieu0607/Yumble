import React from "react";
import { Link } from "react-router-dom";
import recipeImage from "../../assets/recipe.png";
import logoImage from "../../assets/logoyumble.png";


const RecipePage = () => {
  const recipes = [
    {
      id: 1,
      title: "CÁCH LÀM MÌ TÌM CẮT CHUA CAY NGON MÊ SAY",
      category: "Công thức",
      cuisine: "Món Việt Nam",
      image: recipeImage,
      date: "September 28, 2023",
      author: "MTDuo",
      description:
        "Mì tìm ngon với chế độ trộn công nghệ tính thông minh & cách nấu nước cốt mì cực độc đáo...",
    },
    {
      id: 2,
      title: 'CÁCH LÀM "MÌ LẠNH" XỐT XÌ DẦU NGON DỄO ĐỂ HƠN ĂN KEO',
      category: "Công thức",
      cuisine: "Món Việt Nam",
      image: recipeImage,
      date: "September 28, 2023",
      author: "MTDuo",
      description: "Thỏa mãn vị giác với mì lạnh kiểu Hàn Quốc, rất dễ làm...",
    },
    {
      id: 3,
      title: "[GÓC CHANH HỘI] CÁCH TỈA CHANH SAO CHO CHANH",
      category: "Công thức",
      cuisine: "Món Việt Nam",
      image: recipeImage,
      date: "September 28, 2023",
      author: "MTDuo",
      description: "Hướng dẫn tỉa chanh đẹp mắt, giúp bữa ăn thêm sáng tạo...",
    },
    {
      id: 4,
      title: 'BÍ KÍP CHIÊN CÁNH GÀ "JUICY" ĐẬM ĐÀ, LÀM DỄ NHẤT TRÊN ĐỜI',
      category: "Công thức",
      cuisine: "Món Việt Nam",
      image: recipeImage,
      date: "September 28, 2023",
      author: "MTDuo",
      description: "Cách chiên cánh gà ngon tuyệt, thơm lừng hấp dẫn...",
    },
  ];

  const popularPosts = [
    {
      title: "CÁCH LÀM SANDWICH TRỨNG NGON",
      day: "April 15, 2020",
      img: recipeImage,
    },
    {
      title: "SUNDAE – MÓN ĐỒI HEO ĐƯỜNG PHỐ KIỂU HÀN",
      day: "April 16, 2020",
      img: recipeImage,
    },
    {
      title: 'CÁCH LÀM BÁNH CÁ "BUNGEOPPANG"',
      day: "April 17, 2020",
      img: recipeImage,
    },
    {
      title: "HỌC CÁCH LÀM DỪA (THƠM) 2 KIỂU CỰC DỄ",
      day: "April 18, 2020",
      img: recipeImage,
    },
    {
      title: 'CÁCH CHIÊN CÁNH GÀ "JUICY" NGON ĐẬM ĐÀ',
      day: "April 19, 2020",
      img: recipeImage,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8 ">
        <img src={logoImage} alt="Yumble Logo" className="h-full " />
      </div>
      <input
        type="text"
        placeholder="Công thức bạn muốn"
        className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 mb-4"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Recipe Section */}
        <div className="lg:col-span-2">
          {/* Section Title */}
          <div className="relative w-full mb-5">
            <div className="absolute inset-0 bg-[#313131] h-12"></div>
            <h2 className="relative text-2xl font-bold text-white px-4 py-2 inline-block w-max mx-auto">
              Công thức
            </h2>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="group">
                <Link to={`/recipedetail`}>
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-center items-center text-sm text-[#689F38] mb-2">
                      <span>{recipe.category}</span>
                      <span className="mx-2">•</span>
                      <span>{recipe.cuisine}</span>
                    </div>
                    <h2 className="text-lg font-bold mb-2 group-hover:text-red-500 transition-colors">
                      {recipe.title}
                    </h2>
                    <div className="flex justify-center items-center text-sm text-gray-500">
                      <span className="font-bold">by {recipe.author}</span>
                      <span className="mx-2">|</span>
                      <span>{recipe.date}</span>
                    </div>
                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                      {recipe.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar - Popular Posts */}
        <div>
          <h3 className="text-lg font-bold mb-4 border-b pb-2">
            Bài đăng nổi bật
          </h3>
          <ul className="space-y-6">
            {popularPosts.map((post, index) => (
              <li key={index} className="flex space-x-4 items-center">
                <div>
                  <Link
                    to="#"
                    className="text-sm font-semibold text-gray-800 hover:text-red-500 transition-colors line-clamp-2"
                  >
                    {post.title}
                  </Link>
                  <p className="text-xs text-gray-500 mt-1">{post.day}</p>
                </div>
                <div className="w-30 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
