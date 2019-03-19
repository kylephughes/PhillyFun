# PhillyFun

This is a NodeJS backend running an Angular 7 application.
To start the NodeJS server we will run either one of these commands - 
  1. npm run dev - uses ts-node to launch the nodeJS backend written in Typescript.
  2. npm run prod - compiles the code to .js files using the command tsc and then runs node ./output/server.js.
  

The backend REST API will be written in Typescript to stay consistent with the Angular frontend. MongoDB will be used to store all of the data, eventually migrate it to mLab or something similar. 

Idea is to allow special "admins" to enter happy hours they see around a given city and a user be able to view and filter based on where they are located. 
