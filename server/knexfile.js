const path = require('path');

const BASE_PATH = path.join(__dirname, 'app', 'db');

module.exports = {
  dev: {
    client: 'pg',
    connection: 
               'postgres://andreylarichev@localhost:5432/bot84local', 
              //'postgres://postgres:postgres@localhost:5432/guru99',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
  },
  production: {
    client: 'pg',
    connection: 'postgres://vmosknpy:Ta8lOvZYh5QldY0LlocxnOn4zlew5yvK@balarama.db.elephantsql.com:5432/vmosknpy',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
  },
};


  // dev: {
  //   client: 'pg',
  //   connection: 'postgres://andreylarichev@localhost:5432/bot84local',//'postgres://postgres:postgres@localhost:5432/guru99',
  //   migrations: {
  //     directory: path.join(BASE_PATH, 'migrations'),
  //   },
  // },