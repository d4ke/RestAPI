const http = require('http');
const url = require('url');
const fs = require('fs');
const [listenIP, listenPort] = ['127.0.0.1', 3000];

// let users = './user.txt';
let users = [];
let count = 1;

function readWriteFileDB() {
    if (fs.existsSync('./users.json')) {
        if (users.length == 0) {
            fs.readFile('./users.json', 'utf8' ,(err, data)=>{
                if (err) { }
                (!data) ? null : users = JSON.parse(data);
                users.map((value, index, array) => {
                    if (count < value.id) count = value.id
                });
                ++count;
                console.log(count)
            });
        } else {
            fs.writeFile('./users.json', JSON.stringify(users,null,2), ()=>{});
        };
    } else {
        fs.writeFile('./users.json', JSON.stringify(users), ()=>{});
    }
}

readWriteFileDB()

const server = http.createServer((req, res) => {
    if (req.url === '/users' && req.method === 'GET') {
        res.statusCode = 200;
        res.end(JSON.stringify(users))
    } else if (req.url.includes('/users/') && req.method === 'GET') {
        const userId = parseInt(req.url.split('/')[2]);
        const user = users.find(value => value.id === userId);
        if (user) {
            res.end(JSON.stringify(user));
        } else {
            res.end('User id not found');
        }
    } else if (req.url === '/users' && req.method === 'POST') {
            let body = ''
            req.on('data', (chunk) => {
                body += chunk
            });
            req.on('end', () => {
                try {
                    const user = JSON.parse(body);
                    if (!user.name) throw new Error('Send empty name');
                    user.id = count++;
                    users.push(user);
                    readWriteFileDB();
                    res.statusCode = 201;
                    res.end(JSON.stringify(user))
                } catch(err) {
                    res.statusCode = 400;
                    // console.log('Error: ', err.name, err.message);
                    res.end(`${err.name} : ${err.message}`);
                };
            });

    } else if (req.url.includes('/users/') && req.method === 'PUT') {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk
        });
        req.on('end', () => {
            try {
                const newNameOfUser = JSON.parse(body);
                if (!newNameOfUser.name) throw new Error('Send empty name');
                const userId = parseInt(req.url.split('/')[2]);
                const user = users.find(value => value.id === userId);
                user.name = newNameOfUser.name;
                readWriteFileDB();
                res.statusCode = 200;
                res.end(JSON.stringify(user))
            } catch(err) {
                res.statusCode = 400;
                // console.log('Error: ', err.name, err.message);
                res.end(`${err.name} : ${err.message}`);
            };
        });
    } else if (req.url.includes('/users/') && req.method === 'DELETE') {
            const userId = parseInt(req.url.split('/')[2]);
            const userIndex = users.findIndex(value => value.id === userId);
            if (userIndex > -1) {
                users.splice(userIndex, 1);
                readWriteFileDB();
            }
            res.statusCode = 201;
            res.end()
    } else {
        res.statusCode = 404
        res.end("Route not found")
    }
});

server.listen(listenPort, listenIP, (error) => {
    console.log((error) ? error : `Server listening ${listenIP}:${listenPort}`)
});



