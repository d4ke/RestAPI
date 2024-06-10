// const usersDB = require('./store');
const usersStore = require('./sql-store');

module.exports = (req, res) => {
    let body = ''
    req.on('data', (chunk) => {
        body += chunk
    });
    req.on('end', async () => {
        try {
            const  user = JSON.parse(body);
            if (!user.name) throw new Error('Send empty name');
            let user1 = await usersStore.addUser(user);
            res.statusCode = 201;
            res.end(JSON.stringify(user1))
        } catch(err) {
            res.statusCode = 400;
            res.end(`${err.name} : ${err.message}`);
        };
    });
};
