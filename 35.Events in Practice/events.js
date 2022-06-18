var http = require("http");
const EventEmitter = require("events");
const emitter = new EventEmitter();
const server = http.createServer();

server.on("close",(req,res)=>{
    console.log("Server Closed");
    res.end("Server closed");
})
server.on("request",(req,res)=>{
    console.log("Request Recieved");
    res.end("Request Recieved");
   })

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to request on port 8000");
});