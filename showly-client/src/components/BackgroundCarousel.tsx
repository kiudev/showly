import Fade from "embla-carousel-fade";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useTrendingContext } from "@/context/TrendingContext";

export const BackgroundCarousel = ({
  backdropImgUrl,
}: {
  backdropImgUrl: string;
}) => {
  const { trendingData } = useTrendingContext();

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
          <CarouselItem className="w-full h-screen" key={data.id}>
            <img
              className="w-full h-full object-cover object-top mask-b-from-60 mask-t-from-[600px]"
              src={backdropImgUrl + data.backdrop_path}
              alt=""
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
