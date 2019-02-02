import * as mongoose from 'mongoose';
import * as express from 'express';
import { HappyHour } from '../models/happyhour';


//const Contact = mongoose.model('Contact', ContactSchema);
const hhModel = mongoose.model('HappyHour', HappyHour);

class HappyHourController {

  constructor() {

  }

  //this works when running tsc && node server.js but not with ts-node
  public addNewHappyHour(req: express.Request, res: express.Response) {
    res.send({ hello: 'new happy hours !2511' });
  }

  //this works when running tsc && node server.js but not with ts-node
  public postNewHappyHour(req: express.Request, res: express.Response) {
    let hh = new hhModel({
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      formattedAddress: req.body.formattedAddress,
      monSpecials: req.body.monSpecials,
      tueSpecials: req.body.tueSpecials,
      wedSpecials: req.body.wedSpecials,
      thrSpecials: req.body.thrSpecials,
      friSpecials: req.body.friSpecials,
      satSpecials: req.body.satSpecials,
      sunSpecials: req.body.sunSpecials
    }
    );
    hh.save(function(err) {
      if (err) {
        res.send({ error: 'Error saving happy hour $err' + err });
      }
      res.send({ text: 'Product Created successfully' })
    })
    //res.send(req.body.tueSpecials);
  }
}
export const hhController = new HappyHourController();
