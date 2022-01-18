const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  room_number: Number,
  short_stay: Boolean,
  long_stay: Boolean,
  occupied: Boolean,
  occupant_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Patient",
  },
});

module.exports = mongoose.model("Room", RoomSchema);
