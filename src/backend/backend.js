import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { ProductModel } from "./models/product.js";

const app = express();
app.use(cors());
app.get("/products", async (req, res) => {
  const { category, limit, start } = req.query;

  if (!category) {
    res.status(400).json({ code: 400, error: "You have to input category!" });
    return;
  }

  let products = await ProductModel.find({ category }).exec();

  if (limit) {
    products = products.splice(start - 1 || 0, limit);
  }

  res.json(products);
});

app.listen(4000, async () => {
  mongoose.connect("mongodb://192.168.8.136/ecommerce-crypto");
  console.log("Server listening on http://localhost:6000");
});
