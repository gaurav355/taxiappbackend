module.exports = function (mongoose) {
    console.log("Loading Models....");
    const module = {
        User : require('../models/User')(mongoose),
        OTP : require('../models/OTP')(mongoose),
    };
    return module;
    
}