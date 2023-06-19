require('dotenv').config();

const app = require('./app');
const config = require('config');

const port = config.get('parser.port') || 3000;

app.listen(port, (err) => {
  if (err) throw err;

  // eslint-disable-next-line no-console
  console.log(`Server is listening on ${port}...`);
});
