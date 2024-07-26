import React from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '@src/context/completedTutorial';
import { useTranslation } from 'react-i18next';
//import i18next from 'i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { completedTutorial } = useAppContext();

  const handleStartClick = () => {
    router.push("/tutorial/LevelEasy");
  };

  const handleSkipTutorial = () => {
    router.push("/tutorial/selectDifficulty");
  };

  const handleSettingsClick = () => {
    router.push("/home/settings");
  };

  const handleSupportClick = () => {
    router.push("/home/support/sendMessage");
  };

  const ExitTheApplication = () => {
    router.push("/welcom/Welcom");
  }



  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-extendedColors-background-main text-white space-y-6">
      <div className="h-52">
        <img src='/images/logoSysmo.png' alt="Cards" className="h-52" />
      </div>

      <div className="space-y-4 flex flex-col">
        <button
          onClick={(completedTutorial ? handleSkipTutorial : handleStartClick)}
          className="font-menuOptions800 bg-orange-500 hover:bg-orange-600 text-white  py-4 px-4 rounded-full w-64"
        >
          {t("btn.START")}
        </button>
        <button onClick={handleSettingsClick} className="font-menuOptions800 bg-white text-black hover:bg-gray-200  py-2 px-4 rounded-full w-64 border-2 border-orange-500">
          {t("btn.SETTINGS")}
        </button>
        <button onClick={handleSupportClick} className="font-menuOptions800 bg-white text-black hover:bg-gray-200  py-2 px-4 rounded-full w-64 border-2 border-orange-500">
          {t("btn.SUPPORT")}
        </button>
        <button onClick={ExitTheApplication} className="font-menuOptions800 bg-white text-black hover:bg-gray-200  py-2 px-4 rounded-full w-64 border-2 border-orange-500">
          {t("btn.QUIT")}
        </button>
      </div>

      <div className="absolute bottom-0 right-0 flex space-x-4 p-4">
        <img src="/images/bottomBarIcon/fb.png" className="text-orange-500 h-8 w-8" />
        <img src="/images/bottomBarIcon/in.png" className="text-orange-500 h-8 w-8" />
        <img src="/images/bottomBarIcon/insta.png" className="text-orange-500 h-8 w-8" />
        <img src="/images/bottomBarIcon/web.png" className="text-orange-500 h-7 w-7" />
      </div>

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


export default Home;
