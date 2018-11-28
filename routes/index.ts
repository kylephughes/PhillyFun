import * as express from "express";
//import { HappyHourController } from "../controllers/happyhour_controller";
import {Request,Response} from "express";



  // public hhController : HappyHourController = new HappyHourController()
export const routes = express.Router();
      console.log("inside the index.tx");
       routes.get('/hh',(req: Request, res: Response) => {
           res.send("final ly 242324234234242");
       });
