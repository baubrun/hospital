const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  first_name: String,
  last_name: String,
  insurance_number: Number,
  admission: Date,
  discharge: Date,
  medical_history: [{ type: String }],
  care_level: Number,
});

module.exports = mongoose.model("Patient", PatientSchema);
