const http = require("http");
const fs = require("fs");
const { error } = require("console");

const myServer = http.createServer((req, resp) => {
  // req
  //   console.log(req.headers);

  const log = `${Date.now()}: New Request Recived\n`;
  //   asyn append
  fs.appendFile("log.txt", log, (error, data) => {

    switch (req.url) {
        case "/":resp.end("Home Page")
            break;
        case "/about":resp.end("Iam VMB")
            break;

            default:
                resp.end("404 Not Found")
            break;
    }

    
  });
});
// to create server the createServer is used to handle it
// callback function is used

// to listen we use Ports
myServer.listen(8000, () => console.log("Server Started"));
