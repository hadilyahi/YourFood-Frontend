
import React from "react";
import IngredientsInputCard from "./IngredientsInputCard";
import ImageInputCard from "./ImageInputCard";



const NutritionCalculator = () => {

  return (
    <>
    <h1  id="values" className="text-center text-[40px] font-extrabold mt-12">حساب القيم الغذائية</h1>
     <div className="flex flex-col md:flex-row items-center scale-90 gap-28 p-6">
      <ImageInputCard />
      <IngredientsInputCard />
    </div>
    </>
   
  );
};

export default NutritionCalculator;
