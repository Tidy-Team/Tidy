import dotenv from "dotenv";
import { CORS_ORIGIN } from "../config/env.js";

dotenv.config();

export const corsMiddleware = () => {
  const corsOptions = {
    origin: CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  };
};
