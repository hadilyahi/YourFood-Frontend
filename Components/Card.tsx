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
    <div className="bg-black text-white rounded-2xl overflow-hidden w-64 shadow-lg transform transition duration-300 sm:scale-95 xs:scale-90">
      <div className="relative w-full h-40">
        <Image src={imageUrl} alt={`صورة لطبق ${title}`} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4 text-center">
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="flex justify-center gap-4 my-2 text-xs sm:text-sm">
          <div className="flex items-center gap-1">
            <span className="text-[#FE590D] font-extrabold">{cuisine}</span>
            <span className="text-gray-300">المطبخ</span>
          </div>
          <span className="text-gray-400">|</span>
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
