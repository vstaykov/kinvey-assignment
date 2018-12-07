const host = process.env.DB_HOST || "mongodb://localhost";
const port = process.env.DB_PORT || 27017;
const name = process.env.DB_NAME || "testdb";
const url = `${host}:${port}/${name}`;

module.exports = { host, port, name, url };
