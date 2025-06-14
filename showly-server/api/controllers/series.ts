import { Router } from "express";
import { getAiringTodaySeries, getTopRatedSeries, getTrendingSeries } from "../models/series";

const seriesRouter = Router();

seriesRouter.get("/series/trending", getTrendingSeries)

seriesRouter.get("/series/top-rated", getTopRatedSeries)

seriesRouter.get("/series/airing-today", getAiringTodaySeries)

export default seriesRouter;
