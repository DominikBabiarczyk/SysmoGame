import React from "react";
import { LanguageButton } from "./LanguageButton";
import { useRouter } from "next/router";
import { languageService } from "./language.service";
import { images } from "@src/assets/images";
import { Box } from "@src/common/atoms";

export const LanguageSwitch = () => {
  const router = useRouter();

  const handleLanguageChange = (newLang: string) => {
    languageService.changeLanguage(newLang, router);
  };

  return (
    <Box className="flex flex-row">
      <Box
        style={{
          width: 35,
          height: 35,
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        className="cursor-pointer"
      >
        <LanguageButton
          image={images.eng}
          onPress={() => {
            console.log("?");
            handleLanguageChange("en");
          }}
          isSelected={languageService.getCurrentLanguage() === "EN"}
        />
      </Box>
      <Box
        className="cursor-pointer"
        style={{
          width: 35,
          height: 35,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LanguageButton
          image={images.de}
          onPress={() => {
            handleLanguageChange("de");
          }}
          isSelected={
            languageService.getCurrentLanguage() === "DE" ||
            !languageService.getCurrentLanguage()
          }
        />
      </Box>
    </Box>
  );
};
