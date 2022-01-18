const Patient = require("../models/patient");
const Room = require("../models/room");

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({}).populate("occupant_id");
    return res.status(200).json({ rooms });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const occupyRoom = async (req, res) => {
  const { room_number, occupant_id } = req.body;

  try {
    const room = await Room.findOneAndUpdate(
      {
        room_number: room_number,
      },
      {
        occupant_id: occupant_id,
      },
      { new: true }
    ).populate("occupant_id");

    await Patient.findOneAndUpdate(
      {
        occupant_id: occupant_id,
      },
      {
        admission: new Date(),
      }
    );

    return res.status(200).json({
      room,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const vacateRoom = async (req, res) => {
  const { room_id } = req.body;
  try {
    const room = await Room.findByIdAndUpdate(
      room_id,
      {
        $unset: { occupant_id: "" },
      },
      { new: true }
    );

    return res.status(200).json({ room });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const clearRooms = async (req, res) => {
  try {
    await Room.updateMany(
      {
        room_number: { $exists: true },
      },
      {
        $unset: { occupant_id: "" },
      }
    );
    const rooms = await Room.find({});

    const patients = await Patient.find({}).sort({ last_name: 1 });

    return res.status(200).json({ rooms, patients });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  occupyRoom,
  getRooms,
  vacateRoom,
  clearRooms,
};
