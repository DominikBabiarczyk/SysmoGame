import { useRouter } from 'next/router';
import BackArrow  from "@src/layouts/GraSysmo/BackArrow";
import MainContainer from "@src/layouts/GraSysmo/MainContainer";
import { useAppContext } from '@src/context/completedTutorial';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const LevelHard = () => {

    const {setCompletedTutorial} = useAppContext();
    const { t } = useTranslation();
    const router = useRouter();
    const nextPage = () => {
      setCompletedTutorial(true);
      router.push("/tutorial/selectDifficulty");
    }

  return (
    <BackArrow>
      <MainContainer>
          <h1 className="text-2xl font-tutorial500 mb-4">{t("tutorial.Level HARD")}</h1>
          <div className="flex justify-center mb-4">
            <div className="h-60 w-40 mx-2 border-4 border-black rounded-lg bg-white flex justify-center items-center">
                <p className='text-black size-24 font-bold justify-center items-center flex'>Mouse</p>
            </div>
            <div className="h-60 w-40 mx-2 border-4 border-black rounded-lg bg-white flex justify-center items-center text-center">
                <p className='text-black size-24 font-bold justify-center items-center flex'>A device used to interact with a computer</p>
            </div>
          </div>
          <p className="text-white font-tutorial400 mb-6">{t("tutorial.The player must match key words with an adequate definition")}</p>
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


export default LevelHard;