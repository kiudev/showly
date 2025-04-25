import { Router } from "express";
import { getTopRatedSeries, getTrendingSeries } from "../models/series";

const seriesRouter = Router();

seriesRouter.get("/series/trending", getTrendingSeries)

seriesRouter.get("/series/top-rated", getTopRatedSeries)

export default seriesRouter;
