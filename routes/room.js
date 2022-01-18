const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room");

router.route("/").get(roomController.getRooms);

router.route("/occupy").post(roomController.occupyRoom);

router.route("/vacate").post(roomController.vacateRoom);

module.exports = router;
