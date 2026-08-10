const db = require('../../../config/db.js')

const checkEmailExist = async(email)=>{
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows.length > 0;
}

const createOTPVerification = async(userData)=>{
    const [result] = await db.execute("INSERT INTO otp_verification (name, email, phone, hashed_password, otp, otp_expiry) VALUES(?, ?, ?, ?, ?, ?)",
        [userData.name,
        userData.email,
        userData.phone,
        userData.hashed_password,
        userData.otp,
        userData.otp_expiry
        ])
}
module.exports={
    checkEmailExist,
    createOTPVerification
}