import * as http from 'http';
import app from "./app";
const port = 8000;
//create a server and pass our Express app to it.
const server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);

//function to note that Express is listening
function onListening(): void {
  console.log(`Listening on port `+port);
}
