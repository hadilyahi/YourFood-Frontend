"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import RecipeCard from "@/Components/Card";
import { FaUtensils } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5"; 

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
}

const RecipesList = () => {
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Meal[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCategory, setSelectedCategory] = useState<string>("عرض الكل");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [ingredient, setIngredient] = useState(""); 
  const [ingredients, setIngredients] = useState<string[]>([]); 

  const categories = [
    "عرض الكل",
    "المطبخ الإيطالي",
    "المطبخ الفرنسي",
    "الاكل اليباني",
    "الاكل الامريكي",
    "المأكولات البحرية",
    "الحلويات",
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const cuisineTypes = ["Italian", "French", "Healthy"];
        const categoryTypes = ["Dessert", "Pasta", "Seafood", "Breakfast", "Pastries"];

        const cuisineRequests = cuisineTypes.map((cuisine) =>
          axios.get<{ meals: Meal[] }>(
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`
          )
        );

        const categoryRequests = categoryTypes.map((category) =>
          axios.get<{ meals: Meal[] }>(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
          )
        );

        const responses = await Promise.all([...cuisineRequests, ...categoryRequests]);

        const allMeals = responses.flatMap((res) => res.data.meals || []);
        const randomMeals = allMeals.sort(() => 0.5 - Math.random()).slice(0, 30);
        const detailedRequests = randomMeals
          .filter((meal) => meal.idMeal)
          .map((meal) =>
            axios
              .get<{ meals: Meal[] }>(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
              )
              .then((res) => res.data.meals?.[0])
              .catch(() => null)
          );

        const detailedResponses = await Promise.allSettled(detailedRequests);
        const detailedRecipes = detailedResponses
          .filter((res) => res.status === "fulfilled" && res.value)
          .map((res) => (res as PromiseFulfilledResult<Meal>).value);

        setRecipes(detailedRecipes);
        setFilteredRecipes(detailedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  
  const filterByCategory = (category: string) => {
    setSelectedCategory(category);

    if (category === "عرض الكل") {
      setFilteredRecipes(recipes);
      return;
    }

    const categoryMap: Record<string, string> = {
      "المطبخ الإيطالي": "Italian",
      "المطبخ الفرنسي": "French",
      "الاكل اليباني": "Japanese",
      "المأكولات البحرية": "Seafood",
      "الاكل الامريكي": "American",
      "الحلويات": "Dessert",
    };

    const selectedValue = categoryMap[category];

    if (!selectedValue) return;

    const filtered = recipes.filter(
      (recipe) => recipe.strArea === selectedValue || recipe.strCategory === selectedValue
    );

    setFilteredRecipes(filtered);
  };


  const handleIngredientKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && ingredient.trim() !== "") {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient(""); 
    }
  };

 
  const filterByIngredients = async () => {
    if (ingredients.length === 0) return;

    try {
      const responses = await Promise.all(
        ingredients.map((ing) =>
          axios.get<{ meals: Meal[] }>(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
          )
        )
      );

      const allMeals = responses.flatMap((res) => res.data.meals || []);
      setFilteredRecipes(allMeals);
      setShowFilterModal(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="container mx-auto scale-95">
      <h1 className="text-[40px] font-extrabold text-center mb-12">جميع الوصفات</h1>

      <div className="flex mx-8 mb-6">
        <button
          onClick={() => setShowFilterModal(true)}
          className="flex items-end justify-end gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
        >
          <IoFilterSharp className="text-xl" />
          فلترة حسب المكونات
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {filteredRecipes.map((recipe, index) => (
            <RecipeCard
              key={`${recipe.idMeal}-${index}`}
              id={recipe.idMeal}
              imageUrl={recipe.strMealThumb}
              title={recipe.strMeal}
              category={recipe.strCategory || "غير معروف"}
              cuisine={recipe.strArea || "غير معروف"}
            />
          ))}
        </div>

        <div className="w-full md:w-1/4 p-4 bg-white border-l-2 border-black">
          <h2 className="text-[28px] text-center font-extrabold pb-2">حسب الأصناف</h2>
          <ul className="mt-4 font-medium text-[25px] space-y-6">
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => filterByCategory(category)}
                className="flex justify-end items-center text-right gap-2 py-1 px-3 cursor-pointer"
              >
                <span className="text-black">{category}</span>
                <FaUtensils className="text-orange-500 text-2xl" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showFilterModal && (
        <div className="fixed inset-0 flex items-start justify-center bg-opacity-50 backdrop-blur-sm z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative scale-95 animate-fadeIn">
            <h2 className="text-center text-2xl font-bold mb-4">فلترة حسب المكونات</h2>

            <input
              type="text"
              placeholder="أدخل المكون واضغط Enter..."
              className="w-full p-3 border rounded-lg mb-4 text-right"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              onKeyDown={handleIngredientKeyPress}
            />

            <div className="space-y-2 mb-4">
              {ingredients.map((ing, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
                  <span>{ing}</span>
                  <button onClick={() => setIngredients(ingredients.filter((item) => item !== ing))} className="text-red-500 hover:text-red-700 text-xl">✖</button>
                </div>
              ))}
            </div>

            <button onClick={filterByIngredients} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">استخراج وصفات</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipesList;
