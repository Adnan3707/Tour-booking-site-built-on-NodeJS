const express = require("express");
const viewRoutes = express.Router();
const viewsController = require("C:/Projects/88.Another Way of Crea. Document/controller/viewController.js")
const bookingController = require('C:/Projects/88.Another Way of Crea. Document/controller/bookingController.js')
  viewRoutes.get('/',viewsController.getOverview)
  
  viewRoutes.get('/tour/:slug',viewsController.getTour)
  viewRoutes.get('/login',viewsController.getLoginform)
  module.exports = viewRoutes;