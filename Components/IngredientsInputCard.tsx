"use client";
import { useState } from "react";
import axios from "axios";

interface FoodData {
  food_name: string;
  food_description?: string;
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
      const response = await axios.get("http://localhost:5000/api/nutrition", {
        params: { search: ingredients },
      });

      console.log("API Response:", response.data);
      const firstFood = response.data.foods?.food?.[0]; // يأخذ أول عنصر من القائمة
      setNutritionData(firstFood || null);
      
      
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
      alert("حدث خطأ أثناء جلب البيانات");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black h-[500px]  justify-center text-white p-8 rounded-xl shadow-lg md:w-1/2 flex flex-col items-center">
      <h2 className="text-[35px] font-bold mb-4 text-center">عبر المكونات</h2>
      <p className="text-end text-[20px] mx-4 text-gray-300 mt-4 mb-8">
        هذه الأداة تساعدك على معرفة القيم الغذائية الموجودة في مكوناتك
      </p>
      <textarea
        className="w-full h-1/2 text-end p-4 rounded-lg bg-white text-black placeholder-gray-400"
        placeholder="اكتب المكونات بالانجليزية"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      ></textarea>
      <button
        className="bg-orange-500 cursor-pointer text-white w-full mt-6 py-3 rounded-lg hover:bg-orange-600 text-lg font-bold"
        onClick={fetchNutritionData}
        disabled={loading}
      >
        {loading ? "جارٍ التحميل..." : "احصل على النتائج"}
      </button>
      {showModal && nutritionData && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="bg-gray-800 p-6 rounded-lg w-1/3 text-white text-center">
            <h3 className="text-xl font-bold mb-3">القيم الغذائية</h3>
            <p><strong>{nutritionData.food_name}</strong></p>
            <p>{nutritionData.food_description || "غير متوفر"}</p>
            <button 
              className="mt-4 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
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