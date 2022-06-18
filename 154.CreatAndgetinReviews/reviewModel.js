const mongoose = require('mongoose');
const Tour = require('C:/Projects/88.Another Way of Crea. Document/MVC/tourModel.js');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'TourJson',
      required: [true, 'Review must belong to a tour.']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'Users',
      required: [true, 'Review must belong to a user']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)
reviewSchema.pre(/^find/, function(next) {
    // this.populate({
    //   path: 'tour',
    //   select: 'name'
    // }).populate({
    //   path: 'user',
    //   select: 'name photo'
    // });
  console.log("log 1")
    this.populate({
      path: 'user',
      select: 'email',
      select:'name'
    }).populate({
        path: 'tour',
        select: 'name'
    })
    next();
  });
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;