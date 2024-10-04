const app = require('express')();
const config = require('./config/data/config.json')
const port = config.server.port;
const routes = require('./routes/index')
app.use("/", routes)
// function responseHandler(req, res){
    
// }
const router = routes.app;


app.listen(port);
console.log(`app is listening on http://localhost:${port}`);
