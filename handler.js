const usersDB = require('./store');
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/users' && req.method === 'GET') {
        res.statusCode = 200;
        res.end(JSON.stringify(usersDB.getUsers()));
    } else if (req.url.includes('/users/') && req.method === 'GET') {
        const userId = parseInt(req.url.split('/')[2]);
        let user = usersDB.getUser(userId);
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
                    // user.id = count++;
                    // users.push(user);
                    usersDB.addUser(user);
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
                // const user = users.find(value => value.id === userId);
                // user.name = newNameOfUser.name;
                const user = usersDB.updateUser(userId, newNameOfUser);
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
            usersDB.deleteUser(userId);
            res.statusCode = 201;
            res.end()
    } else {
        res.statusCode = 404
        res.end("Route not found")
    }
});

module.exports = server;