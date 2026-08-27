const vehicleTypeService = require("../services/vehicleType.service");
const vehicleController=async(req,res)=>{
    try{
        const result = await vehicleTypeService.getVehicleTypeService(req,body);
        res.status(200).json({
            success:true,
            message:"vehileType fetched Successfully",
            data: result
        })
    }
    catch(error){
        console.log("error",error);
        res.status(500).json({
            success:true,
            message:"internal server Error"
        })
    }
}
module.exports={
    vehicleController
}