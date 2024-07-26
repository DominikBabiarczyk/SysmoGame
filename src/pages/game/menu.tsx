import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Settings from '../home/settings';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

interface MenuProps {
  onResume: () => void;
  setSettingsWindow: (value:boolean) => void;
  pausedTime: number;
}


const Menu: React.FC<MenuProps> = ({ onResume, setSettingsWindow, pausedTime}) => {

    const [state, setState] = useState({ someSetting: true });
    const { t } = useTranslation();
    const router = useRouter();

    const handleNewGame = () => {
      router.push("/tutorial/selectDifficulty");
    }
    
    const handleGoToHome = () => {
        router.push("/home/Home");
    }
    
    const handleGoToSettings = () => {
       
      setSettingsWindow(true);
    }


  return (
    <div className="flex flex-col items-center w-100 justify-center bg-black rounded-3xl space-y-8 p-20 px-40 ">
      <h1 className="text-4xl font-menuOptions700 text-white">{t("title.MENU")}</h1>
      <div className="bg-orange-500 text-2xl text-black text-center font-semibold py-2 px-8 rounded-full w-40">
        {new Date(pausedTime * 1000).toISOString().substr(14, 5)}
      </div>
      <button  onClick={onResume} className="bg-orange-500 text-2xl text-black font-menuOptions700 py-4 px-8 rounded-full w-full">{t("btn.RESUME")}</button>
      <button onClick={handleNewGame} className="bg-orange-500 text-2xl text-black font-menuOptions700 py-4 px-8 rounded-full w-full">{t("btn.NEW GAME")}</button>
      <button  onClick={handleGoToSettings} className="bg-orange-500 text-2xl text-black font-menuOptions700 py-4 px-8 rounded-full w-full">{t("btn.SETTINGS")}</button>
      <button onClick={handleGoToHome} className="bg-orange-500 text-2xl text-black font-menuOptions700 py-4 px-8 rounded-full w-full">{t("btn.HOME")}</button>
    </div>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["auth", "common"])),
    },
  };
}

export default Menu;



