"use client";

import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import Image from "next/image";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // حالة القائمة

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) {
      alert("يرجى إدخال رسالة التقييم");
      return;
    }
    try {
      await addDoc(collection(db, "ratings"), {
        feedback,
        timestamp: new Date(),
      });
      alert("شكرًا على تقييمك!");
      setShowModal(false);
      setFeedback("");
    } catch (error) {
      console.error("حدث خطأ أثناء إرسال التقييم:", error);
    }
  };

  return (
    <nav className="bg-white py-4 px-6 shadow-md relative">
      <div className="flex justify-between items-center w-full max-w-6xl mx-auto">
        {/* زر القائمة للهاتف */}
        <button
          className="md:hidden text-black text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* القائمة المخفية في الهاتف */}
        <div
          className={`absolute top-16 left-0 w-full bg-white shadow-md flex flex-col space-y-4 p-4 transition-all ${
            menuOpen ? "block" : "hidden"
          } md:hidden`}
        >
          <ScrollLink
            to="hero"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-[#FE590D] transition"
            onClick={() => setMenuOpen(false)}
          >
            الرئيسية
          </ScrollLink>
          <Link
            href="/recipes"
            className="hover:text-[#FE590D] transition"
            onClick={() => setMenuOpen(false)}
          >
            الوصفات
          </Link>
          <ScrollLink
            to="values"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-[#FE590D] transition"
            onClick={() => setMenuOpen(false)}
          >
            القيم الغذائية
          </ScrollLink>
          <ScrollLink
            to="generate-recipes"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-[#FE590D] transition"
            onClick={() => setMenuOpen(false)}
          >
            توليد الوصفات
          </ScrollLink>
        </div>
        
        {/* القائمة في الشاشات الكبيرة */}
    

        
        <button
  className="bg-orange-500 cursor-pointer text-white px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-[#FE590D] transition text-xs md:text-sm"
  onClick={() => setShowModal(true)}
>
  <span className="md:inline hidden">قيّم تجربتك في موقعنا</span>
  <span className="md:hidden">قيّم تجربتك</span>
</button>

        <div className="hidden md:flex flex-grow justify-center space-x-10 font-bold text-lg">
        <ScrollLink
            to="generate-recipes"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-[#FE590D] transition"
          >
            توليد الوصفات
          </ScrollLink>
         
          <ScrollLink
            to="values"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-[#FE590D] transition"
          >
            القيم الغذائية
          </ScrollLink>
          <Link href="/recipes" className="hover:text-[#FE590D] transition">
            الوصفات
          </Link>
          <ScrollLink
            to="hero"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-[#FE590D] transition"
          >
            الرئيسية
          </ScrollLink>
          
        </div>

        
        <Link href="/" className="cursor-pointer">
          <Image src="/Logo.svg" alt="your food" width={80} height={80} />
        </Link>

        
       
      </div>
      

      {/* نافذة التقييم */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-80 text-center">
            <h3 className="text-lg font-bold mb-4">أدخل تقييمك</h3>
            <textarea
              className="w-full p-2 border rounded-lg text-black"
              rows={3}
              placeholder="اكتب ملاحظاتك هنا..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={() => setShowModal(false)}
              >
                إلغاء
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                onClick={handleSubmitFeedback}
              >
                إرسال
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
