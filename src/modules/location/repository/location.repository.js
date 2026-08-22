const db = require("../../../config/db");

const getLocations=async(area, city)=>{
    const[result] = await db.execute("SELECT * FROM locations WHERE area = ? AND city = ?", [area, city]);
    return result;
}

module.exports = {
    getLocations
};