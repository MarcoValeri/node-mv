const db = require('../util/database');

// Functions
const func = require('../util/functions');

module.exports = class Newsletter {

    constructor(id, name, email, subscribed) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.subscribed = subscribed;
    }

    save() {
        return db.execute(
            'INSERT INTO newsletter (name, email, subscribed) VALUES (?, ?, ?)',
            [this.name, this.email, new Date()]
        );
    }

    edit() {
        return db.execute(
            'UPDATE newsletter SET name = ?, email = ?, subscribed = ? WHERE id = ?',
            [this.name, this.email, this.subscribed, this.id]
        );
    }

    delete() {
        return db.execute(
            'DELETE FROM newsletter WHERE id = ?',
            [this.id]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM newsletter');
    }

    static findById(id) {
        return db.execute('SELECT * FROM newsletter WHERE id = ?', [id]);
    }

}
