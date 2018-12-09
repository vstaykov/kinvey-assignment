const Product = require("./product.model");
const dbValidaton = require("./../utils/db-validaton");

const productProjection = "name image price";

const buildProductsQuery = filters => {
  const { keywords, category, minPrice, maxPrice } = filters;
  const query = Product.find();

  if (keywords) {
    query.byKeywords(keywords);
  }

  if (category) {
    query.byCategory(category);
  }

  if (minPrice) {
    query.byMinPrice(minPrice);
  }

  if (maxPrice) {
    query.byMaxPrice(maxPrice);
  }

  query.select(productProjection);

  return query;
};

const getAllProducts = async () => {
  try {
    const products = await Product.find({}, productProjection);

    return products;
  } catch (err) {
    throw err;
  }
};

const getProducts = async filters => {
  try {
    const query = buildProductsQuery(filters);
    const products = await query.exec();

    return products;
  } catch (err) {
    throw err;
  }
};

const getProduct = async id => {
  try {
    dbValidaton.validateObjectId(id);

    const product = await Product.findById(id);

    return product;
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllProducts, getProducts, getProduct };
