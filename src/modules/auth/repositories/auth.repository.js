const db = require('../../../config/db.js')

const checkEmailExist = async(email)=>{
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows.length > 0;
}

const createOTPVerification = async(userData)=>{
    const [rows] = await db.execute("INSERT INTO otp_verification (name, email, phone, hashedpassword, otp, otp_expiry) VALUES(?, ?, ?, ?, ?, ?)",
        [userData.name,
        userData.email,
        userData.phone,
        userData.hashedpassword,
        userData.otp,
        userData.otp_expiry
        ])
}
module.exports={
    checkEmailExist,
    createOTPVerification
}