import { useEffect, useState } from "react";
import { getTopRatedSeries, getTrendingSeries } from "@/services/seriesService";
import { TopRatedData, TrendingData } from "@/types/seriesTypes";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import Fade from "embla-carousel-fade";

const IMG_URL = import.meta.env.VITE_IMG_URL;

export const Hero = () => {
  const [trendingData, setTrendingData] = useState<TrendingData>({
    results: [],
  });
  const [topRatedData, setTopRatedData] = useState<TopRatedData[]>([]);

  useEffect(() => {
    const getSeriesData = async () => {
      const trendingFunc = await getTrendingSeries();
      setTrendingData(trendingFunc);

      const topRatedFunc = await getTopRatedSeries();
      setTopRatedData(topRatedFunc);
    };

    getSeriesData();
  }, []);

  return (
    <>
      <Carousel
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
          Fade()
        ]}
      >
        <CarouselContent>
          {trendingData.results.map((data) => (
            <CarouselItem className="w-full h-[500px]" key={data.id}>
              <img
                className="w-full h-full object-cover object-top mask-b-from-5"
                src={IMG_URL + data.backdrop_path}
                alt=""
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <section className="absolute inset-0 flex flex-row justify-center items-center gap-10">
        <div>
          <h1 className="text-5xl text-white font-semibold">
            Stay tuned with your favorites TV series
          </h1>

          <div>
            <Button className="bg-white text-black" variant="outline">
              Join Us
            </Button>
            <Button className="bg-white text-black" variant="link">
              Sign In
            </Button>
          </div>
        </div>

        <div>
          <Carousel
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              {topRatedData.map((data) => (
                <CarouselItem className="w-5 h-full basis-1/3" key={data.id}>
                  <img
                    className="w-full h-full object-cover object-top"
                    src={IMG_URL + data.poster_path}
                    alt=""
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-white" />
            <CarouselNext className="text-white" />
          </Carousel>
        </div>
      </section>
    </>
  );
};
