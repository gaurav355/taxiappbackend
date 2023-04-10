const crypto = require('crypto');
module.exports = function (services) {
    try {
        const methods = {
            userRegister : async function (req,res){
            try {
                    console.log("userRegister API called...",req.body,req.params.otpVerified);
                    if (!req.body.number) {
                        return res.send({
                            status : "fail",
                            slug :"numbermissing",
                            result : null,
                            message : "Phone number is required field."
                        })
                    }
                    const {name,lastname,number,email} = req.body;
                    let userData = await services.UserServices.findUser({"phoneNum":number});
                    if (userData) {
                        return res.send({
                            status : "fail",
                            slug : "userexists",
                            result : null,
                            message : "Phone number already registered."
                        })
                    }
                    //genreate token.
                    let token = crypto.randomBytes(48);
                    token = token.toString('hex');
                    console.log("token generated",token);
                    const doc = {
                        name : name,
                        lastname: lastname ? lastname : '',
                        phoneNum : number,
                        email : email ? email : '',
                        token : token
                    }

                    let newUser = await services.UserServices.create(doc);
                    if (newUser) {
                        //check if user number is verified
                        if (req.params.otpVerified) {
                            req.session.data = {},
                            req.session.data['token'] = token;
                        }
                        return res.send({
                            status : "success",
                            slug : "registersuccess",
                            result : {
                                name : newUser.name,
                                number : newUser.phoneNum,
                                email : newUser.email,
                                token : token
                            },
                            otpVerified : req.params.otpVerified ? true : false,
                            message : "User Registration Successfull."
                        })
                    }
                } catch (error) {
                    console.log("Error in register user.",error);
                    return res.send({
                        status : "fail",
                        slug : "servererror",
                        message : "Internal Server Error."
                    })
                }
            },

            googleLogin : async function (req,res){
                try {
                    console.log("googleLogin API called.",req.body);
                    const email = req.body.email;
                    const userData = await services.UserServices.findUser({"email":email});
                    if (!userData) {
                        return res.send({
                            status : "fail",
                            slug : "usernotexists",
                            result : null,
                            otpVerified : false,
                            message :"Email is not registered."
                        })
                    }
                    //genreate token.
                    let token = crypto.randomBytes(48);
                    token = token.toString('hex');
                    console.log("token generated",token);
                    await services.UserServices.updateUser({"_id":userData._id},{
                        "$set" : {
                            "token" : token
                        }
                    });
                    req.session.data = {};
                    req.session.data['token'] = token;
                    return res.send({
                        status :"success",
                        slug : "googleloginsuccess",
                        result :{
                            name : userData.name,
                            number : userData.phoneNum,
                            email : userData.email,
                            token : token
                        },
                        otpVerified : true
                    })
                } catch (error) {
                   console.log("Error in Google Login",error); 
                   return res.send({
                        status : "fail",
                        slug : "servererror",
                        message : "Internal Server Error."
                    })
                }
            },
    
            sendOTP : async function (req,res) {
                try {
                    console.log("Send Otp called",req.body);
                    const num = Math.floor(Math.random()*1000) + 1;
                    let number = req.body.number;
                    const document = {
                        number : number,
                        otp : num
                    }
                    await services.OTPServices.saveOTP(document);
                    return res.send({
                        status:"success",
                        slug : "otpsent",
                        message:"otp sent to given number."
                    });
                } catch (error) {
                    console.log("error while sending sms",error);
                    return res.send({
                        status : "fail",
                        slug : "servererror",
                        message : "Internal Server Error."
                    })
                }
            },
            
            verifyOTP : async function (req,res){
             try {
                    console.log("verifyOTP API called",req.body);
                    const {number,otp} = req.body;
                    let OTPDoc = await services.OTPServices.findOTP({number : number});
                    if (OTPDoc) {
                        let currentTime = new Date();
                        let expiryTime = OTPDoc.expiryAt;
                        await services.OTPServices.deleteOTP({_id: OTPDoc._id});
                        if (expiryTime < currentTime) {
                            return res.send({
                                status : "fail",
                                slug :"otpexpired",
                                result : null,
                                otpVerified : false,
                                message : "Otp Expired, Please try Again."
                            })
                        }
                        let userData = await services.UserServices.findUser({phoneNum : number});
                        if (!userData) {
                            return res.send({
                                status : "success",
                                slug : "usernotexist",
                                result : null,
                                otpVerified : true,
                                message : "User is not registered."
                            })
                        }

                        //genreate token.
                        let token = crypto.randomBytes(48);
                        token = token.toString('hex');
                        console.log("token generated",token);
                        await services.UserServices.updateUser({_id : userData._id},{
                            "$set" : {
                                "token":token
                            }
                        });
                        req.session.data = {};
                        req.session.data['token'] = token;
                        return res.send({
                            status : "success",
                            slug : "loginsuccess",
                            result :{
                                name : userData.name,
                                token : token,
                                number : userData.phoneNum
                            },
                            otpVerified : true,
                            message : "User Login Succesfully."
                        })
                    }else{
                        return res.send({
                            status : "fail",
                            slug :"wrongotp",
                            result : null,
                            otpVerified : false,
                            message : "Wrong OTP, Please try again with correct OTP."
                        })
                    }
                } catch (error) {
                    console.log("Error in vrifyOTP",error);
                    return res.send({
                        status : "fail",
                        slug : "servererror",
                        message : "Internal Server Error."
                    })
                }
            },
        }
    
        return methods;
    } catch (error) {
        console.log("Error in User Controller File.",error);
    }
}