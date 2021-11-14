// @ts-check
const { MongoClient } = require('mongodb');
const { model } = require('./models');
const express = require('express');
const { handleErrorLayer, defaultLayer } = require('./middlewares');
/**
 * @module applicationIndex
 */
/**
 *
 * Application Index
 * @param { MongoClient} dbClient
 * @param {express.Express} app
 * @returns {Promise<void>}
 */
async function app(app, dbClient) {
  model(dbClient);
  const layers = await defaultLayer();
  layers.forEach((layer) => layer(app));
  //Router
  app.use((req, res) => {
    res.json({ message: 'hello' });
  });
}
module.exports = { app };
