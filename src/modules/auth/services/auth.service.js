const authRepository = require('../repositories/auth.repository');
const passwordUtil = require('../utils/password.util');
const otpGeneration = require('../utils/otp.util');

const signup = async (userData) => {

    const emailExist = await authRepository.checkEmailExist(userData.email);

    if (emailExist) {
        throw new Error("Email Already Exists");
    }

    const hashedPassword = await passwordUtil.hashedPassword(userData.password);

    const otp = otpGeneration.genereateOtp();

    const otpExpiry = otpGeneration.otpExpiry();

    const otpVerificationData = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        hashedPassword: hashedPassword,
        otp: otp,
        otpExpiry: otpExpiry
    };

    console.log("OTP Verification Data Service layer:", otpVerificationData);

    await authRepository.createOTPVerification(otpVerificationData);

};

const verifyOTP = async(userData)=>{
    const otpVerification = await authRepository.findOTPVerificationByEmail(userData.email);
}

module.exports = {
    signup,
    verifyOTP
};