import cors from "cors";

const corsOptions: cors.CorsOptions = {
  origin: ["http://localhost:5173", "https://showly-client.vercel.app"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
};

export default cors(corsOptions);
