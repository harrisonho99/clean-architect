const os = require('os');
const { MongoDBDriver } = require('./mongodb');

/**
 * @namespace
 *
 */
const CONFIG = {
  database: MongoDBDriver,
  threadNum: os.cpus().length,
};

module.exports = CONFIG;
