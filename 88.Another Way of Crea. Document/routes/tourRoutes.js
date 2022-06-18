const express = require("express");
const tourRouter = express.Router();
const tourController = require("C:/Projects/88.Another Way of Crea. Document/controller/tourController.js");
const authController = require('C:/Projects/125.Creat new User/authController.js')
tourRouter
  .route("/")
  .get(
    authController.protect ,
    tourController.getAllTours)
  .post(tourController.createtours);
tourRouter.route("/tours-within/:distance/center/:latlng/unit/:unit").get(tourController.getToursWithin)
tourRouter.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);
tourRouter.post('/user/signup',authController.signup);
tourRouter.post('/user/signup/login',authController.login);
tourRouter.patch('/user/login/forgot',authController.forgotPassword);
tourRouter.patch('/user/login/reset/:token',authController.resetPassword);
// tourRouter.get('/user/test/testa/testb/testc/testd/teste/testall',authController.getUsers);
module.exports = tourRouter;
