const mongoose = require("mongoose");

const InvalidDataError = require("./../errors/InvalidDataError");
const Product = require("./../product/product-model");

const extractValidationErrorMessage = err => {
  const messages = [];
  const { errors } = err;
  const errorNames = Object.keys(errors);

  errorNames.forEach(name => messages.push(errors[name].message));

  return messages.join(";");
};

const validateObjectId = id => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new InvalidDataError(`Invalid id: ${id}`);
  }
};

const validateModel = async model => {
  try {
    return await model.validate();
  } catch (err) {
    const message = extractValidationErrorMessage(err);
    throw new InvalidDataError(message);
  }
};

const validateOrderItemsExist = async items => {
  const ids = items.map(item => item.product.toString());

  const foundProducts = await Product.find(
    {
      _id: {
        $in: ids
      }
    },
    "_id"
  );

  const foundIds = foundProducts.map(product => product._id.toString());
  const missingIds = ids.filter(id => !foundIds.includes(id));

  if (missingIds.length > 0) {
    throw new InvalidDataError(
      `Not existing product ID(s): ${missingIds.join(", ")}`
    );
  }
};

module.exports = { validateObjectId, validateModel, validateOrderItemsExist };
