import { Box } from "../atoms";
import styles from "./Spinner.module.css";

interface SpinnerI {
  width?: number;
  height?: number;
}

export const Spinner = ({ width, height }: SpinnerI) => {
  return (
    <Box className={styles.loader} style={{ width: width, height: height }} />
  );
};
