import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFoodFromFavorites } from "../../store/favorite";
import { Link } from "react-router-dom";
import logoImage from "../../assets/logoyumble.png";
import { useNavigate } from "react-router-dom";
import { fetchFoodSuggestions } from "../../store/food";

const FavoriteFoodPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorite = useSelector((state) => state.favorite);
  const currentUser = useSelector((state) => state.auth.userId);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Trạng thái phân trang cho món ăn yêu thích
  const [currentPageFavorites, setCurrentPageFavorites] = useState(1);
  const itemsPerPageFavorites = 4;

  // Trạng thái phân trang cho bài đăng nổi bật
  const [currentPagePosts, setCurrentPagePosts] = useState(1);
  const itemsPerPagePosts = 3;

  const { suggestions = [] } = useSelector((state) => state.food) || {};

  // Trạng thái phân trang cho gợi ý món ăn
  const [currentPageSuggestions, setCurrentPageSuggestions] = useState(1);
  const itemsPerPageSuggestions = 4;

  useEffect(() => {
    // Fetch lại gợi ý món ăn khi dietary hoặc allergy thay đổi
    dispatch(fetchFoodSuggestions(currentUser)); // Gọi lại API để lấy gợi ý mới
  }, [favorite.dietary, favorite.allergy]); // Lắng nghe các thay đổi

  // Kiểm tra trạng thái loading và error
  if (favorite.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Đang tải dữ liệu...</div>
      </div>
    );
  }

  if (favorite.error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Lỗi: {favorite.error.message || 'Có lỗi xảy ra'}</div>
      </div>
    );
  }

  // Đảm bảo favoriteFoods là một mảng
  const favoriteFoodsList = favorite.favoriteFoods || [];

  // Lọc món ăn theo search term
  const filteredFavoriteFoods = favoriteFoodsList.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  // Tính toán các món ăn cho trang hiện tại
  const indexOfLastItemFavorites = currentPageFavorites * itemsPerPageFavorites;
  const indexOfFirstItemFavorites = indexOfLastItemFavorites - itemsPerPageFavorites;
  const currentFavoriteFoods = filteredFavoriteFoods.slice(indexOfFirstItemFavorites, indexOfLastItemFavorites);

  // Tính tổng số trang cho món ăn yêu thích
  const totalPagesFavorites = Math.ceil(filteredFavoriteFoods.length / itemsPerPageFavorites);

  // Tính toán các bài đăng nổi bật cho trang hiện tại
  const indexOfLastItemPosts = currentPagePosts * itemsPerPagePosts;
  const indexOfFirstItemPosts = indexOfLastItemPosts - itemsPerPagePosts;
  const currentPosts = favoriteFoodsList.slice(indexOfFirstItemPosts, indexOfLastItemPosts);

  // Tính tổng số trang cho bài đăng nổi bật
  const totalPagesPosts = Math.ceil(favoriteFoodsList.length / itemsPerPagePosts);

  // Tính toán các món ăn cho trang hiện tại
  const indexOfLastItemSuggestions = currentPageSuggestions * itemsPerPageSuggestions;
  const indexOfFirstItemSuggestions = indexOfLastItemSuggestions - itemsPerPageSuggestions;
  const currentSuggestions = suggestions.slice(indexOfFirstItemSuggestions, indexOfLastItemSuggestions);
  const totalPagesSuggestions = Math.ceil(suggestions.length / itemsPerPageSuggestions);

  // Lọc gợi ý món ăn theo search term
  const filteredSuggestions = suggestions.filter(food => {
    const foodNameMatch = food.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
    const allergyMatch = food.allergies && food.allergies.some(allergy => 
      allergy.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
    const dietaryMatch = food.dietary && food.dietary.some(diet => 
      diet.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

    return foodNameMatch || allergyMatch || dietaryMatch;
  });

  const handleRemoveFromFavorites = async (foodId) => {
    if (!currentUser) {
      alert("Bạn cần đăng nhập để xóa món ăn yêu thích.");
      return;
    }
    
    try {
      await dispatch(removeFoodFromFavorites({ userId: currentUser, foodId }));
    } catch (error) {
      alert("Có lỗi xảy ra khi xóa món ăn khỏi danh sách yêu thích.");
    }
  };

  const handleNavigateToDetail = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col items-center mb-4 sm:mb-8">
        <img src={logoImage} alt="Yumble Logo" className="h-12 sm:h-16 w-auto" />
      </div>

      <div className="relative w-full mb-3 sm:mb-5">
        <h2 className="text-xl sm:text-2xl font-bold">Gợi ý món ăn</h2>
        <input
          type="text"
          placeholder="Tìm kiếm món ăn ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2 mb-3 sm:mb-5 text-sm sm:text-base"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
        <div className="lg:col-span-2">
          <div className="relative w-full mb-3 sm:mb-5">
            <div className="absolute inset-0 bg-[#313131] h-10 sm:h-12"></div>
            <h2 className="relative text-xl sm:text-2xl font-bold text-white px-3 sm:px-4 py-1 sm:py-2 inline-block w-max mx-auto">
              Gợi ý món ăn
            </h2>
          </div>

          {suggestions.loading ? (
            <div className="text-center py-4">Đang tải gợi ý món ăn...</div>
          ) : suggestions.error ? (
            <div className="text-red-500 text-center py-4">{suggestions.error.message}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
              {filteredSuggestions.slice(indexOfFirstItemSuggestions, indexOfLastItemSuggestions).map((food) => (
                <div key={food.id} className="group">
                  <div className="relative overflow-hidden rounded-lg cursor-pointer">
                    <Link to={`/recipe/${food.id}`}>
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-40 sm:h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="mt-3 sm:mt-4">
                        <h2 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 group-hover:text-red-500 transition-colors">
                          {food.name}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                          {food.description}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Phân trang cho gợi ý món ăn */}
          <div className="flex justify-center items-center mt-6 sm:mt-8">
            <button
              onClick={() => setCurrentPageSuggestions(currentPageSuggestions - 1)}
              disabled={currentPageSuggestions === 1}
              className={`p-1 sm:p-2 rounded-lg text-sm sm:text-base ${currentPageSuggestions === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Previous
            </button>
            <span className="mx-2 text-sm sm:text-base">{currentPageSuggestions} / {totalPagesSuggestions}</span>
            <button
              onClick={() => setCurrentPageSuggestions(currentPageSuggestions + 1)}
              disabled={currentPageSuggestions === totalPagesSuggestions}
              className={`p-1 sm:p-2 rounded-lg text-sm sm:text-base ${currentPageSuggestions === totalPagesSuggestions ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Bài đăng nổi bật section */}
        <div className="lg:col-span-1">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 justify-center border-b-2 border-green-500 pb-2">Món ăn yêu thích</h2>
          <div className="space-y-3 sm:space-y-4">
            {currentPosts.map((food) => (
              <div key={food.id} className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <Link to={`/recipe/${food.id}`} className="flex p-2 sm:p-3">
                  <div className="relative w-20 h-20 sm:w-32 sm:h-32 flex-shrink-0">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 ml-3 sm:ml-4">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800 group-hover:text-red-500 transition-colors duration-200">
                      {food.name}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-gray-600 line-clamp-2">
                      {food.description}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => handleRemoveFromFavorites(food.id)}
                  className="absolute top-2 right-2 p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Phân trang cho bài đăng nổi bật */}
          <div className="flex justify-center items-center mt-6 sm:mt-8">
            <button
              onClick={() => setCurrentPagePosts(currentPagePosts - 1)}
              disabled={currentPagePosts === 1}
              className={`p-1 sm:p-2 rounded-lg text-sm sm:text-base ${currentPagePosts === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Previous
            </button>
            <span className="mx-2 text-sm sm:text-base">{currentPagePosts} / {totalPagesPosts}</span>
            <button
              onClick={() => setCurrentPagePosts(currentPagePosts + 1)}
              disabled={currentPagePosts === totalPagesPosts}
              className={`p-1 sm:p-2 rounded-lg text-sm sm:text-base ${currentPagePosts === totalPagesPosts ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteFoodPage;
