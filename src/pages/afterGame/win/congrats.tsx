import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CongratsPage: React.FC = () => {
    const router = useRouter();
    const [isEmailSended, setIsEmailSended] = useState<string | null>(null);
    const { difficulty } = router.query;
    const { t } = useTranslation();

    useEffect(() => {
        if (router.isReady) {
            const data = router.query;
            console.log(data); // Debug: Sprawdź jakie dane są przekazywane
            setIsEmailSended(data.isEmailSended as string);
        }
    }, [router.isReady, router.query]);

    const handleNextLevel = () =>{
        let nextDifficulty
        if(difficulty == "easy") {
            nextDifficulty = "medium";
        }else{
            nextDifficulty = "hard";
        }
        router.push({
            pathname: "/game/game",
            query: {difficulty: nextDifficulty}});
    }

    const handleHome = () => {
        router.push("/home/Home");
    }

    const newGamee = () => {
        router.push("/tutorial/selectDifficulty");
    }

    const exitTheApplication = () => {
        router.push("/welcom/Welcom");
      }



    return (
        <div className="min-h-screen bg-colors-background-main flex flex-col items-center justify-center space-y-6">
            {isEmailSended === 'true' && <h3 className="text-2xl font-menuOptions700 text-white">{t("title.Code sended")}</h3>}
            <h1 className="text-4xl font-menuOptions700 text-white">{t("title.CONGRATS!")}</h1>
            <div className="space-y-6 flex flex-col items-center justify-center p-8">
                {(difficulty != "hard") && (<button onClick={handleNextLevel} className="bg-orange-500 text-black font-menuOptions700 py-4 px-8 rounded-full w-full">{t("btn.NEXT LEVEL")}</button>)}
                <button onClick={newGamee} className="bg-orange-500 text-black font-menuOptions700 py-4 px-8 rounded-full w-full">{t("btn.PLAY AGAIN")}</button>
                <button onClick={handleHome} className="bg-orange-500 text-black font-menuOptions700 py-4 px-8 rounded-full w-full">{t("btn.HOME PAGE")}</button>
                <button className="bg-orange-500 text-black font-menuOptions700 py-4 px-8 rounded-full w-full">{t("btn.SHARE")}</button>
                <button onClick={exitTheApplication} className="bg-orange-500 text-black font-menuOptions700 py-4 px-8 rounded-full w-full">{t("btn.QUIT")}</button>
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

export default CongratsPage;
