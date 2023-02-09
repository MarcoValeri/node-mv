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

    static fetchAll() {
        return db.execute('SELECT * FROM newsletter');
    }

}
