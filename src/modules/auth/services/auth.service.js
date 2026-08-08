const authRepository = require('../repositories/auth.repository');
const passwordUtil = require('../utils/password.util');
const otpgeneration = require('../utils/otp.util');
const signup=async(userData)=>{
    const emailExist = await authRepository.checkEmailExists(userData.email)
    if(emailExist){
        throw new Error("Email Already Exists");
    }
    const hashedPassword = await passwordUtil.hashPassword(userData.password);
    const otp = otpgeneration.genereateOtp();
    const otpExpiry = otpgeneration.otpExpiry();
}
module.exports={signup}