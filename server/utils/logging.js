const logInfo = function(...args) {
  console.log(...args);
};

const logError = function(...args) {
  console.error(...args);
};

module.exports = { logInfo, logError };
