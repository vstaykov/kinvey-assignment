const morgan = require("morgan");
const rfs = require("rotating-file-stream");

const config = require("./../../../config/api-config");

const logFormat =
  ":method :url :status :response-time ms - :res[content-length] :err";
const logStream = rfs(config.logName, {
  interval: "1d",
  path: config.logPath
});

morgan.token("err", (req, res) => res.err);

const logger = morgan(logFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: logStream
});

module.exports.fileLogger = logger;
