const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


let _username = '';
let  _password = '';

module.exports.init = function(username, password){
    _username = username;
    _password = password;
}

module.exports.send = function (from, to, message) {
    console.log('exported')
    let transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com',
        port: 587,
        service: 'gmail',
        secure: false,
        auth: {
            user: _username,
            pass: _password
        }
    }));

    let mailOptions = {
        from: from,
        to: to,
        subject: 'Lab6',
        text: message
    };

    transporter.sendMail(mailOptions, function(error, info) {
        error ? console.log(`error:${error}`) : console.log('Email sent: ' + info.response);
    })
};
