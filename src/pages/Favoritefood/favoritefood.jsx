import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteFoods, removeFoodFromFavorites } from "../../store/favorite";
import logoImage from "../../assets/logoyumble.png";

const FavoriteFoodPage = () => {
  const dispatch = useDispatch();
  const { favoriteFoods, loading, error } = useSelector((state) => state.favorite);
  const currentUser = useSelector((state) => state.auth.userId);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch favorite foods
    if (currentUser) {
      dispatch(fetchFavoriteFoods(currentUser));
    }
  }, [dispatch, currentUser]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error.message || 'Có lỗi xảy ra'}</div>;

  // Lọc món ăn theo search term
  const filteredFavoriteFoods = favoriteFoods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  // Tính toán các món ăn cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFavoriteFoods = filteredFavoriteFoods.slice(indexOfFirstItem, indexOfLastItem);

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredFavoriteFoods.length / itemsPerPage);

  // Hàm chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRemoveFromFavorites = async (foodId) => {
    if (currentUser) {
      try {
        await dispatch(removeFoodFromFavorites({ userId: currentUser, foodId }));
        // Trạng thái sẽ được cập nhật tự động nhờ vào reducer
      } catch (error) {
        alert("Có lỗi xảy ra khi xóa món ăn khỏi danh sách yêu thích.");
      }
    } else {
      alert("Bạn cần đăng nhập để xóa món ăn yêu thích.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <img src={logoImage} alt="Yumble Logo" className="h-full" />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm món ăn yêu thích..."
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
              Món ăn yêu thích
            </h2>
          </div>

          {currentFavoriteFoods.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Bạn chưa có món ăn yêu thích nào.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentFavoriteFoods.map((food) => (
                <div key={food.id} className="group">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => handleRemoveFromFavorites(food.id)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-200"
                    >
                      <svg
                        className={`w-6 h-6 ${true ? 'text-red-500' : 'text-black'}`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-4">
                    <h2 className="text-lg font-bold mb-2 group-hover:text-red-500 transition-colors">
                      {food.name}
                    </h2>
                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                      {food.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Chỉ hiển thị phân trang nếu có kết quả */}
          {currentFavoriteFoods.length > 0 && (
            <div className="flex justify-center items-center mt-8">
              <div className="flex items-center space-x-2">
                {/* Nút Previous với icon mũi tên */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Số trang */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-3 py-2 rounded-lg ${
                        currentPage === index + 1
                          ? 'bg-[#689F38] text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                {/* Nút Next với icon mũi tên */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteFoodPage;
