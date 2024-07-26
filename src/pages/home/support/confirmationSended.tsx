import React, { useState } from 'react';
import { Router, useRouter } from 'next/router';
import { root } from 'postcss';
import { Button } from 'react-aria-components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const Confirmations = () => {

  const router = useRouter();
  const { t } = useTranslation();

  const backToHome = () => {
    router.push("/home/Home");
  }

  const quitToSendMessage = () => {
    router.back();
  }
  
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-extendedColors-background-main text-white space-y-6">

        <p className='font-menuOptions600 text-5xl font-sans'>{t("title.Email sended!")}</p>

        <div className='flex flex-col justify-center items-center p-20 space-y-6'>

          <button onClick={backToHome} className="bg-orange-500 text-black font-menuOptions700 py-4 px-8 rounded-full w-60">
            {t("btn.HOME PAGE")}
          </button>

          <button onClick={quitToSendMessage} className="bg-orange-500 text-black font-menuOptions700 py-4 px-8 rounded-full w-60">
            {t("btn.QUIT")}
          </button>

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


export default Confirmations;