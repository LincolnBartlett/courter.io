const express     = require('express'),
      router      = express.Router();
      

const routeMap = (app) =>{
      // ROUTES
      const   mainRoute = require('./mainRoute.js'),
              userRoute = require('./userRoute.js');
      
      app.use('/', mainRoute);
      app.use('/user', userRoute);
}

module.exports = routeMap;
 