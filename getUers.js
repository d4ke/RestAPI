// const users = require('./index')

module.exports = (req, res) => {    
    res.statusCode = 200;
    res.end(JSON.stringify(users))
}