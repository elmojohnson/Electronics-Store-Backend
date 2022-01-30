const { Schema } = require("mongoose");
const db = require("../config/db");

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [{ url: String, date: { type: Date, default: Date.now } }],
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Item = db.model("Item", ItemSchema);
module.exports = Item;
