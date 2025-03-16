import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 text-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-6 lg:px-12 space-y-4 md:space-y-0">
        {/* Logo */}
        <Link href="/" className="cursor-pointer">
          <Image
            src="/logo1.svg"
            alt="your food"
            width={90}
            height={90}
            className="mx-auto md:mx-0"
          />
        </Link>

        {/* Center Text */}
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-extrabold">Thank You</h2>
          <p className="text-xs md:text-sm">جميع الحقوق محفوظة</p>
          <p className="text-xs md:text-sm">© 2024</p>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex gap-2">
            <FaLinkedin className="text-white text-lg md:text-xl cursor-pointer hover:text-gray-400" />
            <FaFacebook className="text-white text-lg md:text-xl cursor-pointer hover:text-gray-400" />
            <FaInstagram className="text-white text-lg md:text-xl cursor-pointer hover:text-gray-400" />
          </div>
          <p className="text-xs md:text-sm">yourFood.17</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
