import { Search } from "lucide-react";
import RecipeCard from "@/Components/Card";
import { FaUtensils } from "react-icons/fa";
import Image from "next/image";

const RecipesList = () => {
    const categories = [
        "المطبخ الإيطالي",
        "المطبخ الفرنسي",
        "المطبخ التركي",
        "المطبخ الآسيوي",
        "المأكولات الصحية",
        "المأكولات البحرية",
        "المعجنات",
        "الحلويات",
      ];
  
  const recipes = [
    {
      id: 1,
      imageUrl: "/image1.svg",
      title: "Chicken Pasta",
      category: "دجاج",
      cuisine: "إيطالي",
    },
    {
      id: 2,
      imageUrl: "/image1.svg",
      title: "Chicken Pasta",
      category: "دجاج",
      cuisine: "إيطالي",
    },
    {
      id: 3,
      imageUrl: "/image1.svg",
      title: "Chicken Pasta",
      category: "دجاج",
      cuisine: "إيطالي",
    },
    {
      id: 4,
      imageUrl: "/image1.svg",
      title: "Chicken Pasta",
      category: "دجاج",
      cuisine: "إيطالي",
    },
    {
      id: 5,
      imageUrl: "/image1.svg",
      title: "Chicken Pasta",
      category: "دجاج",
      cuisine: "إيطالي",
    },
    {
      id: 6,
      imageUrl: "/image1.svg",
      title: "Chicken Pasta",
      category: "دجاج",
      cuisine: "إيطالي",
    },
    {
      id: 7,
      imageUrl: "/image1.svg",
      title: "Chicken Pasta",
      category: "دجاج",
      cuisine: "إيطالي",
    },
    {
      id: 8,
      imageUrl: "/image1.svg",
      title: "Chicken Pasta",
      category: "دجاج",
      cuisine: "إيطالي",
    },
    {
      id: 9,
      imageUrl: "/image1.svg",
      title: "Chicken Pasta",
      category: "دجاج",
      cuisine: "إيطالي",
    },
    {
      id: 10,
      imageUrl: "/image1.svg",
      title: "Chicken Pasta",
      category: "دجاج",
      cuisine: "إيطالي",
    },
    {
      id: 11,
      imageUrl: "/image1.svg",
      title: "Chicken Pasta",
      category: "دجاج",
      cuisine: "إيطالي",
    },
    {
      id: 12,
      imageUrl: "/image1.svg",
      title: "Chicken Pasta",
      category: "دجاج",
      cuisine: "إيطالي",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-[40px] font-extrabold text-center  mb-6 mt-8">جميع الوصفات</h1>
      <div className="flex gap-3">
      <div className="flex items-center  border w-[400px] border-gray-300 rounded-lg px-2 py-1 ml-6">
            <input
              type="text"
              placeholder=".... ابحث عن أكلة"
              className="flex-1 p-1 outline-none  text-right"
            />
            <Search className="text-gray-500" size={20} />
          </div>
          <button className="bg-orange-500 font-bold cursor-pointer flex gap-2  text-white px-4 py-2 rounded-lg hover:bg-[#FE590D] transition">
          اقتراح وصفات <Image src="/filter.svg" alt="filter" width={25} height={25} />
      </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
     
       
        

      
        <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              imageUrl={recipe.imageUrl}
              title={recipe.title}
              category={recipe.category}
              cuisine={recipe.cuisine}
            />
          ))}
        </div>
        <div className="w-full md:w-1/4 p-4 bg-white border-l-2 border-black">
      <h2 className="text-[28px] text-center font-extrabold pb-2 ">حسب الأصناف</h2>
      <ul className="mt-4 font-medium text-[25px] space-y-6">
        {categories.map((category, index) => (
          <li
            key={index}
            className="flex justify-end items-center text-right gap-2 py-1 px-3 cursor-pointer "
          >
            <span className="text-black">{category}</span>
            <FaUtensils className="text-orange-500 text-2xl" />
          </li>
        ))}
      </ul>
    </div>
  );


      </div>
    </div>
  );
};

export default RecipesList;
