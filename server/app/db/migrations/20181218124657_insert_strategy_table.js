
exports.up = (knex, Promise) => Promise.all([
  knex.schema.raw(`
    INSERT INTO strategies (user_id) VALUES
    (337082687),
    (418706987),
    (811274414);
  `),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.raw(`
    DELETE FROM strategies WHERE user_id=418706987;
    DELETE FROM strategies WHERE user_id=811274414;
  `),
]);
