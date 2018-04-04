module.exports = (app) =>{
      // ROUTES
      const   mainRoute = require('./mainRoute.js'),
              userRoute = require('./userRoute.js'),
              authRoute = require('./authRoute.js');
      
      app.use('/', mainRoute);
      app.use('/user', userRoute);
      app.use('/auth', authRoute);
}


 