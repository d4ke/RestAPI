const fs = require('fs');

let users = [];
let count = 1;

function updateDB() {
    if (fs.existsSync('./users.json')) {
        if (users.length == 0) {
            fs.readFile('./users.json', 'utf8' ,(err, data)=>{
                if (err) { }
                (!data) ? null : users = JSON.parse(data);
                users.map((value, index, array) => {
                    if (count < value.id) count = value.id
                });
                ++count;
            });
        } else {
            fs.writeFile('./users.json', JSON.stringify(users,null,2), ()=>{});
        };
    } else {
        fs.writeFile('./users.json', JSON.stringify(users), ()=>{});
    }
};
updateDB();

module.exports = {
    getUsers: () => users,
    getUser: (id) => users.find(value => value.id === id),
    addUser: (newUser) => {
        newUser.id = count++;
        users.push(newUser);
        updateDB();
    },
    updateUser: (id, userName) => {
        const user = users.find(value => value.id === id);
        user.name = userName.name;
        updateDB();
        return user
    },
    deleteUser: (id) => {
        const userIndex = users.findIndex(value => value.id === id);
            if (userIndex > -1) {
                users.splice(userIndex, 1);
            };
        updateDB();
    },
}
