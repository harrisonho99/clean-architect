const { app } = require('./app');
const { init } = require('./init');
const { sleep } = require('./tools/major');

/**
 *entry
 * @returns {Promise<void>}
 */
async function main() {
  await sleep(1000);
  const { dbClient } = await init();
  await app(dbClient);
}



main().catch((err) => {
  console.error(err);
});
