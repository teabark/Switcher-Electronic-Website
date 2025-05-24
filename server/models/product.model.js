// models/product.model.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  prodImg: {
    type: String,
    required: true,
  },
  prodName: {
    type: String,
    required: true,
  },
  prodDesc: {
    type: String,
    required: true,
  },
  prodPrice: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
