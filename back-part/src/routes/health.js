const express = require('express');

module.exports = app => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send({
      status: 'UP'
    })
  });

  app.use('/health', router);
}