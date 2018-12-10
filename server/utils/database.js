const mongose = require("mongoose");

const config = require("../config/db-config");
const logging = require("./logging");

const {
  dbProtocol,
  primaryUrl,
  secondaryUrl,
  arbiterUrl,
  dbName,
  replicaName
} = config;
const replicaConnectionString = `${dbProtocol}://${primaryUrl},${secondaryUrl},${arbiterUrl}/${dbName}`;

const safeExit = () => {
  mongose.connection.close(() => {
    logging.logInfo(
      `Mongoose disconnected from ${replicaConnectionString} app termination`
    );
  });
};

mongose.connection.on("connected", () => {
  logging.logInfo(
    `Mongose connected successfully to ${replicaConnectionString}`
  );
});

mongose.connection.on("disconnect", () => {
  logging.logInfo(`Mongose disconnected from ${replicaConnectionString}`);
});

mongose.connection.on("error", err => {
  logging.logError(
    `Mongose failed to connect to ${replicaConnectionString}`,
    err
  );
});

process.on("SIGINT", safeExit);
process.on("SIGTERM", safeExit);

const connect = async () => {
  let connected = false;
  try {
    await mongose.connect(
      replicaConnectionString,
      { useNewUrlParser: true, replicaSet: replicaName }
    );

    connected = true;
  } catch (err) {
    logging.logError(`Mongose connection failed. ${err.message}`);
  }

  return connected;
};

module.exports = { connect };
