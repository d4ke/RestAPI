const { resolve } = require('path');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('usersDB');

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
)`);

module.exports = {
    async getUsers() {
        try {
            const users =  await new Promise((resolve, reject) => {
                db.all('SELECT * FROM users', [], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
            return users;
        } catch (err) {
            return null;
        }    
    },
    async getUser(id) {
        const user = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            })
        });
        return user;
    },
    async addUser(newUser) {
            const lastID = await new Promise((resolve, reject) => {
                db.run('INSERT INTO users (name) VALUES (?)', [newUser.name], function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                });
            });
            return { id: lastID, ...newUser};
    },
    async updateUser(id, userName) {
        const user = await new Promise((resolve, reject) => {
            db.run('UPDATE users SET name = ? WHERE id = ?',[userName.name, id], function(err) {
                if (err) {
                    reject (err);
                } else {
                    resolve(this.user);
                }
            });
        });
        if (user === 0) {
            return null;
        }
        return this.getUser(id);
    },
    async deleteUser(id) {
        const changes = await new Promise((resolve, reject) => {
            db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                };
            });
        });
        return changes > 0;
    },
};