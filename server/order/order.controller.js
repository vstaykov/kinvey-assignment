const Order = require("./order.model");
const dbValidaton = require("./../utils/dbValidaton");

const getOrderStatus = async id => {
  try {
    dbValidaton.validateObjectId(id);

    const order = await Order.findById(id, "status");

    return order;
  } catch (err) {
    throw err;
  }
};

const createOrder = async data => {
  try {
    const order = new Order(data);
    await dbValidaton.validateModel(order);
    await dbValidaton.validateOrderItemsExist(order.items);

    const createdOrder = await order.save();

    return createdOrder;
  } catch (err) {
    throw err;
  }
};

module.exports = { getOrderStatus, createOrder };
