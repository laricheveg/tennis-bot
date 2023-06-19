exports.up = (knex, Promise) => Promise.all([
  knex.schema.raw(`
    CREATE TABLE IF NOT EXISTS users
    (
      id INTEGER PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      is_admin BOOLEAN NOT NULL DEFAULT false
    );
  `),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.raw(`
    DROP TABLE IF EXISTS users;
  `),
]);
