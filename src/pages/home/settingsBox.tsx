import { useRouter } from 'next/router';
import BackArrow from "@src/layouts/GraSysmo/BackArrow";
import ColorSlider from '@src/components/slider';
import { useAppContext } from '@src/context/completedTutorial';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const SettingsV2 = () => {
  const router = useRouter();
  const { musicVolume, setMusicVolume, sfxVolume, setSfxVolume } = useAppContext();
  const { t } = useTranslation();

  const supportPage = () => {
    router.push("/home/support/sendMessage");
  };

  const changeLanguage = (lang: string) => {
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <div className='flex flex-col items-center'>
        <h1 className="text-3xl mb-8 font-menuOptions600">{t("title.SETTINGS")}</h1>

        <div className="bg-orange-500 p-6 rounded-3xl shadow-lg max-w-sm text-center border-4 border-colors-white">
          <div className="flex items-center justify-between p-2">
            <span className="font-menuOptions700 pr-16">{t("descriptions.LANGUAGE")}</span>
            <div className="flex space-x-2 px-5">
              <img onClick={() => changeLanguage('pl')} src="/images/flags/poland.png" alt="Polish Flag" className="hover:cursor-pointer h-6 w-10 rounded" />
              <img onClick={() => changeLanguage('en')} src="/images/flags/england.png" alt="UK Flag" className=" hover:cursor-pointer h-6 w-10 rounded" />
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <span className="font-menuOptions700">{t("descriptions.MUSIC")}</span>
            <div className='w-40 flex items-end justify-end  hover:cursor-pointer'>
              <ColorSlider value={musicVolume} onChange={setMusicVolume} />
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <span className="font-menuOptions700">{t("descriptions.SFX")}</span>
            <div className='w-40 flex items-end justify-end'>
              <ColorSlider value={sfxVolume} onChange={setSfxVolume} />
            </div>
          </div>
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

export default SettingsV2;
