const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./config");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/error");
const logger = require("./middlewares/log");

const roomRoutes = require("./routes/room");
const patientRoutes = require("./routes/patient");

app.use(express.json());
app.use(cors());

app.use("/", express.static("build"));

app.use("/api/rooms", roomRoutes);
app.use("/api/patients", patientRoutes);

/*=============
 Handle Errors
 ==============*/
app.use(errorHandler);

/*================
 Port && Mongoose
 ===================*/

const options = {
  dbName: "hospital",
};

mongoose
  .connect(config.DB_URI, options)
  .then(
    app.listen(config.PORT, () => {
      console.log("\nConnected to DB!");
      console.log(`Server is running on port ${config.PORT}!`);
    })
  )
  .catch((err) => logger.error("mongoose.connect", err));
