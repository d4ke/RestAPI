const usersDB = require('./store');

module.exports = (req, res) => {
    const userId = parseInt(req.url.split('/')[2]);
    usersDB.deleteUser(userId);
    res.statusCode = 201;
    res.end()
};