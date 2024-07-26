import { CSSProperties } from "react";
import { Box, Text } from "../atoms";
interface NoDataProps {
  canGoBack?: boolean;
  message?:string
  style?:CSSProperties
  textClassName?:string
}

export const NoData =({message, style, textClassName}: NoDataProps) => {
  return (
    <Box style={style}>
      <Text className={`text-app-neutral-300 font-semibold ${textClassName}`} >{message ?? 'No data'} </Text>
    </Box>
  )
}
