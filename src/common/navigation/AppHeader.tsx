import React from "react";
import Image from "next/image";
import { AppSidebarToggler } from "./AppSidebarToggler";
import { Icon } from "@src/assets/Icon";
import { useRouter } from "next/router";
import { useTheme } from "@src/theme/theme";
import { Box } from "../atoms";

interface AppHeaderProps {
  setSearch: (v: string) => void;
  handleSearchInputSubmit: () => void;
  toggleSidebar: () => void;
}

export const AppHeader = ({ toggleSidebar }: AppHeaderProps) => {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <header className="sticky inset-x-0 top-0 z-10 flex w-full flex-wrap  bg-white py-2.5 pl-12   text-sm sm:flex-nowrap sm:justify-start sm:py-4">
      <nav
        className="mx-auto flex w-full basis-full items-center px-4 sm:px-6 md:px-8"
        aria-label="Global"
      >
        <AppSidebarToggler onClick={toggleSidebar} />
        <Box
          onClick={() => {
            router.push("/");
          }}
          className="mr-auto flex cursor-pointer items-center gap-5"
        >
          <Image
            src={"/images/mock.png"}
            alt="profile pic"
            style={{ objectFit: "contain" }}
            height={50}
            width={50}
          ></Image>
        </Box>
        <Box className="ml-auto flex gap-5">
          <Box onClick={() => router.push("/profile")} className="">
            <Icon
              className="cursor-pointer"
              name="user"
              width={20}
              height={20}
              color={colors.appNeutral300}
            />
          </Box>
        </Box>
      </nav>
    </header>
  );
};
