import Image from "next/image";

interface RecipeCardProps {
  imageUrl: string;
  title: string;
  category: string;
  cuisine: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
    imageUrl,
    title,
    category,
    cuisine,
  }) => {
    return (
      <div className="bg-black text-white rounded-2xl overflow-hidden w-64 shadow-lg transform transition duration-300 sm:scale-95 xs:scale-90">
        <div className="relative w-full h-40">
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
        </div>
        <div className="p-4 text-center">
          <h2 className="text-lg font-bold">{title}</h2>
          <div className="flex justify-between px-4 my-2 text-sm">
            <div className="flex gap-2">
              <span className="text-[#FE590D] font-extrabold">{cuisine}</span>
              <span className="font-medium">: المطبخ</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#FE590D] font-extrabold">{category}</span>
              <span className="">: الصنف</span>
            </div>
          </div>
          <button className="bg-[#FE590D] cursor-pointer text-white py-2 px-4 rounded-lg mt-2 hover:bg-orange-600 transition">
            تفاصيل الوصفة
          </button>
        </div>
      </div>
    );
  };
  

export default RecipeCard;
