/* global db */
/* eslint-disable no-global-assign */

db = db.getSiblingDB("productsCatalog");

db.products.insert({
  name: "PC",
  category: "Tech",
  price: 1200,
  keywords: ["pc"]
});

db.products.insert({
  name: "Gaming PC",
  category: "Tech",
  price: 2500,
  keywords: ["pc", "gaming"]
});

db.products.insert({
  name: "Samsung monitor",
  category: "Tech",
  price: 600,
  keywords: ["samsung", "monitor"]
});

db.products.insert({
  name: "Security 360 camera",
  category: "Security",
  price: 200,
  keywords: ["security", "360", "camera"]
});

db.products.insert({
  name: "Security 360 camera PRO",
  category: "Security",
  price: 400,
  keywords: ["security", "360", "camera", "pro"]
});

db.products.insert({
  name: "Aroma candles",
  category: "Home",
  price: 15,
  color: "red",
  keywords: ["aroma", "candles"]
});

db.products.insert({
  name: "Aroma candles",
  category: "Home",
  price: 15,
  color: "yellow",
  keywords: ["aroma", "candles"]
});
