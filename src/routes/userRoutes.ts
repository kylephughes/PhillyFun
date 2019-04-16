import * as express from "express";
import { userController } from "../controllers/users_controller";
import { Request, Response } from "express";
class UserRoutes {
    // public hhController : HappyHourController = new HappyHourController()
    public routes: express.Router = express.Router();

    constructor() {
        this.config();
    }
    private config() {
        this.routes.get('login', userController.loginUser);
    }
}
export const userRoutes = new UserRoutes().routes;
