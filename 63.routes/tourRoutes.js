const express = require('express');
const app = express();
const tourRouter = express.Router();
const tourController = require("C:/Projects/63.controller/tourController.js");

tourRouter.param('/api/v1/tours',(req,res,next,val) => {
    console.log(`Tour id is: ${val}`);
    next();
})

app.route('/api/v1/tours').get(tourController.getAllTours).post(tourController.createtours);

tourRouter.route('/').get(tourController.getAllTours).post(tourController.createtours);

module.exports = tourRouter;