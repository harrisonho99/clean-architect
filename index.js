const { app } = require('./app');
const { init, sleep } = require('./tools');

/**
 *entry
 * @returns {void}
 */

async function main() {
  await sleep(2000);
  init();
  app().catch((err) => {
    console.error(err);
  });
}

main();
