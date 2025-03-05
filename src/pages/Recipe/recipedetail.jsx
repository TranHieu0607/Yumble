import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchFoodById, fetchFoodStepsById, fetchFoodNutritionById, fetchFoodIngredientsById, fetchFoodDietaryById, fetchFoodAllergiesById } from "../../store/food";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentFood: recipe, loading, error, dietary = [], allergies = [] } = useSelector((state) => state.food);
  const [steps, setSteps] = useState([]);
  const [nutrition, setNutrition] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (id) {
      Promise.all([
        dispatch(fetchFoodById(id)).unwrap(),
        dispatch(fetchFoodStepsById(id)).unwrap(),
        dispatch(fetchFoodNutritionById(id)).unwrap(),
        dispatch(fetchFoodIngredientsById(id)).unwrap(),
        dispatch(fetchFoodDietaryById(id)).unwrap(),
        dispatch(fetchFoodAllergiesById(id)).unwrap()
      ])
        .then(([foodData, stepsData, nutritionData, ingredientsData]) => {
          setSteps(stepsData);
          setNutrition(nutritionData);
          setIngredients(ingredientsData);
        })
        .catch((err) => {
          console.error('Error fetching food:', err);
          navigate('/recipe');
        });
    }
  }, [dispatch, id, navigate]);

  const NutritionCard = ({ label, value, unit }) => (
    <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-2xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
      <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider">{label}</p>
      <p className="text-lg sm:text-2xl font-bold text-gray-800">
        {value}<span className="text-sm sm:text-base font-normal text-gray-600 ml-1">{unit}</span>
      </p>
    </div>
  );

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-gray-800"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="text-red-500 text-xl">
        {error.message || 'Có lỗi xảy ra khi tải thông tin món ăn'}
      </div>
    </div>
  );

  if (!recipe) return null;

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Hero Section */}
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/10"></div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16 sm:pb-24 md:pb-32">
          <div className="text-white space-y-4 sm:space-y-6 max-w-3xl animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
              {recipe.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed">
              {recipe.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm sm:text-lg font-medium">
                {recipe.meal}
              </span>
              <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm sm:text-lg">
                {ingredients.length} nguyên liệu
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#f8f9fa] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-8">
              {/* Ingredients */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">
                  Nguyên liệu
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {ingredients.map((ingredient) => (
                    <div key={ingredient.id} 
                      className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-2xl hover:shadow-md transform hover:-translate-y-1 transition-all duration-300">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-900 mr-3 sm:mr-4"></div>
                      <div>
                        <span className="font-medium text-sm sm:text-base text-gray-900">{ingredient.ingredientName}</span>
                        {ingredient.usage > 0 && (
                          <span className="text-gray-600 text-sm sm:text-base ml-2">{ingredient.usage}g</span>
                        )}
                        {!ingredient.isCore && (
                          <span className="text-gray-500 text-xs sm:text-sm block mt-0.5 sm:mt-1 italic">(Không bắt buộc)</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cooking Steps */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">
                  Các bước thực hiện
                </h2>
                <div className="space-y-8 sm:space-y-12">
                  {steps.map((step) => (
                    <div key={step.id} 
                      className="group relative">
                      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:bg-gray-50">
                        <div className="md:w-2/5">
                          <div className="relative aspect-video overflow-hidden rounded-2xl">
                            <img 
                              src={step.image} 
                              alt={`Step ${step.stepOrder}`} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        </div>
                        <div className="md:w-3/5">
                          <div className="flex items-center mb-3 sm:mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-900 flex items-center justify-center text-white text-lg sm:text-xl font-bold">
                              {step.stepOrder}
                            </div>
                          </div>
                          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6 sm:space-y-8">
                {/* Nutrition Information */}
                <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">
                    Thông tin dinh dưỡng
                  </h2>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {nutrition && (
                      <>
                        <NutritionCard label="Calories" value={nutrition.calories} unit="kcal" />
                        <NutritionCard label="Protein" value={nutrition.protein} unit="g" />
                        <NutritionCard label="Chất béo" value={nutrition.fat} unit="g" />
                        <NutritionCard label="Carbs" value={nutrition.carb} unit="g" />
                        <NutritionCard label="Chất xơ" value={nutrition.fiber} unit="g" />
                        <NutritionCard label="Đường" value={nutrition.sugar} unit="g" />
                        <NutritionCard label="Natri" value={nutrition.sodium} unit="mg" />
                        <NutritionCard label="Cholesterol" value={nutrition.cholesterol} unit="mg" />
                      </>
                    )}
                  </div>

                  {/* Dietary Information */}
                  <div className="mt-6 sm:mt-8">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">
                      Chế độ ăn
                    </h2>
                    {dietary.length > 0 ? (
                      <div className="space-y-3 sm:space-y-4">
                        {dietary.map((item) => (
                          <div key={item.dietary.id} 
                            className="p-3 sm:p-4 bg-gray-50 rounded-2xl hover:shadow-md transition-all duration-300">
                            <p className="font-medium text-sm sm:text-base text-gray-900">{item.dietary.name}</p>
                            <p className="text-gray-600 text-xs sm:text-sm mt-1">{item.dietary.description}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm sm:text-base">Không có thông tin chế độ ăn.</p>
                    )}
                  </div>

                  {/* Allergies Warning */}
                  {allergies && allergies.length > 0 && (
                    <div className="mt-6 sm:mt-8">
                      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 flex items-center">
                        <span className="mr-2">⚠️</span>
                        Cảnh báo dị ứng
                      </h2>
                      <div className="space-y-3 sm:space-y-4">
                        {allergies.map((item) => (
                          <div key={item.allergy.id} 
                            className="p-3 sm:p-4 bg-red-50 rounded-2xl border-l-4 border-red-500">
                            <p className="font-medium text-sm sm:text-base text-red-700">{item.allergy.name}</p>
                            <p className="text-gray-600 text-xs sm:text-sm mt-1">{item.allergy.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
