import React, { CSSProperties, ReactNode, useState } from "react";
import { Box } from "../atoms";

interface AppPopoverProps {
  from: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
}

export const AppPopover = ({ from, children }: AppPopoverProps) => {
  const [show, setShow] = useState(false);
  return (
    <Box className="relative">
      <Box className="cursor-pointer" onClick={()=> setShow(!show)}>{from}</Box>
      {show && (
        <Box
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            top: '30px',
            right:0,
            width:200,
            zIndex:999,
            borderRadius:20,
            background: "#fff",
            filter: "drop-shadow(0px 4px 4px rgba(219, 194, 172, 0.35))",
            border: "1px solid rgba(46, 46, 46, 0.10)",
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
};
