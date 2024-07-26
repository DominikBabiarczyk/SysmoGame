import { Carousel } from "react-responsive-carousel";
import { ApiImage } from "./ApiImage";
import { Box } from "@src/common/atoms";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface ImageGalleryProps {
  imageIds: string[];
  height?: number;
}

export const ImageGallery = ({ imageIds, height = 300 }: ImageGalleryProps) => {
  return (
    <Box className="large-gallery relative">
      <Carousel showIndicators={false} showStatus={false} dynamicHeight={true}>
        {imageIds.map((pic, index) => (
          <Box key={index}>
            <ApiImage
              imageId={pic}
              width={700}
              height={700}
              style={{ objectFit: "cover", minHeight: 500 }}
            />
            {/* <ImageGalleryCounter
              number={index + 1}
              numberOfImages={imageIds.length}
            /> */}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};
