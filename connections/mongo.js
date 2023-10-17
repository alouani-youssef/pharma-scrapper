const mongoose = require("mongoose");

const configuration = require("../config");

const APPLICATION_SHUT_DOWN_NUMBER = 4;
const CONNECTION_OPTIONS = {
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};

async function init() {
  try {
    if (!init.Connectioncounter) {
      init.Connectioncounter = 0;
    }
    init.Connectioncounter++;
    if (APPLICATION_SHUT_DOWN_NUMBER === init.Connectioncounter) {
      console.error(
        "CONNECTION FAILED FOR THE FOLLOWING CONNECTION URL",
        configuration.getMongoConnection()
      );
      configuration.setSystemAvailabilityOff();
      return;
    }
    mongoose.connection.on("open", (connection) => {
      configuration.setSystemAvailabilityOn();
    });
    mongoose.connection.on("disconnected", (connection) => {
      configuration.setSystemAvailabilityOff();
    });

    await mongoose.connect(
      configuration.getMongoConnection(),
      CONNECTION_OPTIONS
    );
  } catch (error) {
    console.error(
      `Application Tried to connect to MongoDB Database for ${init.Connectioncounter} time`
    );
    init();
  }
}
init();