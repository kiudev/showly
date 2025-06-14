import { TrendingContextType, TrendingData } from "@/types/seriesDataTypes";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getTrendingSeries } from "@/services/series";

const TrendingContext = createContext<TrendingContextType | null>(null);

export const TrendingProvider = ({ children }: { children: ReactNode }) => {
  const [trendingData, setTrendingData] = useState<TrendingData>({
    results: [],
  });

  useEffect(() => {
    const getSeriesData = async () => {
      const trendingFunc = await getTrendingSeries();
      setTrendingData(trendingFunc);

      // const topRatedFunc = await getTopRatedSeries();
      // setTopRatedData(topRatedFunc);
    };

    getSeriesData();
  }, []);

  return (
    <TrendingContext value={{ trendingData }}>
      {children}
    </TrendingContext>
  );
};

export const useTrendingContext = () => {
  const context = useContext(TrendingContext);

  if (!context) {
    throw new Error("useTrendingContext must be used within a TrendingProvider");
  }

  return context;
};
