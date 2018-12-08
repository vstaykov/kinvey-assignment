const Order = require("./order.model");

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
  const orders = await Order.find({}, orderProjection);

  return orders;
};

const getOrders = async filters => {
  const query = buildOrdersQuery(filters);

  const orders = await query.exec();

  return orders;
};

const getOrder = async id => {
  const order = await Order.findById(id);

  return order;
};

const createOrder = async data => {
  const order = new Order(data);
  const createdOrder = await order.save();

  return createdOrder;
};

module.exports = { getAllOrders, getOrders, getOrder, createOrder };
