import AiSection from "@/Components/AiSection";
import Hero from "@/Components/HeroSection";
import NutritionCalculator from "@/Components/NutritionCalculator";
import RecipeList from "@/Components/RecipesSection";



export default function Home() {
  return (
    <>
   
    <Hero/>
    <RecipeList/>
    <NutritionCalculator/>
    <AiSection/>
    </>
  );
}
