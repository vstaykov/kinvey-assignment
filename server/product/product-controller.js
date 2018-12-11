const Product = require("./product-model");
const dbValidaton = require("./../utils/db-validaton");

const productProjection = "name image price category";

const buildProductsFiltrationQuery = filters => {
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

const getProductsTotalCount = async filters => {
  const query = buildProductsFiltrationQuery(filters);
  const count = await query.countDocuments();

  return count;
};

const getLastProductId = async filters => {
  const { offset } = filters;

  const filtrationQuery = buildProductsFiltrationQuery(filters);
  const skippedProducts = await filtrationQuery.limit(offset);
  const lastProductId = skippedProducts[skippedProducts.length - 1]._id;

  return lastProductId;
};

const getProducts = async filters => {
  try {
    const { limit, offset } = filters;
    const totalCount = await getProductsTotalCount(filters);

    let products = [];

    if (offset < totalCount && limit > 0) {
      const query = buildProductsFiltrationQuery(filters);

      if (offset > 0) {
        const lastProductId = await getLastProductId(filters);

        query.find({ _id: { $gt: lastProductId } });
      }

      query.limit(limit);
      products = await query.exec();
    }

    return products;
  } catch (err) {
    throw err;
  }
};

const getProductsCategories = async () => {
  try {
    const categories = await Product.distinct("category");

    return categories;
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

module.exports = { getProducts, getProduct, getProductsCategories };
