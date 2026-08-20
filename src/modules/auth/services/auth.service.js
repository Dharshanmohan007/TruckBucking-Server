const authRepository = require('../repositories/auth.repository');
const passwordUtil = require('../utils/password.util');
const otpGeneration = require('../utils/otp.util');

const signup = async (userData) => {

    const emailExist = await authRepository.checkEmailExist(userData.email);

    if (emailExist) {
        throw new Error("Email Already Exists");
    }

    const hashed_password = await passwordUtil.hashed_password(userData.password);

    const otp = otpGeneration.genereateOtp();

    const otp_expiry = otpGeneration.otp_expiry();

    const otpVerificationData = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        hashed_password: hashed_password,
        otp: otp,
        otp_expiry: otp_expiry
    };

    console.log("OTP Verification Data Service layer:", otpVerificationData);

    await authRepository.createOTPVerification(otpVerificationData);

};

const verifyOTP = async(userData)=>{
    const otpVerification = await authRepository.findOTPVerificationByEmail(userData.email);
    if(otpVerification.length === 0){
        throw new Error("No OTP data found ");
    }
    const otpVerificationData = otpVerification[0];
    if(String(userData.otp) !== String(otpVerificationData.otp)){
        throw new Error("Invalid OTP");
    }
    const currentTime = new Date();

    if(currentTime > new Date(otpVerificationData.otp_expiry)){
        throw new Error("OPT Expiried");
    }

}

module.exports = {
    signup,
    verifyOTP
};