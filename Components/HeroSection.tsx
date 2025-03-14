import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="h-[514px] bg-black text-white flex items-center  px-10">
 
  <div className="w-1/2 flex justify-center">
  <Image
            src="/Hero.svg" 
            alt="طبق طعام"
            
            width={430}
            height={430}
            objectFit="cover"
            className="rounded-full border-4 border-black"
          />
  </div>

  <div className="text-right flex flex-col items-end space-y-4 w-[40%]">
    <h1 className="text-5xl font-bold leading-tight">
      ألذ المأكولات في متناول <span className="text-[#FE590D]">يديك</span>
    </h1>
    <p className="mt-4 text-lg text-gray-300">
   دليلك لأشهى المأكولات، مع حاسبة السعرات ومزايا   <span className="text-[#FE590D]">الذكاء الاصطناعي</span> 
    </p>
    <Link href="/recipes">
    <button className="mt-6 cursor-pointer  bg-[#FE590D] text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">
      اكتشف الوصفات
    </button>
    </Link>
  </div>
</section>
);

}
