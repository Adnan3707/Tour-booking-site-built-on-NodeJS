var http = require('http');
var fs = require('fs');
var http = require("http");
const server = http.createServer((req, res) => {
  res.end("Hello from the Server!");
var myReadStream = fs.createReadStream("./37.Streams In Practice/read.txt","utf-8");
myReadStream.on("data",(data)=>{
    console.log("new chunk recieved");
    console.log(data);
}
)
});
server.listen(8000, "127.0.0.1", () => {
    console.log("listening to request on port 8000");
  });