const Order = require("./order.model");
const InvalidDataError = require("./../errors/InvalidDataError");
const paramsValidator = require("./../utils/paramsValidator");

const orderProjection = "orderedOn ammount state";

const buildOrdersQuery = filters => {
  const { status } = filters;
  const query = Order.find();

  if (status) {
    query.byStatus(status);
  }

  query.select(orderProjection);

  return query;
};

const getAllOrders = async () => {
  try {
    const orders = await Order.find({}, orderProjection);

    return orders;
  } catch (err) {
    throw err;
  }
};

const getOrders = async filters => {
  try {
    const query = buildOrdersQuery(filters);
    const orders = await query.exec();

    return orders;
  } catch (err) {
    throw err;
  }
};

const getOrder = async id => {
  if (!paramsValidator.checkIsValidId(id)) {
    throw new InvalidDataError(`Invalid order ID: ${id}`);
  }

  try {
    const order = await Order.findById(id);

    return order;
  } catch (err) {
    throw err;
  }
};

const createOrder = async data => {
  try {
    const order = new Order(data);
    await paramsValidator.validateModel(order);

    const createdOrder = await order.save();

    return createdOrder;
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllOrders, getOrders, getOrder, createOrder };
