const usersDB = require('./store');
const usersStore = require('./sql-store');

module.exports = (req, res) => {
    let body = ''
    req.on('data', (chunk) => {
        body += chunk
    });
    req.on('end', async () => {
        try {
            const newNameOfUser = JSON.parse(body);
            if (!newNameOfUser.name) throw new Error('Send empty name');
            const userId = parseInt(req.url.split('/')[2]);
            const user = await usersStore.updateUser(userId, newNameOfUser);
            res.statusCode = 200;
            res.end(JSON.stringify(user))
        } catch(err) {
            res.statusCode = 400;
            res.end(`${err.name} : ${err.message}`);
        };
    });
};