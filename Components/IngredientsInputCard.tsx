"use client";
import { useState} from "react";
import axios from "axios";

interface Nutrient {
  nutrientName: string;
  value: number;
  unitName: string;
}

interface FoodData {
  food_name: string;
  food_description?: string;
  food_nutrients?: Nutrient[];
}

const IngredientsInputCard = () => {
  const [ingredients, setIngredients] = useState("");
  const [nutritionData, setNutritionData] = useState<FoodData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchNutritionData = async () => {
    if (!ingredients.trim()) return alert("يرجى إدخال المكونات");
    setLoading(true);

    try {
      const response = await axios.get(
        "https://yourfood-backend.vercel.app/api/nutrition",
        {
          params: { search: ingredients },
        }
      );

      if (response.data.foods && response.data.foods.length > 0) {
        const firstFood = response.data.foods[0];

        setNutritionData({
          food_name: firstFood.description || "اسم غير متوفر",
          food_description: firstFood.ingredients || "الوصف غير متوفر",
          food_nutrients:
            firstFood.foodNutrients?.length > 0 ? firstFood.foodNutrients : null,
        });
      } else {
        setNutritionData(null);
      }

      setShowModal(true);
    } catch (error) {
      console.error("❌ خطأ أثناء جلب البيانات:", error);
      alert("حدث خطأ أثناء جلب البيانات");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-[500px] p-6 md:p-8 rounded-xl shadow-lg w-full md:w-1/2 flex flex-col items-center max-w-lg mx-auto text-white">
      <h2 className="text-[28px] md:text-[35px] font-bold mb-4 text-center">عبر المكونات</h2>
      <p className="text-end text-[18px] md:text-[20px] mx-2 md:mx-4 text-gray-300 mt-2 mb-6 md:mb-8">
        هذه الأداة تساعدك على معرفة القيم الغذائية الموجودة في مكوناتك
      </p>
      <textarea
        className="w-full min-h-[200px] md:h-1/2 text-end p-3 md:p-4 rounded-lg bg-white text-black placeholder-gray-400 resize-none"
        placeholder="اكتب المكونات بالإنجليزية"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      ></textarea>
      <button
        className="bg-orange-500 cursor-pointer text-white w-full mt-4 md:mt-6 py-2 md:py-3 rounded-lg hover:bg-orange-600 text-lg font-bold"
        onClick={fetchNutritionData}
        disabled={loading}
      >
        {loading ? "جارٍ التحميل..." : "احصل على النتائج"}
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg w-full max-w-md text-white text-center">
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">القيم الغذائية</h3>
            {nutritionData ? (
              <>
                <p className="text-md md:text-lg font-semibold">{nutritionData.food_name}</p>
                <p className="text-sm text-gray-300">{nutritionData.food_description || "الوصف غير متوفر"}</p>
                {nutritionData.food_nutrients && nutritionData.food_nutrients.length > 0 ? (
                  <ul className="text-start mt-2 md:mt-3 bg-gray-700 p-2 md:p-3 rounded-lg">
                    {nutritionData.food_nutrients.map((nutrient, index) => (
                      <li
                        key={index}
                        className="py-1 border-b border-gray-600 last:border-b-0 text-sm md:text-md"
                      >
                        <strong>{nutrient.nutrientName}:</strong> {nutrient.value} {nutrient.unitName}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-yellow-400 flex items-center justify-center gap-2 text-sm">
                    ⚠️ لا توجد معلومات غذائية متاحة، تحقق من صحة البحث.
                  </p>
                )}
              </>
            ) : (
              <p className="text-red-400 text-sm">❗ لا توجد بيانات متاحة لهذه المكونات</p>
            )}
            <button
              className="mt-3 md:mt-4 bg-red-500 px-3 md:px-4 py-1 md:py-2 rounded-lg hover:bg-red-600 text-sm md:text-md"
              onClick={() => setShowModal(false)}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientsInputCard;