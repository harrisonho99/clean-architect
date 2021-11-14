const fs = require('fs/promises');
const { mapDir } = require('../../tools/mapDir');
const { getExportedFrom } = require('../../tools/getExportedFrom');
const LAYER_FOLDER = `/layers`;
const PATH = __dirname + LAYER_FOLDER;

const defaultLayer = async () => {
  const listFiles = await mapDir(PATH);
  return getExportedFrom(require, listFiles, '.' + LAYER_FOLDER);
};

module.exports = {
  defaultLayer,
};
