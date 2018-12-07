const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderedProductsValidator = function(products) {
  return products && products.length > 0;
};

const orderedProductsValidationError = function(props) {
  return `${props.path} array must contain at least 1 product`;
};

const orderSchema = new Schema({
  orderedOn: Date,
  ammount: Number,
  products: {
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
  shippingPoint: {
    type: String,
    required: true
  }
});

orderSchema.pre("save", function(next) {
  this.orderedOn = this._id.getTimestamp();
  this.ammount = this.products.reduce(
    (accumulator, item) => accumulator + item.quantity * item.product.price,
    0
  );

  next();
});

module.exports = mongoose.model("Order", orderSchema);
