import { useEffect } from 'react';
import { useRouter } from 'next/router';



const Welcome = () => {

  const router = useRouter();
  const nextPage = () => {
    router.push("/welcom/Rules");
  }

  return (

    
    <div className="min-h-screen bg-extendedColors-background-main flex flex-col ">

      {/* Pierwszy element wyśrodkowany */}
      <div className="flex-grow flex flex-col justify-center items-center">
        <img src='/images/logoSysmo.png' 
          className="w-50 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl h-auto object-contain"
          onClick={nextPage}/>
      </div>

      {/* Dwa kolejne elementy na dole */}
      <div className="flex flex-col items-center pb-10 space-y-4">
        <div className='text-center'>
        <p className="font-public-sans font-bold text-2xl leading-custom-37.5 tracking-custom-tight">
        Powered by
      </p>
        </div>
        <div>
          <img src='/images/LogoBottomBar.png' className="w-50 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl h-auto object-contain"/> 
        </div>
      </div>
    </div>
  );  
};

export default Welcome;
