import { useEffect, useState } from "react";
import { getTopRatedSeries, getTrendingSeries } from "@/services/seriesService";
import { TopRatedData, TrendingData } from "@/types/seriesTypes";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import Fade from "embla-carousel-fade";

const BACKDROP_IMG_URL = import.meta.env.VITE_BACKDROP_IMG_URL;
const POSTER_IMG_URL = import.meta.env.VITE_POSTER_IMG_URL;

export const Hero = () => {
  const [trendingData, setTrendingData] = useState<TrendingData>({
    results: [],
  });
  const [topRatedData, setTopRatedData] = useState<TopRatedData[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const getSeriesData = async () => {
      const trendingFunc = await getTrendingSeries();
      setTrendingData(trendingFunc);

      const topRatedFunc = await getTopRatedSeries();
      setTopRatedData(topRatedFunc);
    };

    getSeriesData();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    }

    updateCurrent()

    api.on("select", updateCurrent);
  }, [api]);

  return (
    <>
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
                src={BACKDROP_IMG_URL + data.backdrop_path}
                alt=""
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <section className="absolute inset-0 flex flex-row justify-between items-center gap-20 w-[1400px] m-auto">
        <div className="w-[50%] flex flex-col gap-5 justify-center items-start">
          <h1 className="text-6xl text-white font-semibold">
            Stay tuned with your favorites TV series
          </h1>

          <p className="text-white">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit sit consequatur sed accusantium fuga possimus illo, architecto adipisci dicta, mollitia maxime labore repudiandae ipsum ipsam dolorum tempore et laboriosam neque!</p>

          <div className="flex flex-row gap-5">
            <Button className="bg-white text-black" variant="outline">
              Join Us
            </Button>
            <Button className="bg-white text-black" variant="outline">
              Sign In
            </Button>
          </div>
        </div>

        <div>
          <Carousel
            setApi={setApi}
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent className="flex flex-row items-center">
              {topRatedData.map((data, index) => (
                <CarouselItem
                  className={`w-14 h-full basis-1/3`}
                  key={data.id}
                >
                  <img
                    className={`h-full ${current !== index + 1 ? 'm-auto blur-[2px] w-40 object-cover' : 'w-full'}`}
                    src={POSTER_IMG_URL + data.poster_path}
                    alt=""
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <CarouselPrevious className="text-white" />
            <CarouselNext className="text-white" /> */}
          </Carousel>
          <div className="py-2 text-center text-sm text-muted-foreground text-white">
            Slide {current}
          </div>
        </div>
      </section>
    </>
  );
};
