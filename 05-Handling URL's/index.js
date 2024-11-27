const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  // console.log(req.headers);
  // console.log("Request Received!");

//   not printing fav icon req
  if (req.url === "/favicon.ico") {
    return res.end();
  }
  const log = `A request received on ${req.url} at ${Date.now()}\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("Home Page");
        break;

      case "/about":
        res.end("I am Batman");
        break;

      default:
        res.end("404 Not found");
        break;
    }
  });
});

myServer.listen(3000, () => {
  console.log("Server started");
});
