//@ts-check
var express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

/**
 *
 * @param {express.Express} app
 * @returns {void}
 */
function requestLayer(app) {
  /**
   * @type {express.RequestHandler}
   */
  const compressFunc = compression();
  app.use(compressFunc);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
}

module.exports = requestLayer;
