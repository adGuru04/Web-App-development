// the core modules - http, https, fs (file system), path, os

const http = require('http');

//function rqListener(req, res) {}

//http.createServer(rqListener);
//requestlistener is a function which will execute for every incoming request

const server = http.createServer((req, res) => {
    console.log(req.url, req.headers, req.method);
    // process.exit(); 
    //-the above line of code, hard exits the event loop and there is no more work to do and closes the program
    res.setHeader('content-type','text/html');
    res.write('<html>');
    res.write('<head><title> My first page</title></head>');
    res.write('<body><h1> Hello from my first Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
} );
//we store the created server and call it afterwards, we use const to create the var server as we create it only once and dont want to over-write the same!

server.listen(3200);

//this is how you create servers 


