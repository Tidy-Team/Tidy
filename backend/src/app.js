import express from "express";
import { initMiddleware } from "./middlewares/index.js";
import { PORT } from "./config/env.js";

const app = express();

//Middleware
initMiddleware(app);
//Routes

//Server
app.listen(PORT, () => {
  console.log(`http//localhost:${PORT}`);
});
