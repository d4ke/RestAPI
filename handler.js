const usersDB = require('./store');
const getUsers = require('./getUsers');
const getUser = require('./getUser');
const createUser = require('./createUser');
const updateUser = require('./updateUser');
const deleteUser = require('./deleteUser');

const handler = (req, res) => {
    if (req.url === '/users' && req.method === 'GET') {
        getUsers(req, res);
    } else if (req.url.includes('/users/') && req.method === 'GET') {
        getUser(req, res);
    } else if (req.url === '/users' && req.method === 'POST') {
        createUser(req, res);
    } else if (req.url.includes('/users/') && req.method === 'PUT') {
        updateUser(req, res);
    } else if (req.url.includes('/users/') && req.method === 'DELETE') {
        deleteUser(req, res);
    } else {
        res.statusCode = 404
        res.end("Route not found")
    }
};

module.exports = handler;