var fs = require('fs')
fs.readFile('./5.Simple API/data.json','utf-8',function(err,data){
    console.log(data)
})