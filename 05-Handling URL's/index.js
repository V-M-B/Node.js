const fs = require("fs");
const http = require("http");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();

  const log = `${Date.now()}: ${req.url} New Req received\n`;

  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      res.statusCode = 500; // Internal Server Error
      return res.end("Internal Server Error");
    }

    // Handle different routes
    switch (req.url) {
      case "/":
        res.end("Home Page");
        break;

      case "/about":
        res.end("I am Batman");
        break;

      default:
        res.end("404 Not Found");
        break;
    }
  });
});

myServer.listen(3000, () => {
  console.log("Server started on port 3000");
});
