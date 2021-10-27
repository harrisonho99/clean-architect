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

/**
 * @returns {void}
 */
function init() {
  require('util').inspect.defaultOptions.depth = null;

  console.log('initialized done!');
}
module.exports = {
  sleep,
  init,
};
