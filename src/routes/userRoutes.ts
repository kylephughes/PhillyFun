import * as express from "express";
import { userController } from "../controllers/users_controller";

class UserRoutes {

    public routes: express.Router = express.Router();

    constructor() {
        this.config();
    }
    private config() {
        this.routes.post('/login', userController.loginUser);
    }
}
export const userRoutes = new UserRoutes().routes;
