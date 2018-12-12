/*  global db rs  */
/* eslint-disable no-global-assign */

const replicaSetConfig = {
  _id: "productsCatalogRepl",
  members: [
    {
      _id: 0,
      host: "localhost:27017",
      priority: 10
    },
    {
      _id: 2,
      host: "localhost:27018"
    },
    {
      _id: 3,
      host: "localhost:27019",
      arbiterOnly: true
    }
  ]
};

rs.initiate(replicaSetConfig);

db = db.getSiblingDB("productsCatalog");

db.products.createIndex({ keywords: 1 }, { name: "KeywordsIndex" });
db.products.createIndex({ category: 1 }, { name: "CategoryIndex" });
