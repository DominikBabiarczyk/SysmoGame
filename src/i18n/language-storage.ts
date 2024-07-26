interface LanguageBodyI {
  language: string;
}

export const LanguageStorage = {
  setLanguage: (body: LanguageBodyI) => {
    localStorage.setItem("language", JSON.stringify(body));
  },
  getLanguage: () => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("language");
      try {
        if (item !== null) {
          return JSON.parse(item) as LanguageBodyI;
        }
        return null;
      } catch (e) {
        localStorage.removeItem("language");
        return null;
      }
    }
  },
};
