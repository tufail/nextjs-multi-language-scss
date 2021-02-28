const express = require('express');
const next = require('next');
const logger = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
var MONGODB_URL = process.env.MONGODB_URL;

app.prepare().then(() => {
  const server = express();

  //connect database
  var mongoose = require('mongoose');
  mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected db to %s', MONGODB_URL);
    })
    .catch((err) => {
      console.error('App starting error:', err.message);
      process.exit(1);
    });
  const db = mongoose.connection;

  //logger
  //don't show the log when it is test
  if (process.env.NODE_ENV !== 'production') {
    server.use(logger('dev'));
  }

  server.all('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
