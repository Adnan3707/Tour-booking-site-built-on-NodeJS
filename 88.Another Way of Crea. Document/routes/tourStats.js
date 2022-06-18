const express = require('express');
const tourStats = express.Router();
const tourController = require("C:/Projects/88.Another Way of Crea. Document/controller/tourController.js");

 tourStats.route('/').get(tourController.getTourStats)
module.exports = tourStats;