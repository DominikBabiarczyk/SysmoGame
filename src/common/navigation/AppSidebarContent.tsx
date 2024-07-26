import React from "react";
import Image from "next/image";
import { useLogout } from "@src/features/auth/lib/useLogout";
import { useTranslation } from "next-i18next";
import { Box } from "../atoms";

export const AppSidebarContent = () => {
  const logout = useLogout();
  const { t } = useTranslation();

  const navigationTabs = [
    { href: "/profile", label: "Lorem ipsum" },
    { href: "SEPARATOR", label: "" },
    { href: "/profile", label: "Lorem ipsum" },
    { href: "SEPARATOR", label: "" },
    { href: "LOGOUT", label: t("common:logout") },
  ];

  const handleOnClicklogout = () => {
    //todo
    logout();
  };
  return (
    <Box className="">
      <Image
        className="mx-auto"
        src={"/images/mock.png"}
        alt="profile pic"
        style={{ objectFit: "contain", maxWidth: 150 }}
        width={150}
        height={52}
      ></Image>
      <Box className="mt-5 flex w-full flex-col">
        {navigationTabs.map((item, i) => {
          return (
            <>
              {item.href === "SEPARATOR" && (
                <Box
                  style={{ height: "1px" }}
                  className="w-full  bg-[#c4c4c4]"
                ></Box>
              )}
              {item.href === "LOGOUT" && (
                <a
                  key={i}
                  className="text-md flex-none cursor-pointer	 px-6 py-2 font-medium transition-all  hover:text-primary-700"
                  onClick={handleOnClicklogout}
                >
                  {item.label}
                </a>
              )}

              {item.href !== "SEPARATOR" &&
                item.href !== "LOGOUT" &&
                item.href !== "DELETE" && (
                  <a
                    key={i}
                    className="text-md flex-none px-6	 py-2 font-medium transition-all hover:text-primary-700 "
                    href={item.href}
                  >
                    {item.label}
                  </a>
                )}
            </>
          );
        })}
      </Box>
    </Box>
  );
};
