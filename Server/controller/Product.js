const Product = require("../model/Product");

exports.addProduct = async (req, res) => {
  try {
    const { name, description, imageUrl, price, quantity } = req.body;
    if (!name) return res.status(400).send({ message: "name is required" });
    if (!description)
      return res.status(400).send({ message: "description is required" });
    if (!imageUrl)
      return res.status(400).send({ message: "imageUrl is required" });
    if (!price) return res.status(500).send({ message: "price is required" });
    if (!quantity)
      return res.status(400).send({ message: "quantity is required" });

    const product = await Product.create({
      name,
      description,
      imageUrl,
      price,
      quantity,
    });
    res.status(200).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal servar Error" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, imageUrl, price, quantity } = req.body;

  if (!id) return res.status(400).send({ message: "id is required" });
  if (!name) return res.status(400).send({ message: "name is required" });
  if (!description)
    return res.status(400).send({ message: "description is required" });
  if (!imageUrl)
    return res.status(400).send({ message: "imageUrl is required" });
  if (!price) return res.status(500).send({ message: "price is required" });
  if (!quantity)
    return res.status(400).send({ message: "quantity is required" });

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (imageUrl) product.imageUrl = imageUrl;
    if (price) product.price = price;
    if (quantity) product.quantity = quantity;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send({ message: "id is required" });
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
