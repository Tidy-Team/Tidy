import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import { corsMiddleware } from "./corsMiddleware.js";
import { sessionMiddleware } from "./sessionMiddleware.js";

export const initMiddleware = (app) => {
  app.use(cors(corsMiddleware()));
  app.use(sessionMiddleware);
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan("dev"));
};
