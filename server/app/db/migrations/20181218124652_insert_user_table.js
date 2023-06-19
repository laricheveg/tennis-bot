/*
Здесь можно создать админов
id должен быть такой же как и в телеграмме 
*/
exports.up = (knex, Promise) => Promise.all([
  knex.schema.raw(`
    INSERT INTO users (id, username, is_admin) VALUES
    (337082687, '@admin', true),
    (418706987, '@418706987', true),
    (811274414, '@811274414', true);
  `),
]);




exports.down = (knex, Promise) => Promise.all([
  knex.schema.raw(`
    DELETE FROM users WHERE id=461231859;
    DELETE FROM users WHERE id=811274414;
  `),
]);
