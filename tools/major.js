/**
 * Sleep for specified milisecond
 * @param {number} timer
 * @returns {Promise<void>}
 */
async function sleep(timer) {
  return new Promise((resolver) => {
    setTimeout(resolver, timer);
  });
}



module.exports = { sleep };
