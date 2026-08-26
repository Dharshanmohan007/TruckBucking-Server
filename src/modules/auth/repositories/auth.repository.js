const db = require('../../../config/db.js');
const { otp_expiry } = require('../utils/otp.util.js');
const { hashed_password } = require('../utils/password.util.js');

const checkEmailExist = async(email)=>{
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows.length > 0;
}

const createOTPVerification = async(userData)=>{
    console.log("OTP Verification Data Repository layer:", userData);
    const [result] = await db.execute("INSERT INTO otp_verification (name, email, phone, hashed_password, otp, otp_expiry, role, experience, license_number, vehicle_number, ton_capacity, rc_number, vehicle_status, vehicle_name, min_capacity, max_capacity) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",

        [userData.name,
        userData.email,
        userData.phone,
        userData.hashed_password,
        userData.otp,
        userData.otp_expiry,
        userData.role,
        userData.experience,
        userData.license_number,
        userData.vehicle_number,
        userData.ton_capacity,
        userData.rc_number,
        userData.vehicle_status,
        userData.vehicle_name,
        userData.min_capacity,  
        userData.max_capacity
        ])
        return result;
}

const findOTPVerificationByEmail = async(email)=>{
    const [rows] = await db.execute("SELECT * FROM otp_verification WHERE email = ?", [email])
    return rows;
}

const updateOTPVerification = async(email, otp, otp_expiry)=>{
    const[result] = await db.execute("UPDATE otp_verification SET otp = ?, otp_expiry = ? WHERE email = ?", [otp, otp_expiry, email])
    return result;
}

const createUser = async(connection, userData)=>{
    const [result] = await connection.execute(
        "INSERT INTO users (name, email, phone, hashed_password, role) VALUES(?,?,?,?,?)",
    [
        userData.name,
        userData.email,
        userData.phone,
        userData.hashed_password,
        userData.role
    ])
    return result;
}

const createDriver = async(connection, driverData)=>{
    const [result] = await connection.execute("INSERT INTO drivers (account_Id, experience, license_number) VALUES(?, ?, ?)",
        [
            driverData.account_Id,
            driverData.experience,
            driverData.license_number
        ]
    )
    return result;
}

const createVehicleType = async(connection, driverData)=>{
    const [result] = await connection.execute(
        "INSERT INTO vehicle_types (vehicle_name, min_capacity, max_capacity) VALUES(?, ?, ?)",
        [
            driverData.vehicle_name,
            driverData.min_capacity,
            driverData.max_capacity,
        ]
    )
    return result;
}

const createVehicle = async(connection, driverData)=>{
    const [result] = await connection.execute(
        "INSERT INTO vehicles (driverId, vehicle_type_id, vehicle_number, ton_capacity, rc_number) VALUES(?, ?, ?, ?, ?)",
        [
            driverData.driverId,
            driverData.Vehicle_Type_Id,
            driverData.vehicle_number,
            driverData.ton_capacity,
            driverData.rc_number,
        ]
    )
    return result;
}

const deleteOTPVerification = async(connection ,email)=>{
    const [result] = await connection.execute(
        "DELETE FROM otp_verification WHERE email = ?", 
        [email])
    return result;
}

const finduserByEmail=async(email)=>{
    console.log("found user email", email);
    
    const [result] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return result;
}
module.exports={
    checkEmailExist,
    createOTPVerification,
    findOTPVerificationByEmail,
    createUser,
    deleteOTPVerification,
    updateOTPVerification,
    finduserByEmail,
    createDriver,
    createVehicle,
    createVehicleType
}