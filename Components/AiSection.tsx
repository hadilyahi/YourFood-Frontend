'use client';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

function AiSection() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const MODEL_NAME = "gemini-1.5-flash"; // استخدام إصدار متاح

  const generateRecipe = async (inputText: string) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: `قم بتوليد وصفة طبخ لطبق يحتوي على: ${inputText}` }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`خطأ في API: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'تعذر توليد الوصفة.';
    } catch (error) {
      console.error('Error generating recipe:', error);
      throw new Error('حدث خطأ أثناء توليد الوصفة. حاول مرة أخرى.');
    }
  };

  const mutation = useMutation({
    mutationFn: generateRecipe,
    onSuccess: (data) => {
      setRecipe(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleGenerate = () => {
    if (ingredients.trim()) {
      mutation.mutate(ingredients);
    }
  };

  return (
    <div id='generate-recipes' className="flex flex-col items-center py-10 px-4">
      <h2 className="text-[35px] font-bold mb-4 text-center">
        توليد الوصفات بالذكاء الاصطناعي
      </h2>
      <p className="text-lg text-gray-400 text-center mb-4">
        ادخل وصف للطبق الذي تريده وسنقوم بإنشائه لك باستخدام الذكاء الاصطناعي!
      </p>
      <textarea
        id='recipe-input'
        className="border border-gray-300 p-3 w-full md:w-2/3 h-[150px] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        placeholder="اكتب المكونات هنا، وافصل بينها بفواصل (مثل: دجاج، طماطم، بصل)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      ></textarea>
      <button
        onClick={handleGenerate}
        className="bg-orange-500 hover:bg-orange-600 transition-all text-white w-full mt-4 py-2 rounded-lg font-bold"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'جاري التوليد...' : 'توليد الوصفة'}
      </button>
      {mutation.isError && (
        <p className="text-red-500 mt-4">حدث خطأ أثناء توليد الوصفة. حاول مرة أخرى.</p>
      )}
      {recipe && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-gray-900 w-full md:w-2/3">
          <h3 className="font-bold text-lg">الوصفة:</h3>
          <p>{recipe}</p>
        </div>
      )}
    </div>
  );
}

export default AiSection;
