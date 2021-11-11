const { MongoClient } = require('mongodb');

/**
 * @typedef {Object} InitObject
 * @property {MongoClient} dbClient
 */

/**
 *
 * @returns {Promise<InitObject>}
 */
async function init() {
  require('dotenv').config();
  require('util').inspect.defaultOptions.depth = null;
  const { database, threadNum } = require('./config');
  //connect Mongodb
  /** @type {MongoClient} */
  const dbClient = new MongoClient(database.URI);
  await dbClient.connect();
  process.env.UV_THREADPOOL_SIZE = String(threadNum);
  console.log('Activate threads : ', process.env.UV_THREADPOOL_SIZE);
  console.log('Initialized done!');
  return { dbClient };
}

module.exports = {
  init,
};
