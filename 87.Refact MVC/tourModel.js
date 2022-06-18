const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name:{
      type : String,
    },
    rating : {
      type : Number,
    },
    Price: {
      type:Number,
      required :[true,'A tour must have a price']
    }
    })

const Tour = mongoose.model('Tour',tourSchema);


module.exports = Tour;