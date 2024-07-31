import { useRouter } from 'next/router';
import BackArrow from "@src/layouts/GraSysmo/BackArrow";
import { useAppContext } from '@src/context/completedTutorial';
import { useState} from 'react';
import { useTranslation} from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const LevelHard = () => {
  const router = useRouter();
  const [choseLevel, setChoseLevel] = useState<string | null>(null);
  const completedTutorial = useAppContext();
  const { t } = useTranslation();

  const nextPage = () => {
    if (choseLevel) {
      router.push({
        pathname: "/game/game",
        query: { difficulty: choseLevel }
      });
    }
  };

  const hadnleBackArrow = () => {
    router.push("/home");
  };

  const handleBack = () => {
    router.back();
  };

  const setDifficultyLevel = (level: string) => {
    setChoseLevel(level);
  };

  return (
    <BackArrow handleBackClick={(completedTutorial ? hadnleBackArrow : handleBack)}>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
        <div className="bg-orange-500 text-black font-menuOptions700 py-4 px-8 rounded-full">
          {t("title.SELECT DIFFICULTY LEVEL")}
        </div>
        
        <div className="space-y-4 flex flex-col pt-10 pb-10">
          <button onClick={() => setDifficultyLevel("easy")} className={`text-black hover:bg-gray-500 ${choseLevel === "easy" ? 'bg-gray-500' : 'bg-white'} font-tutorial500 font-semibold text-base py-2 px-10 rounded-full border-2 border-orange-500`}>
            {t("btn.EASY")}
          </button>
          <button onClick={() => setDifficultyLevel("medium")} className={`text-black hover:bg-gray-500 ${choseLevel === "medium" ? 'bg-gray-500' : 'bg-white'} font-tutorial500 font-semibold  text-base py-2 px-10 rounded-full border-2 border-orange-500`}>
            {t("btn.MEDIUM")}
          </button>
          <button onClick={() => setDifficultyLevel("hard")} className={`text-black hover:bg-gray-500 ${choseLevel === "hard" ? 'bg-gray-500' : 'bg-white'} font-tutorial500 font-semibold  text-base py-2 px-10 rounded-full border-2 border-orange-500`}>
            {t("btn.HARD")}
          </button>
        </div>
        
        <button onClick={nextPage} className="bg-orange-500 hover:bg-orange-600 text-black font-menuOptions600 py-6 px-32 rounded-full mt-10 text-2xl">
          {t("btn.PLAY")}
        </button>
      </div>
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
