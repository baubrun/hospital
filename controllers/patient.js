const Patient = require("../models/patient");
const Room = require("../models/room");

const dischargePatient = async (req, res) => {
  const { occupant_id, discharge } = req.body;

  try {
    await Patient.findOneAndUpdate(
      {
        _id: occupant_id,
      },
      {
        discharge: discharge,
      }
    );

    await Room.findOneAndUpdate(
      {
        occupant_id: occupant_id,
      },
      {
        $unset: { occupant_id: "" },
      }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await Patient.where("discharge").exists();

    return res.status(200).json(patients);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getWaitingList = async (req, res) => {
  try {
    // left join on _id where occupant_id === null
    const waitingList = await Patient.aggregate([
      {
        $lookup: {
          from: "rooms",
          localField: "_id",
          foreignField: "occupant_id",
          as: "waiting_list",
        },
      },
      { $match: { "waiting_list.0.occupant_id": { $exists: false } } },
    ]).sort({ last_name: 1 });

    return res.status(200).json({ waitingList });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getPatient = async (req, res) => {
  const { first_name, last_name } = req.body;

  try {
    const patient = await Patient.findOne({
      first_name: first_name,
      last_name: last_name,
    });

    return res.status(200).json({
      patient,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const postPatient = async (req, res) => {
  try {
    const vacantRooms = await Room.count({
      occupant_id: { $exists: true },
    });

    if (vacantRooms < 1) {
      return res.status(400).json({ message: "No vacancies." });
    }

    const {
      firstName,
      lastName,
      insuranceNumber,
      discharge,
      medicalHistory,
      careLevel,
    } = req.body;

    const patient = new Patient({
      firstName: firstName,
      lastName: lastName,
      insuranceNumber: insuranceNumber,
      discharge: discharge,
      medicalHistory: medicalHistory,
      careLevel: careLevel,
    });

    await patient.save();

    return res.status(200).json(patient);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  dischargePatient,
  postPatient,
  getPatients,
  getWaitingList,
  getPatient,
};
