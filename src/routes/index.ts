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
    //this way does not work with ts-node but it does with
    //tsc to compile and then runing node server.js
    //this.routes.get('/hh', hhController.addNewHappyHour);
    this.routes.get('/hh', hhController.addNewHappyHour);
  }
}
export const mainRoutes = new MainRoutes().routes;
