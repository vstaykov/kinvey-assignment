const mongodb = require("mongodb");

const dbConfig = require("./../config/dbconfig");

const { MongoClient } = mongodb;

const productsIndexes = [
  {
    key: {
      category: 1
    },
    name: "ProductCategoryIndex",
    background: true
  }
];

const setupIndexes = async db => {
  await db.collection("products").createIndexes(productsIndexes);
};

const setup = async () => {
  const client = new MongoClient(dbConfig.url, { useNewUrlParser: true });

  try {
    await client.connect();

    const db = client.db(dbConfig.name);

    await setupIndexes(db);

    await client.close();
  } catch (err) {
    console.log(err);
  }
};

module.exports.setup = setup;
