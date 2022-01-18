const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient");

router.route("/patient_id").post(patientController.getPatient);

router
  .route("/")
  .get(patientController.getPatients)
  .post(patientController.postPatient);

router.route("/waiting").get(patientController.getWaitingList);

router.route("/discharge").post(patientController.dischargePatient);

module.exports = router;
