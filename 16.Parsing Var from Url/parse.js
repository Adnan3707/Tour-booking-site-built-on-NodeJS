var http = require("http");
var url = require('url');
const parse = require("path");
const server = http.createServer((req, res) => {
    console.log(req.url);
   var y =  url.parse(req.url,true);  
   const {query , pathname } = y;   
   res.end("Hello from the Server!");
  console.log(y);
  console.log("query");
  console.log(query);
  console.log("pathname");
  console.log(pathname);
  //Get localhost;8080/person

/*
  server.get("/person",(request,response)=>{
      let personName = request.query.name;
      let age = request.query.age;
      response.json({name:personName,age})
  })
  */
//Get localhost:8080
/*
server.get("/school/:name",(request,response)=>{
    let schoolName = request.params.name;
    response.json({name:schoolName})
})
*/

});
server.listen(8000, "127.0.0.1", () => {
  console.log("listening to request on port 8000");
});
 