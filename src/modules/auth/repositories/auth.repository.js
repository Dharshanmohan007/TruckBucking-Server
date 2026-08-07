const db = require('../../../config/db.js')

const checkEmailExist = async(email)=>{
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows.length > 0;
}
moduke.Exports={
    checkEmailExist
}