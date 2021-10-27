const { app } = require('./app');
const { init } = require('./tools');

/**
 *entry
 * @returns {void}
 */

async function main() {
  init();
  app().catch((err) => {
    console.error(err);
  });
}

main();
