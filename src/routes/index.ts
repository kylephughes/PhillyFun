import * as express from "express";
import {hhController} from "../controllers/happyhour_controller";
import { Request, Response } from "express";
import {userRoutes} from './userRoutes'
import {userController} from '../controllers/users_controller'
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
    this.routes.get('/happyhour/:happyhourId', hhController.getHappyHour);
    this.routes.get('/happyhour', hhController.getHappyHours);
    this.routes.post('/happyhour', hhController.postNewHappyHour);
    this.routes.put('/happyhour/:id', hhController.updateHappyHour);
    this.routes.delete('/happyhour/:id', hhController.deleteHappyHour);
    this.routes.post('/user/login',userController.loginUser);
  }
}
export const mainRoutes = new MainRoutes().routes;
