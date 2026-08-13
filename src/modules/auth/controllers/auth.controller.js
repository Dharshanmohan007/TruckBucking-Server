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
module.exports = {
    signup
};