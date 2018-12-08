/*  global db rs  */

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

db.products.ensureIndex({
  category: 1,
  keywords: 1
});
