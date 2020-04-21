const knex = require('knex');
const environment = process.env.NODE_ENV || 'development';
const knexfile = require('../../knexfile');
const config = knexfile[environment];

module.exports = knex(config);
