exports.up = (knex, Promise) => Promise.all([
    knex.schema.raw(`
      CREATE TABLE IF NOT EXISTS admins(
        id SERIAL PRIMARY KEY NOT NULL,
        username TEXT,
        token TEXT,
        password_digest TEXT,
        created_at TIMESTAMP
    );`),
  ]);
  
  exports.down = (knex, Promise) => Promise.all([
    knex.schema.raw(`
      DROP TABLE IF EXISTS admins;
    `),
  ]);
  