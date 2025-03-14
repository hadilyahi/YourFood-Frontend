import Image from "next/image";

const ImageInputCard = () => {
  return (
    <div className="bg-black h-[550px] text-white p-8 rounded-xl shadow-lg md:w-1/2 flex flex-col items-center">
    <h2 className="text-[35px] font-bold mb-4 text-center">عبر الصور</h2>
    <p className="text-end text-[20px] mx-4 text-gray-300 mt-4 mb-6">
      هذه الأداة تساعدك على معرفة القيم الغذائية الموجودة في الصورة التي ترسلها
    </p>
    <div className="w-full h-1/2 border-dashed border-2 border-gray-500 p-6 mt-4 flex flex-col items-center justify-center text-center rounded-lg">
      <label className="cursor-pointer flex flex-col items-center gap-2">
        <Image
          src="/Upload.svg"
          alt="Upload"
          width={40}
          height={40}
          className="w-12 h-12"
        />
        <span className="text-gray-400 font-medium">إضافة صورة</span>
        <input type="file" accept="image/*" className="hidden" />
      </label>
    </div>
    <button className="bg-orange-500 cursor-pointer text-white w-full mt-6 py-3 rounded-lg hover:bg-orange-600 text-lg font-bold">
     احصل على النتائج
    </button>
  </div>
  
  );
};

export default ImageInputCard;