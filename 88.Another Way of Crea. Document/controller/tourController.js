//var fs = require("fs");
const Tour = require("C:/Projects/88.Another Way of Crea. Document/MVC/tourModel.js");
const APIFeatures = require("C:/Projects/100.RefApi/apifea.js");
// Tour.init();
exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          // _id: null,
          _id: "$difficulty",
          avgPrice: { $avg: "$price" },
          avgRating: { $avg: "$ratingsQuantity" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
    ]);
    res.status(200).json({ status: "success", data: { stats } });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getMonthlyPlan = async (req, res) => {
  try {
    // const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      {
        $unwind: "$startDates",
      },
      /*,
      {
        $match: {
          startDates :{
            $gte : new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          } 
        }
      }
      */
    ]);
    res
      .status(200)
      .json({ status: "success", length: plan.length, data: { plan } });
  } catch (err) {
    res.status(404).json({
      status: "fail wth",
      message: err,
    });
  }
};
exports.getAllTours = async (req, res) => {
  try {
    {
      /*      // Basic Filtering
   //Build Query console.log('log 1 '+)
      // Applying filtering
   const queryObj = { ...req.query };
   console.log('log 1 '+queryObj)
  let queryStr = JSON.stringify(queryObj);
  console.log('log 1 '+queryStr)
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(el => delete queryStr[el]);
   // 1)  applying regular expression for Greater than , equal ,Less Than
  queryDur = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
             // Parsing
  let query1 = await Tour.find(JSON.parse(queryDur));
*/
    }
    {
      /*      // 2) Basic Sorting 
      if(req.query.sort ){
        const SortBy = req.query.sort.split(',').join(' ');
         query1 = await Tour.find().sort(SortBy); 
    }
    */
    }
    {
      /*    // 3) Basic Pagination
    if((req.query.page)|| (req.query.limit)){
     const page = req.query.page * 1 || 1;
     const limit = req.query.limit * 1 || 100 ;
     const skip =   (page-1)*limit;
     const tourCount = await Tour.countDocuments();
     if(skip>=tourCount)    throw new Error('This Page Dosent Exists');
     query1 = await Tour.find().skip(skip).limit(limit); 
    }
    */
    }
    // Execute Query for :- tours?duration[gt]=2
    // Solve Chaining problem
    const features = new APIFeatures(await Tour, req.query);
    let tours = await features.filter();
 //   let tours = await features.filter().explain();
    if (req.query.sort) {
      tours = await features.sort();
    }
    {
      // paginate not completed
      /*
   if((req.query.page)|| (req.query.limit)){
      tours= await features.filter().sort().paginate()
   }
   */
    }
    {
      // For Basic Commented Fields
      //   const tours = await query1;
    }

    res
      .status(200)
      .json({ status: "success Full", result: tours.length, data: { tours } });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getToursWithin = async (req,res) =>{
  const{distance,latlng,unit} = req.params ;
  const [lat , lng] = latlng.split(',')
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  console.log(lat)
  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });
//  console.log(tours)
  res.status(200).json({
    status: 'Success',
    data: tours
  })
}
exports.getDistances = async (req,res) =>{
  const { latlng, unit } = req.params;
  console.log(latlng)
  console.log(unit)
  const [lat, lng] = latlng.split(',');
  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1]
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier
      }
    }
    ,
    {
      $project: {
        distance: 1,
        name: 1
      }
    }
  
  ]);
  res.status(200).json({
    status:'success',
    length:distances.length,
    data:{
      data:distances
    }
  })
}
// Not Working for req.params
exports.getByID = (req, res) => {
  try {
    //      const toursID = Tour.findById()
    console.log("By Get method called " + req.params.id + req.param("id"));
    res.status(200).json({
      status: "success",
      data: {
        tour: "< Updated tour here... in by id >",
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
// Not Working for req.params
exports.getByID1 = async (req, res) => {
  try {
    const tours = await Tour.findById(req.param("id"));
    console.log("By Patch method called" + req.params.id + req.param("id"));
    res.status(200).json({
      status: "success",
      data: {
        tour: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.updatetour = async (req, res) => {
  try {
    console.log(req.body);
    console.log("test" + req.params.id);
    const tours = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
// Error Handling  Incomplete
{
  /*
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(err => next(err));
  };
};
exports.createtours = catchAsync(async (req, res, next) => {
  // try {
  //  const newTour = await Tour.create(req.body);

  const testTour = new Tour(req.body);

  await testTour
    .save()
    .then((testTour) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: testTour,
        },
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    });
});
*/
}
exports.createtours = async (req, res) => {
  // try {
  //  const newTour = await Tour.create(req.body);
  const testTour = new Tour(req.body);
    
  await testTour
    .save()
    .then((testTour) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: testTour,
        },
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "failed Operation",
        message: err,
      });
    });
};
