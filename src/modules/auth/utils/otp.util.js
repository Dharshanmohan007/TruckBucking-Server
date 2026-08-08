const genereateOtp=()=>{
    const otp = Math.floor(Math.random()*900000) + 100000
    return otp
}

const otpExpiry=()=>{
    const expiry = new Date()
    expiry.setMinutes(expiry.getMinutes() + 5) 
    return expiry
}
module.exports={
    genereateOtp, 
    otpExpiry
}