import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black h-[180px] text-white py-6 text-center">
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-center px-6">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/logo1.svg"
            alt="your food"
            width={120}
            height={120}
            className="mr-8"
          />
        </Link>

     
        <div className="text-center flex flex-col gap-6">
          <h2 className="text-[40px] font-extrabold">Thank You</h2>
          <div>
            <p className="text-sm">جميع الحقوق محفوظة</p>
            <p className="text-sm">© 2024</p>
          </div>
        </div>

       
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <FaLinkedin className="text-white text-2xl cursor-pointer hover:text-gray-400" />
            <FaFacebook className="text-white text-2xl cursor-pointer hover:text-gray-400" />
            <FaInstagram className="text-white text-2xl cursor-pointer hover:text-gray-400" />
          </div>
          <p className="text-sm">yourFood.17</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
