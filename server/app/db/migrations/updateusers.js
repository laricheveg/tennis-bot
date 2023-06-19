exports.up = (knex, Promise) => Promise.all([
  knex.schema.raw(`
    ALTER TABLE users 
    ADD COLUMN expiredDate timestamp with time zone NOT NULL DEFAULT (NOW() + interval '3 day');
  `),
]);

exports.down = (knex, Promise) => Promise.all([
    knex.schema.raw(`
    DROP TABLE IF EXISTS settings;

    `),
  ]);


