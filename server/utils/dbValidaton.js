const mongoose = require("mongoose");
const InvalidDataError = require("./../errors/InvalidDataError");

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

module.exports = { validateObjectId, validateModel };
