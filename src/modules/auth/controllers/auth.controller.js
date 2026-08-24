const authService = require("../services/auth.service");
const signup = async (req,res)=>{
    try{
        await authService.signup(req.body);
        res.status(200).json({
            success:true,
            message: "OTP Sent to your email, please verify your account"
        })
    }
    catch(error){
        console.log("Server Error", error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
const verifyOTP = async (req, res) => {
    try {
        console.log("Verify OTP Request Body:", req.body);

        await authService.verifyOTP(req.body);

        res.status(200).json({
            success: true,
            message: "OTP Verified Successfully"
        });
    } 
    catch (error) {
        console.error("VERIFY OTP ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const resendOTP=async(req,res)=>{
    // console.log("req",req);
    try{
        await authService.resendOTP(req.body);
        res.status(200).json({
            success:true,
            message: "OTP Resent Successfully"
        })
    }
    catch(error){
        res.status(500).json({
            success : false,
            message:"Internal Server Error"
        })
    }
}

const login=async(req,res)=>{
    try{
        await authService.login(req.body);
        res.status(200).json({
            success:true,
            message:"Login Successfully"
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
module.exports = {
    signup,
    verifyOTP,
    resendOTP,
    login
};