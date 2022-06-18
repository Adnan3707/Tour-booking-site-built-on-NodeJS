const express = require("express");
const booRouter = express.Router();
const bookingController = require("C:/Projects/88.Another Way of Crea. Document/controller/bookingController.js");

//  booRouter.route("/checkout-session/:tourId").get(bookingController.getCheckoutSession ); //, bookingController.createBookingCheckout,);
 booRouter.route("/checkout-session/:tourId").get(bookingController.getCheckoutSession , bookingController.createBookingCheckout,);

module.exports = booRouter;