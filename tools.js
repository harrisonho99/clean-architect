/**
 * Sleep for specified milisecond
 * @param {number} timer
 * @returns {Promise<never>}
 */
async function sleep(timer) {
  return new Promise((resolver) => {
    setTimeout(resolver, timer);
  });
}
function init() {
  require('util').inspect.defaultOptions.depth = null;
}
module.exports = {
  sleep,
  init,
};
