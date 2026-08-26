const authRepository = require('../repositories/auth.repository');
const passwordUtil = require('../utils/password.util');
const otpGeneration = require('../utils/otp.util');
const db = require('../../../config/db');
const jwtUtil = require('../utils/jwt.util');

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
        otp_expiry: otp_expiry,
        role: userData.role,
        experience: userData.experience,
        license_number : userData.license_number,
        vehicle_number : userData.vehicle_number,
        ton_capacity : userData.ton_capacity,
        rc_number : userData.rc_number,
        vehicle_status : userData.vehicle_status,
        vehicle_name : userData.vehicle_name,
        min_capacity : userData.min_capacity,
        max_capacity : userData.max_capacity
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
        role: otpVerificationData.role,
    };
    const connection = await db.getConnection();
    try{
        await connection.beginTransaction();
        const userResult = await authRepository.createUser(connection, newUser);

        const accountId = userResult.insertId;

        // 2. If role is DRIVER, insert driver details
        if (otpVerificationData.role === "DRIVER") {

            // -------------------------------------------------
            // Create Driver
            // -------------------------------------------------
            const driverResult =
                await authRepository.createDriver(
                    connection,
                    {
                        account_Id: accountId,
                        experience: otpVerificationData.experience,
                        license_number: otpVerificationData.license_number
                    }
                );

            const driverId = driverResult.insertId;

            console.log("Created Driver ID:", driverId);


            // -------------------------------------------------
            // Create Vehicle Type
            // -------------------------------------------------
            const vehicleTypeResult =
                await authRepository.createVehicleType(
                    connection,
                    {
                        vehicle_name: otpVerificationData.vehicle_name,
                        min_capacity: otpVerificationData.min_capacity,
                        max_capacity: otpVerificationData.max_capacity
                    }
                );

            const vehicle_Type_Id = vehicleTypeResult.insertId;

            console.log("Created Vehicle Type ID:", vehicle_Type_Id );


            // -------------------------------------------------
            // Create Vehicle
            // -------------------------------------------------
            const vehicleResult =
                await authRepository.createVehicle(
                    connection,
                    {
                        driverId: driverId,
                        vehicleTypeId: vehicle_Type_Id,
                        vehicle_number: otpVerificationData.vehicle_number,
                        ton_capacity: otpVerificationData.ton_capacity,
                        rc_number: otpVerificationData.rc_number
                    }
                );

            console.log(
                "Created Vehicle ID:",
                vehicleResult.insertId
            );
        }

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
    console.log("login userdata", userData);
    
    const loginVerify = await authRepository.finduserByEmail(userData.email);
    console.log("login user email", userData.email);
    
    if(loginVerify.length === 0){
        throw new Error("Email was not found, Kindly use correct email for login");
    }
    const user = loginVerify[0];

    const loginPasswordHask = await passwordUtil.comparePassword(userData.password, user.hashed_password);
    console.log("log reached loginPasswordHask funciton");
    
    if(!loginPasswordHask){
        throw new Error("Invalide Crediemtials");
    }
    const token = jwtUtil.generateToken(user);
    return {user,token};
}

module.exports = {
    signup,
    verifyOTP,
    resendOTP,
    login
};