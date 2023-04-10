module.exports = function (mongoose) {
    const otpModel = mongoose.model('otp');
    const model = {
        saveOTP : async function (data) {
            try {
                console.log("saveOTP Called",data);
                let doc = new otpModel(data);
                console.log(doc);
                return await doc.save();
            } catch (error) {
                console.log("Error while saving otp.",error);
                throw Error(error)
            }
        },
        findOTP : async function (data) {
            try {
                console.log("findOTP Called");
                return await otpModel.findOne(data);
            } catch (error) {
                console.log("Error while find otp.",error);
                throw Error(error)
            }
        },
        deleteOTP : async function (data) {
            try {
                console.log("deleteOTP Called");
                return await otpModel.deleteOne(data);
            } catch (error) {
                console.log("Error while delete otp.",error);
                throw Error(error)
            }
        },
    }

    return model;
}