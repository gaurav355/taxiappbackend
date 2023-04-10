const express = require('express');
const router = express.Router();
const {UserController} = require('../api/controllers/index');
const {AuthMiddleware} = require('../api/middlewares/index');
console.log("Loading Router...");
router.get('/',AuthMiddleware.verifyLogin,(req,res)=>{return res.send("hello")});
router.post('/register/:otpVerified',UserController.userRegister);
router.post('/sendOTP/',UserController.sendOTP);
router.post('/verifyOTP',UserController.verifyOTP);
router.post('/googleLogin',UserController.googleLogin);




module.exports = router;