import { TrendingData } from "@/types/seriesDataTypes";

const API_URL = import.meta.env.VITE_API_URL;

export const getTrendingSeries = async () => {
  const getRandomData = (data: TrendingData) => {
    const maxStart = data.results.length - 5;
    const startIndex = Math.floor(Math.random() * (maxStart + 1));
    const result = data.results.splice(startIndex, 5);

    return result
  }

  try {
    const response = await fetch(API_URL + "/series/trending", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const filteredData = getRandomData(data);

    return filteredData;
  } catch (error) {
    console.error(error);
  }
};

export const getTopRatedSeries = async () => {
  try {
    const response = await fetch(API_URL + "/series/top-rated", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAiringTodaySeries = async () => {
  try {
    const response = await fetch(API_URL + "/series/airing-today", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
