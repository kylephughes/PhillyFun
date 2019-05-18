
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as path from "path";
import databaseConfig from './config/config';
import {hhRoutes} from "./src/routes/index";
import {userRoutes} from "./src/routes/userRoutes";
import * as mongoose from "mongoose";

class App {
    public app: express.Application;
   
    constructor() {
        this.app = express();
        this.config();
        //this.routePrv.routes(this.app);
        this.mongoSetup();
        this.routes();
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files
        this.app.use(express.static('public'));
    }

    private routes(): void {

        this.app.use(cookieParser());
        this.app.use('/api/happyhour/', hhRoutes);
        this.app.use('/api/user/', userRoutes);
        //catch all other bad api routes
        this.app.use('/api/*',function(req, res, next) {
          next('The api route was not found');
        });
        //let angular handle the routes
        this.app.get('*', (req: express.Request, res: express.Response) => { 
          res.sendFile(path.resolve('public/index.html')); 
        });

        // error handler, send back to client
        this.app.use(function(err, req, res, next) {
          res.status(404).send(err);
        });
  }
    //Using mongodb atlas
    private mongoSetup(): void{
        //public mongoUrl: string = 'mongodb://localhost:27017/PhillyFun';
        const userPass = `${databaseConfig.user}:${databaseConfig.password}`;
        const mongoUrl =`mongodb+srv://${userPass}@happyhourcluster-obkbn.mongodb.net/test?retryWrites=true`;
        mongoose.connect(mongoUrl);
    }

}

export default new App().app;
