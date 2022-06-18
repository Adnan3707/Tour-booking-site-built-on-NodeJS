const fs = require("fs");
const http = require("http");
const server = require("http").createServer();
server.on("request" , (req, res) => {
    res.end("Hello from the Server!");
    fs.readFile("./37.Streams In Practice/read.txt","utf-8", (err,data)=>{
        console.log(data);
    });
    // Solution 2 : Streams
  const  readable = fs.createReadStream('"./37.Streams In Practice/read.txt"');
  readable.on
});
server.listen(8000, "127.0.0.1", () => {
  console.log("listening to request on port 8000");
});