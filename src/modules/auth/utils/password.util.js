const bcrypt = require('bcrypt');
const hashed_password =async(password)=>{
    const hashed_Password = await bcrypt.hash(password,10);
    return hashed_Password;
}

const comparePassword = async(password, hashedPassword)=>{
    console.log("compare password", password);
    
    const comparedPassword = await bcrypt.compare(password, hashedPassword)
    return comparedPassword;
}
module.exports = {hashed_password,comparePassword}