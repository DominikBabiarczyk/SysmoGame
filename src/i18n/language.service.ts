import { i18n } from "next-i18next";
import { NextRouter } from "next/router";
import availableLanguages from "./availableLanguages";
import { LanguageStorage } from "./language-storage";

class LanguageService {
  public changeLanguage(newLanguage: string, router: NextRouter): void {
    try {
      LanguageStorage.setLanguage({ language: newLanguage });
      if (i18n === null) {
        throw new Error("i8n is null");
      }
      i18n.changeLanguage(newLanguage.toLowerCase());
      const path = router.asPath;
      router.push(path, undefined, { locale: newLanguage.toLowerCase() });
    } catch (e) {
      console.error("LanguageService::changeLanguage:", e);
    }
  }

  public changeLanguageIfIsSet(router: NextRouter): void {
    try {
      let language = LanguageStorage.getLanguage();
      if (language === null || language === undefined) {
        language = { language: "pl" };
      }

      if (i18n === null) {
        throw new Error("i8n is null");
      }
      const path = router.asPath;
      i18n.changeLanguage(language.language.toLowerCase());

      router.push(path, undefined, { locale: language.language.toLowerCase() });
    } catch (e) {
      console.error("LanguageService::changeLanguageIfIsSet:", e);
    }
  }

  public getTranslatedAvailableLanguages(): typeof availableLanguages {
    try {
      if (i18n === null) {
        throw new Error("i8n is null");
      }
      return availableLanguages.map((it) => ({
        ...it,
        label: (i18n as NonNullable<typeof i18n>).t(
          `common:languages:${it.value.toUpperCase()}`,
        ),
      }));
    } catch (e) {
      console.error("LanguageService::getTranslatedAvailableLanguages:", e);
      return [];
    }
  }

  public getCurrentLanguage = () => {
    try {
      if (i18n === null) {
        throw new Error("i8n is null");
      }
      return i18n.language.toUpperCase();
    } catch (e) {
      console.error("LanguageService::getCurrentLanguage:", e);
      return "PL";
    }
  };
}

export const languageService = new LanguageService();
