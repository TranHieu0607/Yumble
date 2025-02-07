import React from "react";
import { useParams } from "react-router-dom";
import recipeImage from "../../assets/recipe.png";
import logoImage from "../../assets/logoyumble.png";

const RecipeDetail = () => {
  const { id } = useParams();

  // Dữ liệu bài viết (giả lập)
  const recipe = {
    title: "CÁCH LÀM MÓNG GIÒ NƯỚNG SA TẾ NGON MÊ SAY",
    date: "Tháng 9, 28, 2024",
    author: "MTHiên",
    description:
      "Bất cứ mẹo sơ chế móng giò vừa thơm lại sạch, săn giòn khi nướng không sợ bị mùi. Món ăn này rất hấp dẫn, mang lại hương vị độc đáo từ sự kết hợp giữa gia vị và cách nướng truyền thống.",
    ingredients: [
      "2 cái móng giò cắt khoanh nhỏ",
      "1 củ nghệ tươi nhỏ",
      "4 củ hành khô",
      "1 Tbsp muối",
    ],
    image: recipeImage,
  };

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
    <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8 mt-10">
        <img src={logoImage} alt="Yumble Logo" className="h-12 mb-4" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <div className="flex justify-center items-center">
          <p className="text-sm text-gray-500 mb-2">
            Viết bởi <span className="font-semibold text-black ">{recipe.author}</span> |{" "}
            {recipe.date}
          </p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {recipe.description}
          </p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">NGUYÊN LIỆU:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover rounded-lg mb-6 mt-5"
          />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4 border-b pb-2">
            Bài đăng nổi bật
          </h3>
          <ul className="space-y-6">
            {popularPosts.map((post, index) => (
              <li key={index} className="flex space-x-4 items-center">
                <div>
                  <a
                    href="#"
                    className="text-sm font-semibold text-gray-800 hover:text-red-500 transition-colors line-clamp-2"
                  >
                    {post.title}
                  </a>
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

export default RecipeDetail;
