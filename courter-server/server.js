const   express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        config = require('./config.js'),
        server = require('http').createServer(app),
        morgan = require('morgan'),
        path   = require('path');

app.use(morgan('dev'));

// EXPRESS 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MONGO
const mongoose = require('mongoose');
require('./models/schemaMap');
mongoose.connect(config.database);

// AUTH
require('./services/authEvents')(app);

// ROUTES
app.use(express.static(`${__dirname}/public/build`));
require('./routes/routeMap')(app);
app.get( '*', 
    (req, res)=> {
        res.sendFile(path.resolve(`${__dirname}`,'public', 'build', './index.html'));
    }
);

// SOCKET.IO
const socketEvents = require('./services/socketEvents');
const io = require('socket.io').listen(server);
socketEvents(io);

// SERVER 
server.listen(config.PORT);
console.log(`Server Listening...  \nPORT: ${config.PORT}`);