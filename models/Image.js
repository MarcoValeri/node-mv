const db = require('../util/database');
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

    static fetchAll() {
        return db.execute('SELECT * FROM images');
    }

}
