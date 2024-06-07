const [listenIP, listenPort] = ['127.0.0.1', 3000];

const server = require('./handler');

server.listen(listenPort, listenIP, (error) => {
    console.log((error) ? error : `Server listening ${listenIP}:${listenPort}`)
});



