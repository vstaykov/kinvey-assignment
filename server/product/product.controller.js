const Product = require("./product.model");

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
  const products = await Product.find({}, productProjection);

  return products;
};

const getProducts = async filters => {
  const query = buildProductsQuery(filters);

  const products = await query.exec();

  return products;
};

const getProduct = async id => {
  const product = await Product.findById(id);
  return product;
};

module.exports = { getAllProducts, getProducts, getProduct };
