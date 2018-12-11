const redis = require("redis");
const bluebird = require("bluebird");

const logging = require("./logging");
const config = require("./../config/redis-config");

const { port, host } = config;

bluebird.promisifyAll(redis.RedisClient.prototype);

const createClient = () => {
  const client = redis.createClient(port, host);

  client.on("connect", () =>
    logging.logInfo(
      `Redis client successfully connected to host ${host} on port ${port}`
    )
  );

  client.on("error", err =>
    logging.logInfo(
      `Redis client failed connecting to host ${host} on port ${port}. ${err}`
    )
  );

  client.on("end", () =>
    logging.logInfo(
      `Redis client disconnected from host ${host} on port ${port}.`
    )
  );

  return client;
};

module.exports = { createClient };
