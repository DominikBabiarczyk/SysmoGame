import { useEffect, useTransition } from 'react';
import { useRouter } from 'next/router';
import BackArrow  from "@src/layouts/GraSysmo/BackArrow";
import MainContainer from "@src/layouts/GraSysmo/MainContainer";
import { useTranslation, UseTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const LevelEasy = () => {

    const { t } = useTranslation();
    const router = useRouter();
    const nextPage = () => {
      router.push("/tutorial/LevelMedium");
    }

  return (
    <BackArrow>
      <MainContainer>
        <h1 className=" font-tutorial500 mb-4">{t("tutorial.Level EASY")}</h1>
        <div className="flex justify-center mb-4">
          <div className="h-60 w-40 mx-2 border-4 border-black rounded-lg bg-white flex justify-center items-center">
              <img src="/images/mouse.png" alt="Mouse" className="h-55 mx-2  rounded-lg" /> 
          </div>
          <div className="h-60 w-40 mx-2 border-4 border-black rounded-lg bg-white flex justify-center items-center">
              <img src="/images/mouse.png" alt="Mouse" className="h-55 mx-2  rounded-lg " />
          </div>
        </div>
        <p className="text-white font-tutorial400 mb-6">{t("tutorial.The player must match pairs of appropriate pictures")}</p>
        <button className="bg-white text-black font-menuOptions600 py-2 px-8 rounded-2xl" onClick={nextPage}>
          {t("btn.SKIP")}
        </button>
      </MainContainer>
    </BackArrow>
  );  
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["auth", "common"])),
    },
  };
}


export default LevelEasy;
