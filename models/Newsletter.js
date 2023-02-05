const db = require('../util/database');

// Functions
const func = require('../util/functions');

module.exports = class Newsletter {

    constructor(id, name, email, date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.date = func.setDateNow();
    }

    save() {
        return db.execute(
            'INSERT INTO newsletter (name, email, date) VALUES (?, ?, ?)',
            [this.name, this.email, this.date]
        );
    }

}