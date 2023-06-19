const knex = require('knex');

const nodeEnv = process.env.NODE_ENV || 'dev';
console.log(nodeEnv)
const knexconfig = require('../../knexfile')[nodeEnv];

module.exports = knex(knexconfig);
