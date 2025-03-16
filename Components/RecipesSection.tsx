"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "./Card";
import Link from "next/link";


type Recipe = {
  idMeal: string;
  strMealThumb: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
};

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const categories = [
          "Italian",
          "French",
          "Turkish",
          "Asian",
          "Healthy",
          "Seafood",
          "Pastries",
          "Dessert",
        ];
        const requests = categories.map((category) =>
          axios.get<{ meals: { idMeal: string }[] }>(
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=${category}`
          )
        );

        const responses = await Promise.all(requests);
        const allMeals = responses.flatMap((res) => res.data.meals || []);

        // اختيار 6 وصفات عشوائيًا
        const randomMeals = allMeals
          .sort(() => 0.5 - Math.random())
          .slice(0, 6);

        // جلب تفاصيل كل وصفة للحصول على المطبخ والصنف
        const detailedRequests = randomMeals.map((meal) =>
          axios.get<{ meals: Recipe[] }>(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
          )
        );

        const detailedResponses = await Promise.all(detailedRequests);
        const detailedRecipes = detailedResponses.map(
          (res) => res.data.meals[0]
        );

        setRecipes(detailedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h1 className="text-[30px] md:text-[40px] font-extrabold text-center mb-8 md:mb-12 mt-8 md:mt-12">
        ألذ الوصفات
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            id={recipe.idMeal}
            imageUrl={recipe.strMealThumb}
            title={recipe.strMeal}
            category={recipe.strCategory || "غير معروف"}
            cuisine={recipe.strArea || "غير معروف"}
          />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Link href="/recipes">
          <button className="bg-[#FE590D] cursor-pointer text-white py-2 px-6 rounded-lg text-lg font-bold hover:bg-orange-600 transition">
            عرض الكل
          </button>
        </Link>
      </div>
    </div>
  );
}
