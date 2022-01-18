const Patient = require("../models/patient");
const Room = require("../models/room");

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.status(200).json(rooms);
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
        occupied: true,
        occupant_id: occupant_id,
      },
      { new: true }
    );

    const patient = await Patient.findOneAndUpdate(
      {
        occupant_id: occupant_id,
      },
      {
        admission: new Date(),
      },
      { new: true }
    );

    return res.status(200).json({
      room,
      patient,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// const discharge = async (req, res) => {
//   const { room_id } = req.params;
//   try {
//     await db.query(
//       `UPDATE rooms
//       SET occupied = false, occupant_id = NULL
//       WHERE room_number = $1
//       `,
//       [room_id]
//     );

//     return res.status(200).json({ success: true });
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// };

module.exports = {
  occupyRoom,
  getRooms,
  // discharge,
};
