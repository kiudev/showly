export interface TrendingData {
  results: Array<{
    id: number;
    backdrop_path: string | null;
  }>;
}

export interface TrendingContextType {
  trendingData: TrendingData;
}

export interface TopRatedData {
  id: number;
  poster_path: string;
}

export interface AiringTodayData {
  page: number;
  results: Array<{
    id: number;
    poster_path: string;
  }>;
}
