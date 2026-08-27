const db = require("../../../config/db");

const getVehicleTypes=async(minCapacity, maxCapacity)=>{
    const [result] = await db.execute("SELECT * FROM vehicle_types WHERE ")
}

module.exports={
    getVehicleTypes
}