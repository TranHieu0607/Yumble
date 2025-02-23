import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteFoods, removeFoodFromFavorites } from "../../store/favorite";
import { fetchFoodSuggestions } from "../../store/food";
import { Link } from "react-router-dom";
import logoImage from "../../assets/logoyumble.png";
import { useNavigate } from "react-router-dom";


const FavoriteFoodPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favoriteFoods, loading, error } = useSelector((state) => state.favorite);
  const currentUser = useSelector((state) => state.auth.userId);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Trạng thái phân trang cho món ăn yêu thích
  const [currentPageFavorites, setCurrentPageFavorites] = useState(1);
  const itemsPerPageFavorites = 4;

  // Trạng thái phân trang cho bài đăng nổi bật
  const [currentPagePosts, setCurrentPagePosts] = useState(1);
  const itemsPerPagePosts = 3;

  const { suggestions, loading: suggestionsLoading, error: suggestionsError } = useSelector((state) => state.food);

  // Trạng thái phân trang cho gợi ý món ăn
  const [currentPageSuggestions, setCurrentPageSuggestions] = useState(1);
  const itemsPerPageSuggestions = 4; // Số món ăn hiển thị trên mỗi trang

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchFavoriteFoods(currentUser));
    }
    if (currentUser) {
      dispatch(fetchFoodSuggestions(currentUser));
    }
  }, [dispatch, currentUser]);

  

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error.message || 'Có lỗi xảy ra'}</div>;

  // Lọc món ăn theo search term
  const filteredFavoriteFoods = favoriteFoods.filter(food =>
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
  const currentPosts = favoriteFoods.slice(indexOfFirstItemPosts, indexOfLastItemPosts);

  // Tính tổng số trang cho bài đăng nổi bật
  const totalPagesPosts = Math.ceil(favoriteFoods.length / itemsPerPagePosts);

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
    if (currentUser) {
      try {
        await dispatch(removeFoodFromFavorites({ userId: currentUser, foodId }));
      } catch (error) {
        alert("Có lỗi xảy ra khi xóa món ăn khỏi danh sách yêu thích.");
      }
    } else {
      alert("Bạn cần đăng nhập để xóa món ăn yêu thích.");
    }
  };

  const handleNavigateToDetail = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <img src={logoImage} alt="Yumble Logo" className="h-full" />
      </div>

      <div className="relative w-full mb-5">
        <h2 className="text-2xl font-bold">Gợi ý món ăn</h2>
        <input
          type="text"
          placeholder="Tìm kiếm món ăn ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 mb-5"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative w-full mb-5">
            <div className="absolute inset-0 bg-[#313131] h-12"></div>
            <h2 className="relative text-2xl font-bold text-white px-4 py-2 inline-block w-max mx-auto">
              Gợi ý món ăn
            </h2>
          </div>

          {suggestionsLoading ? (
            <div>Đang tải gợi ý món ăn...</div>
          ) : suggestionsError ? (
            <div className="text-red-500">{suggestionsError.message}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredSuggestions.slice(indexOfFirstItemSuggestions, indexOfLastItemSuggestions).map((food) => (
                <div key={food.id} className="group">
                  <div className="relative overflow-hidden rounded-lg cursor-pointer">
                  <Link to={`/recipe/${food.id}`}>
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="mt-4">
                      <h2 className="text-lg font-bold mb-2 group-hover:text-red-500 transition-colors">
                        {food.name}
                      </h2>
                      <p className="mt-2 text-gray-600 text-sm line-clamp-2">
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
          <div className="flex justify-center items-center mt-8">
            <button
              onClick={() => setCurrentPageSuggestions(currentPageSuggestions - 1)}
              disabled={currentPageSuggestions === 1}
              className={`p-2 rounded-lg ${currentPageSuggestions === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Previous
            </button>
            <span className="mx-2">{currentPageSuggestions} / {totalPagesSuggestions}</span>
            <button
              onClick={() => setCurrentPageSuggestions(currentPageSuggestions + 1)}
              disabled={currentPageSuggestions === totalPagesSuggestions}
              className={`p-2 rounded-lg ${currentPageSuggestions === totalPagesSuggestions ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Bài đăng nổi bật section */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-4 justify-center border-b-2 border-green-500 pb-2">Món ăn yêu thích</h2>
          <div className="space-y-4">
            {currentPosts.map((food) => (
              <div key={food.id} className="relative flex border rounded-lg p-4 shadow-md">
                <Link to={`/recipe/${food.id}`}>
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-1/3 h-32 object-cover rounded-lg mr-4"
                />
                </Link>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{food.name}</h3>
                  <p className="text-gray-500">{food.description}</p>
                </div>
                <button
                  onClick={() => handleRemoveFromFavorites(food.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-200"
                >
                  <svg
                    className="w-6 h-6 text-red-500"
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
          <div className="flex justify-center items-center mt-8">
            <button
              onClick={() => setCurrentPagePosts(currentPagePosts - 1)}
              disabled={currentPagePosts === 1}
              className={`p-2 rounded-lg ${currentPagePosts === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Previous
            </button>
            <span className="mx-2">{currentPagePosts} / {totalPagesPosts}</span>
            <button
              onClick={() => setCurrentPagePosts(currentPagePosts + 1)}
              disabled={currentPagePosts === totalPagesPosts}
              className={`p-2 rounded-lg ${currentPagePosts === totalPagesPosts ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
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
