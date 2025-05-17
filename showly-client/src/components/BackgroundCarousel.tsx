import Fade from "embla-carousel-fade";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { TrendingData } from "@/types/seriesDataTypes";

type BackgroundCarouselProps = {
  trendingData: TrendingData;
  backdropImgUrl: string;
};

export const BackgroundCarousel = ({
  trendingData,
  backdropImgUrl,
}: BackgroundCarouselProps) => {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
        Fade(),
      ]}
    >
      <CarouselContent>
        {trendingData.results.map((data) => (
          <CarouselItem className="w-full h-[500px]" key={data.id}>
            <img
              className="w-full h-full object-cover object-top mask-b-from-5"
              src={backdropImgUrl + data.backdrop_path}
              alt=""
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
