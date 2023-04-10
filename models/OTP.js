module.exports = function (mongoose) {
    const otpScema = new mongoose.Schema({
        number : {
            type : "string",
            required : true
        },
        otp : {
            type : "string",
            required : true
        },
        createdAt : {
            type : 'date',
            default : new Date()
        },
        expiryAt : {
            type : "date",
            default : new Date().setMinutes(new Date().getMinutes()+5)
        }
    },{ versionKey: false, collection: "otp" });
    return mongoose.model('otp',otpScema);
}