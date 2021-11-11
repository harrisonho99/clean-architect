const { database, threadNum } = require('./config');
/**
 * @returns {Promise<void>}
 */
async function init() {
  require('dotenv').config();
  require('util').inspect.defaultOptions.depth = null;
  process.env.UV_THREADPOOL_SIZE = String(threadNum - 2);
  console.log('Activate threads : ', process.env.UV_THREADPOOL_SIZE);
  console.log('Initialized done!');
}
module.exports = {
  init,
};
