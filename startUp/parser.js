const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');

module.exports = app => {
  app.use(cors());
  app.use(express.json());
  // app.use(express.urlencoded({ extended: false }));
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(function (req, res, next) {
    res.setHeader('charset', 'utf-8')
    next();
  });
};
