import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="h-auto md:h-[514px] bg-black text-white flex flex-row items-center px-4 md:px-10 py-6 md:py-0">
      <div className="w-1/2 flex justify-center">
        <Image
          src="/Hero.svg"
          alt="طبق طعام"
          width={300}
          height={300}
          objectFit="cover"
          className="rounded-full border-4 border-black"
        />
      </div>

      <div className="text-right flex flex-col items-end space-y-3 w-[50%] md:w-[40%]">
        <h1 className="text-2xl md:text-5xl font-bold leading-tight">
          ألذ المأكولات في متناول <span className="text-[#FE590D]">يديك</span>
        </h1>
        <p className="mt-2 md:mt-4 text-sm md:text-lg text-gray-300">
          دليلك لأشهى المأكولات، مع حاسبة السعرات ومزايا
          <span className="text-[#FE590D]"> الذكاء الاصطناعي</span>
        </p>
        <Link href="/recipes">
          <button className="mt-3 md:mt-6 cursor-pointer bg-[#FE590D] text-white px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg hover:bg-orange-600 transition">
            اكتشف الوصفات
          </button>
        </Link>
      </div>
    </section>
  );
}
