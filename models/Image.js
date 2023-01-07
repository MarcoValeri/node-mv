const db = require('../util/database');
const fs = require('fs');
const path = require('path');
const pathImageFolder = path.join(__dirname, '../', '/public/images/');

module.exports = class Image {

    constructor(id, title, caption, description, url, image) {
        this.id = id;
        this.title = title;
        this.caption = caption;
        this.description = description;
        this.url = url;
        this.image = image;
    }

    // Create a method thta saves image data into the db
    save() {
        const { image } = this.image;

        return db.execute(
            'INSERT INTO images (title, caption, description, url) VALUES (?, ?, ?, ?)',
            [this.title, this.caption, this.description, image.name]
        );
    }

    // Create a method that upload image into the images folder
    upload() {
        const { image } = this.image;
        return image.mv(pathImageFolder + image.name);
    }

    edit() {
        return db.execute(
            'UPDATE images SET title = ?, caption = ?, description = ? WHERE id = ?',
            [this.title, this.caption, this.description, this.id]
        );
    }

    // Delete image from images folder
    removeImage(imageName) {
        fs.unlink(pathImageFolder + imageName, (err) => {
            if (err) {
                throw err;
            }
        })
    }

    deleteImageData() {
        return db.execute(
            'DELETE FROM images WHERE id = ?',
            [this.id]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM images');
    }

    static findByUrl(url) {
        return db.execute(`SELECT * FROM images WHERE url = ?`, [url]);
    }

}
