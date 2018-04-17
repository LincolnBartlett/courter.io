module.exports = (app) =>{
      // ROUTES
      const   userRoute = require('./userRoute.js'),
              authRoute = require('./authRoute.js'),
              chatRoute = require('./chatRoute.js');
              courtRoute = require('./courtRoute.js');
      
      
      app.use('/api/user', userRoute);
      app.use('/api/auth', authRoute);
      app.use('/api/chat', chatRoute);
      app.use('/api/court', courtRoute);
     
}


 