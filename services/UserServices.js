module.exports = function (mongoose) {
    const userModel = mongoose.model('user');
    const model = {
        create : async function (data) {
            try {
                console.log("Create user Called",data);
                let doc = new userModel(data);
                return await doc.save();
            } catch (error) {
                console.log("Error while creating user.",error);
                 throw new Error(error)
            }
        },
        findUser : async function (data) {
            try {
                console.log("find user Called",data);
                return await userModel.findOne(data);
            } catch (error) {
                console.log("Error while find user.",error);
                 throw new Error(error)
            }
        },
        updateUser : async function (data,update) {
            try {
                console.log("update user Called",data);
                return await userModel.updateOne(data,update);
            } catch (error) {
                throw new Error(error)
            }
        }
    }

    return model;
}