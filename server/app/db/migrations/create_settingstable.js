exports.up = (knex, Promise) => Promise.all([
  knex.schema.raw(`
    CREATE TABLE IF NOT EXISTS settings
    (
        id SERIAL NOT NULL PRIMARY KEY,
        score character varying  NOT NULL,
        secondsMin numeric NOT NULL,
        secondsMax numeric NOT NULL,
        teamCornersMore numeric  NOT NULL,
        teamCornersDifference numeric  NOT NULL,
        teamYellowsMore numeric  NOT NULL,
        teamNextGoalRate numeric  NOT NULL,
        teamNextGoalDifference numeric  NOT NULL,
        nobodyNextGoalRateMoreThan numeric NOT NULL,
        nobodyNextGoalRateLessThan numeric NOT NULL,
        contacts character varying NOT NULL,
        info character varying NOT NULL,
        referalMessage character varying NOT NULL
    );

    INSERT INTO settings (score, secondsMin, secondsMax, teamCornersMore, teamCornersDifference, 
      teamYellowsMore, teamNextGoalRate, teamNextGoalDifference, 
      nobodyNextGoalRateMoreThan, nobodyNextGoalRateLessThan, contacts, info, referalMessage) VALUES
    ('00 01 10', 5030, 5050, 5, 3, 5, 5.5, 2.5, 1.2, 1.4, 'futbots@yandex.ru', 'info', 'test1');
    
  `),
]);

exports.down = (knex, Promise) => Promise.all([
    knex.schema.raw(`
    DROP TABLE IF EXISTS settings;

    `),
  ]);


