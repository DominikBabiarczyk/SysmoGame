import Image from "next/image";

type ImageSourceOrImageId =
  | {
      source: {
        uri: string;
      };
    }
  | {
      imageId: string;
    };

type AppImageProps = {
  className?: string;
  alt: string;
  width: number;
  height: number;
} & ImageSourceOrImageId;

function getImageSource(imageId: string) {
  return "SOME_LINK_HTTP" + imageId;
}

export const AppImage = (props: AppImageProps) => {
  if ("source" in props) {
    return <Image src={props.source.uri} {...props} />;
  }
  return <Image src={getImageSource(props.imageId)} {...props} />;
};
