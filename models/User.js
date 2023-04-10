// const mongoose = require('mongoose')
module.exports = function (mongoose) {
    const userScema = new mongoose.Schema({
        name : {
            type : "string",
            required : true
        },
        lastname : {
            type : "string",
            default : null
        },
        email : {
            type : "string",
            default : null
        },
        phoneNum : {
            type : "string",
            required : true
        },
        token : {
            type : "string",
            default : null
        },
        createdAt : {
            type : 'date',
            default : new Date()
        }
    },{ versionKey: false, collection: "user" });
    return mongoose.model('user',userScema);
}