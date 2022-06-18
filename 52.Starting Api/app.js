var fs = require("fs");
const express = require('express');
const app = express();
const tours = JSON.parse(
    fs.readFileSync('52.Starting Api/tours-simple.json'));
app.get('/api/v1/tours',(req,res)=>{
        res.status(200).json({status: 'success',data:{tours}
      })
    })
const port =3000;
app.listen(port,()=>
{
  console.log(`App running on port ${port}...`);  
})