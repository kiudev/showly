import express from "express";
import dotenv from "dotenv";
import userRouter from "./api/controllers/user";
import seriesRouter from "./api/controllers/series";
import cors from "./api/config/cors";
dotenv.config();

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors);

app.use(userRouter);
app.use(seriesRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Showly API",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
