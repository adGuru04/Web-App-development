const http = require('http');

const Route = require('./Route');

console.log(Route.someText);

const server = http.createServer(Route.handler);

server.listen(2000);
