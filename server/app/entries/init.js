const api = require('./api');


function initRoutes(app) {
  app.use('/api', api);
  // app.use('/users', users);
  // app.use('/settings', settings);
  // app.use('/admins', admins);
  // app.use('/games', games);

}


module.exports = initRoutes;
