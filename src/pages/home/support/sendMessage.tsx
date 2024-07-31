import React, { useState } from 'react';
import BackArrow from "@src/layouts/GraSysmo/BackArrow";
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const SentMessage = () => {
    const router = useRouter();
    const [mail, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [informationStatus, setInformationStatus] = useState("");
    const { t } = useTranslation();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleClearInput = () => {
        setEmail("");
        setInformationStatus("");
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    function isCorrectFormat(text: string): boolean {
        const regex = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]+$/;
        return regex.test(text);
      }

    const handleSendButton = () => {
        if (mail === ''  || message === '') {
            if (mail != '' && !isCorrectFormat(mail)){
                setInformationStatus("invalidMail");
            }
            setInformationStatus("tryAgain");
        } else if(isCorrectFormat(mail)) {
            router.push("/home/support/confirmationSended");
            setInformationStatus("");
        }else{
            setInformationStatus("invalidMail");
        }
    };

    return (
        <BackArrow>
            <div className="min-h-screen flex flex-col items-center justify-center text-white">
                {informationStatus === "tryAgain" && (
                    <p className="text-1xl font-menuOptions600 mb-8">{t("title.TRY AGAIN")}</p>
                )}
                {informationStatus === "invalidMail" && (
                    <div className='flex justify-center items-center flex-col'>
                        <p className="font-menuOptions600 mb-2 text-red-600 ">{t("title.INVALID E-MAIL")}</p>
                        <p className="font-menuOptions600 mb-2 text-white ">{t("title.TRY AGAIN")}</p>
                    </div>
                )}
                <h1 className="font-menuOptions600 text-3xl mb-8">{t("title.SUPPORT")}</h1>
                <div className="bg-orange-500 p-4 rounded-3xl shadow-lg max-w-xl w-full text-center border-4 border-white text-black">
                    <form className="flex flex-col space-y-4">
                        <label htmlFor="email" className=" font-menuOptions600">{t("descriptions.Please enter your e-mail")}</label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                className={`p-2 pl-3 pr-10 rounded-2xl w-full ${(informationStatus === 'invalidMail') || (informationStatus ==="tryAgain" && mail=="") ? 'border-2 border-red-600 bg-red-200' : 'border-2 border-black'}`}
                                value={mail}
                                onChange={handleEmailChange}
                            />
                            {informationStatus === 'invalidMail' && (
                                <span
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    onClick={handleClearInput}>
                                    <img src="/images/X.svg" alt="Clear" className="h-5 w-5 text-red-600" />
                                </span>
                            )}
                        </div>
                        <label htmlFor="message" className="font-menuOptions600 ">{t("descriptions.Message")}</label>
                        <textarea
                            id="message"
                            className={`p-2 h-36 rounded-2xl border-2 border-black w-full resize-none ${(informationStatus != '' && message=="") ? 'border-2 border-red-600 bg-red-200' : 'border-2 border-black'}`}
                            value={message}
                            onChange={handleMessageChange}
                        />
                        <button
                            type='button'
                            className="font-menuOptions700 mt-4 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-black rounded-full shadow-md "
                            onClick={handleSendButton}>
                            {t("btn.SEND")}
                        </button>
                    </form>
                </div>
                <div className="mt-8 flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-2">
                        <img src="/images/bottomBarIcon/mail.png" alt="Email Icon" className="h-7 w-7" />
                        <a href="mailto:contact@sysmo.pl" className="text-lg">contact@sysmo.pl</a>
                    </div>
                    <div className="flex items-center space-x-2">
                        <img src="/images/bottomBarIcon/web.png" alt="Web Icon" className="h-7 w-7" />
                        <a href="https://sysmo.pl" className="text-lg">sysmo.pl</a>
                    </div>
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

export default SentMessage;
