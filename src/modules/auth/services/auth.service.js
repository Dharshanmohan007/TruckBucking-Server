const authRepository = require('../repositories/auth.repository');
const passwordUtil = require('../utils/password.util');
const otpgeneration = require('../utils/otp.util');
const signup=async(userData)=>{
    const emailExist = await authRepository.checkEmailExist(userData.email)
    if(emailExist){
        throw new Error("Email Already Exists");
    }
    const hashed_Password = await passwordUtil.hash_Password(userData.password);
    const otp = otpgeneration.genereateOtp();
    const otpExpiry = otpgeneration.otpExpiry();
    const otpverificationData={
        name:userData.name,
        email:userData.email,
        phone:userData.phone,
        hashed_password:hashed_password,
        otp:otp,
        otpExpiry:otpExpiry
    }
    await authRepository.createOTPVerification(otpverificationData);
}
module.exports={signup}