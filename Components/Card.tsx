"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RecipeCardProps {
  imageUrl: string;
  title: string;
  category: string;
  cuisine: string;
  id: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  imageUrl,
  title,
  category,
  cuisine,
  id,
}) => {
  const router = useRouter();

  const handleDetailsClick = () => {
    router.push(`/recipes/${id}`);
  };

  return (
    <div className="bg-black text-white rounded-2xl overflow-hidden scale-95 shadow-lg transition duration-300 transform hover:scale-105 w-full max-w-xs sm:max-w-sm md:max-w-md">
      <div className="relative w-full h-40  sm:h-48 md:h-56">
        <Image src={imageUrl} alt={`صورة لطبق ${title}`} layout="fill" objectFit="cover" className="rounded-t-2xl" />
      </div>
      <div className="p-4 text-center flex flex-col gap-2">
        <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
        <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1">
            <span className="text-[#FE590D] font-extrabold">{cuisine}</span>
            <span className="text-gray-300">المطبخ</span>
          </div>
          <span className="text-gray-400 hidden sm:block">|</span>
          <div className="flex items-center gap-1">
            <span className="text-[#FE590D] font-extrabold">{category}</span>
            <span className="text-gray-300">الصنف</span>
          </div>
        </div>
        <button
          onClick={handleDetailsClick}
          className="bg-[#FE590D] cursor-pointer text-white py-2 px-4 rounded-lg mt-2 hover:bg-orange-600 transition"
        >
          تفاصيل الوصفة
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
