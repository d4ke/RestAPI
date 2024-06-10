// const usersDB = require('./store');
const usersStore = require('./sql-store');

module.exports = async (req, res) => {
    res.statusCode = 200;
    res.end(JSON.stringify(await usersStore.getUsers()));
};