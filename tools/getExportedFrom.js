/**
 * @param {NodeRequire} requireFrom
 * @param {string[]} paths
 * @param {string} [prefix]
 * @returns {any[]}
 */
function getExportedFrom(requireFrom, paths, prefix = './') {
  return paths.map((path) => {
    const filePath = prefix + '/' + path;
    return requireFrom(filePath);
  });
}

module.exports = { getExportedFrom };
