import { HTMLAttributes } from "react";
import { parseError } from "@src/utils/error";
import Image from "next/image";
import { Box } from "../atoms";
import { Spinner } from "../ui/Spinner";
import { useGetImageQuery } from "@src/queries/image.queries";

type ApiImageProps = {
  imageId?: string | null;
  width?: number;
  height?: number;
  spinnerContainerStyle?: HTMLAttributes<HTMLDivElement>["style"];
  fill?: boolean;
  addEmptyImage?: boolean;
  imageClassName?: string;
} & Omit<
  React.ComponentProps<typeof Image>,
  "src" | "alt" | "width" | "height" | "className"
>;

export const ApiImage = ({
  imageId,
  width,
  height,
  imageClassName,
  spinnerContainerStyle,
  style,
  ...props
}: ApiImageProps) => {
  const imageQuery = useGetImageQuery(imageId);
  if (
    imageId === undefined ||
    imageId === "" ||
    imageId === null ||
    !imageQuery.data
  ) {
    return (
      <>
        {width && height ? (
          <Image
            {...props}
            src={"/images/mock-logo.jpg"}
            alt="profile pic"
            width={width}
            height={height}
            className={imageClassName}
            style={style}
          ></Image>
        ) : (
          <Image
            {...props}
            src={"/images/mock-logo.jpg"}
            alt="profile pic"
            className={imageClassName}
            style={style}
            fill={true}
          ></Image>
        )}
      </>
    );
  }

  if (imageQuery.isLoading) {
    return (
      <Box
        className="grid h-full place-items-center"
        style={spinnerContainerStyle}
      >
        <Spinner />
      </Box>
    );
  }
  if (imageQuery.isError) {
    return <Box>{parseError(imageQuery.error).message}</Box>;
  }

  return (
    <>
      {width && height ? (
        <Image
          {...props}
          src={imageQuery.data}
          alt="profile pic"
          className={imageClassName}
          style={style}
          width={width}
          height={height}
          // fill
        ></Image>
      ) : (
        <Image
          {...props}
          src={imageQuery.data}
          alt="profile pic"
          className={imageClassName}
          style={style}
          fill
        ></Image>
      )}
    </>
  );
};
