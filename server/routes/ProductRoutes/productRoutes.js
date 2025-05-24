// manageproducts.routes.js
import express from "express";
import Product from "../../models/product.model.js";
import cloudinary from "../../libs/cloudinary.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import connectMongo from "../../libs/mongodb.js";

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "switcher_products",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});
const parser = multer({ storage });
// Search products
router.get("/search", async (req, res) => {
  try {
    await connectMongo();
    const { q } = req.query;
    if (!q || q.trim() === "") {
      return res.status(400).json({ error: "Search query is required" });
    }

    const regex = new RegExp(q, "i"); // case-insensitive
    const results = await Product.find({
      $or: [
        { prodName: { $regex: regex } },
        { prodDesc: { $regex: regex } },
        { category: { $regex: regex } },
      ],
    });

    res.status(200).json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});


// Get all products
router.get("/getAll", async (req, res) => {
  try {
    await connectMongo();
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Create product
router.post("/create", parser.single("prodImg"), async (req, res) => {
  try {
    await connectMongo();
    const { prodName, prodDesc, prodPrice } = req.body;
    const category = req.body.category?.toLowerCase() || "";
    const prodImg = req.file?.path || "";

    const newProduct = new Product({ prodName, prodDesc, prodPrice, prodImg, category });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

// Update product
router.put("/update/:id", parser.single("prodImg"), async (req, res) => {
  try {
    await connectMongo();
    const { id } = req.params;
    const { prodName, prodDesc, prodPrice } = req.body;
    const category = req.body.category?.toLowerCase() || "";

    const updateData = { prodName, prodDesc, prodPrice, category };

    if (req.file) {
      updateData.prodImg = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete product
router.delete("/delete/:id", async (req, res) => {
  try {
    await connectMongo();
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
