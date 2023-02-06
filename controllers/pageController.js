const nodemailer = require('nodemailer');

// Models
const Newsletter = require('../models/Newsletter');

exports.chiSono = (req, res, next) => {
    res.render('./pages/chi-sono', {
        pageTitle: 'Chi Sono',
        pageUrl: req.originalUrl,
        showAdminNav: req.session.adminUser
    })
}

exports.contact = (req, res, next) => {
    res.render('./pages/contact', {
        pageTitle: 'Contatti',
        pageUrl: req.originalUrl,
        showAdminNav: req.session.adminUser
    })
}

exports.sendMessage = (req, res, next) => {

    // Get and check form variables
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const privacy = req.body.privacy;
    const message = req.body.message;

    // Set and send the email
    const contactEmail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'info@marcovaleri.net',
            pass: process.env.GMAIL_PASS,
        },
    });

    contactEmail.verify((error) => {
        if (error) {
            console.log(error);
        }
    });

    let emailBody = `<p style="font-size: 16px">Name: ${name}</p>`;
    emailBody += `<p style="font-size: 16px">Surname: ${surname}</p>`;
    emailBody += `<p style="font-size: 16px">Email: ${email}</p>`;
    emailBody += `<p style="font-size: 16px">Privacy: ${privacy}</p>`;
    emailBody += `<p style="font-size: 16px">Message:</p>`;
    emailBody += `<p style="font-size: 16px">${message}</p>`;

    const mail = {
        from: `${name} ${surname}`,
        to: 'info@marcovaleri.net',
        subject: 'Marco Valeri Contact',
        html: emailBody
    }

    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json({ status: 'Error'});
        } else {
            // res.json({ status: 'Message Sent' });
            res.redirect('/contatti-conferma');
        }
    })

}

exports.contactConfirm = (req, res, next) => {
    res.render('./pages/contact-confirm', {
        pageTitle: 'Conatti Conferma',
        pageUrl: '/contatti',
        showAdminNav: req.session.adminUser
    })
}

exports.newsletter = (req, res, next) => {
    res.render('./pages/newsletter', {
        pageTitle: 'Newsletter',
        pageUrl: req.originalUrl,
        showAdminNav: req.session.adminUser
    })
}

exports.newsletterAddUser = (req, res, next) => {
    // Get data from the form
    const name = req.body.name;
    const email = req.body.name;

    // SAve data into db
    const newNewsletterUser = new Newsletter(null, name, email, null);
    newNewsletterUser.save()
        .then(() => {
            res.redirect('/newsletter-confirm');
        })
        .catch(err => console.log(err));
}

exports.newsletterConfirm = (req, res, next) => {
    res.render('./pages/newsletter-confirm', {
        pageTitle: 'Newsletter Conferma Registrazione',
        pageUrl: '/newsletter',
        showAdminNav: req.session.adminUser
    })
}

exports.privacyPolicy = (req, res, next) => {
    res.render('./pages/privacy-policy', {
        pageTitle: 'Privacy Policy',
        pageUrl: '/newsletter',
        showAdminNav: req.session.adminUser
    })
}

exports.cookiePolicy = (req, res, next) => {
    res.render('./pages/cookie-policy', {
        pageTitle: 'Cookie Policy',
        pageUrl: '/newsletter',
        showAdminNav: req.session.adminUser
    })
}