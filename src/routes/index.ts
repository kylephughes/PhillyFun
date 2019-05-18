import * as express from "express";
import {hhController} from "../controllers/happyhour_controller";

class HappyHourRoutes {
  
  public routes: express.Router = express.Router();
  constructor() {
    this.config();
  }
  private config() {
    this.routes.get('/:happyhourId', hhController.getHappyHour);
    this.routes.get('/', hhController.getHappyHours);
    this.routes.post('/', hhController.postNewHappyHour);
    this.routes.put('/:id', hhController.updateHappyHour);
    this.routes.delete('/:id', hhController.deleteHappyHour);
  }
}
export const hhRoutes = new HappyHourRoutes().routes;
