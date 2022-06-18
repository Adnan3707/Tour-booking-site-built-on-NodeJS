const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const Tour = require("C:/Projects/88.Another Way of Crea. Document/MVC/tourModel.js")
dotenv.config({ path : "C:/Projects/config.env"});
       // Connecting to Mongoose Database
const DB = process.env.DATABASE1.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
  useNewUrlParser: true,
  useCreateIndex : true,
  useFindAndModify:false
}).then(con =>{
  // console.log(con.connections);
  console.log('DB connection successful!')
});
// Read JSON File
const tours =JSON.parse(fs.readFileSync('C:/Projects/tours.json','utf-8'))
// Import data into Database
const importData = async () =>
{
    try{
        await Tour.create(tours);
        console.log('Data Sucessufully Loaded')
        process.exit();
    }
    catch(err){
        console.log('Error with ID- in import')
        console.log(err);
        process.exit();
    }
}
// Delete All Data from DB
const deleteData = async () =>
{
    try{
        await Tour.remove({});
        console.log('Data Sucessufully Deleted')
        process.exit()
    }
    catch(err){
        console.log('Error with ID- in delete')
        console.log(err);
        process.exit();
    }
}
if(process.argv[2]=='--import'){
    importData();
}
else if (process.argv[2]=='--delete')
{
    deleteData();
}
