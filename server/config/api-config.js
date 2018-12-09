const path = require("path");

const port = process.env.API_PORT || 3000;
const logPath = process.env.API_LOG_PATH || path.join(__dirname, "../logs/api");
const logName = process.env.API_LOG_NAME || "api.log";

module.exports = { port, logPath, logName };
