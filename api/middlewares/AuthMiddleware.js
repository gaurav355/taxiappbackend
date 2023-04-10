module.exports = {
    verifyLogin : function (req,res,next){
        try {
            console.log(req.session.data);
            if (req.session.data) {
                console.log("user login");
                next()
                // return res.send({
                //     status : "success",
                //     message : "user is logged in."
                // })
            }else{
                console.log("user not login");
                return res.send({
                    status : "fail",
                    message : "user is not logged in."
                })
            }
        } catch (error) {
            console.log("Error in authentication.",error);
            return res.send({
                status : "fail",
                message : "user authentication failed."
            })
        }
    },
    // auth : function (req,res,next){
    //     try {
    //         console.log(req.session.data);
    //         if (req.session.data) {
    //             console.log("user login");
    //             return res.send({
    //                 status : "success",
    //                 message : "user is logged in."
    //             })
    //         }else{
    //             console.log("user not login");
    //             return res.send({
    //                 status : "fail",
    //                 message : "user is not logged in."
    //             })
    //         }
    //     } catch (error) {
    //         console.log("Error in authentication.",error);
    //         return res.send({
    //             status : "fail",
    //             message : "user authentication failed."
    //         })
    //     }
    // }
}