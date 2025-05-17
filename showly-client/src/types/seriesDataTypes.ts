export interface TrendingData {
  results: Array<{
    id: number;
    backdrop_path: string;
  }>;
}

export interface TopRatedData {
  id: number;
  poster_path: string;
}
