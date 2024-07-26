import React,{useState, useEffect} from 'react';
import MainContainer from "@src/layouts/GraSysmo/MainContainer";
import BackArrow from "@src/layouts/GraSysmo/BackArrow";
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';



const LevelComplete: React.FC = () => {
    const router = useRouter();
    const [informationStatus, setInformationStatus] = useState("");
    const [mail, setEmail] = useState('');
    const {difficulty} = router.query;
    const { t } = useTranslation();



    function isCorrectFormat(text: string): boolean {
        const regex = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]+$/;
        return regex.test(text);
      }

    const handleSendButton = () => {
        if (mail === '' ) {
            setInformationStatus("tryAgain");
        } else if(isCorrectFormat(mail)) {
            const data = {isEmailSended: true, difficulty: difficulty};
            router.push({
                pathname: "/afterGame/win/congrats",
                query: data});
            setInformationStatus("");
        }else{
            setInformationStatus("invalidMail");
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleClearInput = () => {
        setEmail("");
        setInformationStatus("");
    };

  return (
    <BackArrow>
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
        {informationStatus === "tryAgain" && (
            <p className="text-1xl font-tutorial500 mb-8">{t("title.TRY AGAIN")}</p>
        )}
        {informationStatus === "invalidMail" && (
            <div className='flex justify-center items-center flex-col'>
                <p className="text-1xl mb-2 text-red-600 font-menuOptions700">{t("title.INVALID E-MAIL")}</p>
                <p className="font-tutorial500 text-lg mb-2 text-white ">{t("title.TRY AGAIN")}</p>
            </div>
        )}
        <div className="bg-orange-500 p-4 rounded-3xl shadow-lg min-w-150 w-full text-center border-4 border-white text-black">
            <form className="flex flex-col space-y-4 items-center justify-center">
                <label htmlFor="email" className="text-lg font-menuOptions700">{t("descriptions.Please enter your e-mail")}</label>
                <div className="relative">
                    <input
                        type="email"
                        id="email"
                        className={`p-2 pl-3 pr-10 rounded-2xl w-full ${(informationStatus === 'invalidMail') ? 'border-2 border-red-600 bg-red-200' : 'border-2 border-black'}`}
                        value={mail}
                        onChange={handleEmailChange}
                    />
                    {informationStatus === 'invalidMail' && (
                        <span
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={handleClearInput}
                        >
                            <img src="/images/X.svg" alt="Clear" className="h-5 w-5 text-red-600" />
                        </span>
                    )}
                </div>

                <button
                    type='button'
                    className="mt-4 py-2 px-4 bg-black w-40 text-white rounded-full shadow-md font-menuOptions600 text-lg"
                    onClick={handleSendButton}>
                    {t("btn.SUBMIT")}
                </button>
            </form>
        </div>
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

export default LevelComplete;