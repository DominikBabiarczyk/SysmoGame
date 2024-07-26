import { useRouter } from 'next/router';
import BackArrow from "@src/layouts/GraSysmo/BackArrow";
import ColorSlider from '@src/components/slider';
import { useAppContext } from '@src/context/completedTutorial';
import SettingsV2 from './settingsBox';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Settings = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const supportPage = () => {
    router.push("/home/support/sendMessage");
  };

  const handleBackClick = () => {
    router.push("/home/Home")
  }



  return (
    <BackArrow handleBackClick={handleBackClick}>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
        <SettingsV2/>

        <button onClick={supportPage} className="bg-orange-500 hover:bg-orange-600 text-black font-menuOptions700 py-6 px-20 rounded-full mt-10">
          {t("btn.SUPPORT")}
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

export default Settings;
