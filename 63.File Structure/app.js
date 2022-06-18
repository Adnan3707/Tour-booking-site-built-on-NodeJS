const mongoose = require('mongoose');
const dotenv = require('dotenv')
const express = require('express');
const app = express();
const tourRouter = require("C:/Projects/63.routes/tourRoutes.js")
const userRouter = require("C:/Projects/63.routes/userRoutes.js")
 dotenv.config({ path : "C:/Projects/config.env"});

 
 // Param

app.param('id',(req,res,next,val)=>{
  console.log(`tour id is : ${val}`);
  next();
})



 // end



//const userroutesp = require("C:/Projects/63.routes/predefRoutes.js")
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
  const updatetour = (req,res) =>{
    res.status(200).json({status : 'success',
    data : {
    tour :'< Updated tour here... >'
           }
    })
}

             // Mounting middleware and Multiple router
      
         // Routers


app.route('/api/v1/tours/:id').patch(updatetour);


app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/tours',userRouter);
//app.use('/api/v1/users',userroutesp);



 // Server
   const port =4000;
app.listen(port,()=>
{
  console.log(`App running on port ${port}...`);  
})