import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../../assets/logoyumble.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoods, addFoodToFavorites } from "../../store/food";
import { removeFoodFromFavorites } from "../../store/favorite";

const RecipePage = () => {
  const dispatch = useDispatch();
  const { foods, loading, error } = useSelector((state) => state.food);
  const currentUser = useSelector((state) => state.auth.userId);
  const favoriteFoods = useSelector((state) => state.favorite.favoriteFoods);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error.message || "Có lỗi xảy ra"}</div>;

  const filteredFoods = foods?.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  ) || [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFoods = filteredFoods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToFavorites = async (foodId) => {
    if (!currentUser) return alert("Bạn cần đăng nhập để thêm món ăn yêu thích.");
    try {
      await dispatch(addFoodToFavorites({ userId: currentUser, foodId })).unwrap();
    } catch {
      alert("Có lỗi xảy ra khi thêm món ăn vào danh sách yêu thích.");
    }
  };

  const handleRemoveFromFavorites = async (foodId) => {
    if (!currentUser) return alert("Bạn cần đăng nhập để xóa món ăn yêu thích.");
    try {
      await dispatch(removeFoodFromFavorites({ userId: currentUser, foodId }));
    } catch {
      alert("Có lỗi xảy ra khi xóa món ăn khỏi danh sách yêu thích.");
    }
  };

  const isFavorite = (foodId) => favoriteFoods.some((food) => food.id === foodId);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <img src={logoImage} alt="Yumble Logo" className="h-full" />
      </div>

      <div className="text-center mb-5">
        <input
          type="text"
          placeholder="Công thức bạn muốn"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2"
        />
        <h2 className="mt-5 text-2xl font-bold bg-[#313131] text-white px-4 py-2 inline-block rounded">
          Công thức
        </h2>
      </div>

      {currentFoods.length === 0 ? (
        <div className="text-center py-8 text-gray-500">Không tìm thấy công thức nào phù hợp</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex justify-center">
          {currentFoods.map((food) => (
            <div key={food.id} className="group flex flex-col items-center">
              <div className="relative overflow-hidden rounded-lg w-full">
                <Link to={`/recipe/${food.id}`}>
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <button
                  onClick={() => isFavorite(food.id) ? handleRemoveFromFavorites(food.id) : handleAddToFavorites(food.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-200"
                >
                  <svg
                    className={`w-6 h-6 ${isFavorite(food.id) ? "text-red-500" : "text-black"}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>
              <div className="mt-4 text-center">
                <Link to={`/recipe/${food.id}`}>
                  <h2 className="text-lg font-bold mb-2 group-hover:text-red-500 transition-colors">
                    {food.name}
                  </h2>
                  <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                    {food.description}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipePage;
