const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL;
import { Request, Response } from "express";

export const getTrendingSeries = async (req, res) => {
  try {
    const response = await fetch(
      BASE_URL + "/trending/tv/day?api_key=" + API_KEY
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error getting trending series", error);
  }
};

export const getTopRatedSeries = async (req: Request, res: Response) => {
  try {
    const response = await fetch(BASE_URL + "/tv/top_rated?api_key=" + API_KEY);
    const data = await response.json();

    const filteredData = data.results.filter(
      (serie) => serie.original_language === "en"
    );

    res.status(200).json(filteredData);
  } catch (error) {
    console.error("Error doing a request of top rated series");
    res.status(400).json({ message: "Error doing a request of top rated series", error: error });
  }
};

export const getAiringTodaySeries = async (req: Request, res: Response) => {
  try {
    const response = await fetch(BASE_URL + "/tv/airing_today?api_key=" + API_KEY);
    const data = await response.json();

    res.status(200).json(data)
  } catch (error) {
    console.error("Error doing a request of airing today series");
    res.status(400).json({ message: "Error doing a request of airing today series", error: error });
  }
}
