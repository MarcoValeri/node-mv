const db = require('../util/database');

module.exports = class Article {

    constructor(id, title, description, url, published, updated, content, imageUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.url = url;
        this.published = published;
        this.updated = updated;
        this.content = content;
        this.imageUrl = imageUrl;
    }

    save() {
        return db.execute(
            'INSERT INTO articles (title, description, url, published, updated, content, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [this.title, this.description, this.url, this.published, this.updated, this.content, this.imageUrl]
            );
    }

    edit() {
        return db.execute(
            'UPDATE articles SET title = ?, description = ?, url = ?, published = ?, updated = ?, content = ?, imageUrl = ? WHERE id = ?',
            [this.title, this.description, this.url, this.published, this.updated, this.content, this.imageUrl, this.id]
        );
    }

    delete() {
        return db.execute(
            'DELETE FROM articles WHERE id = ?',
            [this.id]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM articles');
    }

    static findByUrl(url) {
        return db.execute(`SELECT * FROM articles WHERE url = ?`, [url]);
    }

}
