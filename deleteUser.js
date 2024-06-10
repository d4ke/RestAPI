const usersDB = require('./store');
const usersStore = require('./sql-store');

module.exports = async (req, res) => {
    const userId = parseInt(req.url.split('/')[2]);
    const result = await usersStore.deleteUser(userId);
    console.log(result);
    if (result) {
        res.statusCode = 202;
        res.end('User deleted.');
    } else {
        res.statusCode = 204;
        res.end('User not found');
    }
};