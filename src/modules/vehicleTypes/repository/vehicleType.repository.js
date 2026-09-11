const db = require("../../../config/db");

const getVehicleTypes=async(minCapacity, maxCapacity)=>{
    const [result] = await db.execute("SELECT * FROM vehicle_types WHERE min_capacity >= ? AND max_capacity <= ?", [weight, weight]);
    return result;
}

module.exports={
    getVehicleTypes
}