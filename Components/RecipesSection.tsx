
import RecipeCard from "./Card";
import Link from "next/link";

export default function RecipeList() {
    const recipes = [
      
      {
        imageUrl: "/image1.svg",
        title: "Chicken Pasta",
        category: "دجاج",
        cuisine: "إيطالي",
      },
      {
        imageUrl: "/image1.svg",
        title: "Chicken Pasta",
        category: "دجاج",
        cuisine: "إيطالي",
      },
      {
        imageUrl: "/image1.svg",
        title: "Chicken Pasta",
        category: "دجاج",
        cuisine: "إيطالي",
      },
      {
        imageUrl: "/image1.svg",
        title: "Chicken Pasta",
        category: "دجاج",
        cuisine: "إيطالي",
      },
      {
        imageUrl: "/image1.svg",
        title: "Chicken Pasta",
        category: "دجاج",
        cuisine: "إيطالي",
      },
      {
        imageUrl: "/image1.svg",
        title: "Chicken Pasta",
        category: "دجاج",
        cuisine: "إيطالي",
      },
    ];
    return (
      <div className="p-6 ">
        <h1 className="text-[40px] font-extrabold text-center mb-12 mt-12 ">ألذ الوصفات</h1>
        
        
        <div className="flex flex-wrap justify-center gap-6 ">
  {recipes.map((recipe, index) => (
    <div 
      key={index} 
      className="w-full sm:w-[48%] lg:w-[32%] flex justify-center"
    >
      <RecipeCard
        imageUrl={recipe.imageUrl}
        title={recipe.title}
        category={recipe.category}
        cuisine={recipe.cuisine}
      />
    </div>
  ))}
</div>


        <Link href="/recipes">
        <div className="text-start mx-30 mt-6">
          <button className="bg-[#FE590D] cursor-pointer text-white py-2 px-6 rounded-lg text-lg font-bold hover:bg-orange-600 transition">
            عرض الكل
          </button>
      </div>
        </Link>
        </div>
    );
  }