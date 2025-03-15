
import React from "react";
import IngredientsInputCard from "./IngredientsInputCard";




const NutritionCalculator = () => {

  return (
    <>
    <h1  id="values" className="text-center text-[40px] font-extrabold mt-12">حساب القيم الغذائية</h1>
     <div className="flex flex-col md:flex-row items-center justify-center scale-90  p-6">
      
      <IngredientsInputCard />
    </div>
    </>
   
  );
};

export default NutritionCalculator;
