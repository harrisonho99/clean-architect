//@ts-check
const fs = require('fs/promises');
/**
 *
 * @param {string} path
 * @returns {Promise<string[]>}
 */
async function mapDir(path) {
  const listFiles = await fs.readdir(path);
  return listFiles;
}
module.exports = { mapDir };
