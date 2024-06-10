// const usersDB = require('./store');
const usersStore = require('./sql-store');

module.exports = async (req, res) => {
    const userId = parseInt(req.url.split('/')[2]);
        let user = await usersStore.getUser(userId);
        if (user) {
            res.end(JSON.stringify(user));
        } else {
            res.end('User id not found');
        }
};