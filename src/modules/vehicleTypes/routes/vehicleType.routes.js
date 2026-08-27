const express = require("express");
const vehicletypecontroller = require('../controller/vehicleType.controller');

const router = express.Router();

router.get("/getVehicleType", vehicletypecontroller.vehicleController)
module.exports = router;