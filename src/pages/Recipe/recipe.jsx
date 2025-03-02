import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFoodToFavorites, removeFoodFromFavorites } from "../../store/favorite";

const RecipePage = () => {
  const dispatch = useDispatch();
  const { foods } = useSelector((state) => state.food);
  const { favoriteFoods } = useSelector((state) => state.favorite);
  const currentUser = useSelector((state) => state.auth.userId);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [localFavorites, setLocalFavorites] = useState(favoriteFoods);
  const itemsPerPage = 8;

  // Update local favorites when Redux state changes
  useEffect(() => {
    setLocalFavorites(favoriteFoods);
  }, [favoriteFoods]);

  const filteredFoods = foods?.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  ) || [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFoods = filteredFoods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang 1 khi search
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToFavorites = async (foodId) => {
    if (!currentUser) return alert("Bạn cần đăng nhập để thêm món ăn yêu thích.");
    
    if (localFavorites.some(food => food.id === foodId)) {
      alert("Món ăn đã có trong danh sách yêu thích của bạn!");
      return;
    }

    const foodToAdd = foods.find(food => food.id === foodId);
    if (foodToAdd) {
      try {
        const result = await dispatch(addFoodToFavorites({ userId: currentUser, foodId })).unwrap();
        setLocalFavorites(prev => [...prev, foodToAdd]);
      } catch (error) {
        if (error?.code === 1119) {
          setLocalFavorites(prev => [...prev, foodToAdd]);
          return;
        }
        alert("Có lỗi xảy ra khi thêm món ăn vào danh sách yêu thích.");
      }
    }
  };

  const handleRemoveFromFavorites = async (foodId) => {
    if (!currentUser) return alert("Bạn cần đăng nhập để xóa món ăn yêu thích.");
    try {
      await dispatch(removeFoodFromFavorites({ userId: currentUser, foodId })).unwrap();
      setLocalFavorites(prev => prev.filter(food => food.id !== foodId));
    } catch (error) {
      alert("Có lỗi xảy ra khi xóa món ăn khỏi danh sách yêu thích.");
    }
  };

  const isFavorite = (foodId) => localFavorites.some((food) => food.id === foodId);

  // Nếu không có dữ liệu foods
  if (!foods?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-gray-600 text-lg">Không có công thức nào</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float [animation-delay:1s]"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float [animation-delay:2s]"></div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 container mx-auto px-2 sm:px-4 py-4 sm:py-8 pb-16">
        {/* Header section */}
        <div className="text-center mb-8 sm:mb-16 animate-fade-up">     
          <div className="mb-6 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-4 animate-scale-up">
              Công Thức Nấu Ăn
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg px-4 animate-fade-up [animation-delay:200ms]">
              Khám phá những công thức nấu ăn tuyệt vời từ khắp mọi miền đất nước
            </p>
          </div>

          <div className="relative max-w-xl mx-auto px-4 sm:px-0 animate-bounce-in [animation-delay:400ms]">
            <input
              type="text"
              placeholder="Tìm kiếm công thức..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full border-2 border-gray-200 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-red-400 transition-all duration-300 shadow-sm hover:shadow-md pl-10 sm:pl-12"
            />
            <div className="absolute left-6 sm:left-4 top-1/2 -translate-y-1/2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Recipe Grid */}
        {currentFoods.length === 0 ? (
          <div className="text-center py-8 sm:py-16 animate-bounce-in">
            <div className="text-gray-500 text-lg sm:text-xl">
              {searchTerm ? "Không tìm thấy công thức nào phù hợp" : "Chưa có công thức nào"}
            </div>
            {searchTerm && (
              <p className="text-gray-400 mt-2">Hãy thử tìm kiếm với từ khóa khác</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {currentFoods.map((food, index) => (
              <div 
                key={food.id} 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 animate-fade-scale"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both'
                }}
              >
                <div className="relative overflow-hidden rounded-t-2xl aspect-[4/3]">
                  <Link to={`/recipe/${food.id}`} className="block relative w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out">
                    <div className="absolute inset-0 bg-black/20 z-10"></div>
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover"
                    />
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
                    />
                  </Link>
                  <button
                    onClick={() => isFavorite(food.id) ? handleRemoveFromFavorites(food.id) : handleAddToFavorites(food.id)}
                    className="absolute top-3 right-3 z-30 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110 active:scale-95 hover:animate-bounce-soft"
                  >
                    <svg
                      className={`w-5 h-5 ${
                        isFavorite(food.id) 
                          ? "text-red-500 transform scale-110 animate-bounce-soft" 
                          : "text-gray-600"
                      } transition-all duration-300`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <Link to={`/recipe/${food.id}`} className="block">
                    <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-red-500 transition-colors duration-300">
                      {food.name}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                      {food.description}
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 sm:gap-3 mt-8 sm:mt-12 mb-4 sm:mb-8 animate-fade-up [animation-delay:600ms]">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base rounded-full transition-all duration-300 ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white shadow-sm hover:shadow-md hover:animate-bounce-soft'
              }`}
            >
              Trước
            </button>

            <div className="flex items-center gap-2">
              {currentPage > 1 && (
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:animate-bounce-soft"
                >
                  {currentPage - 1}
                </button>
              )}

              <button
                className="px-4 py-2 rounded-full bg-red-500 text-white shadow-md animate-float"
              >
                {currentPage}
              </button>

              {currentPage < totalPages && (
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:animate-bounce-soft"
                >
                  {currentPage + 1}
                </button>
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-6 py-2.5 rounded-full transition-all duration-300 ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white shadow-sm hover:shadow-md hover:animate-bounce-soft'
              }`}
            >
              Sau
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipePage;
