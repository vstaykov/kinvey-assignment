const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  orderedOn: Date,
  ammount: Number,
  products: {
    type: [
      {
        type: Schema.ObjectId,
        ref: "Product"
      }
    ],
    required: true,
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
    (accumulator, product) => accumulator + product.price,
    0
  );

  next();
});

module.exports = mongoose.model("Order", orderSchema);
