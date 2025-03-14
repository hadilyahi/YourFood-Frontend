const IngredientsInputCard = () => {
    return (
      <div className="bg-black h-[550px] text-white p-8 rounded-xl shadow-lg md:w-1/2 flex flex-col items-center">
      <h2 className="text-[35px] font-bold mb-4 text-center">عبر المكونات</h2>
      <p className="text-end text-[20px] mx-4 text-gray-300 mt-4 mb-12">
        هذه الأداة تساعدك على معرفة القيم الغذائية الموجودة في مكوناتك
      </p>
      <textarea
        className="w-full h-1/2 text-end p-4 rounded-lg bg-white text-black placeholder-gray-400"
        placeholder="ادخل المكونات وضع فاصلة بين كل مكون"
      ></textarea>
      <button className="bg-orange-500 cursor-pointer text-white w-full mt-6 py-3 rounded-lg hover:bg-orange-600 text-lg font-bold">
       احصل على النتائج
      </button>
    </div>
    
    );
  };

  export default IngredientsInputCard;