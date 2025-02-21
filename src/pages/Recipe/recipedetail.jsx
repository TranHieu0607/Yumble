import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logoImage from "../../assets/logoyumble.png";
import { useSelector, useDispatch } from "react-redux";
import { fetchFoodById, fetchFoodStepsById, fetchFoodNutritionById, fetchFoodIngredientsById } from "../../store/food";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentFood: recipe, loading, error } = useSelector((state) => state.food);
  const [steps, setSteps] = useState([]);
  const [nutrition, setNutrition] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchFoodById(id))
        .unwrap()
        .then(() => {
          return dispatch(fetchFoodStepsById(id)).unwrap();
        })
        .then((stepsData) => {
          setSteps(stepsData);
        })
        .then(() => {
          return dispatch(fetchFoodNutritionById(id)).unwrap();
        })
        .then((nutritionData) => {
          setNutrition(nutritionData);
        })
        .then(() => {
          return dispatch(fetchFoodIngredientsById(id)).unwrap();
        })
        .then((ingredientsData) => {
          setIngredients(ingredientsData);
        })
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
        <img src={logoImage} alt="Yumble Logo" className="h-20 mb-4" />
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
            <h2 className="text-xl font-semibold mb-4">THÔNG TIN DINH DƯỠNG:</h2>
            {nutrition && (
              <div>
                <p>Calories: {nutrition.calories}</p>
                <p>Protein: {nutrition.protein}g</p>
                <p>Fat: {nutrition.fat}g</p>
                <p>Carbohydrates: {nutrition.carb}g</p>
                <p>Fiber: {nutrition.fiber}g</p>
                <p>Sugar: {nutrition.sugar}g</p>
                <p>Sodium: {nutrition.sodium}mg</p>
                <p>Cholesterol: {nutrition.cholesterol}mg</p>
              </div>
            )}
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">NGUYÊN LIỆU:</h2>
            <ul className="list-disc pl-5">
              {ingredients.map((ingredient) => (
                <li key={ingredient.id} className="mb-2">
                  <span className="font-semibold">{ingredient.ingredientName}</span>
                  {ingredient.usage > 0 && (
                    <span> - Số lượng: {ingredient.usage}g</span>
                  )}
                  {!ingredient.isCore && (
                    <span className="text-gray-500"> (Không bắt buộc)</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">CÁC BƯỚC NẤU:</h2>
            {steps.map((step) => (
              <div key={step.id} className="mb-4">
                <img src={step.image} alt={`Step ${step.stepOrder}`} className="w-full h-48 object-cover rounded-lg mb-2" />
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
