const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");
 const User = require("C:/Projects/124.Modeling/userModel.js");
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim: true,
    maxlength: [100, "A tour name must have less or equal then 100 characters"],
    minlength: [4, "A tour name must have more or equal then 4 characters"],
    // validate: [validator.isAlpha, 'Tour name must only contain characters']
  //  validate: [validator.isAlpha, "Name Must Only Cointain alphabits"],
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, "A tour must have a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have a difficulty"],
    enum: {
      values: ["easy", "medium", "difficult"],
      message: "Difficulty is either: easy, medium, difficult",
    },
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be below 5.0"],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  startLocation: {
    // GeoJSON
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: [Number],
    address: String,
    description: String
  },
  locations:[{
    type:{
      type: String,
      default: 'Point',
      enum:['Point']
      },
      coordinates:[Number],
      address:String,
      description:String,
  }],
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: "Discount Price Should be below Actual Price",
    },
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "A tour must have a description"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
  secretTour: {
    type: Boolean,
    default: false,
  },
 // guides: Array,
 guides:[
   {type:mongoose.Schema.ObjectId, 
    ref: "Users"
}
  ]
});

tourSchema.index({price: 1})
tourSchema.index({startLocation: '2dsphere'});
// Document MiddleWare
tourSchema.pre("save", function (next) {
  // console.log(this);
  this.slug = slugify(this.name, { lower: true });
  next();
});
tourSchema.post("save", function (doc, next) {
  console.log(doc);
  next();
});
/*
tourSchema.virtual('reviews',{
  ref:'Review',
  foreignField:'',
})
*/
/*
tourSchema.pre("save", async function (next) {
  const guidesPromise = this.guides.map(async id =>await User.findById(id));
  this.guides = await Promise.all(guidesPromise);
  next();
});
*/
// Query middleWare
tourSchema.pre("find", function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

const Tour = mongoose.model("TourJson", tourSchema);

module.exports = Tour;
