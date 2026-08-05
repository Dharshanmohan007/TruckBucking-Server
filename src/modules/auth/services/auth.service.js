const authRepository = require('../repositories/auth.repository');
const signup=async(userData)=>{
    const emailExist = await authRepository.checkEmailExists(userData.email)

}
module.exports={signup}