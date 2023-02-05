const nodemailer = require('nodemailer');

exports.chiSono = (req, res, next) => {
    res.render('./pages/chi-sono', {
        pageTitle: 'Chi Sono',
        pageUrl: req.originalUrl
    })
}

exports.contact = (req, res, next) => {
    res.render('./pages/contact', {
        pageTitle: 'Contatti',
        pageUrl: req.originalUrl
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
        pageUrl: '/contatti'
    })
}