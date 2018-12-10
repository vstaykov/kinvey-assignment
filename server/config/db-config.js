const primaryUrl = process.env.DB_PRIMARY_URL || "localhost:27017";
const secondaryUrl = process.env.DB_SECONDARY_URL || "localhost:27018";
const arbiterUrl = process.env.DB_ARBITER_URL || "localhost:27019";
const dbName = process.env.DB_NAME || "productsCatalog";
const dbProtocol = process.env.DB_PROTOCOL || "mongodb";
const replicaName = process.env.DB_REPLICA_NAME || "productsCatalogRepl";

module.exports = {
  primaryUrl,
  secondaryUrl,
  arbiterUrl,
  dbName,
  dbProtocol,
  replicaName
};
