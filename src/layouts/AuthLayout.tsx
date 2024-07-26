import { Icon } from "@src/assets/Icon";
import { Box } from "@src/common/atoms";
import { useTheme } from "@src/theme/theme";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import Image from "next/image";
import { LanguageSwitch } from "@src/i18n/LanguageSwitch";
// import FirstPageAppGame from "@src/layouts/FitsyPageAppGame"

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { colors } = useTheme();
  const showBackArrowPaths = ["/auth/register", "/auth/reset"];
  return (
    <Box className="flex flex-col  md:flex-row">
      <Box style={{ zIndex: 999999 }} className="fixed right-4 top-5">
        <LanguageSwitch />
      </Box>
      <Box className=" hidden h-screen w-1/2 items-center  justify-center md:flex">
        <Image
          src={"/images/mock.png"}
          alt="profile pic"
          style={{ objectFit: "contain", maxWidth: "300px" }}
          height={300}
          width={300}
        ></Image>
      </Box>
      <Box className="relative m-auto mt-3 flex w-full items-center justify-center md:mt-0 md:min-h-screen md:w-1/2">
        {showBackArrowPaths.includes(router.pathname) && (
          <Box
            onClick={() => router.back()}
            className="absolute left-[20px] top-[50px] flex cursor-pointer items-center gap-2 font-semibold md:left-[50px]"
          >
            <Icon
              color={colors.appNeutral300}
              name="back"
              width={20}
              height={20}
            />
            {t("common:btn.back")}
          </Box>
        )}

        {children}

      </Box>
    </Box>
  );
};
