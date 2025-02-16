import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../../assets/logoyumble.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoods } from "../../store/food";

const RecipePage = () => {
  const dispatch = useDispatch();
  const { foods, loading, error } = useSelector((state) => state.food);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  // Reset về trang 1 khi search term thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error.message || 'Có lỗi xảy ra'}</div>;

  // Lọc món ăn theo search term
  const filteredFoods = Array.isArray(foods) 
    ? foods.filter(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      )
    : [];

  // Tính toán các món ăn cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFoods = filteredFoods.slice(indexOfFirstItem, indexOfLastItem);

  // Tính tổng số trang sau khi lọc
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

  // Xử lý thay đổi search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Hàm chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hàm tạo mảng số trang hiển thị
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 3) {
      // Nếu tổng số trang <= 3, hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Luôn hiển thị trang đầu
      pageNumbers.push(1);
      
      if (currentPage <= 2) {
        // Nếu đang ở trang 1 hoặc 2
        pageNumbers.push(2, 3, '...');
      } else if (currentPage >= totalPages - 1) {
        // Nếu đang ở 2 trang cuối
        pageNumbers.push('...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Ở giữa
        pageNumbers.push('...', currentPage - 1, currentPage, currentPage + 1, '...');
      }
      
      // Thêm trang cuối nếu chưa có
      if (pageNumbers[pageNumbers.length - 1] !== totalPages) {
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <img src={logoImage} alt="Yumble Logo" className="h-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <input
            type="text"
            placeholder="Công thức bạn muốn"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 mb-5"
          />

          <div className="relative w-full mb-5">
            <div className="absolute inset-0 bg-[#313131] h-12"></div>
            <h2 className="relative text-2xl font-bold text-white px-4 py-2 inline-block w-max mx-auto">
              Công thức
            </h2>
          </div>

          {currentFoods.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Không tìm thấy công thức nào phù hợp
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentFoods.map((food) => (
                <div key={food.id} className="group">
                  <Link to={`/recipe/${food.id}`}>
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-center items-center text-sm text-[#689F38] mb-2">
                        <span>{food.meal}</span>
                      </div>
                      <h2 className="text-lg font-bold mb-2 group-hover:text-red-500 transition-colors">
                        {food.name}
                      </h2>
                      <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                        {food.description}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Chỉ hiển thị phân trang nếu có kết quả */}
          {currentFoods.length > 0 && (
            <>
              {/* Phân trang */}
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
                    {getPageNumbers().map((number, index) => (
                      <React.Fragment key={index}>
                        {number === '...' ? (
                          <span className="px-3 py-2">...</span>
                        ) : (
                          <button
                            onClick={() => handlePageChange(number)}
                            className={`px-3 py-2 rounded-lg ${
                              currentPage === number
                                ? 'bg-[#689F38] text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {number}
                          </button>
                        )}
                      </React.Fragment>
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

              {/* Hiển thị trang tiếp theo */}
              {currentPage < totalPages && (
                <div className="text-center mt-4 text-gray-600">
                  Trang tiếp theo: {currentPage + 1}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
