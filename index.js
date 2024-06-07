const http = require('http');
const handler = require('./handler');

const [listenIP, listenPort] = ['127.0.0.1', 3000];

const server = http.createServer(handler);

server.listen(listenPort, listenIP, (error) => {
    console.log((error) ? error : `Server listening ${listenIP}:${listenPort}`)
});