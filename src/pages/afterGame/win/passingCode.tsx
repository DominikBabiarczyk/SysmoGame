import React from 'react';
import MainContainer from "@src/layouts/GraSysmo/MainContainer";
import { useRouter } from 'next/router';
import {generateRandomCode} from "@src/pages/afterGame/win/generateCode"
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { getSound } from '@src/utils/getSounds';
import { useAppContext } from '@src/context/completedTutorial';
import { Query } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const LevelComplete: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { musicVolume } = useAppContext();
  const router = useRouter();
  const {difficulty} = router.query;
  const { t } = useTranslation();


  useEffect(() => {
    getSound("/sounds/YouWin.mp3", audioRef, musicVolume)
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []); 


  const [randomCode, setRandomCode] = useState<string>('');

  useEffect(() => {
    setRandomCode(generateRandomCode());
  }, []);

    

    const sendEmail = () => {
      router.push({
        pathname: "/afterGame/win/sendEmail",
        query: {difficulty: difficulty}
      });
    }
    
    
    const dontSendEmail = () => {
      const data = {isEmailSended: false, difficulty: difficulty};
      router.push({
          pathname: "/afterGame/win/congrats",
          query: data});
    }

    const putCodeInGloveBox = () => {
      navigator.clipboard.writeText(randomCode).then(
        () => {
          alert("Text copied to clipboard successfully!")
        },
            (err) => {
      console.error("Failed to copy text to clipboard: ", err);
    }
      );
    }

  return (
    <MainContainer>
      <div className="space-y-6 text-center flex flex-col items-center">
        <h1 className="text-4xl font-descSend700 text-black space-y-4">
          <span className="block ">{t("title.LEVEL")}<br/>{t("title.COMPLETE!")}</span>
        </h1>
        <p className="text-lg font-descSend700 text-black space-y-2">
          <span className="block">{t("descriptions.YOU WON")}</span>
          <span className="block">{t("descriptions.5 HOURS OF PROGRAMMING")}</span>
        </p>
        <div className="flex justify-center font-descSend700 items-center space-x-2 bg-white rounded-full h-12 w-60">
          <span className="bg-black text-white h-full w-3/4 flex items-center justify-center rounded-full">
            {randomCode}
          </span>
          <button onClick={putCodeInGloveBox} className="bg-white text-black font-descSend700 pr-4 rounded-full ml-2">{t("btn.COPY")}</button>
        </div>
        <p className="text-lg text-black font-descSend700">{t("descriptions.Do you want to receive the code by email?")}</p>
        <div className="flex justify-center space-x-4">
          <button onClick={dontSendEmail} className="bg-white font-descSend700 text-black py-2 px-6 rounded-full">{t("NO")}</button>
          <button onClick={sendEmail} className="bg-white font-descSend700 text-black py-2 px-6 rounded-full">{t("YES")}</button>
        </div>
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

export default LevelComplete;
