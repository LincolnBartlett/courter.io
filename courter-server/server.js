const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride   = require('method-override');
const config = require('./config.js');
const server = require('http').createServer(app);
const morgan = require('morgan');



app.use(morgan('dev'));


app.use(express.static(`${__dirname}/public/`))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));


// MONGO
const mongoose = require('mongoose');
mongoose.connect(config.database);

//AUTH
require('./services/authEvents')(app);


// ROUTES
require('./routes/routeMap')(app);


// SOCKET.IO
const socketEvents = require('./services/socketEvents');  
const io = require('socket.io').listen(server);

socketEvents(io);


// SERVER 
server.listen(process.env.port || config.PORT);
console.log(`Server Listening...  \nPORT: ${config.PORT}`);


