const db = require('../../../config/db.js')

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

const createUser = async(userData)=>{
    const [result] = await db.execute(
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

const deleteOTPVerification = async(email)=>{
    const [result] = await db.execute(
        "DELETE FROM otp_verification WHERE email = ?", 
        [email])
    return result;
}
module.exports={
    checkEmailExist,
    createOTPVerification,
    findOTPVerificationByEmail,
    createUser,
    deleteOTPVerification
}