const express = require("express");

const router = express.Router();
const locationController = require("../controller/location.controller");

router.get("/get-locations", locationController.locations)
module.exports = router;