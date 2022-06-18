const url = require("url");
const fs = require("fs");
const http = require("http");
const path = require("path/posix");
const server = http.createServer((req, res) => {
  console.log(req.url);
  const pathName = req.url;
 /*
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is an Overview");
  } 
  if (pathName === "/product") {
    res.end("This is the Product");
  }
  */
  if (pathName === "/api")
   {
    fs.readFile('./5.Simple API/test1.js', 'utf-8', function(error, data) {
      const productData = JSON.parse(data);
 //     res.writeHead(200, { "Content-type": "application/json" });
      console.log(data);
});
    res.end("Api Entered");
  }
  /*else if {
    res.writeHead(404, {});
    res.end("page not found!");
  } */
  res.end("Hello from the Server!");
});
server.listen(8000, "127.0.0.1", () => {
  console.log("listening to request on port 8000");
});
