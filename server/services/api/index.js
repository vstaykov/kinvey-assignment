const database = require("./../../database");
const app = require("./api");

const config = require("./../../../config/apiconfig");

(async function() {
  const dbConnected = await database.connect();

  if (dbConnected) {
    app.listen(config.port, err => console.log(err));
  }
})();
