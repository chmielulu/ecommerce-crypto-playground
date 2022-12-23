import { model, Schema } from "mongoose";

const productSchema = new Schema({
  name: String,
  description: String,
  picture: String,
  price: Number,
  category: String,
});

export const ProductModel = model("Product", productSchema);
