const usersDB = require('./store');

module.exports = (req, res) => {
    const userId = parseInt(req.url.split('/')[2]);
        let user = usersDB.getUser(userId);
        if (user) {
            res.end(JSON.stringify(user));
        } else {
            res.end('User id not found');
        }
};