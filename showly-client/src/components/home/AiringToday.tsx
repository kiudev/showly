import { useEffect, useState } from "react"
import { AiringTodayData } from "@/types/seriesDataTypes"
import { getAiringTodaySeries } from "@/services/series"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Button } from "../ui/button";

const POSTER_IMG_URL = import.meta.env.VITE_POSTER_IMG_URL;



export const AiringToday = () => {

  const [airingTodayData, setAiringTodayData] = useState<AiringTodayData>({
    page: 1,
    results: []
  })

  useEffect(() => {
    const fetchAiringTodaySeries = async () => {
      const airingTodayFunc = await getAiringTodaySeries();
      setAiringTodayData(airingTodayFunc);
    }

    fetchAiringTodaySeries()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center z-1 w-[100rem] mx-auto gap-10">
      <header className="flex justify-between items-center w-full">
        <h2 className="text-5xl font-dela">Airing Today</h2>

        <Button>See More</Button>
      </header>

      <Carousel
      opts={{
        slidesToScroll: 5
      }}
      >
        <CarouselContent className=" flex gap-5 px-5">
          {airingTodayData.results.map(data => (
            <CarouselItem key={data.id} className="w-full basis-1/12">
              <img className="w-40 h-full object-cover rounded-xl" src={POSTER_IMG_URL + data.poster_path} alt="" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

