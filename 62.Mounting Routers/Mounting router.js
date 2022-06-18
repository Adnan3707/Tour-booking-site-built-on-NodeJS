var fs = require("fs");
const express = require('express');
const app = express();

app.use(express.json());
app.use((req,res,next)=>{
    console.log('Hello from the middleware ');
    next();
})
app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    console.log()
    next();
})
const tours = JSON.parse(
    fs.readFileSync('52.Starting Api/tours-simple.json'));

const getAllTours = (req,res)=>{
    console.log(req.requestTime);
        res.status(200).json({status: 'success',
        requestedat : req.requestTime,
        data:{tours}
      })
    };

const createtours = (req,res)=>{
    //  console.log(req.body);
      const newID = tours[tours.length - 1].id + 1;
      const newTour = Object.assign({id: newID},req.body);
      tours.push(newTour);
  
      fs.writeFile(('52.Starting Api/tours-simple.json',JSON.stringify(tours),(err) => {
          res.status(err).json({
              status : 'success',
              data : {
                  tour : newTour
              }
          })
      }))
  }

  const updatetour = (req,res) =>{
    res.status(200).json({status : 'success',
    data : {
    tour :'< Updated tour here... >'
           }
    })
}
const userroutes = (req,res) =>{
    res.status(200).json({status : 'success',
    data : {
    tour :'< Users tour here... >'
           }
    })
}

//  app.route('/api/v1/tours').get(getAllTours).post(createtours);
// app.route('/api/v1/tours/:id').patch(updatetour);

             // Mounting middleware and Multiple router
      
const tourRouter = express.Router();
app.use('/api/v1/tours',tourRouter);
tourRouter.route('/').get(getAllTours).post(createtours);

const userRouter = express.Router();
app.use('/api/v1/tours',userRouter);
userRouter.route('/:id').post(createtours);

// Implementing User routes
 app.route('/api/v1/users').get(userroutes);

   const port =3000;
app.listen(port,()=>
{
  console.log(`App running on port ${port}...`);  
})