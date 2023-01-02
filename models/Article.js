const db = require('../util/database');

module.exports = class Article {

    constructor(id, title, description, url, content, imageUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.url = url;
        this.content = content;
        this.imageUrl = imageUrl;
    }

    save() {
        return db.execute(
            'INSERT INTO articles (title, description, url, content, imageUrl) VALUES (?, ?, ?, ?, ?)',
            [this.title, this.description, this.url, this.content, this.imageUrl]
            );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM articles');
    }

    static findByUrl(url) {
        return db.execute(`SELECT * FROM articles WHERE url = ?`, [url]);
    }

}