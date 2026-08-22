const locationRepo = require("../repository/location.repository");

const getLocationService=async(location)=>{

    if(!location.city || !location.area){
        throw new Error("No location Found");
    }
    const locationExist = await locationRepo.getLocations(location.area, location.city);
    return locationExist;
}

module.exports = {
    getLocationService
};