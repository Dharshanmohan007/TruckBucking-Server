const bcrypt = require('bcrypt');
const hash_Password =async(password)=>{
    const hashed_Password = await bcrypt.hash(password,10);
    return hashed_Password;
}
module.exports = {hashPassword}