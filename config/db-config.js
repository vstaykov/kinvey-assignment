const primaryHost = process.env.DB_PRIMARY_HOST || "localhost";
const primaryPort = process.env.DB_PRIMARY_PORT || 27017;
const secondaryHost = process.env.DB_SECONDARY_HOST || "localhost";
const secondaryPort = process.env.DB_SECONDARY_PORT || 27018;
const arbiterHost = process.env.DB_ARBITER_HOST || "localhost";
const arbiterPort = process.env.DB_ARBITER_PORT || 27019;
const dbName = process.env.DB_NAME || "productsCatalog";
const dbProtocol = process.env.DB_PROTOCOL || "mongodb";
const replicaName = process.env.DB_REPLICA_NAME || "productsCatalogRepl";
const primaryUrl = `${primaryHost}:${primaryPort}`;
const secondaryUrl = `${secondaryHost}:${secondaryPort}`;
const arbiterUrl = `${arbiterHost}:${arbiterPort}`;

module.exports = {
  primaryUrl,
  secondaryUrl,
  arbiterUrl,
  dbName,
  dbProtocol,
  replicaName
};
