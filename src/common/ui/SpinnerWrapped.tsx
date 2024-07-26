import { Spinner } from "./Spinner";
import { Box } from "../atoms";

export const SpinnerWrapped = () => {
  return (
    <Box className="mt-50 m-auto self-center">
      <Spinner />
    </Box>
  );
};
