const mongoose = require('mongoose');
var fs = require("fs");
const Tour = require("C:/Projects/87.Refact MVC/tourModel.js");
const tourController = require("C:/Projects/63.controller/tourController.js")
tours = JSON.parse(
    fs.readFileSync('52.Starting Api/tours-simple.json'));

exports.getAllTours = (req,res)=>{
    console.log(req.requestTime);
        res.status(200).json({status: 'success',
        requestedat : req.requestTime,
        data:{tours}
      })
    };

exports.createtours = (req,res)=>{

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
      
      res.status(201).json({
          status : 'success',
          data : {
              tour : testTour
          }
      })
    }

