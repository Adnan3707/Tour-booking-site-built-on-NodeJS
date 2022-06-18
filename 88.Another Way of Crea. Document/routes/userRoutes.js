var fs = require("fs");
const express = require('express');

const app = express();

const userRouter = express.Router();

userRouter.param('id',(req,res,next,val) => {
    console.log(`Tour id is: ${val}`);
    next();
})

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

userRouter.route('/:id').post(createtours);

module.exports = userRouter ;
