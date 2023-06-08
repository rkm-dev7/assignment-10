const Product = require("../model/product.model");
// Fetch All Products
exports.getAllProduct = async (req, res) => {
  try {
    // Code to fetch products from database or JSON file
    const products = await Product.find();

    if (products.length === 0) {
      // No product found
      return res
        .status(404)
        .json({ success: false, error: "No products found" });
    }

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
// Fetch single product
exports.getProductById = async (req, res) => {
  try {
    // Code to fetch a single product from database
    const product = await Product.findById(req.params.id);

    // No product found
    if (!product) {
      res.status(404).json({ success: false, error: "no product found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
// Create New product
exports.createProduct = async (req, res) => {
  try {
    // Code to create a new product in the database
    const product = new Product(req.body);
    await product.save();

    if (!product) {
      // If the product creation fails, return a 500 response
      res
        .status(500)
        .json({ success: false, error: "Product creation failed" });
    }

    // Send the created product as a response
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
// Delete product by id
exports.deleteProduct = async (req, res) => {
  try {
    // Code to delete a product in the database
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      // If the product delete fails, return a 500 response
      return res
        .status(500)
        .json({ success: false, error: "product not found" });
    }
    // Send the deleted product as a response
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    // Handel Error
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
exports.getSingleProduct;
