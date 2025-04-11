import cors from "cors";

const corsOptions: cors.CorsOptions = {
  origin: ["http://localhost:5173", "https://showly-server.vercel.app"],
  credentials: true,
};

export default cors(corsOptions);
