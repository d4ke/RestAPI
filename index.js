const http = require('http');
const url = require('url');
const [listenIP, listenPort] = ['127.0.0.1', 3000];

let users = [];
let count = 1;

http.createServer((req, res) => {
    if (req.url === '/users' && req.method === 'GET') {
        res.statusCode = 200;
        res.end(JSON.stringify(users))
    } else if (req.url.includes('/users/') && req.method === 'GET') {
        const userId = parseInt(req.url.split('/')[2]);
        const user = users.find(value => value.id === userId);
        res.end(JSON.stringify(user));
    } else if (req.url === '/users' && req.method === 'POST') {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk
        });

        req.on('end', () => {
        const user = JSON.parse(body);
        user.id = count++;
        users.push(user);
        res.statusCode = 201;
        res.end(JSON.stringify(user))
        });
    } else if (req.url.includes('/users/') && req.method === 'PUT') {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk
        });
        req.on('end', () => {
            const newNameOfUser = JSON.parse(body);
            const userId = parseInt(req.url.split('/')[2]);
            const user = users.find(value => value.id === userId);
            user.name = newNameOfUser.name;
            res.statusCode = 200;
            res.end(JSON.stringify(user))
        });
    } else if (req.url.includes('/users/') && req.method === 'DELETE') {
            const userId = parseInt(req.url.split('/')[2]);
            const user = users.findIndex(value => value.id === userId);
            users.splice(user, 1);
            res.statusCode = 201;
            res.end()
    } else {
        res.statusCode = 404
        res.end("Route not found")
    }
}).listen(listenPort, listenIP, (error) => {
    console.log((error) ? error : `Server listening ${listenIP}:${listenPort}`)
});



