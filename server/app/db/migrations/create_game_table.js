exports.up = (knex, Promise) => Promise.all([
  knex.schema.raw(`
    CREATE TABLE IF NOT EXISTS games
    (
        id integer NOT NULL PRIMARY KEY,
        liga character varying NOT NULL,
        ligaid integer NULL,
        t1name character varying NOT NULL,
        t2name character varying NOT NULL,
        t1reds integer NOT NULL,
        t2reds integer NOT NULL,
        t1yellows integer NOT NULL,
        t2yellows integer NOT NULL,
        t1corners integer NOT NULL,
        t2corners integer NOT NULL,
        signaltime character varying NOT NULL,
        gamedate timestamp with time zone NOT NULL,
        t1goals integer NOT NULL,
        t2goals integer NOT NULL,
        t1next numeric NOT NULL,
        t2next numeric NOT NULL,
        nonext numeric NOT NULL,
        result boolean DEFAULT NULL
    );
  `),
]);

exports.down = (knex, Promise) => Promise.all([
    knex.schema.raw(`
    
    `),
  ]);
