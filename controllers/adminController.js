const bcrypt = require('bcrypt');

// Models
const Article = require('../models/Article');
const Image = require('../models/Image');
const Newsletter = require('../models/Newsletter');
const User = require('../models/User');

exports.adminLogin = (req, res, next) => {
    res.render('./admin/login', {
        pageTitle: 'Login Page'
    })
}

exports.adminLoginAuthentication = (req, res, next) => {
    // Get data by the form
    let loginAccess = false;
    const adminLoginEmail = req.body.emailLogin;
    const adminLoginPassword = req.body.passwordLogin;

    // Check if the user exist
    User.fetchAll()
        .then(([rows, fields]) => {
            rows.forEach(user => {
                if (user.email === adminLoginEmail && user.password === adminLoginPassword) {
                    req.session.adminUser = true;
                    loginAccess = true;
                }
            })
        })
        .then(() => {
            if (loginAccess && req.session.adminUser) {
                res.redirect('/admin/dashboard');
            } else {
                res.redirect('/');
            }
        })
        .catch(err => console.log(err));
}

exports.adminDashboard = (req, res, next) => {
    if (req.session.adminUser) {
        res.render('./admin/dashboard', {
            pageTitle: 'Admin Dashboard'
        })
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminArticles = (req, res, next) => {
    if (req.session.adminUser) {
        Article.fetchAll()
            .then(([rows, fields]) => {
                res.render('./admin/articles', {
                    pageTitle: 'Admin Articles',
                    allArticles: rows
                })
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminNewArticle = (req, res, next) => {
    if (req.session.adminUser) {
        res.render('./admin/add-new-article', {
            pageTitle: 'Admin Add New Article'
        })
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminAddNewArticle = (req, res, next) => {
    if (req.session.adminUser) {
        // Get data by the form
        const newArticleTitle = req.body.title;
        const newArticleDescription = req.body.description;
        const newArticleUrl = req.body.url;
        const newArticlePublished = req.body.published;
        const newArticleUpdated = req.body.updated;
        const newArticleContent = req.body.content;
        const newArticleImage = req.body.imageUrl;

        // Save data into db
        const newArticle = new Article(null, newArticleTitle, newArticleDescription, newArticleUrl, newArticlePublished, newArticleUpdated, newArticleContent, newArticleImage);
        newArticle.save()
            .then(() => {
                res.redirect('/admin/dashboard');
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminShowEditArticle = (req, res, next) => {
    if (req.session.adminUser) {
        // Save url into a variable
        const url = req.params.url;

        Article.findByUrl(url)
            .then(([rows, fields]) => {
                let flag = false;
                for (let index = 0; index < rows.length; index++) {
                    if (rows[index].url === url) {
                        flag = true;
                        res.render('./admin/edit-article', {
                            pageTitle: `Admin Edit Article: ${url}`,
                            articleId: rows[index].id,
                            articleTitle: rows[index].title,
                            articleDescription: rows[index].description,
                            articlePublished: rows[index].published,
                            articleUpdated: rows[index].updated,
                            articleUrl: url,
                            articleContent: rows[index].content,
                            articleImgeUrl: rows[index].imageUrl
                        })
                    }
                }

                if (!flag) {
                    res.redirect('/error404');
                }
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }

}

exports.adminEditArticle = (req, res, next) => {
    if (req.session.adminUser) {
        // Get data by the form
        const newArticleId = req.body.id;
        const newArticleTitle = req.body.title;
        const newArticleDescription = req.body.description;
        const newArticleUrl = req.body.url;
        const newArticlePublished = req.body.published;
        const newArticleUpdated = req.body.updated;
        const newArticleContent = req.body.content;
        const newArticleImage = req.body.imageUrl;

        // Save data into db
        const editArticle = new Article(newArticleId, newArticleTitle, newArticleDescription, newArticleUrl, newArticlePublished, newArticleUpdated, newArticleContent, newArticleImage);
        editArticle.edit()
            .then(() => {
                res.redirect('/admin/articles');
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminShowDeleteArticle = (req, res, next) => {
    if (req.session.adminUser) {
        // Save url into a variable
        const url = req.params.url;

        Article.findByUrl(url)
            .then(([rows, fields]) => {
                let flag = false;
                for (let index = 0; index < rows.length; index++) {
                    if (rows[index].url === url) {
                        flag = true;
                        res.render('./admin/delete-article', {
                            pageTitle: `Admin Delete Article: ${url}`,
                            articleId: rows[index].id,
                            articleTitle: rows[index].title,
                            articleDescription: rows[index].description,
                            articleUrl: url,
                            articleContent: rows[index].content,
                            articleImgeUrl: rows[index].imageUrl
                        })
                    }
                }

                if (!flag) {
                    res.redirect('/error404');
                }
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminDeleteArticle = (req, res, next) => {
    if (req.session.adminUser) {
        // Get data by the form
        const deleteArticleId = req.body.id;
        const deleteArticleTitle = req.body.title;
        const deleteArticleDescription = req.body.description;
        const deleteArticleUrl = req.body.url;
        const deleteArticleContent = req.body.content;
        const deleteArticleImage = req.body.imageUrl;

        // Delete data from db
        const deleteArticle = new Article(deleteArticleId, deleteArticleTitle, deleteArticleDescription, deleteArticleUrl, deleteArticleContent, deleteArticleImage);
        deleteArticle.delete()
            .then(() => {
                res.redirect('/admin/articles');
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminImages = (req, res, next) => {
    if (req.session.adminUser) {
        const URL = `${req.protocol}://${req.hostname}:${process.env.SERVER_PORT}`;

        Image.fetchAll()
            .then(([rows, fields]) => {
                res.render('./admin/images', {
                    pageTitle: 'Admin Images',
                    allImages: rows,
                    url: URL
                })
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }

}

exports.adminAddNewImage = (req, res, next) => {
    if (req.session.adminUser) {
        res.render('./admin/add-new-image', {
            pageTitle: 'Admin Add New Image'
        })
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminUploadNewImage = (req, res, next) => {
    if (req.session.adminUser) {
        const imageTitle = req.body.title;
        const imageCaption = req.body.caption;
        const imageDescription = req.body.description;


        /**
         * Save a new image.
         *
         * ID and URL are set to NULL because
         * they are added into the Model
         */
        const newImage = new Image(null, imageTitle, imageCaption, imageDescription, null, req.files);
        newImage.upload();
        newImage.save()
            .then(() => {
                res.redirect('/admin/images');
            })
            .catch(err => console.log(err));

        res.redirect('/admin/images');
    } else {
        res.redirect('/admin/login');
    }

}

exports.adminShowEditImage = (req, res, next) => {
    if (req.session.adminUser) {
        // Save url into a variable
        const url = req.params.url;

        Image.findByUrl(url)
            .then(([rows, fields]) => {
                let flag = false;
                for (index = 0; index < rows.length; index++) {
                    if (rows[index].url === url) {
                        flag = true;
                        res.render('./admin/edit-image', {
                            pageTitle: `Admin Edit Image: ${url}`,
                            imageId: rows[index].id,
                            imageTitle: rows[index].title,
                            imageCaption: rows[index].caption,
                            imageDescription: rows[index].description,
                            imageUrl: rows[index].url
                        })
                    }
                }

                if (!flag) {
                    res.redirect('/error404');
                }
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminEditImage = (req, res, next) => {
    if (req.session.adminUser) {
        // Get data by the form
        const newImageId = req.body.id;
        const newImageTitle = req.body.title;
        const newImageCaption = req.body.caption;
        const newImageDescription = req.body.description;

        // Save data into db
        const editImage = new Image(newImageId, newImageTitle, newImageCaption, newImageDescription, null, null);
        editImage.edit()
            .then(() => {
                res.redirect('/admin/images');
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminShowDeleteImage = (req, res, next) => {
    if (req.session.adminUser) {
        // Save url into a variable
        const url = req.params.url;

        Image.findByUrl(url)
            .then(([rows, fields]) => {
                let flag = false;
                for (index = 0; index < rows.length; index++) {
                    if (rows[index].url === url) {
                        flag = true;
                        res.render('./admin/delete-image', {
                            pageTitle: `Admin Delete Image: ${url}`,
                            imageId: rows[index].id,
                            imageTitle: rows[index].title,
                            imageCaption: rows[index].caption,
                            imageDescription: rows[index].description,
                            imageUrl: rows[index].url
                        })
                    }
                }

                if (!flag) {
                    res.redirect('/error404');
                }
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminDeleteImage = (req, res, next) => {
    if (req.session.adminUser) {
        // Get data by the form
        const deleteImageId = req.body.id;
        const deleteImageTitle = req.body.title;
        const deleteImageCaption = req.body.caption;
        const deleteImageDescription = req.body.description;
        const deleteImageUrl = req.body.imageUrl;

        const deleteImage = new Image(deleteImageId, deleteImageTitle, deleteImageCaption, deleteImageDescription, deleteImageUrl, null);
        deleteImage.removeImage(deleteImageUrl);
        deleteImage.deleteImageData()
            .then(() => {
                res.redirect('/admin/images');
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminUsers = (req, res, next) => {
    if (req.session.adminUser) {
        User.fetchAll()
            .then(([rows, fields]) => {
                res.render('./admin/users', {
                    pageTitle: 'Admin Users',
                    allUsers: rows
                })
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminNewUser = (req, res, next) => {
    if (req.session.adminUser) {
        res.render('./admin/add-new-user', {
            pageTitle: 'Admin Add New User'
        })
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminAddNewUser = (req, res, next) => {
    if (req.session.adminUser) {

        // Get data by the form
        const newUserEmail = req.body.userEmail;
        const newUserPassword = req.body.userPassword;

        // Encrypt the pw
        const saltRounds = 10;
        bcrypt
            .genSalt(saltRounds)
            .then(salt => {
                return bcrypt.hash(newUserPassword, salt);
            })
            .then(hash => {
                // Save data into db
                const newUser = new User(null, newUserEmail, hash);
                newUser.save()
                    .then(() => {
                        res.redirect('/admin/dashboard');
                    })
                    .catch(err => console.log(err));
                    })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminShowEditUser = (req, res, next) => {
    if (req.session.adminUser) {
        /**
         * Save id into a variable as string.
         * Transform it into a int
         */
        const idString = req.params.id;
        const id = parseInt(idString);

        User.findById(id)
            .then(([rows, fields]) => {
                let flag = false;
                for (let index = 0; index < rows.length; index++) {
                    if (rows[index].id === id) {
                        flag = true;
                        res.render('./admin/edit-user', {
                            pageTitle: `Admin Edit User: ${id}`,
                            userId: rows[index].id,
                            userEmail: rows[index].email,
                            userPassword: rows[index].password
                        })
                    }
                }

                if (!flag) {
                    res.redirect('/error404');
                }
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminEditUser = (req, res, next) => {
    if (req.session.adminUser) {
        // Get data by the form
        const newUserId = req.body.userId;
        const newUserEamil = req.body.userEmail;
        const newUserPassword = req.body.userPassword;

        // Encrypt the pw
        const saltRounds = 10;
        bcrypt
            .genSalt(saltRounds)
            .then(salt => {
                return bcrypt.hash(newUserPassword, salt);
            })
            .then(hash => {
                // Save data into db
                const editUser = new User(newUserId, newUserEamil, hash);
                editUser.edit()
                    .then(() => {
                        res.redirect('/admin/users');
                    })
                    .catch(err => console.log(err));
                
            })

    } else {
        res.redirect('/admin/login');
    }
}

exports.adminShowDeleteUser = (req, res, next) => {
    if (req.session.adminUser) {
        /**
         * Save id into a variable as string.
         * Transform it into a int
         */
        const idString = req.params.id;
        const id = parseInt(idString);

        User.findById(id)
            .then(([rows, fields]) => {
                let flag = false;
                for (let index = 0; index < rows.length; index++) {
                    if (rows[index].id === id) {
                        flag = true;
                        res.render('./admin/delete-user', {
                            pageTitle: `Admin Delete User: ${id}`,
                            userId: rows[index].id,
                            userEmail: rows[index].email,
                            userPassword: rows[index].password
                        })
                    }
                }

                if (!flag) {
                    res.redirect('/error404');
                }
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminDeleteUser = (req, res, next) => {
    if (req.session.adminUser) {
        // Get data by the form
        const deleteUserId = req.body.userId;
        const deleteUserEmail = req.body.userEmail;
        const deleteUserPassword = req.body.userPassword;

        // Delete data from db
        const deleteUser = new User(deleteUserId, deleteUserEmail, deleteUserPassword);
        deleteUser.delete()
            .then(() => {
                res.redirect('/admin/users');
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminNewsletterList = (req, res, next) => {
    if (req.session.adminUser) {
        Newsletter.fetchAll()
            .then(([rows, fields]) => {
                res.render('./admin/newsletter-list', {
                    pageTitle: 'Admin Newsletter List',
                    newsletterList: rows
                })
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminNewUserNewsletterList = (req, res, next) => {
    if (req.session.adminUser) {
        res.render('./admin/add-newsletter-list', {
            pageTitle: 'Admin Add Newsletter List'
        })
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminAddNewUserNesletterList = (req, res, next) => {
    if (req.session.adminUser) {
        // Get data by the form
        const newNewsletterName = req.body.name;
        const newNewsletterEmail = req.body.email;
        const newNewsletterSubscribed = req.body.subscribed;

        const newNewsletterUser = new Newsletter(null, newNewsletterName, newNewsletterEmail, newNewsletterSubscribed);
        newNewsletterUser.save()
            .then(() => {
                res.redirect('/admin/newsletter-list');
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminShowEditNewsletterUser = (req, res, next) => {
    if (req.session.adminUser) {
        /**
         * Save id into a variable as string.
         * Transform it into a int
         */
        const idString = req.params.id;
        const id = parseInt(idString);

        Newsletter.findById(id)
            .then(([rows, fields]) => {
                let flag = false;
                for (let index = 0; index < rows.length; index++) {
                    if (rows[index].id === id) {
                        flag = true;
                        res.render('./admin/edit-newsletter-user', {
                            pageTitle: `Admin Newsletter Edit User: ${id}`,
                            newsletterUserId: rows[index].id,
                            newsletterUserName: rows[index].name,
                            newsletterUserEmail: rows[index].email,
                            newsletterUserSubscribed: rows[index].subscribed
                        })
                    }
                }

                if (!flag) {
                    res.redirect('/error404');
                }
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminEditNewsletterUser = (req, res, next) => {
    if (req.session.adminUser) {
        // Get data by the form
        const newsNewsletterId = req.body.newsletterUserId;
        const newNewsletterName = req.body.name;
        const newNewsletterEmail = req.body.email;
        const newNewsletterSubscribed = req.body.subscribed;

        // Save data into db
        const edtiNewsletterUser = new Newsletter(newsNewsletterId, newNewsletterName, newNewsletterEmail, newNewsletterSubscribed);
        edtiNewsletterUser.edit()
            .then(() => {
                res.redirect('/admin/newsletter-list');
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminShowDeleteNewsletterUser = (req, res, next) => {
    if (req.session.adminUser) {
        /**
         * Save id into a variable as string.
         * Transform it into a int
         */
        const idString = req.params.id;
        const id = parseInt(idString);

        Newsletter.findById(id)
            .then(([rows, fields]) => {
                let flag = false;
                for (let index = 0; index < rows.length; index++) {
                    if (rows[index].id === id) {
                        flag = true;
                        res.render('./admin/delete-newsletter-user', {
                            pageTitle: `Admin Delete Newsletter User: ${id}`,
                            newsletterUserId: rows[index].id,
                            newsletterUserName: rows[index].name,
                            newsletterUserEmail: rows[index].email,
                            newsletterUserSubscribed: rows[index].subscribed
                        })
                    }
                }

                if (!flag) {
                    res.redirect('/error404');
                }
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }
}

exports.adminDeleteNewsletterUser = (req, res, next) => {
    if (req.session.adminUser) {
        // Get data by the form
        const newsletterUserId = req.body.newsletterUserId;
        const newsletterUserName = req.body.newsletterUserName;
        const newsletterUserEmail = req.body.newsletterUserEmail;
        const newsletterUserSubscribed = req.body.newsletterUserSubscribed;

        // Delete data from db
        const deleteNewsletterUser = new Newsletter(newsletterUserId, newsletterUserName, newsletterUserEmail, newsletterUserSubscribed);
        deleteNewsletterUser.delete()
            .then(() => {
                res.redirect('/admin/newsletter-list');
            })
            .catch(err => console.log(err));
    } else {
        res.redirect('/admin/login');
    }
}
