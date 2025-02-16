import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logoImage from "../../assets/logoyumble.png";
import { useSelector, useDispatch } from "react-redux";
import { fetchFoodById } from "../../store/food";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentFood: recipe, loading, error } = useSelector((state) => state.food);

  useEffect(() => {
    if (id) {
      dispatch(fetchFoodById(id))
        .unwrap()
        .catch((err) => {
          console.error('Error fetching food:', err);
          navigate('/recipe');
        });
    }
  }, [dispatch, id, navigate]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-red-500">
        {error.message || 'Có lỗi xảy ra khi tải thông tin món ăn'}
      </div>
    </div>
  );

  if (!recipe) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8 mt-10">
        <img src={logoImage} alt="Yumble Logo" className="h-12 mb-4" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
          <div className="mb-6">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="flex justify-center items-center mb-4">
            <p className="text-sm text-gray-500">
              Bữa ăn: <span className="font-semibold text-black">{recipe.meal}</span>
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {recipe.description}
          </p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">CÁCH NẤU:</h2>
            <p className="text-gray-700">{recipe.cookingMethod}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
