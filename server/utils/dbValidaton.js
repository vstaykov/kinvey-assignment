const mongoose = require("mongoose");
const InvalidDataError = require("./../errors/InvalidDataError");

const extractValidationErrorMessage = err => {
  const messages = [];
  const { errors } = err;
  const errorNames = Object.keys(errors);

  errorNames.forEach(name => messages.push(errors[name].message));

  return messages.join(";");
};

const checkIsValidId = id => mongoose.Types.ObjectId.isValid(id);

const validateModel = async model => {
  try {
    return await model.validate();
  } catch (err) {
    const message = extractValidationErrorMessage(err);
    throw new InvalidDataError(message);
  }
};

module.exports = { checkIsValidId, validateModel };
