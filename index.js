//@ts-check
const { app } = require('./app');
const { init } = require('./init');
const { sleep } = require('./tools/major');
const http = require('http');
const chalk = require('chalk');

/**
 *entry
 * @returns {Promise<void>}
 */
async function main() {
  await sleep(0);
  const { dbClient, expressApplication } = await init();
  await app(expressApplication, dbClient);
  const server = http.createServer(expressApplication);
  const PORT = process.env.PORT;
  server.listen(PORT, () => {
    console.log(chalk.green.bold('Server listening on port: ', PORT));
  });
}

main().catch((err) => {
  console.error(chalk.red(err));
});
