const path = require('path');
const dotenv = require("dotenv");
dotenv.config({ path: "C:/Projects/config.env" });
// NPM
const helmet = require('helmet');
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const sharp = require('sharp');

//Multer
const multer = require('multer');
// const upload = multer({dest:'C:/Projects/public/img/users'})
const multerStorage = multer.diskStorage({
   destination: (req, file, cb) => {
   cb(null, 'C:/Projects/public/img/users');
   },
   filename: (req, file, cb) => {
     const ext = file.mimetype.split('/')[1];
    //  console.log(req.params.id)
     cb(null, `user-${req.params.id}-${Date.now()}.${ext}`);
   }
  });
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/jpeg')) {
      cb(null, true);
    } else {
      cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
  };
  /*
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
  });
  */
const storage = multer.memoryStorage()
const upload = multer({storage: storage})
//upload.single('photo')

//paths

const viewRoutes = require("C:/Projects/88.Another Way of Crea. Document/routes/viewRoutes.js")
const tourRouter = require("C:/Projects/88.Another Way of Crea. Document/routes/tourRoutes.js");
const toursID = require("C:/Projects/88.Another Way of Crea. Document/MVC/tourModel.js");
const tourStats = require("C:/Projects/88.Another Way of Crea. Document/routes/tourStats.js");
const monthlyplan = require("C:/Projects/88.Another Way of Crea. Document/routes/monthlyplan.js");
const AppError = require("C:/Projects/114.App Error/appError.js");
const errorController = require("C:/Projects/114.App Error/errorController.js");
const authController = require("C:/Projects/125.Creat new User/authController.js");
const reviewRouter = require("C:/Projects/154.CreatAndgetinReviews/reviewRoutes.js");
const bookings = require("C:/Projects/88.Another Way of Crea. Document/routes/bookingsRoutes.js");


app.use(express.json());
app.use(express.static(path.join('C:/Projects/public')));
// app.use(cookieParser);

// Setting pug
app.set('views',
// path.join(__dirname, 'views')
'C:/Projects/views'
)
app.set('view engine', 'pug');

app.use("/",viewRoutes)





//End Setting pug

// Un Used Paths
/*
const userRouter = require("C:/Projects/88.Another Way of Crea. Document/routes/userRoutes.js");
*/


// Connecting to Mongoose Database
const DB = process.env.DATABASE1.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log("DB connection successful!");
  });

//const userroutesp = require("C:/Projects/63.routes/predefRoutes.js")


const getByID = async (req, res) => {
  try {
    const tours = await toursID.findById(req.params.id)
    .populate({path: "guides",select : "name",select : "email"});
    {
    /*
    .populate("guides")
    .then(p=>console.log(p))
    .catch(error=>console.log(error));
  */
    }
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
const updatetour = async (req, res) => {
  console.log(req.file);
 // console.log(req.body)
  try {
    /*
    const filterObj = (obj, ...allowedFields) => {
      const newObj = {};
      Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
      });
      return newObj;
    };
    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) filteredBody.photo = req.file.filename;
    */
    const tours = await toursID.findByIdAndUpdate(req.params.id, req.body, {
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
const deletetour = async (req, res) => {
  try {
    await toursID.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        tour: "<Sucessfully deleted...>",
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
// Routers
app.route("/api/v1/tours/:id").get(getByID).patch(upload.single('photo'),updatetour).post(
   authController.protect,
   authController.restrictTo('admin') ,
  deletetour);

  // Multer route
  // upload.single('image') --> For Single Use
  // upload.array('image') --> For Multiple Use
app.post('/upload',upload.array('image'),async (req,res)=>{
  /*
  console.log(req.file)
  await sharp(req.file.buffer).resize( {width: 320, height: 240}).toFile('C:/Projects/public/img/users/userS/'+req.file.originalname);
  res.send('upoaded')
*/
// For Multiple Files
req.files.map(async (file) => {
  const filename = file.originalname.replace(/\..+$/, '');
  const newFilename = `heartCoder-${filename}-${Date.now()}.jpeg`;

  await sharp(file.buffer).resize(640, 320).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`C:/Projects/public/img/users/userS/${newFilename}`);
  res.send('upoaded')
})

    /*
  {
  // console.log(req.file.buffer)
  // const buffer = await getStream(req.file.stream)
  // console.log(buffer)
  // res.send('upoaded')

  await sharp('pathToFile/test.jpg')
  .resize({
      width: 320,
      height: 320,
      fit: sharp.fit.outside
  })
  .sharpen()
  .toFile('C:/Projects/public/img/users/userS')
  .then(info => { 
      console.log(info);
   })
  .catch(err => {
      console.log(err);
  });

  
  await sharp(file.buffer)
  .resize({ width: 75,height: 75 })
  .toBuffer()
  .then(data => {
    console.log("data: ",data);
    res.send("File uploaded");
  }).catch(err =>{
    console.log("err: ",err);    
  });
 }
  */
})
// Mounting middleware and router

app.use((req, res, next) => {
  console.log("Operation Executed At :-  ");
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});
// Set security HTTP headers
app.use(helmet());

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/tours-stats", tourStats);
app.use("/api/v1/tours-stats/monthly-plan", monthlyplan);
app.use("/api/v1/bookings",bookings)
//app.use("")

// {
app.use('/api/v1/reviews/Test/Test1',reviewRouter)


// }
{
  //app.use('/api/v1/tours/:id',tourRouter1) //(req.params dosent work !)
  //app.use('/api/v1/tours',userRouter);
  //app.use('/api/v1/users',userroutesp);
}

// Unhandled Routes
app.all("*", (req, res, next) => {
  /*
  const err = new Error(`err 1`);
  err.statusCode = 404;
  err.status = `Cant Read request ${req.originalUrl}`;
  */
  next(new AppError(`Cant Read request ${req.originalUrl}`, 404));
});
// Global Error Handling middleware
app.use(errorController);
// Server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
