//@ts-check
var express = require('express');

/**
 *
 * @param {express.Express} app
 * @returns {void}
 */
function handleErrorLayer(app) {
  app.use((err, _, res, __) => {
    // handle error
    res.json({ error: true, message: err.meessage });
  });
}

module.exports = { handleErrorLayer };
