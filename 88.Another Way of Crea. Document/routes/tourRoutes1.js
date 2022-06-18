const tourController = require("C:/Projects/88.Another Way of Crea. Document/controller/tourController.js");
const express = require('express');
const tourRouter1 = express.Router();

 // tourRouter1.route('/').get(tourController.getByID1) 
 tourRouter1.route('/').patch(tourController.updatetour) 
module.exports = tourRouter1;