//HTTP Methods
// ## HTTP Methods:-
// -> GET => when you want to get some data from the server (by default our browser makes a GET request).

// -> POST => when you want to send and mutate (change/add) some data in server (e.g., filling a google form).

// -> PUT => it means putting something on our server. this is basically like for example, if you have seen in any form, if you want to upload a photo or a file, then there we make a PUT request.

// -> PATCH => change/edit/update something in the data (e.g., i want to change my username on twitter which is an existing entry).

// -> DELETE => delete basically means if i want to delete something from the database or later i want to delete my account, then that is a delete request.

const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    const log = `A request received on ${req.url} at ${Date.now()} Method: ${req.method}\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    fs.appendFile("log.txt", log, (err, data) => {
        switch (myUrl.pathname) {
            case "/":
                if (req.method === "GET") {
                    res.end("Home Page");                    
                }
                break;

            case "/about":
                const username = myUrl.query.myName;
                const id = myUrl.query.id;
                res.end(`I am ${username} and my id is ${id}`);
                break;

            case "/search":
                const searchResult = myUrl.query.search_query;
                res.end("Here are your results for " + searchResult);
                break; 

            case "/signup":
                if (req.method === "GET") {
                    res.end("This is a Signup form!");
                } else if (req.method === "POST") {
                    // DB query
                    res.end("Success")
                }
                break;
        
            default:
                res.end("404 Not found")
                break;
        }
    })
});

myServer.listen(3000, () => {
    console.log("Server started")
});