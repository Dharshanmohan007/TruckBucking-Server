const express = require("express");

const router = express.Router();
const locationController = require("../controllers/location.controller");

router.get("/get-locations", locationController.locations)
module.exports = router;