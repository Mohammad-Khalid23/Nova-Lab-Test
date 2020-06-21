'use strict';

const ITERATIONS = 1000,
    secureKey = "bspZmdcJJ5",
    BYTES = 32,
    jwt = require('jsonwebtoken'),
    // configs = require('../../config'),
    // sendgrid = require('sendgrid')(configs.sendgrid.secret),
    // sendgridHelper = require('sendgrid').mail;
    bcrypt = require('bcrypt'),
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey('send grid api key will me here');
    moment = require('moment');
var randtoken = require('rand-token');

module.exports.generateToken = () => {
    const token1 = randtoken.generate(16),
        token2 = randtoken.generate(16),
        token3 = randtoken.generate(16);
    console.log(token1 + token2 + token3, "Token");
    return token1 + token2 + token3;
}

module.exports.generate_JWT_Token = (email) => {
    let token = jwt.sign({
        email: email
    }, 'secret', { expiresIn: '5 days' });
    return 'Bearer ' + token;
}

module.exports.validate_JWT_Token = (email) => {
    let token = jwt.sign({
        email: email
    }, 'secret', { expiresIn: '5 days' });
    return 'Bearer ' + token;
}

module.exports.validatePassword = (password) => {
    var regex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    return regex.test(password);
}

module.exports.validateName = (name) => {
    var regexp = new RegExp(/^[a-z,',-]+/i);
    return regexp.test(name)
}

module.exports.validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports.validateDoB = (date) => {
    var currentTime = moment(new Date(), 'YYYY,MM,DD');
    let dob = moment(new Date(date), 'YYYY,MM,DD');
    var a = moment(currentTime);
    var b = moment(dob);
    console.log(a.diff(b, 'years'), "DIFFERANCE")
    console.log(dob);
    let diff = a.diff(b, 'years');
    if (diff < 5) {
        console.log("You are not eligible");
        return false;
    } else {
        console.log("You are eligible");
        return true;
    }
}


module.exports.hashPassword = (password) => {
    // Generate a salt
    var salt = bcrypt.genSaltSync(16);
    // Hash the password with the salt
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}

module.exports.comparePassword = async (password, hash) => {
    let result = await bcrypt.compare(password, hash);
    return result;
}

// module.exports.sendMail = (to, from, msg, token) => {
//     console.log(token, "Token in send mail");
//     const resetPassword = {
//         to: to,
//         from: from,
//         subject: 'Reser your password',
//         link: token,
//         html: '<h2>Welcome to Learning Node</h2><div>Click Link Below to Reset your password</div><a href="www.google.com" target="_blank">Click to Reset Password</a>',
//     };
//     const verifyEmail = {
//         to: to,
//         from: from,
//         subject: 'Confirm your Email',
//         link: token,
//         html: '<h2>Welcome to Learning Node</h2><div>Click Link Below to Reset your password</div><a href="www.google.com" target="_blank">Click to Reset Password</a>',
//     };
//     if (msg === 'verify') {
//         sgMail.send(verifyEmail);
//     } else {
//         sgMail.send(resetPassword);
//     }
// }


// ===================================
// Check Require Fields
module.exports.checkRequire = (data, req_fields) => {
    var non_existField = null;

    req_fields.forEach((value) => {
        if (data[value] == '' || data[value] == null || !data[value]) {
            non_existField = value;
            return true;
        }
    });

    if (non_existField != null) {
        return {
            code: 400,
            success: false,
            message: non_existField+" Not Found",
            key: non_existField
        };
    } else {
        return false
    }

}
