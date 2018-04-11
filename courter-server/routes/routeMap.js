module.exports = (app) =>{
      // ROUTES
      const   mainRoute = require('./mainRoute.js'),
              userRoute = require('./userRoute.js'),
              authRoute = require('./authRoute.js'),
              chatRoute = require('./chatRoute.js');
      
      app.use('/', mainRoute);
      app.use('/api/user', userRoute);
      app.use('/api/auth', authRoute);
      app.use('/api/chat', chatRoute);
}


 