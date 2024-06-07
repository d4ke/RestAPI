const usersDB = require('./store');

module.exports = (req, res) => {
    res.statusCode = 200;
    res.end(JSON.stringify(usersDB.getUsers()));
};