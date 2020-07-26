import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import "express-async-errors";
import Helpers from "./utils/Helpers";

const HelpersInstance = new Helpers();
dotenv.config({
  path: HelpersInstance.getPathEnv(process.env.NODE_ENV as string),
});

import errorMiddleware from "./middlewares/error-middleware";
import IndexRoutes from "./routes/index";

class App {
  public express: Application;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.middlewaresErrors();
  }

  private middlewares(): void {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(helmet());
  }

  private routes(): void {
    const IndexRoutesInstance = new IndexRoutes();
    this.express.use("/main", IndexRoutesInstance.mainRoutes);
  }

  private middlewaresErrors(): void {
    this.express.use(errorMiddleware());
  }
}

export default App;
