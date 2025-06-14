import { AiringToday } from "@/components/home/AiringToday";
import { BackgroundCarousel } from "@/components/BackgroundCarousel";
import { TrendingProvider } from "@/context/TrendingContext";
import { Home } from "@/pages/Home";

const BACKDROP_IMG_URL = import.meta.env.VITE_BACKDROP_IMG_URL;

export const Catalog = () => {
  return (
    <Home>
      <main className="bg-primary-900 rounded-lg w-screen min-h-screen">
        <TrendingProvider>
          <BackgroundCarousel backdropImgUrl={BACKDROP_IMG_URL} />
        </TrendingProvider>

        <section className="-mt-[50vh] flex flex-col gap-20">
          <AiringToday />
        </section>
      </main>
    </Home>
  );
};
