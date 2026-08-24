const db = require('../../../config/db.js');
const { otp_expiry } = require('../utils/otp.util.js');
const { hashed_password } = require('../utils/password.util.js');

const checkEmailExist = async(email)=>{
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows.length > 0;
}

const createOTPVerification = async(userData)=>{
    console.log("OTP Verification Data Repository layer:", userData);
    const [result] = await db.execute("INSERT INTO otp_verification (name, email, phone, hashed_password, otp, otp_expiry) VALUES(?, ?, ?, ?, ?, ?)",
        [userData.name,
        userData.email,
        userData.phone,
        userData.hashed_password,
        userData.otp,
        userData.otp_expiry
        ])
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

const deleteOTPVerification = async(connection ,email)=>{
    const [result] = await connection.execute(
        "DELETE FROM otp_verification WHERE email = ?", 
        [email])
    return result;
}

const loginVerificationPassword=async(email, hashed_password)=>{
    const [result] = await db.execute("SELECT * from users WHERE hashed_password = ?", [email, hashed_password]);
    return result;
}
module.exports={
    checkEmailExist,
    createOTPVerification,
    findOTPVerificationByEmail,
    createUser,
    deleteOTPVerification,
    updateOTPVerification,
    loginVerificationPassword
}