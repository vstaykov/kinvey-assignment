const redis = require("./../../utils/redis");

const KEY = "ordersFulfilled";
const client = redis.createClient();
const subscriber = redis.createClient();

const safeExit = async () => {
  await subscriber.unsubscribeAsync();
  await subscriber.quitAsync();
  await client.quitAsync();
};

const getFulfilledOrder = async () => {
  const orderJson = await client.rpopAsync(KEY);
  const order = JSON.parse(orderJson);

  return order;
};

subscriber.on("connect", () => {
  subscriber.subscribe(`__keyspace@0__:${KEY}`, err => {
    const message = err || "Successfully subscribed to keyspace";
    console.log(message);
  });
});

subscriber.on("message", async (channel, message) => {
  if (message === "rpush") {
    const order = await getFulfilledOrder();

    console.log(order);
  }
});

process.on("SIGINT", async () => {
  await safeExit();
});
process.on("SIGTERM", async () => {
  await safeExit();
});
