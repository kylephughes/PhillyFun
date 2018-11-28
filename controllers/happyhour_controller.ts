//import * as mongoose from 'mongoose';
import { Request, Response } from 'express';

//const Contact = mongoose.model('Contact', ContactSchema);
export default class HappyHourController{
  
  constructor() {

  }
  public HappyHourController() {

  }

public addNewHappyHour (req: Request, res: Response) {
        res.send("new happy hour");
    }
}
