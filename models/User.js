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

    static fetchAll() {
        return db.execute('SELECT * FROM users');
    }

}