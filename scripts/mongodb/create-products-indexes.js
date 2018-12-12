/*  global db  */
/* eslint-disable no-global-assign */

db = db.getSiblingDB("productsCatalog");

db.products.createIndex({ keywords: 1 }, { name: "KeywordsIndex" });
db.products.createIndex({ category: 1 }, { name: "CategoryIndex" });
