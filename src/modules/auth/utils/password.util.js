const bcrypt = require('bcrypt');
const hashed_password =async(password)=>{
    const hashed_Password = await bcrypt.hash(password,10);
    return hashed_Password;
}
module.exports = {hashed_password}