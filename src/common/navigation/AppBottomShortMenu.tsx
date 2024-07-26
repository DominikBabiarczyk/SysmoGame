import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Icon } from "@src/assets/Icon";
import { Box } from "../atoms";
import Image from "next/image";
import { useGetUserUnreadChatsNumberQuery } from "@src/queries/chat.queries";

export const AppBottomShortMenu = () => {
  const router = useRouter();

  const redirect = (path: string) => {
    router.push(path);
  };
  return (
    <Box className="bottom-menu border-black-300  fixed inset-x-0 bottom-0 z-[999] m-auto	 h-14 w-11/12	 rounded-t-2xl border bg-white lg:w-9/12">
      <Box className="mx-2 my-auto  flex flex-row items-center	justify-between sm:mx-10 lg:mx-20">
        <Box className="relative" onClick={() => redirect("/chats")}>
          <Icon
            className="cursor-pointer"
            color={router.pathname === "/chats" ? "#8DA9C4" : "#3D5467"}
            width={30}
            height={30}
            name="envelope"
          />
        </Box>
        <Box onClick={() => redirect("/favourites")}>
          <Icon
            className="cursor-pointer"
            color={router.pathname === "/favourites" ? "#8DA9C4" : "#3D5467"}
            name="heart"
            width={30}
            height={30}
          />
        </Box>

        <Box
          onClick={() => {
            router.push("/");
          }}
          className="cursor-pointer"
        >
          <Image
            src={"/images/mock.png"}
            alt="profile pic"
            style={{ objectFit: "contain" }}
            height={50}
            width={50}
          ></Image>
        </Box>
        <Box onClick={() => redirect("/events")}>
          <Icon
            className="cursor-pointer"
            name="clock"
            width={30}
            height={30}
            color={router.pathname === "/events" ? "#8DA9C4" : "#3D5467"}
          />
        </Box>
        <Box onClick={() => redirect("/posts")}>
          <Icon
            className="cursor-pointer"
            color={router.pathname === "/posts" ? "#8DA9C4" : "#3D5467"}
            width={30}
            height={30}
            name="group"
          />
        </Box>
      </Box>
    </Box>
  );
};
