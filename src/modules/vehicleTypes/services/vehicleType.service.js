const vehicleTypeController = require("../repository/vehicleType.repository");
const getVehicleTypeService = async(productWeight)=>{
    if(!weight){
        throw new error("No weight Found");
    }
    if(weight <0){
        throw new error("weight cannot be less than 0");
    }
    const vehicleType = await vehicleTypeController.getVehicleTypes(weight);
    return vehicleType;
}

module.exports={
    getVehicleTypeService
}