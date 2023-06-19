exports.up = (knex, Promise) => Promise.all([
  knex.schema.raw(`
    CREATE TABLE IF NOT EXISTS strategies
    (
      "str84" BOOLEAN NOT NULL DEFAULT true,
      user_id INTEGER NOT NULL REFERENCES users (id)
    );
  `),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.raw(`
    DROP TABLE IF EXISTS strategies;
  `),
]);
