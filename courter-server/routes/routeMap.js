module.exports = (app) =>{
      // ROUTES
      const   mainRoute = require('./mainRoute.js'),
              userRoute = require('./userRoute.js'),
              authRoute = require('./authRoute.js'),
              chatRoute = require('./chatRoute.js');
      
      app.use('/', mainRoute);
      app.use('/user', userRoute);
      app.use('/auth', authRoute);
      app.use('/chat', authRoute);
}


 