import * as mongoose from 'mongoose';
import * as express from 'express';
import { User } from '../models/user';


//const Contact = mongoose.model('Contact', ContactSchema);
const userModel = mongoose.model('User', User);
// Response handling
let response = {
    status: 200,
    data: {},
    message: null
};
class HappyHourController {

    constructor() {

    }

    //using the social login credentials
    public async loginUser(req: express.Request, res: express.Response) {
        try {
            let user = await userModel.findOne({ email: req.body.email });
            if(!user) {
                console.log("didn't find a user! so create one");
            } else {
                console.log("found a user!!!!")
            }
        } catch (err) {
            console.log("Error" +err)
        }
        
        res.json(response);
    }
}

export const userController = new HappyHourController();