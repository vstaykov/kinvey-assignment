const axios = require("axios");

const {
  KINVEY_USER,
  KINVEY_SECRET,
  KINVEY_APP,
  KINVEY_COLLECTION
} = process.env;

const authorizationToken = Buffer.from(
  `${KINVEY_USER}:${KINVEY_SECRET}`
).toString("base64");
const client = axios.create({
  baseURL: "https://baas.kinvey.com",
  headers: {
    Authorization: `Basic ${authorizationToken}`
  }
});

const storeData = async data => {
  const url = `/appdata/${KINVEY_APP}/${KINVEY_COLLECTION}`;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const res = await client.post(url, data, config);
  return res;
};

module.exports = { storeData };
