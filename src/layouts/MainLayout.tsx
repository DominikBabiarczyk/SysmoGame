import { Box } from "@src/common/atoms";
import { AppBottomShortMenu } from "@src/common/navigation/AppBottomShortMenu";
import { AppHeader } from "@src/common/navigation/AppHeader";
import { AppSidebarContent } from "@src/common/navigation/AppSidebarContent";
import { useChatSync } from "@src/features/chat/logic/useChatSync";
import React, { ReactNode, useEffect, useState } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [activeSidebar, setActiveSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  useChatSync()
  const toggleSidebar = () => {
    setActiveSidebar(!activeSidebar);
  };
  const handleSearchInputSubmit = () => {
    //TODO
    // console.log(search);
  };
  return (
    <Box className="bg-white-50">
      <AppHeader
        setSearch={setSearch}
        toggleSidebar={toggleSidebar}
        handleSearchInputSubmit={handleSearchInputSubmit}
      />
      <Box className="relative w-full pt-2 sm:px-4">
        <Box
          id="application-sidebar"
          className="hs-overlay hs-overlay-open:translate-x-0 scrollbar-y dark:scrollbar-y absolute   bottom-0 right-auto  top-0  z-[60] block    w-64 translate-x-0 transform overflow-y-auto bg-white  pb-10 pt-7 shadow-lg transition-all duration-300 "
          style={{
            left: activeSidebar ? "0" : "-500px",
            minHeight: "calc(100vh - 86px)",
          }}
        >
          <AppSidebarContent />
        </Box>
        <Box className="main-content mb-28">{children}</Box>
        <AppBottomShortMenu />
      </Box>
    </Box>
  );
};
