'use client';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";

function AiSection() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [category, setCategory] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const MODEL_NAME = "gemini-1.5-flash";

  const generateRecipe = async (inputText: string): Promise<string> => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `قم بتوليد وصفة طبخ لطبق حسب الوصف وايضا لاي صنف تنتمي وتقيمها من 5 : ${inputText}` }] }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`خطأ في API: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      const content = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'تعذر توليد الوصفة.';
      
     
     
      const categoryMatch = content.match(/الصنف:\s*(.*)/);
      
     
      setCategory(categoryMatch ? categoryMatch[1] : 'غير معروف');
      
      return content;
    } catch (error) {
      console.error('Error generating recipe:', error);
      throw new Error('حدث خطأ أثناء توليد الوصفة. حاول مرة أخرى.');
    }
  };

  const mutation = useMutation({
    mutationFn: generateRecipe,
    onSuccess: (data) => {
      setRecipe(data);
      setIsOpen(true);
    },
    onError: () => {
      console.error('حدث خطأ أثناء توليد الوصفة.');
    },
  });

  const handleGenerate = () => {
    if (ingredients.trim()) {
      mutation.mutate(ingredients);
    }
  };

  return (
    <div id='generate-recipes' className="flex flex-col items-center py-10 px-4">
      <h2 className="text-[35px] font-bold text-center mb-4">
        توليد الوصفات بالذكاء الاصطناعي
      </h2>
      
      <div className="bg-black h-[500px] w-[600px] text-white rounded-xl p-6 flex flex-col justify-around max-w-md shadow-lg">
        <p className="text-lg text-center mb-4">ادخل وصف للطبق الذي تريده</p>
        
        <textarea
          className="bg-white text-gray-700  text-right border-none p-3 w-full h-[250px] rounded-lg shadow-sm focus:outline-none"
          placeholder="اكتب وصفاً دقيقاً"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        ></textarea>
        
        <Button
          onClick={handleGenerate}
          className="bg-orange-500 hover:bg-orange-600 transition-all h-12 text-white w-full mt-4 py-2 rounded-lg font-bold"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'جاري التوليد...' : 'احصل على الوصفة'}
        </Button>
        
        {mutation.isError && (
          <p className="text-red-500 mt-4 text-center">حدث خطأ أثناء توليد الوصفة. حاول مرة أخرى.</p>
        )}
      </div>
  
    
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg bg-white rounded-xl p-6 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center justify-between">
              <span className="text-orange-500">🍽️ الوصفة</span>
             
            </DialogTitle>
          </DialogHeader>

          
          <div className="text-gray-600 text-sm flex items-center gap-2">
            <span>🥄 {category}</span>
          </div>

       
          <div className="mt-4 max-h-[500px] overflow-auto pr-2 text-gray-900">
            {recipe.split('\n').map((line, index) => {
              if (line.includes('المكونات') || line.includes('طريقة التحضير')) {
                return (
                  <h4 key={index} className="font-bold text-lg  mt-3">
                    {line}
                  </h4>
                );
              }
              return <p key={index} className="text-gray-700 leading-relaxed">{line}</p>;
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AiSection;
