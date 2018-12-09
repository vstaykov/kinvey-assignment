const port = process.env.REDIS_PORT || 6379;
const host = process.env.REDIS_HOST || "localhost";

module.exports = { port, host };
