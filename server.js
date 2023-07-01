// the core modules - http, https, fs (file system), path, os

const http = require('http');
const fs = require('fs');
const { brotliDecompressSync } = require('zlib');
//const { text } = require('stream/consumers');



//function rqListener(req, res) {}

//http.createServer(rqListener);
//requestlistener is a function which will execute for every incoming request

const server = http.createServer((req, res) => {
    //parse a const variable   
    const url = req.url;
    const method = req.method;
    if(url === '/') {
    res.write('<html>');
    res.write('<head><title> Enter Message </title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="Submit">Send</button></form></body>');
    res.write('</html>'); 
    return res.end();
    }
    // process.exit(); 
    //-the above line of code, hard exits the event loop and there is no more work to do and closes the program

if(url==='/message' && method==='POST'){
        const body=[];
        //we use the on method which is a mehtod to register a listner method!!
        // 'on' allows us to listen to some events, here its the data event!!
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        //here we have the end event listener, to run once its done parsing the incoming request data!!
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
            //res.writeHead(302,{})
            res.statusCode=302;
            res.setHeader('Location','/');  
            return res.end();
        }); 
        
    }
    res.setHeader('content-type','text/html');
    res.write('<html>');
    res.write('<head><title> My first page</title></head>');
    res.write('<body><h1> Hello from my first Node.js Server!</h1></body>');
    res.write('</html>'); 
    res.end();
} );
//we store the created server and call it afterwards, we use const to create the var server as we create it only once and dont want to over-write the same!

server.listen(3000);

//this is how you create servers 


