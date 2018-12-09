const redis = require("redis");
const bluebird = require("bluebird");

const config = require("./../../config/redis-config");

bluebird.promisifyAll(redis.RedisClient.prototype);

const { port, host } = config;
const client = redis.createClient(port, host);

client.on("connect", () =>
  console.log(`Redis successfully connected to host ${host} on port ${port}`)
);

client.on("error", err =>
  console.log(`Redis failed connecting to host ${host} on port ${port}. ${err}`)
);

module.exports = client;
