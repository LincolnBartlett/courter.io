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


//PASSPORT

const User          = require('./models/userSchema');
const passport      = require('passport');
const LocalStrategy = require('passport-local');


app.use(require('express-session')({
    secret: config.passport.secret,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


const routeMap = require('./routes/routeMap')
routeMap(app);


// SOCKET.IO
const socketEvents = require('./socketEvents');  
const io = require('socket.io').listen(server);

socketEvents(io);


// SERVER 
server.listen(process.env.port || config.PORT);
console.log(`Server Listening...  \nPORT: ${config.PORT}`);


