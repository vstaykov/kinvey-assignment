const mongoose = require("mongoose");

const orderStatus = require("./order.status");

const { Schema } = mongoose;

const orderedProductsValidator = function(products) {
  return products && products.length > 0;
};

const orderedProductsValidationError = function(props) {
  return `${props.path} array must contain at least 1 product`;
};

const orderSchema = new Schema({
  orderedOn: Date,
  items: {
    type: [
      {
        quantity: {
          type: Number,
          min: 1,
          default: 1
        },
        product: {
          type: Schema.ObjectId,
          ref: "Product"
        }
      }
    ],
    required: true,
    validate: {
      validator: orderedProductsValidator,
      msg: orderedProductsValidationError
    },
    default: undefined
  },
  shippingInfo: {
    address: {
      type: String,
      maxlength: 150,
      required: true
    },
    recipient: {
      type: String,
      maxlength: 40,
      required: true
    }
  },
  status: {
    state: {
      type: String,
      default: orderStatus.submitted
    },
    message: {
      type: String,
      maxlength: 100
    }
  }
});

orderSchema.pre("save", function(next) {
  this.orderedOn = this._id.getTimestamp();
  next();
});

module.exports = mongoose.model("Order", orderSchema);
