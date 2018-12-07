const mongoose = require("mongoose");

const categories = require("./product.category");

const { Schema } = mongoose;
const UrlRegExp = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: categories,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantityInStoc: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String
  },
  color: {
    type: String
  },
  image: {
    type: String,
    match: UrlRegExp,
    default: "http://media.fortisavi.kz/img/jpg/default-image.jpg"
  }
});

productSchema.statics.findByName = async function(name) {
  const products = await this.find({ name: new RegExp(name, "i") });
  return products;
};

productSchema.statics.findByCategory = async function(category) {
  const products = await this.find({ category: new RegExp(category, "i") });
  return products;
};

module.exports = mongoose.model("Product", productSchema);
