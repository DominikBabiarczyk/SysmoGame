import React, { useState } from 'react';
import { Router, useRouter } from 'next/router';
import { root } from 'postcss';

const Rules = () => {

const router = useRouter();
const [isChecked, setIsChecked] = useState(false);

const handleCheckBoxChange = () =>{
    setIsChecked(!isChecked);
}

const handleonClickNextButton = () => {
    if(isChecked){
        router.push("/home");
    }else{
        alert('Proszę zaakceprować zasady , aby kontynuować');
    }
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-extendedColors-background-main">
      <div className="bg-extendedColors-background-rules p-6 rounded-3xl shadow-lg max-w-sm md:max-w-md lg:max-w-lg text-colors-black border-4 border-colors-orange-500">

        <div className="text-center mb-4 ">
          <h1 className="text-2xl font-bold">RULES</h1>
          <p className="mt-2">Wygraj darmowe godziny programistyczne (kod)</p>
        </div>
        <ul className="list-disc list-inside text-left text-sm md:text-base ">
          <li>Nagroda obowiązuje tylko w software house Sysmo.pl</li>
          <li>Ilość godzin uzależniona jest od ukończonego poziomu trudności</li>
          <li>Kod ma ważność 3 miesięcy od otrzymania</li>
          <li>Aby skorzystać z kodu, skontaktuj się z nami :)</li>
        </ul>
        <p className="mt-4 text-center">
          Pełny regulamin znajdziesz <a href="#" className="text-orange-500 underline">tutaj</a>
        </p>

        <div className='flex flex-row items-center justify-center'>
            <div className="flex items-center justify-center mt-6 pr-10">
            <label className="flex items-center space-x-2">
                <input type="checkbox" onChange={handleCheckBoxChange} className="form-checkbox h-5 w-5 text-orange-500" />
                <span className="text-sm md:text-base">ACCEPT</span>
            </label>
            </div>
            <div className="flex items-center justify-center mt-4 pl-10 text-colors-black">
            <button onClick={handleonClickNextButton} className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 px-10 rounded-3xl border-2 border-colors-black">
                NEXT
            </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Rules;