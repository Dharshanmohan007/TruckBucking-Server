const authRepository = require('../repositories/auth.repository');
const passwordUtil = require('../utils/password.util');
const otpGeneration = require('../utils/otp.util');
const db = require('../../../config/db');

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
    console.log("userData", userData.email);
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

    const newUser={
        name : otpVerificationData.name,
        email : otpVerificationData.email,
        phone : otpVerificationData.phone,
        hashed_password : otpVerificationData.hashed_password,
        role : "CUSTOMER",
    };
    const connection = await db.getConnection();
    try{
        await connection.beginTransaction();
        await authRepository.createUser(connection, newUser);
        await authRepository.deleteOTPVerification(connection, userData.email)
        await connection.commit();
    }
    catch(error){
        await connection.rollback();
        throw error;
    }
    finally{
        connection.release();
    }
}

const resendOTP = async (userData) => {
    console.log(userData.email);
    
    const otpVerification = await authRepository.findOTPVerificationByEmail(userData.email)
    if(otpVerification.length === 0){
        throw new Error("No OTP Data was Found");
    }
    const otp = await otpGeneration.genereateOtp();
    const otp_expiry = await otpGeneration.otp_expiry();
    const result = await authRepository.updateOTPVerification(userData.email, otp, otp_expiry);
    if (result.affectedRows === 0){
        throw new Error("OTP Updat Failed");
    }
}

const login=async(userData)=>{
    const loginVerify = await authRepository.finduserByEmail(userData.email)
    if(loginVerify.length === 0){
        throw new Error("Email was not found, Kindly use correct email for login");
    }
    if(userData.password === loginVerificationPassword.hashed_password){
        throw new Error("Password Matched Successfully");
    }
}

module.exports = {
    signup,
    verifyOTP,
    resendOTP,
    login
};