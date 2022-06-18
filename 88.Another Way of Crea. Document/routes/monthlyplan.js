const express = require("express");
const monthlyplan = express.Router();
const tourController = require("C:/Projects/88.Another Way of Crea. Document/controller/tourController.js");

 monthlyplan.route('/').get(tourController.getMonthlyPlan)
module.exports = monthlyplan