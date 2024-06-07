const usersDB = require('./store');

module.exports = (req, res) => {
    let body = ''
            req.on('data', (chunk) => {
                body += chunk
            });
            req.on('end', () => {
                try {
                    const user = JSON.parse(body);
                    if (!user.name) throw new Error('Send empty name');
                    usersDB.addUser(user);
                    res.statusCode = 201;
                    res.end(JSON.stringify(user))
                } catch(err) {
                    res.statusCode = 400;
                    res.end(`${err.name} : ${err.message}`);
                };
            });
};
