const db = require('../util/database');

module.exports = class User {

    constructor(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    save() {
        return db.execute(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [this.email, this.password]
        );
    }

    edit() {
        return db.execute(
            'UPDATE users SET email = ?, password = ? WHERE id = ?',
            [this.email, this.password, this.id]
        );
    }

    delete() {
        return db.execute(
            'DELETE FROM users WHERE id = ?',
            [this.id]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM users');
    }

    static findById(id) {
        return db.execute(`SELECT * FROM users WHERE id = ?`, [id]);
    }

}
