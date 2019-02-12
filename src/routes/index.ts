import * as express from "express";
import {hhController} from "../controllers/happyhour_controller";
import { Request, Response } from "express";


class MainRoutes {
  // public hhController : HappyHourController = new HappyHourController()
  public routes: express.Router = express.Router();
  constructor() {
    this.config();
  }
  private config() {
    console.log("inside the index.tx");
    //this way works with ts-node now
    //tsc to compile and then runing node server.js
    //this.routes.get('/hh', hhController.addNewHappyHour);
    this.routes.get('/happyhour', hhController.getHappyHours);
    this.routes.post('/happyhour', hhController.postNewHappyHour);
  }
}
export const mainRoutes = new MainRoutes().routes;
