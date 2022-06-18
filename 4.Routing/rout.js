const url = require("url");
const fs = require("fs");
const http = require("http");
const path = require("path/posix");
const server = http.createServer((req, res) => {
  console.log(req.url);
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is an Overview");
  } else if (pathName === "/product") {
    res.end("This is the Product");
  } else {
    res.writeHead(404, {});
    res.end("page not found!");
  }
  res.end("Hello from the Server! ok");
});
server.listen(3000, "127.0.0.1", () => {
  console.log("listening to request on port 3000");
});