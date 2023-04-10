const mongoose = require('mongoose');
const services = {
    UserServices : require('./UserServices')(mongoose),
    OTPServices : require('./OTPServices')(mongoose)
}

module.exports = services;