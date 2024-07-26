// components/Layout.tsx
import React from 'react';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
  handleBackClick?: () => void; // Dodaj typ dla funkcji handleBackClick
}


const Layout: React.FC<LayoutProps> = ({ children, handleBackClick }) => {

  const router = useRouter();
  const defaultHandleBackClick = () => {
    router.back(); // Powrót do poprzedniej strony
  };

  return (
    <div className="relative min-h-screen min-w-screen bg-extendedColors-background-main text-white justyfy-center items-center">
      <button 
        className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-3 rounded-xl"
        onClick={handleBackClick || defaultHandleBackClick}
      >
        <img src='/images/backArrow.png' className='pr-1' />
      </button>
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default Layout;
