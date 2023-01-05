const db = require('../util/database');
const path = require('path');
const pathImageFolder = path.join(__dirname, '../', '/public/images/');

module.exports = class Image {

    constructor(image) {
        this.image = image;
    }


    // Create a method that upload image into the images folder
    upload() {
        const { image } = this.image;
        return image.mv(pathImageFolder + image.name);
    }

}
