import React from 'react';
import MainContainer from "@src/layouts/GraSysmo/MainContainer";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getSound } from '@src/utils/getSounds';
import { useRef } from 'react';
import { useAppContext } from '@src/context/completedTutorial';
import { Query } from '@tanstack/react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const GameOver: React.FC = () => {  
  const audioRef = useRef<HTMLAudioElement>(null);
  const { musicVolume } = useAppContext();
  const router = useRouter();
  const {difficulty} = router.query;
  const { t } = useTranslation();

  useEffect(() => {
    getSound("/sounds/YouLoose.mp3", audioRef, musicVolume);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []); 

    
    const goToHome = () => {
        router.push("/home/Home",)
    }

    const newGame = () => {
        router.push({
          pathname:"/game/game",
          query: {difficulty: difficulty}
        
        })
    }

    const exitTheApplication = () => {
      router.push("/welcom/Welcom");
    }

  return (
    <MainContainer>
        <h1 className="text-4xl font-menuOptions700 text-black mb-8">{t("title.GAME OVER")}</h1>
        <div className="space-y-8 flex flex-col items-center justify-center p-10">
          <button onClick={newGame} className="bg-white text-black font-menuOptions700 hover:bg-gray-200 py-2 px-4 rounded-full w-full">{t("btn.TRY AGAIN")}</button>
          <button onClick={goToHome} className="bg-white text-black font-menuOptions700 hover:bg-gray-200 py-2 px-4 rounded-full w-full">{t("btn.HOME")}</button>
          <button onClick={exitTheApplication} className="bg-white text-black font-menuOptions700 hover:bg-gray-200 py-2 px-4 rounded-full w-full">{t("btn.QUIT")}</button>
          <audio ref={audioRef}/>
        </div>
    </MainContainer>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["auth", "common"])),
    },
  };
}

export default GameOver;
