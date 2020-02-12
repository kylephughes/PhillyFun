import * as mongoose from "mongoose";
import * as express from "express";
import { User } from "../models/user";

const userModel = mongoose.model("User", User);
// Response handling
let response = {
  status: 200,
  data: {},
  message: null
};
class UserController {
  constructor() {}

  //using the social login credentials
  public async loginUser(req: express.Request, res: express.Response) {
    console.log("login");
    try {
      let user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        const { body } = req;
        console.log("didn't find a user, so creating one");
        userModel.create(
          {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            registerDate: new Date(),
            role: body.email === "kyle.hughes025@gmail.com" ? "ADMIN" : "USER"
          },
          function(err) {
            if (err) console.log(err);
            else {
              response.status = 200;
              response.message = "Added new user";
            }
          }
        );
      } else {
        response.status = 200;
        response.data = user;
        response.message = "Found a user";
      }
    } catch (err) {
      console.log("Error" + err);
    }

    res.json(response);
  }
}

export const userController = new UserController();
