const mongose = require("mongoose");

const config = require("./config/db-config");

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
    console.log(
      `Mongoose disconnected from ${replicaConnectionString} app termination`
    );
  });
};

mongose.connection.on("connected", () => {
  console.log(`Mongose connected successfully to ${replicaConnectionString}`);
});

mongose.connection.on("disconnect", () => {
  console.log(`Mongose disconnected from ${replicaConnectionString}`);
});

mongose.connection.on("error", err => {
  console.error(`Mongose failed to connect to ${replicaConnectionString}`, err);
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
    console.log(`Mongose connection failed. ${err.message}`);
  }

  return connected;
};

module.exports = { connect };
