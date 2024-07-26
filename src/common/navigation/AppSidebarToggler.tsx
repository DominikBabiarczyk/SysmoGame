import React from "react";
import { Box } from "../atoms";

interface AppSidebarTogglerProps {
  onClick: () => void;
}

export const AppSidebarToggler = ({ onClick }: AppSidebarTogglerProps) => {
  return (
    <Box
      onClick={onClick}
      className="absolute inset-0 top-2.5 z-20 w-fit  px-4   "
    >
      <Box className="flex w-fit items-center py-4">
        <button
          type="button"
          className="text-gray-500 hover:text-gray-600"
          data-hs-overlay="#application-sidebar"
          aria-controls="application-sidebar"
          aria-label="Toggle navigation"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_923_293)">
              <path
                d="M1.82373 7.41167H28.1767C29.1823 7.41167 30 6.59395 30 5.58838C30 4.5828 29.1823 3.76465 28.1767 3.76465H1.82373C0.818156 3.76465 0 4.5828 0 5.58838C0 6.59395 0.818156 7.41167 1.82373 7.41167Z"
                fill="#2F354C"
              />
              <path
                d="M28.1767 13.1763H1.82373C0.818156 13.1763 0 13.9944 0 15C0 16.0056 0.818156 16.8233 1.82373 16.8233H28.1767C29.1823 16.8233 30 16.0056 30 15C30 13.9944 29.1823 13.1763 28.1767 13.1763Z"
                fill="#2F354C"
              />
              <path
                d="M28.1767 22.5879H1.82373C0.818156 22.5879 0 23.4065 0 24.4121C0 25.4176 0.818156 26.2353 1.82373 26.2353H28.1767C29.1823 26.2353 30 25.4176 30 24.4121C30 23.4065 29.1823 22.5879 28.1767 22.5879Z"
                fill="#2F354C"
              />
            </g>
            <defs>
              <clipPath id="clip0_923_293">
                <rect width="30" height="30" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </Box>
    </Box>
  );
};
