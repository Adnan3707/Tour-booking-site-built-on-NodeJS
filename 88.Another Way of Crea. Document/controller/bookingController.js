const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Tour = require("C:/Projects/88.Another Way of Crea. Document/MVC/tourModel.js");
const Booking = require("C:/Projects/213.Bookings Model/bookingModel.js");

exports.getCheckoutSession=async (req,res,next)=>{
    // 1) Get the currently booked tour
    const tour =await Tour.findById(req.params.tourId) ;

    // 2) Create checkout session
 const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
     success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${req.params.tourId}&price=${tour.price}`,
    // success_url: `${req.protocol}://${req.get('host')}/my-tours?alert=booking`          ^&user=${req.user.id}
    // success_url: `${req.protocol}://${req.get('host')}/`, // After Sucessful Check Out Move to Home URL
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    // customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images:[`https://www.natours.dev/img/tours/${tour.imageCover}`
       //     `${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}` // Image Has To Be Public
        ],
        amount: tour.price * 100,
        currency: 'inr',
        quantity: 1
      }
    ]
     /*
     payment_method_types: ['card'],
     success_url:`${req.protocol}://${req.get('host')}/`,
     cancel_url:`${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
     customer_email: req.user.email,
     client_reference_id:req.params.tourId,
     line_items: [
         {
             name: `${tour.name} Tour`,
             description: tour.summary,
             images:[`https://www.natours.dev/img/tours/${tour.imageCover}.jpg`],
             amount: tour.price * 100,
             currency: 'usd',
             quantity: 1
         }
     ]
     */
 })
// 3) Create session as response
 res.status(200).json({
    status:'success',
    session
})
}

exports.createBookingCheckout =async (req,res,next)=>{
  // const {tour,user,price} =req.query;
  const tour= await req.params.tour
  const price= await req.params.price
  console.log("Trigered")
  console.log(tour)
  console.log(price)

  // if(!tour && !user && !price) return next()
  // await Booking.create({ tour, user, price });
  await res.redirect(`${req.protocol}://${req.get('host')}/`)
}