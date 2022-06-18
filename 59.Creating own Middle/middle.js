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
app.get('/api/v1/tours',(req,res)=>{
    console.log(req.requestTime);
        res.status(200).json({status: 'success',
        requestedat : req.requestTime,
        data:{tours}
      })
    })
app.post('/api/v1/tours',(req,res)=>{
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
)
app.patch('/api/v1/tours/:id',(req,res) =>{
    res.status(200).json({status : 'success',
    data : {
tour :'< Updated tour here... >'
}
    })
})
  const port =3000;
app.listen(port,()=>
{
  console.log(`App running on port ${port}...`);  
})