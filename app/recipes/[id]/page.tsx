"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: string]: string;
}

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [translatedInstructions, setTranslatedInstructions] = useState<string | null>(null);
  const [translatedIngredients, setTranslatedIngredients] = useState<string[]>([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get<{ meals: Recipe[] }>(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const fetchedRecipe = response.data.meals[0];
        setRecipe(fetchedRecipe);

        if (fetchedRecipe?.strInstructions) {
          translateText(fetchedRecipe.strInstructions, setTranslatedInstructions);
        }

        // ترجمة المكونات
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = fetchedRecipe[`strIngredient${i}`];
          const measure = fetchedRecipe[`strMeasure${i}`];
          if (ingredient && ingredient.trim() !== "") {
            ingredients.push(`${measure} ${ingredient}`);
          }
        }

        translateIngredients(ingredients);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    if (id) fetchRecipe();
  }, [id]);

  const translateText = async (text: string, setTranslated: (text: string) => void) => {
    try {
      const chunks = text.match(/.{1,500}/g) || [];
      const translatedChunks = await Promise.all(
        chunks.map(async (chunk) => {
          const response = await axios.post("https://api.mymemory.translated.net/get", null, {
            params: {
              q: chunk,
              langpair: "en|ar",
            },
          });
          return response.data.responseData.translatedText;
        })
      );
      setTranslated(translatedChunks.join(" "));
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  const translateIngredients = async (ingredients: string[]) => {
    try {
      const translatedList = await Promise.all(
        ingredients.map(async (ingredient) => {
          const response = await axios.post("https://api.mymemory.translated.net/get", null, {
            params: {
              q: ingredient,
              langpair: "en|ar",
            },
          });
          return response.data.responseData.translatedText;
        })
      );
      setTranslatedIngredients(translatedList);
    } catch (error) {
      console.error("Error translating ingredients:", error);
    }
  };

  if (!recipe) return <p className="text-center text-lg">جاري تحميل الوصفة...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 text-right">
      <h1 className="text-4xl font-bold text-center mb-6">تفاصيل الوصفة</h1>
      <div className="flex flex-col md:flex-row-reverse items-start gap-6">
        <Image
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          width={350}
          height={350}
          className="rounded-lg shadow-md"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 flex items-center justify-end">
            
            {recipe.strMeal}
          </h2>
          <div className="flex justify-end gap-20">
          <p className="text-lg  "><span className="text-lg font-bold text-[#FE590D]">{recipe.strArea}</span><strong> : المطبخ</strong> </p>
          <p className="text-lg "><span className="text-lg font-bold text-[#FE590D]">{recipe.strCategory}</span><strong> : الصنف</strong> </p>
          </div>
          
          <h3 className="text-xl font-bold mt-4 mb-2"> : المكونات</h3>
          <ul className=" pr-5 space-y-1 font-medium flex   flex-col ">
            {translatedIngredients.length > 0
              ? translatedIngredients.map((item, index) => <li key={index}>{item}</li>)
              : <li>جاري الترجمة...</li>}
          </ul>
          <h3 className="text-xl font-bold mt-6 mb-2"> : طريقة التحضير</h3>
      <p className="text-lg pr-5 leading-relaxed font-medium">
        {translatedInstructions || "جاري الترجمة..."}
      </p>
        </div>
      
      </div>
      
    </div>
  );
};

export default RecipeDetails;