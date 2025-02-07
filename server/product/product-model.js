const mongoose = require("mongoose");

const { Schema } = mongoose;
const urlRegExp = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;

const productSchema = new Schema({
  name: {
    type: String,
    maxlength: 30,
    required: true
  },
  category: {
    type: String,
    maxlength: 20,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  color: {
    type: String
  },
  image: {
    type: String,
    match: urlRegExp,
    default: "http://media.fortisavi.kz/img/jpg/default-image.jpg"
  },
  keywords: {
    type: [String]
  }
});

productSchema.pre("save", function(next) {
  this.keywords = this.name
    .trim()
    .toLowerCase()
    .split(/\W+/);

  next();
});

productSchema.query.byKeywords = async function(keywords) {
  return this.where({ keywords: { $in: keywords } });
};

productSchema.query.byCategory = async function(category) {
  return this.where({ category: new RegExp(category, "i") });
};

productSchema.query.byMinPrice = async function(minPrice) {
  return this.where({
    price: {
      $gte: minPrice
    }
  });
};

productSchema.query.byMaxPrice = async function(maxPrice) {
  return this.where({
    price: {
      $lte: maxPrice
    }
  });
};

module.exports = mongoose.model("Product", productSchema);
