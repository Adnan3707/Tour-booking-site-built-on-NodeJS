const Tour = require("C:/Projects/88.Another Way of Crea. Document/MVC/tourModel.js");
exports.getOverview=async (req,res)=>{
 const Tourr = await Tour.find({});
    res.status(200).render('overview',{
      title:'All Tours',
      tours: Tourr
    })
}
exports.getTour=async (req,res)=>{
   const Tourr = await Tour.findOne({slug:req.params.slug}).populate({path: "Review",select : "user",select : "rating",select :"review"});
  res.status(200).render('tour',{
    title:'The Forest Hiker',
     tour:Tourr
  })
}
exports.getLoginform=async (req,res)=>{
 res.status(200).render('login',{})
 }
