"use client";

import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white py-4 px-6 shadow-md">
   
     
   <button className="bg-orange-500 cursor-pointer  text-white px-4 py-2 rounded-lg hover:bg-[#FE590D] transition">
        قيّم تجربتك في موقعنا
      </button>
     
      <div className="hidden md:flex space-x-10 font-semibold text-[23px]">
      <ScrollLink
          to="generate-recipes"
          smooth={true}
          duration={500}
          className="cursor-pointer  hover:text-[#FE590D] transition"
        >
          توليد الوصفات
        </ScrollLink>
        
        <ScrollLink
          to="values"
          smooth={true}
          duration={500}
          
          className="cursor-pointer  hover:text-[#FE590D] transition"
        >
          القيم الغذائية
        </ScrollLink>
        <Link href="/recipes" className=" hover:text-[#FE590D] transition">
          الوصفات
        </Link>
        <ScrollLink
          to="hero"
          smooth={true}
          duration={500}
          
          className="cursor-pointer  hover:text-[#FE590D] transition"
        >
          الرئيسية
        </ScrollLink>
      </div>

    
      <Link href="/" className="cursor-pointer">
      <Image src="/Logo.svg" alt="your food" width={70} height={70} className="mr-8"/>
      </Link>
    </nav>
  );
}
