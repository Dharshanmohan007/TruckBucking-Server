const locationService = require("../services/location.service")
const locations = async(req, res)=>{
    try{
        const result = await locationService.getLocationService(req.query);
        res.status(200).json({
            success:true,
            message:"Locations fetched Successfully",
            data: result
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
}

module.exports = {
    locations
};