//@ts-check
/**
 * @module init
 *
 * */
const { MongoClient } = require('mongodb');
const express = require('express');
const chalk = require('chalk');
/**
 * @typedef {Object} InitObject
 * @property {MongoClient} dbClient
 * @property {express.Express} expressApplication
 */

/**
 *
 * @typedef {Function} ColorLogger
 * @param {string} str
 * @returns {void}
 */

/**
 *
 * @returns {Promise<InitObject>}
 */
async function init() {
  require('dotenv').config();
  require('util').inspect.defaultOptions.depth = null;

  Object.assign(console, {
    blue: (...str) => {
      console.log(chalk.blue(...str));
    },
    red: (...str) => {
      console.log(chalk.red(...str));
    },
    green: (...str) => {
      console.log(chalk.green(...str));
    },
  });

  const { database, threadNum } = require('./config');
  //connect Mongodb
  /** @type {MongoClient} */
  const dbClient = new MongoClient(database.URI);
  await dbClient.connect();
  process.env.UV_THREADPOOL_SIZE = String(threadNum);
  console.log(chalk.blue.cyan('Activate threads : ', process.env.UV_THREADPOOL_SIZE));
  console.log(chalk.blue.cyan('Initialized done!'));
  /**
   * @type {express.Express}
   */
  const expressApplication = express();
  //load express config....
  return { dbClient, expressApplication };
}

module.exports = {
  init,
};
