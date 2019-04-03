
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as path from "path";
import * as httperrors from "http-errors";
import {mainRoutes} from "./src/routes/index";
import * as mongoose from "mongoose";

class App {
    public app: express.Application;
    public mongoUrl: string = 'mongodb://localhost:27017/PhillyFun';

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
        this.app.use('/api', mainRoutes);
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

    private mongoSetup(): void{
        //mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }

}

export default new App().app;
