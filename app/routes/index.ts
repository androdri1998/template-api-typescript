import express from "express";

import validateRequestMiddleware from "../middlewares/validate-request-middleware";

class IndexRoutes {
  public mainRoutes: express.Router;

  constructor() {
    this.mainRoutes = express.Router();

    this.routes();
  }

  private routes(): void {
    this.mainRoutes.post("/", (req, res) => {
      return res.send();
    });
  }
}

export default IndexRoutes;
